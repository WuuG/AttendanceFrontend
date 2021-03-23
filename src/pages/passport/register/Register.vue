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
        <p>感谢vue-element提供的技术支持</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value != this.registerInfo.password) {
        return callback(new Error('两次密码不一致，请重新输入'));
      }
    };
    return {
      //用于判断是否显示密码
      isShow: true,
      //密码input类型的切换
      passwordType: 'password',
      countNum: 0,
      registerInfo: {
        name: '',
        password: '',
        rePassword: '',
        phone: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[A-Za-z_@.]{6,10}$/, message: '6-10位之间的字母、下划线、@、.，不能以数字开头', trigger: 'blur' }
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
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '请输入正确的手机哈', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入6为验证码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    toLogin() {
      this.$router.replace('/passport/login');
    },
    modifyPassword() {
      this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    },
    countdown(num) {
      this.countNum = num;
      if (typeof num != 'number') {
        console.log('请输入数字');
        return;
      }
      this.countNum;
      const timer1 = setInterval(() => {
        this.countNum--;
        if (this.countNum == 0) {
          clearInterval(timer1);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
@import './register.css';
</style>