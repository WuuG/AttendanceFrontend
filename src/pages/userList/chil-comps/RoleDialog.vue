<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="分配角色" :label-width="labelWidth" prop="roles">
        <el-col :span="20">
          <role-form-item v-model="form.roles"></role-form-item>
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
import { putUserRoles } from '../../../network/auth/role';

import RoleFormItem from '../../../components/context/form-item/Role.vue';
export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '分配角色',
      form: {
        roles: []
      },
      rules: {
        // value: [{ validator: validateValue, trigger: 'blur' }]
        roles: [{ required: true, message: '必须设置至少一种角色', trigger: 'blur' }]
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
    RoleFormItem
  },
  methods: {
    // 网络方法
    // 添加用户的角色列表
    async putUserRoles(uid, roles) {
      try {
        const res = await putUserRoles(uid, roles);
        console.log(res);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '成功分配用户角色！'
        });
        return true;
      } catch (error) {
        console.error(`put user roles error: ${error}`);
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
        await this.submitRoles();
        this.buttonLoading = false;
      });
    },
    async submitRoles() {
      const result = await this.putUserRoles(this.active.id, this.form.roles);
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
      const roles = this.active.roles.map((x) => x.id);
      this.form = {
        roles: roles
      };
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>