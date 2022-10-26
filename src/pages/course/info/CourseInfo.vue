<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="success" plain @click="addDialogVisible = true">新增</el-button>
          <!-- <el-button @click="deleteSelectedItem">删除</el-button> -->
        </template>
        <template #right-content>
          <!-- <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataSearch">搜索</el-button> -->
          <el-button @click="load">刷新</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table :data="courseInfo" empty-text="暂时没有数据" @selection-change="selection" v-loading="courseTableLoading">
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column prop="name" label="课程名称"> </el-table-column>
          <el-table-column prop="avatar" label="课程封面">
            <template #default="scope">
              <el-avatar>
                <el-image :src="scope.row.avatar ? scope.row.avatar : ''">
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
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="toStudents(scope.row)">详情</el-button>
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
      @submit="submitCourse"
    ></add-dialog>

    <delete-dialog :visible.sync="deleteDialogVisible" @comfirm="afterDelete" :active="activeData"> </delete-dialog>
  </div>
</template>

<script>
import { getCourse, postCourse, putCourseAvatar } from '../../../network/course/info';
import CONST from 'utils/const';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './child-comps/AddDialog.vue';
const DeleteDialog = () => import('./child-comps/deleteDialog.vue');

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
      courseInfo: [],
      courseTableLoading: false,
      baseURL: CONST.IMG_BASEURL,
      // 组件通信数据
      activeIndex: null,
      activeCourse: null,
      addDialogVisible: false,
      addDialogButtonDisable: false,
      deleteDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    DeleteDialog
  },
  computed: {
    activeData() {
      return this.activeCourse ? { ...this.activeCourse } : {};
    }
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    // 网络方法
    async getCourse(curPage, pageSize) {
      try {
        const result = await getCourse(curPage, pageSize);
        if (result.status === 200) return result.data;

        return null;
      } catch (error) {
        console.error(`get courses error: ${error}`);
      }
    },
    async postCouese(form) {
      try {
        const result = await postCourse(form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '课程添加成功'
          });
          return result.data;
        }
      } catch (error) {
        console.error(`post course error: ${error}`);
      }
    },
    async putAvatar(courseID, form) {
      try {
        const result = await putCourseAvatar(courseID, form);
        if (result.status === 200) return;
      } catch (error) {
        console.error(`put avatar error: ${error}`);
      }
    },

    // 组件通信
    toStudents(row) {
      this.$router.push({
        path: '/courseInfo/details',
        query: {
          id: row.id,
          code: row.code
        }
      });
    },
    handleDelete(index, row) {
      this.activeCourse = row;
      this.activeIndex = index;
      this.deleteDialogVisible = true;
    },
    afterDelete() {
      if (this.courseInfo.length < 2) {
        this.query.pageIndex--;
      }
      this.load();
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
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.load();
    },
    deleteSelectedItem() {},
    async addCourse(form, file) {
      const course = await this.postCouese(form);
      if (!course) return;
      if (!file) return;
      const avatar = new FormData();
      avatar.append('avatar', file);
      await putCourseAvatar(course.id, avatar);
    },
    async submitCourse(form, file) {
      await this.addCourse(form, file);
      this.load();
    }
  }
};
</script>
<style lang="less" scoped>
</style>