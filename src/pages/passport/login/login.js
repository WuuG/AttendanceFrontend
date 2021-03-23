export default {
    data: function () {
        //这里是elment当中进行表单验证的写法，特别有意思
        // 用户名验证
        const validateUserName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不可为空'));
            } else if (!/^[A-Za-z_@.][A-Za-z_@.0-9]{5,9}$/.test(value)) {
                return callback(new Error('6-10位之间的字母、下划线、@、.，不能以数字开头'));
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
        const validatePassword = (rule, value, callback) => {
            // 最短6位，最长16位 {6,16}
            // 可以包含小写大母 [a-z] 和大写字母 [A-Z]
            // 可以包含数字 [0-9]
            // 可以包含下划线 [ _ ] 和减号 [ - ]
            const patter = /^[\w_-]{6,16}$/;
            if (!value) {
                return callback(new Error('密码不可为空'))
            } else if (!patter.test(value)) {
                return callback(new Error('密码在6-16位之间，请不要输入特殊符号。'))
            } else {
                return callback();
            }
        }
        return {
            countNum: 0,
            userInfo: {
                name: '',
                password: '',
                number: '',
                code: '',

            },
            rules: {
                name: [{ required: true, trigger: 'blur', validator: validateUserName }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                number: [{ required: true, trigger: 'blur', validator: validatePhone }],
                code: [{ required: true, message: '请输入六位验证码', trigger: 'blur' }]
            },
            activeName: 'first',
            autoLogin: false,
        };
    },
    methods: {
        //登录按钮提交功能
        submitForm(formName) {
            const userInfo = this.userInfo  // 这里需要先获取this的数据，在进入elment的表单验证后，this指针变动就无法找到这个组件中的数据啦。

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '登陆成功，欢迎您！',
                        type: 'success'
                    });
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); //序列化
                    this.$store.commit('updateUserInfo')
                    this.$router.replace('/dashboard')
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
        },
        //忘记密码。跳出弹窗，提示使用手机验证码登录
        forgetPassword() {
            this.$message({
                message: '请使用手机登录，并在个人设置修改密码！',
                type: 'warning',
                showClose: true,
            })
        },
        //无法使用手机验证，请联系管理员。
        unVertify() {
            this.$message({
                message: '无法使用手机验证，请联系管理员。(tel:+86-15032332240)',
                type: 'warning',
                showClose: true,
            })
        }
    }
};