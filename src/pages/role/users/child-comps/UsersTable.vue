<template>
  <div>
    <header-bar>
      <template #left-content>
        <el-button @click="addNewDialogVsible = true">新增</el-button>
        <el-button @click="deleteSelectedItem">删除</el-button>
      </template>
      <template #right-content>
        <el-button>重置</el-button>
      </template>
    </header-bar>

    <el-row class="table">
      <el-table :data="data" empty-text="暂时没有数据" @selection-change="selection" v-loading="tableLoading">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="id" label="字典ID"> </el-table-column>
        <el-table-column prop="name" label="字典名称"> </el-table-column>
        <el-table-column prop="des" label="字典描述" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
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
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
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
      data: [
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
      tableLoading: false
    };
  },
  components: {
    HeaderBar
  },
  methods: {
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
    }
  }
};
</script>

<style lang="less" scoped>
</style>