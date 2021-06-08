<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose">
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
    visible: Boolean
  },
  methods: {
    handleClose() {
      this.$emit('dialog-cancel');
    },
    handleComfirm() {
      this.$emit('comfirm');
    }
  }
};
</script>

<style lang="less" scoped>
</style>