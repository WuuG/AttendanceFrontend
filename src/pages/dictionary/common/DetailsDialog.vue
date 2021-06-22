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
    </el-form>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="comfirmButtonDisable">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    // value的表单验证。
    const validateValue = (rule, value, callback) => {
      this.dicInfo.forEach((item) => {
        if (item.value === value) {
          if (this.isEdit && item.value === this.active.value) {
            callback();
            return;
          }
          callback(new Error('明细数值重复'));
        }
      });
      callback();
    };
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
      options: [
        {
          value: 'false',
          label: '否'
        },
        {
          value: 'true',
          label: '是'
        }
      ],
      rules: {
        value: [{ validator: validateValue, trigger: 'blur' }]
      },
      comfirmButtonDisable: false
    };
  },
  props: {
    visible: Boolean,
    // 获取父组件的已有的表单数据，用来判重和length处理等
    dicInfo: Array,
    // 判断是编辑还是新增的Dialog
    isEdit: Boolean,
    // 获取活跃的明细，来防止判重时，和自己重而报错。
    active: Object
  },
  methods: {
    // 页面逻辑
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.buttonDisable(true);
      this.$emit('dialog-cancel');
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    submitForm(refName) {
      let result = false;
      this.$refs[refName].validate((valid) => {
        result = valid;
      });
      if (!result) return;
      this.$emit('submit', { ...this.form });
      this.cancel();
    },
    // 重置表单
    resetForm() {
      for (const propName in this.form) {
        if (propName === 'default' || propName === 'hidden') {
          this.form[propName] = 'false';
          continue;
        }
        this.form[propName] = null;
      }
    },
    // button的disable处理
    buttonDisable(boolean) {
      this.comfirmButtonDisable = boolean;
    }
  }
};
</script>

<style lang="less" scoped>
</style>