
<template>
  <div class="course-edit-dialog">
    <el-dialog :title="title" width="400px" :visible.sync="visible" :before-close="cancel">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="课程名称" :label-width="labelWidth" placeholder="请输入课程名称">
          <el-col :span="20">
            <el-input v-model="form.name"> </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程状态" :label-width="labelWidth" prop="value">
          <el-col :span="20">
            <el-select v-model="form.state" placeholder="请选择课程状态">
              <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="课程学期" :label-width="labelWidth">
          <el-col :span="20">
            <el-select v-model="form.semester" placeholder="请选择开课学期">
              <el-option v-for="item in semesterOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="开课院校" :label-width="labelWidth">
          <el-col :span="20">
            <el-cascader v-model="form.schoolMajorID" :props="props" :placeholder="form.schoolMajorName"> </el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="开课教师" :label-width="labelWidth">
          <el-col :span="20">
            <el-input v-model="form.teacherName" placeholder="请输入开课教师名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="labelWidth">
          <el-col :span="24">
            <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :maxlength="100" resize="none">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上传课程封面">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <img v-if="imgURL" :src="imgURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" :disabled="buttonDisable">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getOrganization } from 'network/course/info';

export default {
  data() {
    const _self = this;
    return {
      labelWidth: '90px',
      title: '修改课程',
      form: {
        name: null,
        state: 0,
        semester: null,
        schoolMajorID: null,
        teacherName: null,
        description: null
      },
      stateOptions: [
        { value: 0, label: '开课中' },
        { valeu: 1, label: '未开课' },
        { value: 2, label: '已结课' }
      ],
      semesterOptions: [
        { value: '2020-2021-1', label: '2020-2021-1' },
        { value: '2020-2021-2', label: '2020-2021-2' }
      ],
      // 级联选择器，院校的options
      schoolMajorOptions: [],
      // 级联选择器，选项
      props: {
        lazy: true,
        lazyLoad: _self.getOrganizationOptions
      },
      rules: {
        // value: [{ validator: validateValue, trigger: 'blur' }]
      },
      src: null,
      avatarFile: null
    };
  },
  props: {
    visible: Boolean,
    // 获取父组件的已有的表单数据，用来判重和length处理等
    data: Array,
    // 判断是编辑还是新增的Dialog
    isEdit: Boolean,
    // 获取活跃的明细，来防止判重时，和自己重而报错。
    active: Object,
    buttonDisable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgURL() {
      if (this.src) {
        return this.src;
      }
      if (this.form.avatar) {
        return this.form.avatar;
      }
      return false;
    }
  },
  methods: {
    // 网络方法
    async getOrganization(orgId) {
      try {
        const result = await getOrganization(orgId);
        if (result.status === 200) return result.data;
      } catch (error) {
        console.error(`get organization error: ${error}`);
      }
    },
    // 页面逻辑
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('cancel');
      this.resetForm();
    },
    // 表单验证，并发送submit事件参数为表单内容，并调用cancel()
    submitForm(refName) {
      this.$refs[refName].validate((valid) => {
        if (!valid) return;
        const form = this.filterForm(this.form);
        this.$emit('submit', { ...form }, this.avatarFile);
        this.cancel();
      });
    },
    // 重置表单
    resetForm() {
      for (const propName in this.form) {
        this.form[propName] = null;
        this.src = null;
        if (propName === 'state') {
          this.form[propName] = 0;
        }
        this.avatar = null;
      }
    },
    /**
     * 级联选择器获取组织方法
     * @value node节点的value值，这里为每个节点的id值
     * @label 级联选择器显示的文本,对应org的name
     * @leaf 是否到达叶子节点,通过org的childrenCount判断
     */ // 级联选择器获取组织方法
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
</style>
<style>
.course-edit-dialog .el-dialog__body {
  padding-bottom: 0;
}
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