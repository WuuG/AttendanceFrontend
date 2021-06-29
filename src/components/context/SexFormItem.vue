<template>
  <el-select :value="value" placeholder="请选择性别" @input="change($event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import { getDictionaryByCode } from '../../network/dictionary';
export default {
  name: 'SexFormItem',
  data() {
    return {
      options: []
    };
  },
  // model: {
  //   prop: 'genderValue',
  //   event: 'change'
  // },
  props: {
    value: Number
  },
  created() {
    this.loadOptions();
  },
  methods: {
    // 网络方法
    async getDictionaryByCode(code) {
      try {
        const res = await getDictionaryByCode(code);
        if (res.status !== 200) {
          return null;
        }
        return res.data;
      } catch (error) {
        console.error(`get dictionary by code error ${error}`);
      }
    },
    // 组件逻辑
    async loadOptions() {
      const result = await this.getDictionaryByCode('sex');
      this.options = result.details.map((x) => ({
        value: x.value,
        label: x.name
      }));
    },
    change: function (val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="less" scoped>
</style>