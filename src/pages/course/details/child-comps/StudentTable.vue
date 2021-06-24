<template>
  <el-main class="main-content">
    <el-row>
      <el-col> 学生列表 </el-col>
    </el-row>
    <el-row class="table">
      <el-table :data="studentInfo" empty-text="暂时没有数据" v-loading="tableLoading">
        <el-table-column prop="realName" label="学生姓名" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="gender" label="学生性别" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="schoolName" label="学生学院" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template v-slot:default="scope">
            <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">删除学生</el-button>
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
        pageSize: 5
      },
      pageTotal: 0,
      studentInfo: [],
      tableLoading: false,
      activeObj: null,
      activeIndex: null
      // 通信数据
    };
  },
  props: {
    courseId: String
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    // 网络方法
    async getStudents(courseId, form) {
      try {
        const result = await getStudents(courseId, form);
        return result.data;
      } catch (error) {
        console.error(`get students error：${error}`);
      }
    },
    // 页面逻辑
    dataSearch() {},
    onDelete(index, row) {
      console.log(index, row);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.load();
    },
    async load() {
      this.tableLoading = true;
      const form = {
        curPage: this.query.pageIndex,
        pageSize: this.query.pageSize
      };
      const result = await this.getStudents(this.courseId, form);
      this.tableLoading = false;
      this.pageTotal = result.total;
      this.studentInfo = result.content;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>