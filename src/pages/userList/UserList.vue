<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="success" plain @click="addDialogVisible = true">新增</el-button>
          <el-button @click="deleteSelectedItem">删除</el-button>
        </template>
        <template #right-content>
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.key"> </el-input>
          </el-col>
          <el-button @click="searchUser">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table :data="usersData" empty-text="暂时没有数据" @selection-change="selection" v-loading="tableLoading">
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column prop="loginName" label="用户名"> </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="realName" label="真实姓名"> </el-table-column>
          <el-table-column prop="avatar" label="用户头像" align="center">
            <template #default="scope">
              <template v-if="scope.row.avatar">
                <el-avatar :size="40" :src="baseURL + scope.row.avatar"></el-avatar>
              </template>
              <template v-else>
                <el-avatar :size="40">
                  <img src="~assets/img/img.jpeg" alt="" />
                </el-avatar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="id" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="gender" label="性别" show-overflow-tooltip> </el-table-column>
          <!-- <el-table-column prop="email" label="邮箱" show-overflow-tooltip> </el-table-column> -->
          <el-table-column prop="schoolMajorName" label="学校学院" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="roles" label="用户角色" show-overflow-tooltip>
            <template #default="scope">
              <span v-for="(role, index) in scope.row.roles" :key="index"> {{ role.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" plain @click="onDistribute(scope.row)">分配角色</el-button>
              <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-row>
        <el-col>
          <div class="pagination">
            <el-pagination
              background
              layout="total,-> ,prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <edit-dialog :visible.sync="editDialogVisible" :active="activeData" @submit="load"></edit-dialog>
    <role-dialog :visible.sync="roleDialogVisible" :active="activeData" @submit="load"></role-dialog>
    <add-dialog :visible.sync="addDialogVisible" @submit="load"></add-dialog>
  </div>
</template>

<script>
import { getUsers, UserQuery } from '../../network/auth/userList';
import CONST from '../../utils/const';

import HeaderBar from 'components/context/HeaderBar.vue';
import RoleDialog from './chil-comps/RoleDialog.vue';
const AddDialog = () => import('./chil-comps/AddDialog.vue');
const EditDialog = () => import('./chil-comps/EditDialog.vue');

export default {
  name: 'UserList',
  data() {
    return {
      // 表格页面pagenation的参数
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      usersData: [],
      tableLoading: false,
      active: null,
      // 通信数据
      editDialogVisible: false,
      roleDialogVisible: false,
      addDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    EditDialog,
    RoleDialog
  },
  computed: {
    baseURL() {
      return CONST.IMG_BASEURL;
    },
    activeData() {
      return this.active ? { ...this.active } : null;
    }
  },
  created() {
    this.load();
  },
  methods: {
    // 网络方法
    async getUsers(query) {
      try {
        const params = new UserQuery(query);
        const result = await getUsers(params);
        if (result.status === 200) {
          return result.data;
        }
        return null;
      } catch (error) {
        console.error(`get users error:${error}`);
      }
    },
    // 页面逻辑
    async load() {
      this.tableLoading = true;
      const result = await this.getUsers(this.query);
      this.tableLoading = false;
      if (!result) return;
      this.usersData = result.content;
      this.pageTotal = result.total;
    },
    // 组件通信方法
    onDistribute(row) {
      this.active = row;
      this.roleDialogVisible = true;
    },
    onEdit(row) {
      this.active = row;
      this.editDialogVisible = true;
    },
    onDelete(row) {
      this.active = row;
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    // 删除已选
    deleteSelectedItem() {},
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
    },
    searchUser() {
      this.query.pageIndex = 1;
      this.load();
    },

    reset() {
      this.query.key = '';
      this.query.pageIndex = 1;
      this.load();
    }
  }
};
</script>
<style lang="less" scoped>
</style>