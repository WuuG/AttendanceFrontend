<template>
  <div class="passport-bg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.passport-bg {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(~img/loginWeb.jpg);
  background-size: cover;
}
/* 背景的遮罩层 */
</style>
<style>
.passport-bg .el-input--small .el-input__inner {
  margin-bottom: 6px;
}
</style>