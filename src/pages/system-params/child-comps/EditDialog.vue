<template>
  <!-- 备用页面，似乎不需要两个Dialog编辑页 -->
  <el-dialog :title="title" width="300px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form" v-if="form" :rules="rules" ref="form">
      <el-form-item label="配置标识" :label-width="labelWidth" prop="code">
        <el-col :span="20">
          <el-input v-model="form.code"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配置标题" :label-width="labelWidth" prop="name">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配置参数" :label-width="labelWidth" prop="value">
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
    const validaCode = (rule, value, callback) => {
      this.datas.forEach((param) => {
        if (param.code === value) {
          callback(new Error('配置关键字重复'));
          return;
        }
      });
      callback();
    };
    return {
      labelWidth: '80px',
      title: '修改系统参数',
      // 在table中点击后，会修改form的内容,将
      form: null,
      rules: {
        code: [
          { required: true, message: '配置关键字必填', trigger: 'blur' },
          { pattern: /^[a-zA-Z]([a-zA-Z0-9_]{2,255})$/, message: '3位以上，首位字母。由数字，字母，下划线构成', trigger: 'blur' },
          { validator: validaCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '配置名称必填', trigger: 'blur' }],
        value: [{ required: true, message: '配置参数必填', trigger: 'blur' }]
      }
    };
  },
  props: {
    visible: Boolean,
    datas: Array
  },
  methods: {
    cancel(done) {
      this.$emit('dialog-cancel');
    },
    submitForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>