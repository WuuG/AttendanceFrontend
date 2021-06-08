<template>
  <el-row type="flex" :gutter="20" justify="space-between">
    <el-col :span="9" :xs="20" :md="9" :lg="10">
      <slot name="left-content">
        <el-button>删除</el-button>
      </slot>
    </el-col>
    <slot name="mid-content"></slot>
    <el-col class="search-bar hidden-xs-only" :md="12" :lg="10" :span="12">
      <slot name="right-content">
        <el-col>
          <el-input prefix-icon="el-icon-search" v-model="query"> </el-input>
        </el-col>
        <el-button>搜索</el-button>
        <el-button>重置</el-button>
      </slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      query: null
    };
  }
};
</script>

<style lang="less" scoped>
.search-bar {
  display: flex;
  justify-content: flex-end;
}
</style>