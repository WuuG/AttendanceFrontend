import { sendRegisterSms } from 'network/passport'

export const sms = {
  data() {
    return {
      sendSmsBtnDisable: true,
    }
  },
  methods: {
    sendSms(type, phoneNum) {
      if (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(phoneNum)) {
        this.$message({ type: 'warning', message: '请输入正确的手机号' });
      } else {
        this.countdown(60);
        sendRegisterSms(type, phoneNum)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
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
  },
}