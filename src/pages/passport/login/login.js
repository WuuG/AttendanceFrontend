export default {
  data: function () {
    //这里是elment当中进行表单验证的写法，特别有意思
    // 用户名验证
    const validateUserName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('用户名不可为空'));
        } else if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
            return callback(new Error('用户名在4-16位之间（字母，数字，下划线，减号）'));
        } else {
            callback();
        }
    };
    //手机号验证
    const validatePhone = (rule, value, callback) => {
        const pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        if (!value) {
            return callback(new Error('手机号不可为空'));
        } else if (!pattern.test(value)) {
            return callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    };
    //密码验证
    const validatePassword = (rule,value,callback)=> {
        // 最短6位，最长16位 {6,16}
        // 可以包含小写大母 [a-z] 和大写字母 [A-Z]
        // 可以包含数字 [0-9]
        // 可以包含下划线 [ _ ] 和减号 [ - ]
        const patter = /^[\w_-]{6,16}$/;
        if(!value ) {
            return callback(new Error('密码不可为空'))
        }else if(!patter.test(value)) {
            return callback(new Error('密码在6-16位之间，请不要输入特殊符号。'))
        }else {
            return callback();
        }
    }
    return {
        countNum: 0,
        code: '',
        userInfo: {
            userName: '',
            password: '',
            phoneNumber: ''
        },
        rules: {
            userName: [{ required: true, trigger: 'blur', validator: validateUserName }],
            password: [{ required: true, trigger: 'blur', validator:validatePassword }],
            phoneNumber: [{ required: true, trigger: 'blur', validator: validatePhone }],
            code: [{ required: true, message: '请输入六位验证码', trigger: 'blur' }]
        },
        activeName: 'first',
        autoLogin: false
    };
},
methods: {
    //登录按钮提交功能
    submitForm(formName) {
        console.log(this.$refs[formName].validate);
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$message({
                    message : '登陆成功，欢迎您！',
                    type: 'success'
                });
                this.$store.commit('addAccount',{userName:this.userName,phoneNumber:this.phoneNumber})
                this.$router.replace('./')
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
    //验证码倒计时
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
    },
    toRegister() {
        this.$router.replace('/passport/register')
    }
}
};