<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="addNewDialogVsible = true">新增</el-button>
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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="loginName" label="昵称"> </el-table-column>
          <el-table-column prop="realName" label="真实姓名"> </el-table-column>
          <el-table-column prop="avatar" label="用户头像" align="center">
            <template #default="scope">
              <template v-if="scope.row.avatar">
                <el-avatar :size="40" :src="avatarSrc(scope.row.avatar)" @error="true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </template>
              <template v-else>
                <el-avatar :size="40">
                  <img src="~assets/img/img.jpeg" alt="" />
                </el-avatar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="schoolMajor" label="学校学院" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getUsers, UserQuery } from '../../network/auth/userList';
import CONST from '../../utils/const';

import HeaderBar from 'components/context/HeaderBar.vue';

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
      tableLoading: false
    };
  },
  components: {
    HeaderBar
  },
  computed: {
    avatarSrc() {
      return function (src) {
        const imgSrc = CONST.IMG_BASEURL + src;
        return imgSrc;
      };
    }
  },
  created() {
    this.load();
  },
  activated() {
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
    onEdit(index, row) {
      console.log(index, row);
    },
    onDelete(index, row) {
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