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
        if (result.status !== 200) return;
        this.$message({
          type: 'success',
          message: `成功删除${this.organization.name}`
        });
      } catch (error) {}
    },
    cancel() {
      this.$emit('cancel');
    },
    async comfirm() {
      await this.deleteOrganization(this.organization.id);
      this.$emit('comfirm');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>