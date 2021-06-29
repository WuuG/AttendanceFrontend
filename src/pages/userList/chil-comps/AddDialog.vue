<template>
  <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel" @open="open">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" :label-width="labelWidth" prop="loginName">
        <el-col :span="20">
          <el-input v-model="form.loginName"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号" :label-width="labelWidth" prop="phone">
        <el-col :span="20">
          <el-input v-model="form.phone"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" :label-width="labelWidth" prop="genderValue">
        <sex-form-item v-model="form.genderValue"></sex-form-item>
      </el-form-item>
      <el-form-item label="学校学院" :label-width="labelWidth" prop="schoolMajorID">
        <el-col :span="20">
          <org-form-item v-model="form.schoolMajorID" :name="form.schoolMajorName"></org-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="用户角色" :label-width="labelWidth" prop="roles">
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
import CONST from '../../../utils/const';
import { accountUnique } from '../../../network/passport';
import { postUser } from '../../../network/auth/userList';

// import SexFormItem from '../../../components/context/form-item/Sex.vue';
// import OrgFormItem from '../../../components/context/form-item/Organization.vue';
import RoleFormItem from '../../../components/context/form-item/Role.vue';
const SexFormItem = () => import('../../../components/context/form-item/Sex.vue');
const OrgFormItem = () => import('../../../components/context/form-item/Organization.vue');
export default {
  data() {
    const checkUserUnique = (rule, value, callback) => {
      accountUnique(value)
        .then((res) => {
          callback();
        })
        .catch((err) => {
          callback(new Error('用户已存在'));
        });
    };
    const checkPhoneUnique = (rule, value, callback) => {
      accountUnique(value)
        .then((res) => {
          // return res.message == 'Account already exists.' ? callback(new Error('手机号已存在')) : callback();
          callback();
        })
        .catch((err) => {
          callback(new Error('手机号已存在'));
        });
    };
    return {
      labelWidth: '90px',
      title: '添加用户',
      form: {
        loginName: null,
        phone: null,
        genderValeu: null,
        schoolMajorID: null,
        roles: []
      },

      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: CONST.RE.ACCOUNT,
            message: CONST.RE_TEXT.ACCOUNT,
            trigger: 'blur'
          },
          { validator: checkUserUnique, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: CONST.RE.PHONE_NUM, message: CONST.RE_TEXT.PHONE_NUM, trigger: 'blur' },
          { validator: checkPhoneUnique, trigger: 'blur' }
        ],
        roles: [{ required: true, message: '必须需要选择至少一种身份', trigger: 'blur' }]
      },
      buttonLoading: false
    };
  },
  components: {
    SexFormItem,
    OrgFormItem,
    RoleFormItem
  },
  props: {
    // 通过.sync 处理
    visible: Boolean
  },
  methods: {
    // 网络方法
    async postUser(form) {
      try {
        const res = await postUser(form);
        console.log(res);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '添加用户成功！'
        });
        return true;
      } catch (error) {
        console.error(`post user errro ${error}`);
      }
    },
    // 页面逻辑
    async submitPostUser() {
      const form = this.filterForm(this.form);
      const result = await this.postUser(form);
      if (!result) return false;
      this.$emit('submit');
      this.cancel();
    },
    /**
     * 对要上传的表单进行处理
     * @roles 添加用户时所需要的{id:'xxx'}的对象，而roles本身是个多个id的数组
     */
    filterForm(form) {
      const filteredForm = { ...form };
      filteredForm.roles = filteredForm.roles.map((x) => ({
        id: x
      }));
      return filteredForm;
    },
    // 组件通信
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
        await this.submitPostUser();
        this.buttonLoading = false;
      });
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields();
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