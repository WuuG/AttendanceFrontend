<template>
  <el-dialog title="删除组织" :visible.sync="visible" width="400px" @open="open">
    <span>确定删除 {{ name }} 吗？</span>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="danger" @click="comfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>



<script>
import { deleteOrganization } from 'network/auth/organization';

export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    organization: Object,
    visible: Boolean
  },
  computed: {
    name() {
      return this.organization ? this.organization.name : {};
    }
  },
  methods: {
    // 网络方法
    async deleteOrganization(id) {
      try {
        const result = await deleteOrganization(id);
        if (result.status !== 200) return false;
        this.$message({
          type: 'success',
          message: `成功删除${this.organization.name}`
        });
        return true;
      } catch (error) {
        console.error(`delete organization error:${error}`);
      }
    },
    async comfirm() {
      this.loading = true;
      await this.submitDelteOrg();
      this.loading = false;
    },
    async submitDelteOrg() {
      const result = await this.deleteOrganization(this.organization.id);
      if (!result) return;
      this.$emit('comfirm');
      this.cancel();
    },
    open() {
      this.loading = false;
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>