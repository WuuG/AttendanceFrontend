<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>基础表格</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="primary" @click="toDictionary">返回</el-button>
          <el-button @click="changeDialogVisibel">新增</el-button>
          <el-button @click="deleteSelectedItem">删除</el-button>
        </template>
        <template #right-content>
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataSearch">搜索</el-button>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table :data="dicInfo" empty-text="暂时没有数据" @selection-change="selection" @selection-all="selectAll">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="id" label="字典ID"> </el-table-column>
          <el-table-column prop="name" label="字典名称"> </el-table-column>
          <el-table-column prop="des" label="字典描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

      <input-dialog title="新增项目" :visible="addNewDialogVsible" @dialog-cancel="changeDialogVisibel"></input-dialog>
    </el-main>
  </div>
</template>

<script>
import InputDialog from 'components/context/InputDialog.vue';
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
      dicInfo: [
        {
          id: 0,
          name: '性别',
          des: '性别，用于表示男，女等。',
          createTime: '2020-1-12 12:00:00'
        },
        {
          id: 0,
          name: '性别',
          des: '性别，用于表示男，女等。',
          createTime: '2020-1-12 12:00:00'
        }
      ],
      //统一设置表单的宽度
      labelWidth: '80px',
      //活跃的子项
      activeName: '0',
      // 新增按钮对应的Dialog Visible
      addNewDialogVsible: false
    };
  },
  components: {
    InputDialog,
    HeaderBar
  },
  methods: {
    toDictionary() {
      this.$router.push('dataDictionary');
    },
    dataSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    // 选择全部
    selectAll(sel) {
      console.log(sel);
    },
    // 删除已选
    deleteSelectedItem() {},
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },
    changeDialogVisibel() {
      this.addNewDialogVsible = !this.addNewDialogVsible;
    }
  }
};
</script>
<style lang="less" scoped>
</style>