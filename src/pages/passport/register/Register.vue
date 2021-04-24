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
            <el-button @click="sendSms('register', registerInfo.phone)" :disabled="countNum !== 0" class="code-button">
              {{ countNum !== 0 ? countNum + 's后重试' : '获取验证码' }}
            </el-button>
          </el-form-item>
          <el-select v-model="registerInfo.role" placeholder="请选择身份">
            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>

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
import { sms } from 'components/common/mixin';
export default {
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
          // console.log(res);
          return res.message == 'Account already exists.' ? callback(new Error('用户名已存在')) : callback();
        })
        .catch((err) => {
          return callback();
        });
    };
    const checkPhoneUnique = (rule, value, callback) => {
      accountUnique(value)
        .then((res) => {
          // console.log(res);
          return res.message == 'Account already exists.' ? callback(new Error('手机号已存在')) : callback();
        })
        .catch((err) => {
          return callback();
        });
    };
    return {
      select: '',
      //用于判断是否显示密码
      isShow: true,
      //密码input类型的切换
      passwordType: 'password',
      countNum: 0,
      roles: [
        { label: '教师', value: 'teacher' },
        { label: '管理员', value: 'admin' }
      ],
      //注册表单数据
      registerInfo: {
        name: '',
        password: '',
        rePassword: '',
        phone: '',
        code: '',
        role: '',
        realName: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]([a-zA-Z0-9_]{3,19})$/,
            message: '4-20个英文、数字和下划线，不以数字和下划线开头',
            trigger: 'blur'
          },
          { validator: checkUserUnique, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[\w_-]{6,16}$/, message: '6-16位之间，不可输入特殊符号。', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { pattern: /^[\w_-]{6,16}$/, message: '密码在6-16位之间，请不要输入特殊符号。', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '请输入正确的手机哈', trigger: 'blur' },
          { validator: checkPhoneUnique, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入6位验证码', trigger: 'blur' },
          { pattern: /^[0-9]{4,6}$/, message: '请输入4-6位验证码', trigger: 'blur' }
        ]
      }
    };
  },
  mixins: [sms],
  methods: {
    toLogin() {
      this.$router.replace('/passport/login');
    },
    signup(formName) {
      const signupInfo = new SignupInfo(this.registerInfo);
      console.log(signupInfo.smsCode);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          signup(signupInfo)
            .then((res) => {
              if (res.status == 400) {
                this.$message({
                  message: res.message,
                  type: 'error'
                });
              } else {
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
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: err.error,
                type: 'warning'
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改密码是否显示
    modifyPassword() {
      this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style scoped>
@import './register.css';
</style>
<style>
</style>