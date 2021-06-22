<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form" v-if="form" :rules="rules" ref="form">
      <el-form-item label="数据名称" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="字典标识" :label-width="labelWidth" prop="code">
        <el-col :span="12">
          <el-input v-model="form.code"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="字典描述" :label-width="labelWidth">
        <el-col :span="24">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100" resize="none">
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="buttonDisable">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      labelWidth: '80px',
      title: '新增项目',
      form: null,
      rules: {
        code: [{ required: true, message: '数据标识必填', trigger: 'blur' }]
      }
    };
  },
  props: {
    visible: Boolean,
    buttonDisable: Boolean
  },
  methods: {
    cancel(done) {
      this.$emit('cancel');
    },
    submitForm(refName) {
      let valid = true;
      this.$refs[refName].validate((result) => {
        if (!result) valid = false;
      });
      if (!valid) return;
      this.cancel();
      this.$emit('submit', { ...this.form });
    }
  }
};
</script>

<style lang="less" scoped>
</style>