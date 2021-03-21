<template>
    <div class="login-wrap">
        <div class="login-bg">
            <div class="ms-login">
                <div class="ms-title" @click="reload">
                    <img src="~img/logo-1.png" alt="" />
                </div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="账户密码登录" name="first">
                        <el-form :model="userInfo" :rules="rules" ref="loginByUser" label-width="0px" class="ms-content">
                            <el-form-item prop="username">
                                <el-input v-model="userInfo.username" placeholder="请输入用户名" prefix-icon="el-icon-user"> </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    type="password"
                                    placeholder="请输入密码"
                                    v-model="userInfo.password"
                                    @keyup.enter.native="submitForm()"
                                    prefix-icon="el-icon-lock"
                                    show-password
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="login-opsions">
                                    <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                                    <el-link :underline="false" icon="el-icon-question ">忘记密码</el-link>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <div class="login-btn">
                                    <el-button type="primary" @click="submitForm('loginByUser')"> 登录 </el-button>
                                </div>
                            </el-form-item>

                            <p class="login-tips">Tips : 用户名和密码随便填。</p>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" name="second">
                        <el-form :model="userInfo" :rules="rules" ref="loginByPhone" label-width="0px" class="ms-content">
                            <el-form-item prop="phone">
                                <el-input v-model="userInfo.phoneNumber" placeholder="请输入手机号" prefix-icon="el-icon-phone"> </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input
                                    class="code-input"
                                    type="text"
                                    placeholder="请输入验证码"
                                    v-model="code"
                                    @keyup.enter.native="submitForm()"
                                    prefix-icon="el-icon-lock"
                                >
                                </el-input>
                                <el-button @click="countdown(60)" :disabled="countNum !== 0" class="code-button">
                                    {{ countNum !== 0 ? countNum + 's后重试' : '验证' }}
                                </el-button>
                            </el-form-item>

                            <div class="login-opsions">
                                <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                                <el-link :underline="false" icon="el-icon-question ">忘记密码</el-link>
                            </div>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm('loginByPhone')">登录</el-button>
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
        //这里是elment当中进行表单验证的写法，特别有意思
        var validateUserName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不可为空'));
            } else if (!/^[a-z]+$/.test(value)) {
                return callback(new Error('用户名需要由字母组成'));
            } else {
                callback();
            }
        };
        return {
            countNum: 0,
            code: '',
            userInfo: {
                username: '',
                password: '',
                phoneNumber: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateUserName
                    }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                code: [{ required: true, message: '请输入六位验证码', trigger: 'blur' }]
            },
            activeName: 'first',
            autoLogin: false
        };
    },
    methods: {
        submitForm(formName) {
            console.log(this.$refs[formName].validate);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        reload() {
            this.$router.go(0);
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
    width: 65%;
}
.code-button {
    float: right;
    width: 30%;
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