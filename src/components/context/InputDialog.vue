<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="明细名称" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="明细项值" :label-width="labelWidth" prop="value">
        <el-col :span="20">
          <el-input v-model="form.value"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="明细项标识" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.code"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否隐藏" :label-width="labelWidth">
        <el-col :span="20">
          <el-select v-model="form.hidden" placeholder="是否隐藏">
            <el-option label="否" value="false"></el-option>
            <el-option label="是" value="true"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="参数描述" :label-width="labelWidth">
        <el-col :span="24">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100" resize="none">
          </el-input>
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
        default: 'false',
        value: null,
        code: null,
        hidden: 'false'
      },
      rules: {
        // value: [{ validator: validateValue, trigger: 'blur' }]
      },

      buttonLoading: false
    };
  },
  props: {
    // 通过.sync 处理
    visible: Boolean,
    // 获取活跃的明细，来防止判重时，和自己重而报错。
    active: Object
  },
  methods: {
    // 页面逻辑
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('update:visibel', false);
      this.buttonLoading = false;
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    submitForm(refName) {
      this.$refs[refName].validate((valid) => {
        if (!valid) return;
        this.buttonLoading = true;
        this.$emit('submit', { ...this.form });
        this.cancel();
      });
    },
    // 重置表单
    resetForm() {
      for (const propName in this.form) {
        this.form[propName] = null;
      }
    },
    open() {
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>