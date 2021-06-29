<template>
  <el-cascader :value="value" :props="props" :placeholder="name" @input="change"> </el-cascader>
</template>

<script>
import { getOrganization } from 'network/course/info';

export default {
  data() {
    const _self = this;
    return {
      // 级联选择器，院校的options
      schoolMajorOptions: [],
      // 级联选择器，选项
      props: {
        lazy: true,
        lazyLoad: _self.getOrganizationOptions
      }
    };
  },
  props: {
    value: String,
    name: String
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
    change(e) {
      const newValue = this.filterOrgId(e);
      this.$emit('input', newValue);
    },
    // 组件逻辑
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
    /**
     * 处理最后需要上传的表单
     * @avatar 将表单的avatar置为空，防止修改头像，因为修改图像使用另一个接口
     * @schoolMajorID 选择器选择时获取的是数组，仅需要最后一个就好。但未修改，则是string。
     */
    filterOrgId(orgId) {
      if (!orgId) return '';
      return orgId !== 'string' ? orgId.pop() : orgId;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>