<template>
  <el-dialog title="删除菜单项" :visible.sync="visible" :before-close="handleClose" width="400px" @open="open">
    <span>确定删除 {{ activeMenu.title }} 吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteMenu } from '../../../network/auth/menuCtrl';
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean,
    activeMenu: Object
  },
  methods: {
    // 网络方法
    async deleteMenu(id) {
      try {
        const res = await deleteMenu(id);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
        return true;
      } catch (error) {
        console.error(`delete menu error: ${error}`);
      }
    },
    // 逻辑方法
    handleClose() {
      this.$emit('cancel');
    },
    async handleComfirm() {
      this.loading = true;
      await this.submitDelete();
      this.loading = false;
    },
    open() {
      this.loading = false;
    },
    async submitDelete() {
      const result = await this.deleteMenu(this.activeMenu.id);
      if (!result) return;
      this.$emit('comfirm');
      this.handleClose();
    }
  }
};
</script>

<style lang="less" scoped>
</style>