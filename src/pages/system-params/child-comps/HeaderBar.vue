<template>
  <div>
    <header-bar>
      <template #left-content>
        <el-button @click="addNewParams">新增</el-button>
        <el-button @click="comfirmVisible = true">批量删除</el-button>
      </template>
      <template #right-content>
        <!-- <el-col>
          <el-input prefix-icon="el-icon-search" v-model="queryName"> </el-input>
        </el-col>
        <el-button @click="dataSearch">搜索</el-button> -->
        <el-button @click="load">重置</el-button>
      </template>
    </header-bar>
    <comfirm-dialog :visible.sync="comfirmVisible" @comfirm="handleComfirm"> </comfirm-dialog>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import ComfirmDialog from './HeaderDeleteDialog.vue';

import { deleteParam } from 'network/systemParams';
export default {
  name: 'SystemParamsHeaderBar',
  data() {
    return {
      queryName: null,
      comfirmVisible: false
    };
  },
  components: {
    HeaderBar,
    ComfirmDialog
  },
  props: {
    params: Array
  },
  methods: {
    // 网络方法
    async deleteParams() {
      try {
        await Promise.all(
          this.params.map((param) => {
            return deleteParam(param);
          })
        );
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.load();
      } catch (error) {
        console.log(`delete params error:${error}`);
      }
    },
    // 页面逻辑
    // 通信方法
    load() {
      this.$emit('load');
    },
    addNewParams() {
      this.$emit('add-new');
    },
    // 组件内方法
    // dataSearch() {},
    handleComfirm() {
      this.deleteParams();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>