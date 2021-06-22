<template>
  <el-form :model="dic[0]" ref="form" :rules="rules">
    <el-table :data="dic" empty-text="发生了错误">
      <el-table-column prop="name" label="字典名称">
        <template #default="scope">
          <el-form-item prop="name">
            <el-input v-model="scope.row.name"></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="code" label="字典关键字">
        <template #default="scope">
          <el-form-item prop="code">
            <el-input v-model="scope.row.code"></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="字典描述">
        <template #default="scope">
          <el-form-item prop="description">
            <el-input v-model="scope.row.description"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      dic: [
        {
          code: null,
          name: null,
          description: null
        }
      ],
      rules: {
        code: [{ required: true, message: '字典关键字必填', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 组件通信方法
    // 进行表单验证
    submit(refName) {
      let result = null;
      this.$refs[refName].validate((valid) => {
        if (!valid) return;
        result = { ...this.dic[0] };
      });
      return result;
    },
    reset() {
      for (const p in this.dic[0]) {
        this.dic[0][p] = null;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>