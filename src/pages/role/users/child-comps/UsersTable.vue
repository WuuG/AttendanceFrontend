<template>
  <div>
    <header-bar>
      <template #left-content>
        <div class="title">用户列表</div>
        <el-button @click="addDialogVisible = true" type="success" plain>新增</el-button>
        <el-button @click="deleteSelectedItem" type="danger">移除</el-button>
      </template>
      <template #right-content>
        <el-col>
          <el-input prefix-icon="el-icon-search" v-model="query.key"> </el-input>
        </el-col>
        <el-button @click="search">搜索</el-button>
        <el-button @click="load">重置</el-button>
      </template>
    </header-bar>

    <el-row class="table">
      <el-table :data="data" empty-text="暂时没有数据" @selection-change="selection" v-loading="tableLoading">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="loginName" label="用户名" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="id" label="用户id" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template v-slot:default="scope">
            <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">移除</el-button>
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
    <add-dialog :visible.sync="addDialogVisible" :roleId="roleId" @submit="load"></add-dialog>
  </div>
</template>

<script>
import { getRoleUsers } from '../../../../network/auth/role';
import { Query } from 'network/common';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './AddDialog.vue';
export default {
  name: 'UsersTable',
  data() {
    return {
      // 表格页面pagenation的参数
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      data: [],
      tableLoading: false,
      // 通信数据
      addDialogVisible: false
    };
  },
  props: {
    roleId: String
  },
  components: {
    HeaderBar,
    AddDialog
  },
  created() {
    this.load();
  },
  methods: {
    // 网络方法
    async getRoleUsers(id, form) {
      try {
        const res = await getRoleUsers(id, form);
        if (res.status !== 200) return null;
        return res.data;
      } catch (error) {
        console.error(`get role users error:${error}`);
      }
    },
    // 页面逻辑
    async load() {
      const query = new Query(this.query);
      this.tableLoading = true;
      const result = await this.getRoleUsers(this.roleId, query);
      this.tableLoading = false;
      this.data = result.content;
      this.pageTotal = result.total;
    },
    search() {
      this.query.pageIndex = 1;
      this.load();
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
      this.load();
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  display: inline;
  line-height: 32px;
  padding-right: 10px;
}
</style>