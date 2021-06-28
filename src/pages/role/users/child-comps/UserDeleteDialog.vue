<template>
  <el-dialog title="移除用户" :visible.sync="visible" :before-close="handleClose" width="400px" @open="open">
    <span>确定移除 {{ name }} 吗?</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteRoleUser } from '../../../../network/auth/role';
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean,
    active: Object,
    roleId: String
  },
  computed: {
    name() {
      return this.active.loginName ? this.active.loginName : this.active.phone;
    }
  },
  methods: {
    // 网络方法
    async deleteRoleUser(form) {
      try {
        const res = await deleteRoleUser(form);
        console.log(res);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: `成功删除 ${this.name} !`
        });
        return true;
      } catch (error) {
        console.error(`delete role user error ${error}`);
      }
      return false;
    },
    // 通信方法
    handleClose() {
      this.$emit('update:visible', false);
      this.loading = false;
    },
    async handleComfirm() {
      this.loading = true;
      console.log({ ...this.active });
      const result = await deleteRoleUser({ ...this.active });
      console.log('🚀 ~ file: UserDeleteDialog.vue ~ line 55 ~ handleComfirm ~ result', result);
      if (!result) {
        this.loading = false;
        return;
      }
      this.$emit('comfirm');
      this.handleClose();
    },
    open() {
      this.active.roleId = this.roleId;
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>