<template>
  <el-row class="table">
    <el-table :data="info" empty-text="暂时没有数据" v-loading="tableLoading">
      <el-table-column prop="name" label="课程名称"> </el-table-column>
      <el-table-column prop="avatar" label="课程头像">
        <template #default="scope">
          <el-avatar shape="square">
            <el-image :src="scope.row.avatar ? scope.row.avatar : ''">
              <template #error>
                <i class="el-icon-picture-outline"></i>
              </template>
            </el-image>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="schoolMajorName" label="大学-学院" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="semester" label="学期" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="stateName" label="课程状态"> </el-table-column>
      <el-table-column prop="teacherName" label="教师名字"> </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template v-slot:default="scope">
          <el-button size="mini" @click="onCourseEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog
      :visible="editDialogVisible"
      :buttonDisable="editDialogButtonDisable"
      @cancel="editDialogVisible = false"
      @submit="modifyCourse"
      ref="editDialog"
    ></edit-dialog>
  </el-row>
</template>

<script>
import { putCourseAvatar, patchCourse } from 'network/course/info';
import { getCourseById } from '../../../../network/course/students';
import CONST from 'utils/const';

import EditDialog from './CourseEditDialog.vue';
export default {
  data() {
    return {
      info: [],
      tableLoading: false,
      baseURL: CONST.IMG_BASEURL,
      // 通信数据
      editDialogVisible: false,
      editDialogButtonDisable: false
    };
  },
  components: { EditDialog },
  props: {
    id: String
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    // 网络方法
    async patchCourse(form) {
      try {
        const result = await patchCourse(form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '课程修改成功'
          });
          return;
        }
      } catch (error) {
        console.error(`patch course error: ${error}`);
      }
    },
    async putAvatar(courseId, form) {
      try {
        const result = await putCourseAvatar(courseId, form);
        if (result.status === 200) return;
      } catch (error) {
        console.error(`put avatar error: ${error}`);
      }
    },
    async getCourseInfo(courseId) {
      try {
        const result = await getCourseById(courseId);
        if (result.status === 200) {
          return result.data;
        }
      } catch (error) {
        console.error(`get course error: ${error}`);
      }
    },
    // 组件通信
    onCourseEdit(row) {
      this.editDialogVisible = true;
      this.$refs['editDialog'].form = { ...row };
    },
    // 页面逻辑
    async load() {
      this.tableLoading = true;
      const result = await this.getCourseInfo(this.id);
      this.info = [{ ...result }];
      this.tableLoading = false;
    },
    async modifyCourse(form, file) {
      if (file) {
        const avatar = new FormData();
        avatar.append('avatar', file);
        await putCourseAvatar(form.id, avatar);
      }
      await this.patchCourse(form);
      this.load();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>