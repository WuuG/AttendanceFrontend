<template>
  <el-container class="course-info-box">
    <el-main class="course-info-content">
      <el-row :gutter="20">
        <el-col :span="1"><el-button @click="showEditor">新建</el-button></el-col>
        <el-col :span="2" :offset="1"><el-button>批量操作</el-button></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" class="table" border>
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="courseNum" label="班课号" width="200"> </el-table-column>
        <el-table-column prop="courseName" label="课程名" width="300"> </el-table-column>
        <el-table-column prop="courseTeacher" label="任课教师"> </el-table-column>
        <el-table-column prop="courseTime" label="上课时间"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="total,->,prev,->, pager,->, next,->,jumper"
            :total="1000"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <editor :propEditorShow.sync="editorShow" />
    </el-main>
  </el-container>
</template>

<script>
import Editor from '../../components/common/Editor';
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
        },
        {
          courseNum: '12292933',
          courseName: '政治经济学',
          courseTeacher: '张三老师',
          courseTime: '2021-2-1 11:30'
        }
      ],
      editorShow: false
    };
  },

  components: {
    Editor
  },
  methods: {
    handleDelete(index) {
      console.log(index);
    },
    showEditor() {
      this.editorShow = true;
    },
    handleSizeChange(res) {
      console.log(res);
    },
    handleCurrentChange(res) {
      console.log(res);
    },
    handleEdit() {
      this.editorShow = true;
    }
  }
};
</script>

<style scoped>
.course-info-box {
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
}
.course-info-box .course-info-content {
  width: 100%;
  height: 100%;
}
.table {
  margin: 10px 0 10px;
}
.red {
  color: red;
}
</style>