<template>
  <el-dialog title="删除系统参数" :visible.sync="visible" width="400px" :before-close="handleClose">
    <span>确定删除选择的系统参数吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'SystemDeleteDialog',
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    //页面逻辑
    handleClose() {
      this.$emit('update:visible', false);
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

