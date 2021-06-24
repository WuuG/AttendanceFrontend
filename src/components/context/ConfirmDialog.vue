<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="400px">
    <slot name="content">
      <span>确认吗？</span>
    </slot>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleComfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认的标题'
    },
    visible: Boolean,
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