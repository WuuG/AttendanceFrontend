<template>
  <header-bar>
    <template #left-content>
      <el-col :span="9" :xs="20" :md="9" :lg="10">
        <el-button>批量删除</el-button>
      </el-col>
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
    dataSearch() {}
  }
};
</script>

<style lang="scss" scoped>
</style>