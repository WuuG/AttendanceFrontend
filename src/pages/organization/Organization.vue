<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织架构</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="addNewDialogVsible = true">新增组织</el-button>
          <el-button @click="deleteSelectedItem">删除</el-button>
        </template>
        <template #right-content>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table
          :data="data"
          empty-text="暂时没有数据"
          @selection-change="selection"
          v-loading="tableLoading"
          row-key="id"
          lazy
          :load="loadOrganization"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="学校名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="childrenCount" label="子节点数量" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="showAddDialog(scope.row)">编辑</el-button>
              <el-button size="mini" @click="showEditDialog(scope.row)">添加</el-button>
              <el-button size="mini" type="danger" @click="showDeleteDialog(scope.$index, scope.row)">删除</el-button>
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
import { getOrganization, getSchools } from '../../network/auth/organization';

import HeaderBar from 'components/context/HeaderBar.vue';
export default {
  name: 'DataDictionary',
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
      initId: 1,
      tableLoading: false,
      activeOrganization: null,
      activeTree: null,
      activeResolve: null
    };
  },
  components: {
    HeaderBar
  },
  created() {
    this.load();
  },
  methods: {
    async getOrganization(id) {
      try {
        const result = await getOrganization(id);
        return result.data.children;
      } catch (error) {
        console.error(`get organization error:${error}`);
      }
    },
    async getSchools(curPage, pageSize, form) {
      try {
        const result = await getSchools(curPage, pageSize, form);
        return result.data.childrenWrapper;
      } catch (error) {
        console.error(`get schools error:${error}`);
      }
    },
    // 组件通信
    showAddDialog(row) {
      this.activeOrganization = row;
    },
    showEditDialog(row) {},
    showDeleteDialog(index, row) {
      console.log(index, row);
    },
    // 页面逻辑
    async load() {
      this.tableLoading = true;
      const result = await this.getSchools(this.query.pageIndex, this.query.pageSize);
      this.tableLoading = false;
      this.data = result.content;
      this.data = this.setHasChildrenFlag(this.data);
      this.pageTotal = result.total;
    },
    async loadOrganization(tree, treeNode, resolve) {
      this.activeTree = tree;
      this.activeResolve = resolve;
      const result = await this.getOrganization(tree.id);
      const children = this.setHasChildrenFlag(result);
      resolve(children);
    },
    setHasChildrenFlag(data) {
      const temp = Array.from(data);
      temp.forEach((school) => {
        if (school.childrenCount > 0) {
          school.hasChildren = true;
        }
      });
      return temp;
    },
    async reloadOrganization() {
      const result = await this.getOrganization(this.activeTree.id);
      const children = this.setHasChildrenFlag(result);
      this.activeResolve(children);
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
</style>