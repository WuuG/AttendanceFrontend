<template>
  <!-- <el-dialog title="删除系统参数" :visible.sync="visible" width="400px" @open="open" :before-close="handleClose"> -->
  <el-dialog title="删除系统参数" :visible.sync="visible" width="400px" :before-close="handleClose">
    <span>确定删除 {{ code }} 吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteParam } from 'network/systemParams';

export default {
  name: 'SystemDeleteDialog',
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean,
    code: {
      type: String,
      default: ''
    }
  },
  methods: {
    //网络请求
    async deleteParam(code) {
      try {
        const result = await deleteParam(code);
        switch (result.status) {
          case 200:
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            return true;
        }
        return false;
      } catch (error) {
        console.error(`deleteParam network request error ${error}`);
      }
    },
    //页面逻辑
    handleClose() {
      this.$emit('update:visible', false);
    },
    async handleComfirm() {
      this.loading = true;
      await this.submitDeleteParam();
      this.loading = false;
    },
    // open() {
    //   this.loading = false;
    // },
    async submitDeleteParam() {
      const result = await this.deleteParam(this.code);
      if (!result) return;
      this.handleClose();
      this.$emit('reset');
    }
  }
};
</script>

<style lang="less" scoped>

</style>
