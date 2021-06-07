<template>
  <el-dialog :title="title" width="300px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form" v-if="form">
      <el-form-item label="配置标识" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.code"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配置标题" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配置参数" :label-width="labelWidth">
        <el-col :span="15">
          <el-input v-model="form.value"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="参数类型" :label-width="labelWidth">
        <el-col :span="8">
          <el-input v-model="form.paramType"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="参数描述" :label-width="labelWidth">
        <el-col :span="24">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100" resize="none">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="数值范围" :label-width="labelWidth">
        <el-col :span="12">
          <el-input v-model="form.range"> </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      labelWidth: '80px',
      title: '新增项目',
      form: null
    };
  },
  props: {
    visible: Boolean,
    datas: Object
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