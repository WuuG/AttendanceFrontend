<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="菜单标题" :label-width="labelWidth" prop="title">
        <el-col :span="20">
          <el-input v-model="form.title"> </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="菜单路径" :label-width="labelWidth" prop="index">
        <el-col :span="20">
          <el-input v-model="form.index"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="labelWidth" prop="icon">
        <e-icon-picker v-model="form.icon" :options="options" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="buttonDisable">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { postMenu } from '../../../network/auth/menuCtrl';
import { EIconPicker } from 'e-icon-picker';

export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '添加菜单',
      form: {
        title: null,
        index: null,
        icon: null,
        parentId: null
      },
      rules: {
        title: [{ required: true, message: '菜单名称不可为空', trigger: 'blur' }],
        index: [{ required: true, message: '菜单路径不可为空', trigger: 'blur' }]
      },
      buttonDisable: false,
      options: {
        ElementUI: true
      }
    };
  },
  props: {
    visible: Boolean,
    parentId: String
  },
  components: {
    EIconPicker
  },
  methods: {
    // 网络请求
    async postMenu(form) {
      try {
        const result = await postMenu(form);
        if (result.status !== 200) {
          return false;
        }
        return true;
      } catch (error) {
        console.error(`post menu error:${error}`);
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
      this.buttonDisable = true;
      const reqRes = await this.postMenu(this.form);
      if (!reqRes) {
        this.buttonDisable = false;
      }
      this.$emit('submit');
      this.cancel();
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields();
    },
    open() {
      this.form.parentId = this.parentId;
      this.buttonDisable = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
<style >
.fas-icon-list li {
  list-style: none;
  font-size: 24px;
  float: left;
}
</style>