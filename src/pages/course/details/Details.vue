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
          <el-button>添加学生</el-button>
        </template>
        <template #right-content>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <course-table :id="courseId"></course-table>
    </el-main>
    <student-table :courseId="courseId"></student-table>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import CourseTable from './child-comps/CourseTable.vue';
import StudentTable from './child-comps/StudentTable.vue';
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
  created() {
    // this.load()
  },
  methods: {
    // 通信方法
    toCourse() {
      this.$router.push('/courseInfo');
    }
  }
};
</script>
<style lang="less" scoped>
.main-content {
  &:first-of-type {
    margin-bottom: 10px;
  }
}
</style>