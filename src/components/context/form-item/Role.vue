<template>
  <el-select :value="value" placeholder="请选择身份" multiple filterable collapse-tags @input="change">
    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import { getRole } from '../../../network/auth/role';

export default {
  name: 'Role',

  data() {
    return {
      roleOptions: []
    };
  },
  props: {
    value: Array
  },
  created() {
    this.getRoleOptions();
  },
  methods: {
    // 网络方法
    async getRole() {
      try {
        const res = await getRole();
        if (res.status !== 200) {
          return null;
        }
        return res.data;
      } catch (error) {
        console.error(`get role error:${error}`);
      }
    },
    // 获取角色选择器的options
    async getRoleOptions() {
      const result = await this.getRole();
      this.roleOptions = result.map((x) => {
        return {
          value: x.id,
          label: x.name,
          code: x.code
        };
      });
    },
    change(e) {
      this.$emit('input', e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>