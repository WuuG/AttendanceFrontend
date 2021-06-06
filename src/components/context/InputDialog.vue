<template>
  <el-dialog :title="title" width="300px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="年龄" :label-width="labelWidth">
        <el-col :span="12">
          <el-input v-model="form.age"> </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="cancel">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      labelWidth: '80px',
      title: '新增项目',
      form: {
        name: null,
        age: null
      }
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    cancel(done) {
      this.$emit('dialog-cancel');
    },
    submitForm() {}
  }
};
</script>

<style lang="scss" scoped>
</style>