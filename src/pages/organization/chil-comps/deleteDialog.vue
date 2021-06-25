<template>
  <comfirm-dialog title="删除组织" @cancel="cancel" @comfirm="comfirm" :visible="visible">
    <template #content>
      <span>确认删除{{ organization.name }}吗</span>
    </template>
  </comfirm-dialog>
</template>

<script>
import { deleteOrganization } from 'network/auth/organization';
import comfirmDialog from 'components/context/ConfirmDialog.vue';

export default {
  components: {
    comfirmDialog
  },
  props: {
    organization: Object,
    visible: Boolean
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
    cancel() {
      this.$emit('cancel');
    },
    async comfirm() {
      this.$emit('before-comfirm', true);
      const result = await this.deleteOrganization(this.organization.id);
      if (!result) {
        this.$emit('before-comfirm', false);
        return;
      }
      this.$emit('comfirm');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>