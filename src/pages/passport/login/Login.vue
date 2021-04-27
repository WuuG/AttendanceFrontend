<template>
  <div>
    <div class="login-mask">
      <div class="login-content">
        <div class="passport-title" @click="reload">
          <img src="~img/logo-1.png" alt="" />
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="账户密码登录" name="first">
            <el-form :model="userInfo" :rules="rules" ref="loginByUser" label-width="0px" class="ms-content">
              <el-form-item prop="name">
                <el-input v-model="userInfo.name" placeholder="请输入用户名" prefix-icon="el-icon-user"> </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="userInfo.password"
                  @keyup.enter.native="submitForm('loginByUser')"
                  prefix-icon="el-icon-lock"
                  show-password
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="login-opsions">
                  <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                  <el-link :underline="false" icon="el-icon-question" @click="forgetPassword">忘记密码</el-link>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="login-btn">
                  <el-button type="primary" @click="submitForm('loginByUser')"> 登录 </el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <el-form :model="userInfo" :rules="rules" ref="loginByPhone" label-width="0px" class="ms-content">
              <!-- 这里进行表单验证prop所传入的名字，需要与v-model所绑定的属性名字相同 -->
              <el-form-item prop="number">
                <el-input v-model="userInfo.number" placeholder="请输入手机号" prefix-icon="el-icon-phone"> </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  class="code-input"
                  type="text"
                  placeholder="请输入验证码"
                  v-model="userInfo.code"
                  @keyup.enter.native="submitForm('loginByPhone')"
                  prefix-icon="el-icon-lock"
                >
                </el-input>
                <el-button @click="sendSms('login', userInfo.number)" :disabled="countNum !== 0" class="code-button">
                  {{ countNum !== 0 ? countNum + 's后重试' : '获取验证码' }}
                </el-button>
              </el-form-item>
              <el-form-item>
                <div class="login-opsions">
                  <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                  <el-link :underline="false" icon="el-icon-question " @click="unVertify">无法验证</el-link>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="login-btn">
                  <el-button type="primary" @click="submitForm('loginByPhone')">登录</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-row class="login-nav">
          <el-col :span="18">
            <el-col>
              <span>第三方登录：</span>
              <a href="javaScript:" @click="genOAuthUrl(params.GITEE)"
                ><img src="~assets/img/gitee-fill-round.svg" alt="" class="login-oAuth"
              /></a>
            </el-col>
          </el-col>
          <el-col class="to-register" :span="6">
            <el-link :underline="false" @click="toRegister">注册账户</el-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
<style >
.login-content .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 10px 77px 0 !important;
}
/* .login-content  */
</style>