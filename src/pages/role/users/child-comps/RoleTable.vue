<template>
  <div>
    <el-table :data="data" empty-text="暂时没有数据" v-loading="tableLoading" row-key="id">
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="code" label="权限标识" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template v-slot:default="scope">
          <el-button size="mini" type="primary" plain @click="menuCtrl(scope.row)">菜单权限</el-button>
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog
      :visible="editDialogVisible"
      :active="activeData"
      @cancel="editDialogVisible = false"
      @submit="modifyRole"
      :request="patchRole"
    ></edit-dialog>
    <role-menu-dialog :visible.sync="roleMenuDialogVisible" :roleId="roleId"></role-menu-dialog>
  </div>
</template>

<script>
import { setLocalStorge, getLocalStorge, KEY } from 'utils/localStorge';
import { patchRole } from 'network/auth/role';

import EditDialog from '../../common/RoleFormDialog.vue';
import RoleMenuDialog from './RoleMenuDialog.vue';

export default {
  name: 'RoleTable',
  data() {
    return {
      data: [],
      tableLoading: false,
      //通信数据
      active: null,
      editDialogVisible: false,
      roleMenuDialogVisible: false
    };
  },
  components: {
    EditDialog,
    RoleMenuDialog
  },
  computed: {
    activeData() {
      return this.active ? { ...this.active } : null;
    },
    roleId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.load();
  },
  methods: {
    // 网络请求
    async patchRole(form) {
      try {
        const res = await patchRole(form);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '成功修改角色！'
        });
        return true;
      } catch (error) {
        console.error(`post role error: ${error}`);
      }
    },
    // 页面逻辑
    load() {
      const result = getLocalStorge(KEY.ROLE);
      this.data = [result];
    },
    onEdit(row) {
      this.editDialogVisible = true;
      this.active = row;
    },
    modifyRole(form) {
      setLocalStorge(KEY.ROLE, form);
      this.load();
    },
    menuCtrl(row) {
      this.active = row;
      this.roleMenuDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>