<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="primary" @click="toRole">
            <i class="el-icon-arrow-left"></i>
            返回
          </el-button>
        </template>
        <template #right-content>
          <div></div>
        </template>
      </header-bar>

      <el-row class="role-table">
        <role-table></role-table>
      </el-row>
    </el-main>

    <el-main class="main-content">
      <user-table :roleId="id"></user-table>
    </el-main>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import RoleTable from './child-comps/RoleTable.vue';
import UserTable from './child-comps/UsersTable.vue';

export default {
  name: 'BaseTable',
  data() {
    return {};
  },
  components: {
    HeaderBar,
    RoleTable,
    UserTable
  },
  props: { id: String },
  methods: {
    // 组件通信
    toRole() {
      this.$router.push({
        name: 'role'
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main-content {
  &:first-of-type {
    margin-bottom: 10px;
  }
  .role-table {
    margin-top: 10px;
  }
}
</style>