<template>
  <el-dialog :title="title" width="300px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form">
      <el-form-item label="数据名称" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="参数值" :label-width="labelWidth">
        <el-col :span="12">
          <el-input v-model="form.value"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="默认值" :label-width="labelWidth">
        <el-col :span="12">
          <el-select v-model="form.default">
            <el-option value="是" label="是"></el-option>
            <el-option value="否" label="否"></el-option>
          </el-select>
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
      form: {
        name: null,
        value: null,
        default: null
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
    submitForm() {
      this.cancel();
      this.$emit('submit', { ...this.form });
    }
  }
};
</script>

<style lang="less" scoped>
</style>