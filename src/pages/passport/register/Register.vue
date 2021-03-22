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
              <el-input v-model="registerInfo.password" placeholder="请输入密码" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword" class="half-input right-input">
              <el-input v-model="registerInfo.rePassword" placeholder="请输入确认密码" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-checkbox>显示密码</el-checkbox>
          </div>
          <el-form-item prop="phone">
            <el-input v-model="registerInfo.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="registerInfo.code" placeholder="请输入验证码" prefix-icon="el-icon-user" class="code-input"></el-input>
            <el-button @click="countdown(60)" :disabled="countNum !== 0" class="code-button">
              {{ countNum !== 0 ? countNum + 's后重试' : '验证' }}
            </el-button>
          </el-form-item>
          <el-form-item class="register-button">
            <el-button type="text" style="float: left" @click="toLogin">登录到现有账号</el-button>
            <el-button type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-content">
        <img src="~assets/logo.png" alt="" />
        <p>感谢vue-elment提供的技术支持</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用于判断是否显示密码
      isShow: true,
      countNum: 0,
      registerInfo: {
        name: '',
        password: '',
        rePassword: '',
        phone: '',
        code: ''
      },
      rules: {
        name: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        rePassword: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    };
  },
  methods: {
    toLogin() {
      this.$router.replace('/passport/login');
    }
  }
};
</script>

<style scoped>
@import './register.css';
</style>