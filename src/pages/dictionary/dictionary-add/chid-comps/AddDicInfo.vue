<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="明细名称" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.name"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否默认值" :label-width="labelWidth">
        <el-col :span="12">
          <el-select v-model="form.default" placeholder="是否默认值">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="明细项数值" :label-width="labelWidth" prop="value">
        <el-col :span="20">
          <el-input v-model="form.value"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="明细项描述" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100" resize="none">
          </el-input>
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
    const validateValue = (rule, value, callback) => {
      // 这里获取的value为什么是string
      this.dicInfo.forEach((item) => {
        if (item.value === Number.parseInt(value)) {
          callback(new Error('数值重复'));
          return false;
        }
      });
      callback();
    };
    return {
      labelWidth: '90px',
      title: '新增项目',
      form: {
        name: null,
        default: 0,
        value: null,
        description: null
      },
      options: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      rules: {
        value: [{ validator: validateValue, trigger: 'blur' }]
      }
    };
  },
  props: {
    visible: Boolean,
    dicInfo: Array
  },
  methods: {
    cancel(done) {
      this.$emit('dialog-cancel');
      this.clearForm();
    },
    submitForm() {
      this.$emit('submit', { ...this.form });
      this.cancel();
    },
    async clearForm() {
      for (const propName in this.form) {
        if (propName === 'default') {
          await setTimeout(() => {
            this.form[propName] = 0;
          }, 100);
          continue;
        }
        this.form[propName] = null;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>