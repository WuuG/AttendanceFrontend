<template>
  <div class="course-info-box">
    <div class="course-info-content">
      <el-row :gutter="100">
        <el-col :span="1"><el-button>新建</el-button></el-col>
        <el-col :span="2"><el-button>批量操作</el-button></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" class="table" border>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="courseNum" label="班课号" width="200"> </el-table-column>
        <el-table-column prop="courseName" label="课程名" width="300"> </el-table-column>
        <el-table-column prop="courseTeacher" label="任课教师"> </el-table-column>
        <el-table-column prop="courseTime" label="上课时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="5">共400条记录</el-col>
        <el-col :span="10" :offset="9">
          <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseInfo',
  data() {
    return {
      tableData: [
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        }
      ]
    };
  },
  methods: {
    handleDelete(index) {
      console.log(index);
    }
  }
};
</script>

<style scoped>
.course-info-box {
  padding: 30px 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 20px;
}
.course-info-box .course-info-content {
  width: 100%;
  height: 100%;
}
.table {
  margin: 10px 0 10px;
}
</style>