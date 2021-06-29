<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="真实姓名" :label-width="labelWidth">
        <el-col :span="20">
          <el-input v-model="form.realName"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" :label-width="labelWidth" prop="value">
        <sex-form-item v-model="form.genderValue"></sex-form-item>
      </el-form-item>
      <el-form-item label="学校学院" :label-width="labelWidth">
        <el-col :span="20">
          <org-form-item v-model="form.schoolMajorID" :name="form.schoolMajorName"></org-form-item>
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
import { patchUser } from '../../../network/auth/userList';

import SexFormItem from '../../../components/context/form-item/Sex.vue';
import OrgFormItem from '../../../components/context/form-item/Organization.vue';
export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '编辑用户信息',
      form: {
        realName: null,
        genderValue: null,
        schoolMajorID: null,
        schoolMajorName: null
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
  components: {
    SexFormItem,
    OrgFormItem
  },
  methods: {
    // 网络方法
    // 修改用户信息
    async patchUser(form) {
      try {
        const res = await patchUser(form);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '修改用户成功！'
        });
        return true;
      } catch (error) {
        console.error(`patch user error ${error}`);
      }
    },
    // 页面逻辑
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('update:visible', false);
      this.buttonLoading = false;
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    submitForm(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (!valid) return;
        this.buttonLoading = true;
        await this.editUser();
        this.buttonLoading = false;
      });
    },
    async editUser() {
      const result = await this.patchUser(this.form);
      if (!result) return;
      this.$emit('submit');
      this.cancel();
    },
    // 重置表单
    resetForm() {
      for (const propName in this.form) {
        this.form[propName] = null;
      }
    },
    open() {
      this.form = { ...this.active };
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>