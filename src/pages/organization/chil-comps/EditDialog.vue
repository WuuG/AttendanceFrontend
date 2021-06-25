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
      <el-button type="primary" @click="submitForm('form')" :loading="buttonLoading">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { editeOrganization } from '../../../network/auth/organization';

export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '修改组织',
      form: {
        name: null
      },
      rules: {
        name: [{ required: true, message: '组织名称不可为空', trigger: 'blur' }]
      },
      buttonLoading: false
    };
  },
  props: {
    visible: Boolean,
    organization: Object
  },
  methods: {
    // 网络方法
    async editeOrganization(orgId, form) {
      try {
        const result = await editeOrganization(orgId, form);
        if (result.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '修改组织成功!'
        });
        return true;
      } catch (error) {
        console.error(`edite organization ${error}`);
      }
    },
    // 页面逻辑
    open() {
      this.buttonLoading = false;
      this.form.name = this.organization.name;
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
      this.buttonLoading = true;
      this.$emit('before-submit', true);
      const editResult = await this.editeOrganization(this.organization.id, this.form);
      if (!editResult) {
        this.$emit('before-submit', false);
      }
      this.$emit('submit', { ...this.form });
      this.cancel();
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>