<template>
  <comfirm-dialog :visible="visible" @cancel="handleClose" @comfirm="handleComfirm">
    <template #content>
      <span> 确认删除此系统参数吗？ </span>
    </template>
  </comfirm-dialog>
</template>

<script>
import { deleteParam } from 'network/systemParams';

import ComfirmDialog from 'components/context/ConfirmDialog.vue';
export default {
  name: 'SystemDeleteDialog',
  data() {
    return {};
  },
  props: {
    visible: Boolean,
    code: {
      type: String,
      default: ''
    }
  },
  components: {
    ComfirmDialog
  },
  methods: {
    //网络请求
    async deleteParam(code) {
      try {
        const result = await deleteParam(code);
        console.log(result);
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
      this.$emit('cancel');
    },
    async handleComfirm() {
      const result = await this.deleteParam(this.code);
      this.handleClose();
      if (result) {
        this.$emit('reset');
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>