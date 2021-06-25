
<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="组织名称" :label-width="labelWidth" prop="name">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
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
import { postOrganization } from '../../../network/auth/organization';
export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '新增组织',
      form: {
        name: null
      },
      rules: {
        name: [{ required: true, message: '组织名称不可为空', trigger: 'blur' }]
      },
      buttonDisable: false
    };
  },
  props: {
    visible: Boolean,
    parentId: String
  },
  methods: {
    // 网络方法
    async postOrganization(form) {
      try {
        await postOrganization(form);
        this.$message({
          type: 'success',
          message: '成功添加组织!'
        });
      } catch (error) {
        console.error(`post organizaiotn error:${error}`);
      }
    },
    // 页面逻辑
    open() {
      this.buttonDisable = false;
      console.log(this.parentId);
    },
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('cancel');
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    async submitForm(refName) {
      let result = false;
      this.$refs[refName].validate((valid) => {
        result = valid;
      });
      if (!result) return;
      this.buttonDisable = true;
      const form = this.filterForm(this.form);
      this.$emit('before-submit');
      await this.postOrganization(form);
      this.$emit('submit');
      this.cancel();
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields();
    },
    // 处理表单
    filterForm(form) {
      const filterdform = { ...form };
      filterdform.parentId = this.parentId;
      return filterdform;
    }
  }
};
</script>

<style lang="less" scoped>
</style>