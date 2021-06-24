<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="9" :xs="20" :sm="12" :md="9" :lg="10">
          <el-button @click="toAddDic">新增</el-button>
          <el-button>批量删除</el-button>
        </el-col>
        <el-col class="search-bar hidden-xs-only" :md="8" :lg="10" :span="12">
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataDicSearch">搜索</el-button>
          <el-button @click="load(query.curPage, query.pageSize)">刷新</el-button>
        </el-col>
      </el-row>

      <el-row class="table">
        <el-table :data="dicInfo" empty-text="暂时没有数据" @selection-change="selection" v-loading="loading">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="index" width="40" align="center"> </el-table-column>
          <el-table-column prop="name" label="字典名称"> </el-table-column>
          <el-table-column prop="code" label="字典标识"> </el-table-column>
          <el-table-column prop="description" label="字典描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="defaultValue" label="默认值" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="defaultName" label="默认值描述" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="showDeleteDialog(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <delete-dialog
        :visible="comfirmDialogVisible"
        :disable="comfirmButtonDisable"
        @cancel="comfirmDialogVisible = false"
        @comfirm="onDeleteDictionary"
      ></delete-dialog>

      <div class="pagination">
        <el-pagination
          background
          layout="total,-> ,prev, pager, next"
          :current-page="query.curPage"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getDictionaries, deleteDictionary } from '@/network/dictionary.js';

import deleteDialog from './common/ComfirmDialog.vue';
export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: '',
        pageSize: 10,
        curPage: 1
      },
      pageTotal: null,
      dicInfo: [],
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      loading: false,

      // 通信数据
      comfirmDialogVisible: false,
      comfirmButtonDisable: false
    };
  },
  components: { deleteDialog },
  mounted() {
    this.load(this.query.curPage);
  },
  activated() {
    this.load(this.query.curPage);
  },
  methods: {
    // 网络请求
    async getDictionaries(curPage, pageSize) {
      try {
        const result = await getDictionaries(curPage, pageSize);
        if (result.status === 200) {
          const { total, content } = result.data;
          return { total, content };
        }
      } catch (error) {
        console.log(error);
        console.error(`get dicitonaries error:${error}`);
      }
    },
    async deleteDictionary(dicId) {
      try {
        const result = await deleteDictionary(dicId);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '删除数据字典成功'
          });
          return;
        }
      } catch (error) {
        console.error(`delete dictionary error:${error}`);
      }
    },
    // 组件通信
    toAddDic() {
      this.$router.replace('/dataDictionary/add');
    },
    handleEdit(row) {
      this.$router.push({
        path: '/dataDictionary/details',
        query: { id: row.id }
      });
    },
    showDeleteDialog(row) {
      this.activeObj = { ...row };
      this.comfirmDialogVisible = true;
    },

    // 页面逻辑
    dataDicSearch() {
      console.log('handle search');
    },
    async onDeleteDictionary() {
      this.comfirmButtonDisable = true;
      await this.deleteDictionary(this.activeObj.id);
      await this.load(this.query.curPage, this.query.pageSize);
      this.comfirmButtonDisable = false;
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    handlePageChange(curPage) {
      this.query.curPage = curPage;
      this.load(this.query.curPage, this.query.pageSize);
    },
    async load(curPage, pageSize = this.query.pageSize) {
      this.loading = true;
      const { total, content } = await this.getDictionaries(curPage, pageSize);
      this.pageTotal = total;
      this.dicInfo = content;
      this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.main-content {
  .search-bar {
    display: flex;
    justify-content: flex-end;
  }
  .table {
    padding-top: 10px;
  }
}
</style>