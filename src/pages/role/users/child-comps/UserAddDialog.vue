<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open" @closed="closed">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="用户id" :label-width="labelWidth" prop="id">
        <el-col :span="20">
          <el-input v-model="form.id" placeholder="请输入用户id"> </el-input>
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
import { getUsers } from '../../../../network/auth/userList';
import { postRoleUser } from '../../../../network/auth/role';
export default {
  data() {
    const checkUser = async (rule, value, callback) => {
      const result = await this.checkUser();
      if (!result) {
        callback(new Error('用户不存在'));
      }
      callback();
    };
    return {
      labelWidth: '90px',
      title: '新增用户',
      form: {
        id: null,
        roleId: null
      },
      rules: {
        id: [
          { required: true, message: '用户id必填', trigger: 'blur' },
          { validator: checkUser, trigger: 'blur' }
        ]
      },
      buttonLoading: false
    };
  },
  props: {
    visible: Boolean,
    roleId: String
  },
  methods: {
    // 网络方法
    async getUsers() {
      try {
        const result = await getUsers();
        if (result.status === 200) {
          return result.data;
        }
        return null;
      } catch (error) {
        console.error(`get users error:${error}`);
      }
    },
    async postRoleUser(form) {
      try {
        const res = await postRoleUser(form);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '添加用户成功！'
        });
        return true;
      } catch (error) {
        console.error(`post role user error ${error}`);
      }
    },
    // 页面逻辑
    /**
     * 判断是否存在这个账户
     */
    async checkUser() {
      try {
        const result = await this.getUsers();
        if (!result) return;
        const users = result.content;
        let hasId = false;
        for (const user of users) {
          if (this.form.id === user.id) {
            hasId = true;
            break;
          }
        }
        return hasId;
      } catch (error) {
        console.error(`check user error:${error}`);
      }
    },
    // 组件通信
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('update:visible', false);
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    submitForm(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (!valid) return;
        this.buttonLoading = true;
        const result = await this.postRoleUser(this.form);
        this.buttonLoading = false;
        if (!result) {
          return;
        }
        this.$emit('submit');
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
      this.form.roleId = this.roleId;
    },
    closed() {
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>