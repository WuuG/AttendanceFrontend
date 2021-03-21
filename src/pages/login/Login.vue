<template>
    <div class="login-wrap">
        <div class="login-bg">
            <div class="ms-login">
                <div class="ms-title" @click="reload">
                    <img src="~img/logo-1.png" alt="" />
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="账户密码登录" name="first">
                        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                            <el-form-item prop="username">
                                <el-input v-model="param.username" placeholder="username" prefix-icon="el-icon-user"> </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    type="password"
                                    placeholder="password"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                                    prefix-icon="el-icon-lock"
                                    show-password
                                >
                                </el-input>
                            </el-form-item>

                            <div class="login-opsions">
                                <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                                <el-link :underline="false" icon="el-icon-question ">忘记密码</el-link>
                            </div>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm()">登录</el-button>
                            </div>
                            <p class="login-tips">Tips : 用户名和密码随便填。</p>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" name="second">
                        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                            <el-form-item>
                                <el-input v-model="param.phoneNumber" placeholder="请输入手机号" prefix-icon="el-icon-phone"> </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input
                                    class="code-input"
                                    type="password"
                                    placeholder="请输入验证码"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                                    prefix-icon="el-icon-lock"
                                    show-password
                                >
                                </el-input>
                                <el-button>验证</el-button>
                            </el-form-item>

                            <div class="login-opsions">
                                <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                                <el-link :underline="false" icon="el-icon-question ">忘记密码</el-link>
                            </div>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm()">登录</el-button>
                            </div>
                            <p class="login-tips">Tips : 用户名和密码随便填。</p>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            param: {
                username: 'admin',
                password: '123123',
                phoneNumber: '',
                code: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            activeName: 'first',
            autoLogin: false
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        reload() {
            this.$router.go(0);
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/loginWeb.jpg) no-repeat;
    background-size: cover;
}
.login-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    width: 350px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
}
.ms-title {
    margin-top: 22px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: black;
    border-bottom: 1px solid #ddd;
}
.ms-title img {
    width: 60%;
}

.ms-content {
    padding: 30px 30px;
}
.login-opsions {
    margin-bottom: 10px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.code-input {
    width: 75%;
}
</style>
<style >
.el-tabs .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 10px 77px 0;
}
.el-tabs__content {
    height: 270px;
}
.login-opsions [class*=' el-icon-'],
[class^='el-icon-'] {
    float: right;
}
.login-opsions .el-link.el-link--default {
    float: right;
    margin-right: 10px;
}
.el-input__icon {
    font-size: 20px;
}
.el-input--prefix .el-input__inner {
    padding-left: 40px;
}
</style>