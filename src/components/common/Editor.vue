<template>
  <el-dialog title="添加课程" width="30%" :before-close="handleClose" :visible.sync="editorShow" :modal-append-to-body="false">
    <el-form :from="editorForm">
      <el-form-item label="课程名称">
        <el-input v-model="editorForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="任课教师">
        <el-input v-model="editorForm.courseTeacher"></el-input>
      </el-form-item>
      <el-form-item label="课程时间">
        <el-input v-model="editorForm.courseTime"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editorShow = false">取 消</el-button>
      <el-button type="primary" @click="editorShow = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'editor',
  data() {
    return {
      editorForm: {
        courseName: '',
        courseTeacher: '',
        courseTime: ''
      }
    };
  },
  props: {
    propEditorShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editorShow: {
      get() {
        return this.propEditorShow;
      },
      set(val) {
        this.$emit('update:propEditorShow', val);
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
</style>