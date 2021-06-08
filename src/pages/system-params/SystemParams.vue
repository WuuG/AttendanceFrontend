
<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>系统参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-content">
      <header-bar @load="reset" @add-new="addDialogVisible = true"></header-bar>

      <el-row class="table">
        <el-table :data="sysParams" empty-text="暂时没有数据" @selection-change="selection" @selection-all="selectAll" v-loading="loading">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="code" label="配置标识" width="170px"> </el-table-column>
          <el-table-column prop="name" label="配置标题" width="100px" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="value" label="配置参数" width="75px"> </el-table-column>
          <el-table-column prop="paramType" label="参数类型" width="75px" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="description" label="参数描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="range" label="数值范围"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

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
      <edit-dialog :visible="editDialogVisible" @dialog-cancel="editDialogVisible = false" ref="editDialog"></edit-dialog>
      <add-dialog :visible="addDialogVisible" @dialog-cancel="addDialogVisible = false" @reset="reset" :datas="sysParams"> </add-dialog>
    </el-main>
  </div>
</template>

<script>
import { getParams } from 'network/systemParams';

import EditDialog from './child-comps/SysParamsDialog.vue';
import HeaderBar from './child-comps/SysParmasHeaderBar.vue';
import AddDialog from './child-comps/SysParamsAddDialog.vue';

export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      sysParams: [],
      activeSysParams: null,
      //判断是编辑还是新建。
      isEdit: false,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      editDialogVisible: false,
      addDialogVisible: false,
      loading: false
    };
  },
  components: {
    EditDialog,
    HeaderBar,
    AddDialog
  },
  created() {
    this.load(0, this.query.pageSize);
  },
  methods: {
    // 网络请求方法
    async getParams(curPage, pageSize) {
      const result = await getParams(curPage, pageSize);
      if (result.status !== 200) {
        this.$message({
          type: 'warning',
          message: `发生错误，错误码为${result.status}`
        });
        return null;
      }
      return result.data;
    },

    // 页面逻辑
    async load(curPage, pageSize) {
      this.loading = true;
      const result = await this.getParams(curPage, pageSize);
      console.log(result);
      this.sysParams = result.content;
      this.pageTotal = result.total;
      this.loading = false;
    },
    handleEdit(row) {
      this.activeSysParams = row;
      this.editDialogVisible = true;
      this.$refs.editDialog.form = { ...this.activeSysParams };
    },
    handleDelete(index, row) {
      this.sysParams.splice(index, 1);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    selectAll(sel) {
      console.log(sel);
    },
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.load(this.query.pageIndex, this.query.pageSize);
    },
    async reset() {
      await this.load(0, this.query.pageSize);
      this.$set(this.query, 'pageIndex', 1);
    }
  }
};
</script>
<style lang="less" scoped>
</style>