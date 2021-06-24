<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form" :rules="rules" ref="form">
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
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addParams, modifyParam } from 'network/systemParams';
export default {
  name: 'SystemParamsAddDialog',
  data() {
    const validaCode = (rule, value, callback) => {
      this.datas.forEach((param) => {
        // 如果是编辑，其配置标识不能修改。
        if (this.isEdit && this.editCode !== value) {
          callback(new Error('配置关键字不可修改'));
          return;
        }
        if (!this.isEdit && param.code === value) {
          // 如果不是编辑且存在重复，并且与原先的配置标识不相同就无法通过表单验证
          callback(new Error('配置关键字重复'));
        }
      });
      callback();
    };
    return {
      labelWidth: '80px',
      title: '新增系统参数',
      form: {
        code: null,
        name: null,
        value: null,
        paramType: null,
        description: null,
        range: null
        // 编辑时的配置标识，当与自己重复时，允许通过。
      },
      editCode: null,
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
    datas: Array,
    isEdit: Boolean
  },
  methods: {
    // 网络请求
    async addNewParam(form) {
      try {
        const result = await addParams(form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '系统参数添加成功'
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error(`add new param error:${error}`);
      }
    },
    async modifyParam(form) {
      try {
        const result = await modifyParam(form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '系统参数修改成功'
          });
        }
      } catch (error) {
        console.error(`modify param error:${error}`);
      }
    },

    // 页面逻辑
    // 进行表单验证，并将请求分流，判断其是新增，还是修改
    submitForm(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (!valid) return;
        if (this.isEdit) {
          await this.modifyParam(this.form);
        } else {
          await this.addNewParam(this.form);
        }
        this.cancel();
        this.$emit('reset');
      });
    },
    // 发送cancel事件，并调用resetForm
    cancel(done) {
      this.resetForm();
      this.$emit('cancel');
    },
    // 重置表单内容，为了防止直接清楚表单的突兀，添加了延迟。
    resetForm() {
      this.$refs['form'].resetFields();
      setTimeout(() => {
        for (const p in this.form) {
          this.form[p] = null;
        }
        this.editCode = null;
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
</style>