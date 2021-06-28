<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="400px" @open="open">
    <slot name="content">
      <span>暂时还没有做</span>
    </slot>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleComfirm" :loading="loading">确定</el-button>
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
    title: {
      type: String,
      default: '还没有做，对不起'
    },
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
    },
    open() {
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>