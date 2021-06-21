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
          <el-button>重置</el-button>
        </el-col>
      </el-row>

      <el-row class="table">
        <el-table :data="dicInfo" empty-text="暂时没有数据" @selection-change="selection">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="index" width="40" label="id" align="center"> </el-table-column>
          <el-table-column prop="name" label="字典名称"> </el-table-column>
          <el-table-column prop="defaultValue" label="默认值" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="defaultName" label="默认值描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="description" label="字典描述" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

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
import { getDictionaries } from '@/network/dictionary.js';
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
      activeDicInfo: {
        id: null,
        name: '',
        des: ''
      },
      //判断是编辑还是新建。
      isEdit: false,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      activeName: '0'
    };
  },
  created() {
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
        this.$message({
          type: 'warning',
          message: '发生了错误，请打开控制台查看'
        });
      } catch (error) {
        console.error(`get dicitonaries error:${error}`);
      }
    },
    // 组件通信
    // 页面逻辑
    toAddDic() {
      this.$router.replace('dicAdd');
    },
    saveDicInfo() {
      this.activeDicInfo.createTime = '2021-4-12 23:12:12';
      this.dicInfo.push(this.activeDicInfo);
    },
    dataDicSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.$router.push({
        path: 'dicChildData',
        query: {
          id: row.id
        }
      });
      // console.log(index, row);
    },
    handleDelete(index, row) {
      this.dicInfo.splice(index, 1);
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    handlePageChange(p) {
      console.log(p);
    },
    async load(curPage, pageSize) {
      const { total, content } = await this.getDictionaries(curPage, pageSize);
      this.pageTotal = total;
      this.dicInfo = content;
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