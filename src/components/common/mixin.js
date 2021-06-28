import { sendRegisterSms } from 'network/passport'
import CONST from '../../utils/const';

export const sms = {
  data() {
    return {
      sendSmsBtnDisable: true,
    }
  },
  methods: {
    async sendSms(type, phoneNum) {
      if (!CONST.RE.PHONE_NUM.test(phoneNum)) {
        this.$message({ type: 'warning', message: '请输入正确的手机号' });
      } else {
        this.countdown(60);
        try {
          const res = await sendRegisterSms(type, phoneNum)
          console.log(res);
        } catch (error) {
          console.error(`send sms error: ${error}`);
        }
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