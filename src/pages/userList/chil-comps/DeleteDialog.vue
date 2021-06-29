<template>
  <el-dialog title="删除用户" :visible.sync="visible" width="400px" @open="open">
    <span>确定删除 {{ name }} 吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteUser } from '../../../network/auth/userList';
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
      if (this.active) {
        return this.active.loginName ? this.active.loginName : this.active.phone;
      }
      return null;
    }
  },
  methods: {
    // 网络方法
    async deleteUser(uid) {
      try {
        const res = await deleteUser(uid);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '用户删除成功!'
        });
        return true;
      } catch (error) {
        console.error(`delete user error: ${error}`);
      }
    },
    // 组件逻辑
    async handleComfirm() {
      this.loading = true;
      await this.submitDeleteReq();
      this.loading = false;
    },
    // 进行网络请求
    async submitDeleteReq() {
      const result = await this.deleteUser(this.active.id);
      if (!result) return;
      this.$emit('comfirm');
      this.handleClose();
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    open() {
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>