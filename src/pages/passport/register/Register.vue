<template>
  <div class="register-mask">
    <div class="register-bg">
      <div class="register-content">
        <div class="small-logo">
          <img src="~img/logo-1.png" alt="" />
        </div>
        <h2>注册到云后台管理的账号！</h2>
        <el-form ref="registerInfo" :model="registerInfo" class="register-form-content" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="registerInfo.name" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <div class="two-password">
            <el-form-item prop="password" class="half-input">
              <el-input v-model="registerInfo.password" placeholder="请输入密码" :type="passwordType" prefix-icon="el-icon-user">
              </el-input>
            </el-form-item>
            <el-form-item prop="rePassword" class="half-input right-input">
              <el-input v-model="registerInfo.rePassword" placeholder="请输入确认密码" :type="passwordType" prefix-icon="el-icon-user">
              </el-input>
            </el-form-item>
            <el-checkbox class="show-password" @change="modifyPassword">显示密码</el-checkbox>
          </div>
          <el-form-item prop="phone">
            <el-input v-model="registerInfo.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"> </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="registerInfo.code" placeholder="请输入验证码" prefix-icon="el-icon-user" class="code-input"></el-input>
            <el-button @click="sendSmsValidator" :disabled="countNum !== 0" class="code-button">
              {{ countNum !== 0 ? countNum + 's后重试' : '获取验证码' }}
            </el-button>
          </el-form-item>
          <el-form-item prop="roles">
            <el-select v-model="registerInfo.roles" placeholder="请选择身份" multiple filterable collapse-tags>
              <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="register-button">
            <el-button type="text" style="float: left" @click="toLogin">登录到现有账号</el-button>
            <el-button type="primary" @click="signup('registerInfo')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-content">
        <img src="~assets/logo.png" alt="" />
        <p>感谢vue-element提供的技术支持</p>
      </div>
    </div>
  </div>
</template>

<script>
import { signup, SignupInfo, accountUnique } from 'network/passport';
import { getRole } from '../../../network/auth/role';
import { sms } from 'components/common/mixin';
import CONST from 'utils/const';

export default {
  name: 'Register',
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value != this.registerInfo.password) {
        return callback(new Error('密码不一致，请重新输入'));
      }
      return callback();
    };
    const checkUserUnique = (rule, value, callback) => {
      accountUnique(value)
        .then((res) => {
          callback();
        })
        .catch((err) => {
          callback(new Error('用户已存在'));
        });
    };
    const checkPhoneUnique = (rule, value, callback) => {
      accountUnique(value)
        .then((res) => {
          // return res.message == 'Account already exists.' ? callback(new Error('手机号已存在')) : callback();
          callback();
        })
        .catch((err) => {
          callback(new Error('手机号已存在'));
        });
    };
    return {
      select: '',
      //用于判断是否显示密码
      isShow: true,
      //密码input类型的切换
      passwordType: 'password',
      countNum: 0,
      roles: [],
      //注册表单数据
      registerInfo: {
        name: '',
        password: '',
        rePassword: '',
        phone: '',
        code: '',
        roles: [],
        realName: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: CONST.RE.ACCOUNT,
            message: CONST.RE_TEXT.ACCOUNT,
            trigger: 'blur'
          },
          { validator: checkUserUnique, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: CONST.RE.PASSWORD, message: CONST.RE_TEXT.PASSWORD, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { pattern: CONST.RE.PASSWORD, message: CONST.RE_TEXT.PASSWORD, trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: CONST.RE.PHONE_NUM, message: CONST.RE_TEXT.PHONE_NUM, trigger: 'blur' },
          { validator: checkPhoneUnique, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不可为空', trigger: 'blur' },
          { pattern: CONST.RE.SMSCODE, message: CONST.RE_TEXT.SMSCODE, trigger: 'blur' }
        ],
        roles: [{ required: true, message: '必须需要选择至少一种身份', trigger: 'blur' }]
      },
      isSendSms: false
    };
  },
  mixins: [sms],
  created() {
    this.getRoleOptions();
  },
  methods: {
    // 网络方法
    // 获取角色options
    async getRole() {
      try {
        const res = await getRole();
        if (res.status !== 200) {
          return null;
        }
        return res.data;
      } catch (error) {
        console.error(`get role error:${error}`);
      }
    },
    toLogin() {
      this.$router.replace('/passport/login');
    },
    signup(formName) {
      const signupInfo = new SignupInfo(this.registerInfo);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.passFromValid(signupInfo);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //通过表单验证时的处理
    async passFromValid(signupInfo) {
      try {
        const res = await signup(signupInfo);
        this.$message({
          type: 'success',
          message: '注册成功，欢迎您！！'
        });
        if (res.data) {
          window.localStorage.setItem('toKen', res.data.token);
          window.localStorage.setItem('uid', res.data.uid);
        }
        this.$router.replace('/dashboard');
        return true;
      } catch (err) {
        console.error(`signup error: ${error}`);
      }
    },
    //修改密码是否显示
    modifyPassword() {
      this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    },
    // 验证是否可以发送验证码
    sendSmsValidator() {
      this.$refs['registerInfo'].validateField('phone', (str) => {
        if (!str) {
          this.sendSms('register', this.registerInfo.phone);
        }
      });
    },
    // 获取角色选择器的options
    async getRoleOptions() {
      const result = await this.getRole();
      this.roles = result.map((x) => {
        return {
          value: x.code,
          label: x.name
        };
      });
    }
  }
};
</script>

<style scoped>
@import './register.css';
</style>
<style>
</style>