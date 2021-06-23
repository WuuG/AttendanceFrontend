<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="addDialogVisible = true">新增</el-button>
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
        <el-table :data="courseInfo" empty-text="暂时没有数据" @selection-change="selection" v-loading="courseTableLoading">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="课程名称"> </el-table-column>
          <el-table-column prop="avatar" label="课程头像">
            <template #default="scope">
              <el-avatar>
                <el-image :src="scope.row.avatar ? baseURL + scope.row.avatar : ''">
                  <template #error>
                    <i class="el-icon-picture-outline"></i>
                  </template>
                </el-image>
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="schoolMajorName" label="大学-学院" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="semester" label="学期" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="stateName" label="课程状态"> </el-table-column>
          <el-table-column prop="teacherName" label="教师名字"> </el-table-column>
          <el-table-column prop="courseClass" label="课程班级"> </el-table-column>
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
    </el-main>

    <add-dialog
      :visible="addDialogVisible"
      :buttonDisable="addDialogButtonDisable"
      @cancel="addDialogVisible = false"
      @submit="addCourse"
    ></add-dialog>

    <edit-dialog
      :visible="editDialogVisible"
      :buttonDisable="editDialogButtonDisable"
      @cancel="editDialogVisible = false"
      @submit="modifyCourse"
    ></edit-dialog>
  </div>
</template>

<script>
import { getCourse, postCourse, putCourseAvatar } from '../../../network/course/info';
import CONST from 'utils/const';

import HeaderBar from '../../../components/context/HeaderBar.vue';
import AddDialog from './child-comps/AddDialog.vue';
import EditDialog from './child-comps/EditDialog.vue';

export default {
  name: 'DataDictionary',
  data() {
    return {
      // 表格页面pagenation的参数
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 5
      },
      pageTotal: 0,
      courseInfo: [],
      courseTableLoading: false,
      baseURL: CONST.IMG_BASEURL,
      // 组件通信数据
      activeIndex: null,
      activeCourse: null,
      addDialogVisible: false,
      addDialogButtonDisable: false,
      editDialogVisible: false,
      editDialogButtonDisable: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    EditDialog
  },
  created() {
    this.load();
  },
  methods: {
    // 网络方法
    async getCourse(curPage, pageSize) {
      try {
        const result = await getCourse(curPage, pageSize);
        if (result.status === 200) return result.data;
        this.$message({
          type: 'warning',
          message: result.message
        });
        return null;
      } catch (error) {
        console.error(`get courses error: ${error}`);
      }
    },
    async postCouese(form) {
      try {
        const result = await postCourse(form);
        if (result.status === 200) return result.data;
      } catch (error) {}
    },
    async putAvatar(courseID, form) {
      try {
        const result = await putCourseAvatar(courseID, form);
        console.log(result);
      } catch (error) {}
    },
    // 页面逻辑
    async load() {
      this.courseTableLoading = true;
      const result = await this.getCourse(this.query.pageIndex, this.query.pageSize);
      this.courseTableLoading = false;
      if (!result) return;
      this.courseInfo = result.content;
      this.pageTotal = result.total;
    },
    dataSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.activeCourse = row;
      this.activeIndex = index;
      this.editDialogVisible = true;
      console.log(row, index);
    },
    handleDelete(index, row) {
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
    },
    async addCourse(form, file) {
      console.log(form);
      const course = await this.postCouese(form);
      if (!course) return;
      console.log(course.id, file);
      const avatar = new FormData();
      avatar.append('avatar', file);
      await putCourseAvatar(course.id, avatar);
      this.load();
    },
    modifyCourse() {}
  }
};
</script>
<style lang="less" scoped>
</style>