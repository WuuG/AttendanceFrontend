<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>课程详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="primary" @click="toCourse">返回</el-button>
          <el-button @click="addStudentDialogVisible = true">添加学生</el-button>

          <el-dialog title="添加学生" :visible.sync="addStudentDialogVisible" width="400px"
            :before-close="cancelAddStudent">
            <el-form>
              <el-form-item label="学生ID" :label-width="labelWidth">
                <el-input v-model="studentId"></el-input>
              </el-form-item>
            </el-form>

            <template #footer>
              <el-button @click="addStudentDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitAddStudent" :disabled="addStudentButtonDisable"
                :loading="addStudentButtonLoading">确 定</el-button>
            </template>
          </el-dialog>
        </template>


        <template #right-content>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <course-table :id="courseId"></course-table>
    </el-main>

    <student-table :courseId="courseId" ref="studentTable"></student-table>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import CourseTable from './child-comps/CourseTable.vue';
import StudentTable from './child-comps/StudentTable.vue';

import { postStudentToCourse } from "network/course/students.js";

export default {
  name: 'CourseDetails',
  components: {
    HeaderBar,
    CourseTable,
    StudentTable
  },
  props: {
    courseId: String,
    courseCode: String
  },
  data() {
    return {
      addStudentDialogVisible: false,
      studentId: null,
      labelWidth: "90px",
      addStudentButtonDisable: false,
      addStudentButtonLoading: false
    }
  },

  methods: {
    // 通信方法
    toCourse() {
      this.$router.push('/courseInfo');
    },


    // 添加学生
    async addStudentToCourse(studentId, courseCode) {
      try {
        await postStudentToCourse(studentId, courseCode);
      } catch (error) {
        console.log(`add students error: ${error}`)
      }
    },

    async submitAddStudent() {
      console.log(this.$refs.studentTable);
      this.addStudentButtonLoading = true;
      await this.addStudentToCourse(this.studentId, this.courseCode);
      this.addStudentButtonLoading = false;
      this.addStudentDialogVisible = false;
      this.$refs.studentTable.load();
    },
    cancelAddStudent() {
      this.addStudentDialogVisible = false;
      this.studentId = null;
    },
  },
};
</script>
<style lang="less" scoped>
.main-content {
  &:first-of-type {
    margin-bottom: 10px;
  }
}
</style>