<template>
  <comfirm-dialog :visible="visible" @dialog-cancel="handleClose" @comfirm="handleComfirm">
    <template #content>
      <span> 确认删除此系统参数吗？ </span>
    </template>
  </comfirm-dialog>
</template>

<script>
// import moduleName from '../../../network/systemParams';

import ComfirmDialog from 'components/context/ConfirmDialog.vue';
export default {
  name: 'SystemDeleteDialog',
  data() {
    return {};
  },
  props: {
    visible: Boolean
  },
  components: {
    ComfirmDialog
  },
  methods: {
    handleClose() {
      this.$emit('dialog-cancel');
    },
    handleComfirm() {
      console.log(1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>