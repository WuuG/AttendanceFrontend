
<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>系统参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar @load="reset" @add-new="handleAdd" :params="selectParamsCode"></header-bar>

      <el-row class="table">
        <el-table :data="sysParams" empty-text="暂时没有数据" @selection-change="selection" v-loading="loading">
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
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

      <form-dialog
        :visible="formDialogVisible"
        @cancel="formDialogVisible = false"
        @reset="reset"
        :datas="sysParams"
        :isEdit="isEdit"
        ref="editDialog"
      >
      </form-dialog>

      <delete-dialog
        :visible="deleteDialogVisible"
        @cancel="deleteDialogVisible = false"
        :code="activeSysParams ? activeSysParams.code : null"
        @reset="reset"
      ></delete-dialog>
    </el-main>
  </div>
</template>

<script>
import { getParams } from 'network/systemParams';

import HeaderBar from './child-comps/HeaderBar.vue';
import FormDialog from './child-comps/FormDialog.vue';
import DeleteDialog from './child-comps/DeleteDialog.vue';

export default {
  name: 'SysParams',
  data() {
    return {
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      sysParams: [],
      // 活跃的系统参数，用以传入formDialog组件
      activeSysParams: null,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      // 页面获取数据时动画显示
      loading: false,
      // Dialog的相关
      formDialogVisible: false,
      deleteDialogVisible: false,
      isEdit: null,
      // 选择的参数,用于传入headerbar组件
      selectParamsCode: []
    };
  },
  components: {
    HeaderBar,
    FormDialog,
    DeleteDialog
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
    // 获取table的数据
    async load(curPage, pageSize) {
      this.loading = true;
      const result = await this.getParams(curPage, pageSize);
      this.sysParams = result.content;
      this.pageTotal = result.total;
      this.loading = false;
    },
    //选择时，将被选择的表项记录下来。
    selection(selectParams) {
      this.selectParamsCode = selectParams.map((param) => param.code);
    },

    handleAdd() {
      this.isEdit = false;
      this.formDialogVisible = true;
    },
    // 编辑时修改子组件数据：form和editCode
    handleEdit(row) {
      this.isEdit = true;
      this.activeSysParams = row;
      this.formDialogVisible = true;
      this.$refs.editDialog.form = { ...this.activeSysParams };
      this.$refs.editDialog.editCode = this.activeSysParams.code;
    },
    handleDelete(row) {
      this.activeSysParams = row;
      this.deleteDialogVisible = true;
    },
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.load(this.query.pageIndex, this.query.pageSize);
    },
    async reset() {
      await this.load(this.query.pageIndex, this.query.pageSize);
    }
  }
};
</script>
<style lang="less" scoped>
</style>