<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="400px" @open="open">
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
  data() {
    return {
      disable: false
    };
  },
  props: {
    title: {
      type: String,
      default: '默认的标题'
    },
    visible: Boolean
  },
  methods: {
    handleClose() {
      this.$emit('cancel');
    },
    handleComfirm() {
      this.disable = true;
      this.$emit('comfirm');
      this.handleClose();
    },
    open() {
      this.disable = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>