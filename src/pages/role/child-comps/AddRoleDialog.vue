<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open" @closed="closed">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="明细名称" :label-width="labelWidth" prop="name">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="明细项值" :label-width="labelWidth" prop="code">
        <el-col :span="20">
          <el-input v-model="form.code"> </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="buttonLoading">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { postRole } from '../../../network/auth/role';
export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '新增项目',
      form: {
        name: null,
        code: null
      },
      rules: {
        name: [{ required: true, message: '角色名称必填', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识必填', trigger: 'blur' }]
      },

      buttonLoading: false
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    // 网络方法
    async postRole(form) {
      try {
        const res = await postRole(form);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '成功添加角色！'
        });
        return true;
      } catch (error) {
        console.error(`post role error: ${error}`);
      }
    },
    // 页面逻辑
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
      const res = await this.postRole(this.form);
      if (!res) {
        this.buttonLoading = false;
      }
      this.$emit('submit');
      this.cancel();
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields();
    },
    open() {
      this.buttonLoading = false;
    },
    closed() {
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>