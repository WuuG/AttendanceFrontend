<template>
  <el-dialog title="删除用户" :visible.sync="visible" width="400px">
    <span>确定删除 {{ name }} 吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    handleClose() {
      this.$emit('update:visibel', false);
    },
    handleComfirm() {
      this.loading = true;
      this.$emit('comfirm');
      this.handleClose();
      this.loading = false;
    },
    open() {
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>

</style>