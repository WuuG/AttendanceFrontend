<template>
  <el-table :data="data" empty-text="暂时没有数据" v-loading="tableLoading" row-key="id">
    <el-table-column prop="name" label="角色名称"> </el-table-column>
    <el-table-column prop="code" label="权限标识" show-overflow-tooltip> </el-table-column>
    <el-table-column label="操作" width="80" align="center">
      <template v-slot:default="scope">
        <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getLocalStorge, KEY } from 'utils/localStorge';

export default {
  name: 'RoleTable',
  data() {
    return {
      data: [],
      tableLoading: false
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      const result = getLocalStorge(KEY.ROLE);
      this.data = [result];
    },
    onEdit() {}
  }
};
</script>

<style lang="scss" scoped>
</style>