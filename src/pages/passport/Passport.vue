<template>
  <div class="passport-bg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.passport-bg {
  width: 100%;
  height: 100%;
  background: url(~img/loginWeb.jpg);
  background-size: cover;
}
</style>