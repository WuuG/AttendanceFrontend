<template>
  <div class="passport-bg">
    <div class="passport-mask-login">
      <div class="passport-login">
        <div class="passport-title" @click="reload">
          <img src="~img/logo-1.png" alt="" />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    reload() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>
.passport-bg {
  width: 100%;
  height: 100%;
  background: url(~img/loginWeb.jpg);
  background-size: cover;
}
/* 背景的遮罩层 */
.passport-mask-login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 397px;
  height: 480px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
}
.passport-login {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
}
.passport-title {
  margin: 22px 0 20px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}
.passport-title img {
  width: 60%;
  vertical-align: top;
}
</style>
