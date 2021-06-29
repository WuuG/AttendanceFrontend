<template>
  <el-dialog title="删除用户" :visible.sync="visible" width="400px" @open="open" :before-close="handleClose">
    <span>确定删除 {{ name }} 吗？</span>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="handleComfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteCourse } from 'network/course/info';
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    visible: Boolean,
    active: Object
  },
  computed: {
    name() {
      return this.active ? this.active.name : '';
    }
  },
  methods: {
    // 网络方法
    async deleteCourse(courseId) {
      try {
        const result = await deleteCourse(courseId);
        if (result.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '课程删除成功'
        });
        return true;
      } catch (error) {
        console.error(`delete Course error:${error}`);
      }
    },
    async ondeleteCourse() {
      const result = await this.deleteCourse(this.active.id);
      if (!result) return;
      this.handleClose();
      this.$emit('comfirm');
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    async handleComfirm() {
      this.loading = true;
      await this.ondeleteCourse();
      this.loading = false;
    },
    open() {
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>