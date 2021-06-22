<template>
  <el-dialog title="删除字典明细" :visible.sync="visible" :before-close="handleClose" width="400px">
    <span>确认删除字典明细吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleComfirm" :disabled="disable">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    activeIndex: Number,
    disable: Boolean
  },
  methods: {
    handleClose() {
      this.$emit('cancel');
    },
    handleComfirm() {
      this.$emit('comfirm');
      this.handleClose();
    }
  }
};
</script>

<style lang="less" scoped>
</style>