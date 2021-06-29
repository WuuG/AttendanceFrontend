<template>
  <el-dialog title="删除角色" :visible.sync="visible" :before-close="handleClose" width="400px" @open="open" @closed="closed">
    <slot name="content">
      <span>确认删除 {{ name }} 吗？</span>
    </slot>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteRole } from 'network/auth/role';
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean,
    active: Object
  },
  computed: {
    name() {
      return this.active ? this.active.name : '';
    }
  },
  methods: {
    // 网络方法
    async deleteRole(id) {
      try {
        const res = await deleteRole(id);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: `删除 ${this.active.name} 成功!`
        });
        return true;
      } catch (error) {
        console.error(`delete role error: ${error}`);
      }
    },
    // 页面逻辑
    handleClose() {
      this.$emit('cancel');
    },
    async handleComfirm() {
      this.loading = true;
      await this.submitDeleteRole();
      this.loading = false;
    },
    async submitDeleteRole() {
      const result = await deleteRole(this.active.id);
      if (!result) return;
      this.$emit('comfirm');
      this.handleClose();
    },
    open() {
      this.loading = false;
    },
    closed() {
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>