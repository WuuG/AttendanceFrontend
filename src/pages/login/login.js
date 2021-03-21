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
        console.log(value);

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
        if(!value ) {
            return callback()
        }
    }
    return {
        countNum: 0,
        code: '',
        userInfo: {
            username: '',
            password: '',
            phoneNumber: ''
        },
        rules: {
            username: [{ required: true, trigger: 'blur', validator: validateUserName }],
            password: [{ required: true, trigger: 'blur', validator:validatePassword }],
            phoneNumber: [{ required: true, trigger: 'blur', validator: validatePhone }],
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