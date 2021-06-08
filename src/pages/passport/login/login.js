import { authLoginByPassword, authLoginByPhone } from 'network/passport';
import { sms } from 'components/common/mixin';
import { randomString, getCurUrlParmas } from 'utils/utils';
import CONST from 'utils/const';

export default {
  data: function () {
    //这里是elment当中进行表单验证的写法，特别有意思
    // 用户名验证
    const validateUserName = (rule, value, callback) => {
      const pattern = CONST.RE.ACCOUNT;
      if (!value) {
        return callback(new Error('用户名不可为空'));
      } else if (!pattern.test(value)) {
        return callback(new Error(CONST.RE_TEXT.ACCOUNT));
      } else {
        callback();
      }
    };
    //手机号验证
    const validatePhone = (rule, value, callback) => {
      const pattern = CONST.RE.PHONE_NUM;
      if (!value) {
        return callback(new Error('手机号不可为空'));
      } else if (!pattern.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    //密码验证
    const validatePassword = (rule, value, callback) => {
      // 最短6位，最长16位 {6,16}
      // 可以包含小写大母 [a-z] 和大写字母 [A-Z]
      // 可以包含数字 [0-9]
      // 可以包含下划线 [ _ ] 和减号 [ - ]
      const patter = CONST.RE.PASSWORD;
      if (!value) {
        return callback(new Error('密码不可为空'));
      } else if (!patter.test(value)) {
        return callback(new Error(CONST.RE_TEXT.PASSWOR));
      } else {
        return callback();
      }
    };
    return {
      countNum: 0,
      userInfo: {
        name: '',
        password: '',
        number: '',
        code: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateUserName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        number: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [
          { required: true, message: '请输入4-6位验证码', trigger: 'blur' },
          { pattern: CONST.RE.SMSCODE, message: CONST.RE_TEXT.SMSCODE, trigger: 'blur' }
        ]
      },
      activeName: 'first',
      autoLogin: false,
      params: CONST
    };
  },
  //混入发送验证码
  mixins: [sms],
  created() {
    this.getOAuthParmas();
  },
  methods: {
    //登录按钮提交功能
    submitForm(formName) {
      const userInfo = this.userInfo; // 这里需要先获取this的数据，在进入elment的表单验证后，this指针变动就无法找到这个组件中的数据啦。
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(userInfo);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //点击网站logo进行页面刷新
    reload() {
      this.$router.go(0);
    },
    //登录提供两个，账号（手机号）,密码（验证码）
    login(userInfo) {
      if (this.activeName == 'first') {
        this.authLoginByPassword(userInfo);
      } else {
        this.authLoginByPhone(userInfo);
      }
    },
    //通过登录后的处理
    passAuthLogin(res) {
      if (res.status >= 300 || res.status < 200) {
        if (res.data) {
          this.$message({
            message: res.data,
            type: 'warning',
            offset: 80
          });
        }
        if (res.message) {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
        return false;
      }
      this.$message({
        message: '登陆成功，欢迎您！',
        type: 'success'
      });
      if (res.data) {
        window.localStorage.setItem('toKen', res.data.token);
        window.localStorage.setItem('uid', res.data.uid);
      }
      this.$router.replace('/dashboard');
      return true;
    },
    //通过账号密码登录
    authLoginByPassword(userInfo) {
      authLoginByPassword(userInfo.name, userInfo.password)
        .then(res => {
          this.passAuthLogin(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message);
        });
    },
    //通过手机号登录
    authLoginByPhone(userInfo) {
      authLoginByPhone(userInfo.number, userInfo.code)
        .then(res => {
          this.passAuthLogin(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message);
        });
    },
    //跳转去登录
    toRegister() {
      this.$router.replace('/passport/register');
    },
    //忘记密码。跳出弹窗，提示使用手机验证码登录
    forgetPassword() {
      this.$message({
        message: '请使用手机登录，并在个人设置修改密码！',
        type: 'warning',
        showClose: true
      });
    },
    //无法使用手机验证，请联系管理员。
    unVertify() {
      this.$message({
        message: '无法使用手机验证，请联系管理员。(tel:+86-15032332240)',
        type: 'warning',
        showClose: true
      });
    },
    //点击第三方登录图标时，生成第三方登录的url,并进行跳转
    onOAuth(params) {
      const state = randomString();
      const url = `${params.BASEURL}?client_id=${params.CLINET_ID}&redirect_uri=${params.REDIRECT_URL}&response_type=code&state=${state}`;
      location.replace(url);
    },
    //第三方登录参数获取，页面创建时获取
    getOAuthParmas() {
      let params = getCurUrlParmas();
      if (params) {
        console.log('第三方登录后返回所获取的参数信息', params);
        history.replaceState('', '', 'http://localhost:8080/#/passport/login');
      }
    }
  }
};
