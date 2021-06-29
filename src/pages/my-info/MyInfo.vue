<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-user"></i> 修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main class="main-content info-card">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item label="用户ID">
              <el-col :span="18">
                <el-input v-model="form.id" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户名">
              <el-col :span="10">
                <el-input v-model="form.loginName" disabled></el-input>
              </el-col>
              <el-col :span="5" class="text-button">
                <el-button type="text">编辑</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="性别">
              <el-col :span="8">
                <sex-form-item v-model="form.genderValue"></sex-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-col :span="14">
                <el-input v-model="form.email" disabled></el-input>
              </el-col>
              <el-col :span="5" class="text-button">
                <el-button type="text">编辑</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号">
              <el-col :span="10">
                <el-input v-model="form.phone" disabled></el-input>
              </el-col>
              <el-col :span="5" class="text-button">
                <el-button type="text">编辑</el-button>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名">
              <el-col :span="10">
                <el-input v-model="form.realName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="所属学院">
              <el-col :span="20">
                <el-cascader v-model="form.schoolMajorID" :props="props" :placeholder="form.schoolMajorName"> </el-cascader>
              </el-col>
            </el-form-item>
            <el-form-item label="上传头像">
              <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="imgURL" :src="imgURL" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="5">
          <el-button type="primary" @click="submitForm('form')" :loading="buttonLoading">确定修改</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
  

<script>
import { getOrganization } from 'network/course/info';
import { patchUser, putUserAvatar } from '../../network/auth/userList';
import { getLocalStorge, setLocalStorge, KEY } from '../../utils/localStorge';
import CONST from '../../utils/const';

import SexFormItem from '../../components/context/form-item/Sex.vue';

export default {
  name: 'MyInfo',
  data() {
    const _self = this;
    return {
      roleId: 1,
      form: {},
      rules: {
        loginName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        phoneNum: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      },
      src: null,
      avatarFile: null,
      // 级联选择器，院校的options
      schoolMajorOptions: [],
      props: {
        lazy: true,
        lazyLoad: _self.getOrganizationOptions
      },
      buttonLoading: false
    };
  },
  computed: {
    imgURL() {
      if (this.src) {
        return this.src;
      }
      if (this.form.avatar) {
        return CONST.IMG_BASEURL + this.form.avatar;
      }
      return false;
    }
  },
  components: {
    SexFormItem
  },
  created() {
    this.form = getLocalStorge(KEY.USERINFO);
  },
  methods: {
    // 网络方法
    // 获取组织
    async getOrganization(orgId) {
      try {
        const result = await getOrganization(orgId);
        if (result.status === 200) return result.data;
      } catch (error) {
        console.error(`get organization error: ${error}`);
      }
    },
    // 修改个人信息
    async patchUser(form) {
      try {
        const res = await patchUser(form);
        if (res.status !== 200) return null;
        this.$message({
          type: 'success',
          message: '修改用户信息成功！'
        });
        return res.data;
      } catch (error) {
        console.error(`patch user error ${error}`);
      }
    },
    // 上传头像
    async putUserAvatar(id, file) {
      try {
        const res = await putUserAvatar(id, file);
        if (res.status !== 200) {
          this.$message({
            type: 'error',
            message: '上传图片失败！'
          });
          return null;
        }
        return res.data;
      } catch (error) {
        console.error(`put user avatar error: ${error}`);
      }
    },
    // 页面逻辑
    // 表单验证
    submitForm(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (!valid) return;
        this.buttonLoading = true;
        const form = this.filterForm({ ...this.form });
        await this.handlePatchUser(form);
        await this.uploadAvatar();
        this.buttonLoading = false;
      });
    },
    // 修改用户信息，并在成功后进行改动本地的数据
    async handlePatchUser(form) {
      const result = await this.patchUser(form);
      if (!result) return;
      setLocalStorge(KEY.USERINFO, result);
    },
    // 上传头像
    async uploadAvatar() {
      if (!this.avatarFile) return;
      const form = new FormData();
      form.append('avatar', this.avatarFile);
      const result = await this.putUserAvatar(this.form.id, form);
      if (!result) return;
      this.form.avatar = result;
      setLocalStorge(KEY.USERINFO, this.form);
    },
    /**
     * 级联选择器获取组织方法
     * @value node节点的value值，这里为每个节点的id值
     * @label 级联选择器显示的文本,对应org的name
     * @leaf 是否到达叶子节点,通过org的childrenCount判断
     */
    async getOrganizationOptions(node, resolve) {
      let { value: parentId } = node;
      if (!parentId) {
        parentId = 1;
      }
      const tempData = await this.getOrganization(parentId);
      const nodes = Array.from(tempData.children).map((x) => ({
        value: x.id,
        label: x.name,
        leaf: x.childrenCount === 0 ? true : false
      }));
      resolve(nodes);
    },
    /**
     * 上传前在前端进行图片显示
     * @windownURL 本地图片url
     * @avatarFile 图片文件二进制流
     */
    beforeAvatarUpload(file) {
      const windownURL = window.URL || window.webkitURL;
      this.src = windownURL.createObjectURL(file);
      this.avatarFile = file;
      return false;
    },
    /**
     * 处理最后需要上传的表单
     * @avatar 将表单的avatar置为空，防止修改头像，因为修改图像使用另一个接口
     * @schoolMajorID 选择器选择时获取的是数组，仅需要最后一个就好。但未修改，则是string。
     */
    filterForm(form) {
      let filteredForm = {};
      form.avatar = null;
      for (const x in form) {
        if (form[x] !== null) {
          filteredForm[x] = form[x];
        }
      }
      if (filteredForm.schoolMajorID) {
        filteredForm.schoolMajorID = typeof form.schoolMajorID !== 'string' ? form.schoolMajorID.pop() : form.schoolMajorID;
      }
      return filteredForm;
    }
  }
};
</script>

  
<style lang="less" scoped>
.info-card {
  margin: 0 auto;
  width: 80%;
  border-radius: 10px;
  .text-button {
    margin-left: 10px;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>