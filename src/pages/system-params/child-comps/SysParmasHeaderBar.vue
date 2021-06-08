<template>
  <header-bar>
    <template #left-content>
      <el-button @click="addNewParams">新增</el-button>
      <el-button>批量删除</el-button>
    </template>
    <template #right-content>
      <el-col>
        <el-input prefix-icon="el-icon-search" v-model="queryName"> </el-input>
      </el-col>
      <el-button @click="dataSearch">搜索</el-button>
      <el-button @click="load">重置</el-button>
    </template>
  </header-bar>
</template>

<script>
import HeaderBar from 'components/context/HeadrBar.vue';
export default {
  name: 'SystemParamsHeaderBar',
  data() {
    return {
      queryName: null
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    load() {
      this.$emit('load');
    },
    dataSearch() {},
    addNewParams() {
      this.$emit('add-new');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>