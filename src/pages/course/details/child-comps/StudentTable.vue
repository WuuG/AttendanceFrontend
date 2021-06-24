<template>
  <el-main class="main-content">
    <el-row>
      <el-col> 学生列表 </el-col>
    </el-row>
    <el-row class="table">
      <el-table :data="studentInfo" empty-text="暂时没有数据">
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
  </el-main>
</template>

<script>
import { getStudents } from '../../../../network/course/students';
export default {
  data() {
    return {
      // 表格页面pagenation的参数
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      studentInfo: [],
      //活跃的子项
      activeObj: null,
      activeIndex: null
      // 新增按钮对应的Dialog Visible
      // 通信数据
    };
  },
  methods: {
    // 网络方法
    async getStudents(courseId) {
      try {
        const result = await getStudents(courseId);
        return result.data;
      } catch (error) {
        console.error(`get students error：${error}`);
      }
    },
    // 页面逻辑
    dataSearch() {},
    onEdit(index, row) {
      this.isEdit = true;
      console.log(index, row);
    },
    onDelete(index, row) {
      console.log(index, row);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
    }
    // async   load() {
    //   const result =
    //   }
  }
};
</script>

<style lang="scss" scoped>
</style>