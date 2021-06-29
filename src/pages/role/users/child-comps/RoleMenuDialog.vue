<template>
  <el-dialog :title="title" width="700px" :visible.sync="visible" :before-close="cancel" @open="open">
    {{ roleId }}
    <el-row class="custom-tree-node tree-head" type="flex" justify="flex">
      <el-col>
        <el-col :span="itemSpan" v-for="title in titles" :key="title.id">
          {{ title }}
        </el-col>
      </el-col>
    </el-row>
    <el-tree
      :data="data"
      :props="{ children: 'subs' }"
      node-key="id"
      default-expand-all
      show-checkbox
      :default-checked-keys="checkedTree"
      v-loading="treeLoading"
      ref="tree"
      check-strictly
    >
      <template #default="{ data }">
        <el-row type="flex" justify="space-between" class="custom-tree-node">
          <el-col>
            <el-col :span="itemSpan">
              {{ data.title }}
            </el-col>
            <el-col :span="itemSpan">
              {{ data.index }}
            </el-col>
            <el-col :span="itemSpan">
              <i :class="data.icon"></i>
            </el-col>
          </el-col>
        </el-row>
      </template>
    </el-tree>
    <template #footer>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="buttonLoading">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getMenus } from 'network/auth/menuCtrl';
import { getRoleMenus, postRoleMenus } from '../../../../network/auth/role';
export default {
  data() {
    // value的表单验证。
    // const validateValue = (rule, value, callback) => {
    // };
    return {
      labelWidth: '90px',
      title: '选择需要显示的菜单',
      form: {
        name: null,
        default: 'false',
        value: null,
        code: null,
        hidden: 'false'
      },
      rules: {
        // value: [{ validator: validateValue, trigger: 'blur' }]
      },
      // 表头标题
      titles: ['菜单名', '路径', '菜单图标'],
      data: [],
      dataSet: new Set(),
      checkedTree: [],
      buttonLoading: false,
      treeLoading: false
    };
  },
  props: {
    // 通过.sync 处理
    visible: Boolean,
    // 获取活跃的明细，来防止判重时，和自己重而报错。
    roleId: String
  },
  computed: {
    // 需要显示的菜单项
    itemSpan() {
      return 24 / this.titles.length;
    }
  },
  async created() {
    this.treeLoading = true;
    await this.loadAllMenus();
    await this.loadRoleMenus();
    this.treeLoading = false;
  },
  methods: {
    // 网络请求
    // 获取所有菜单
    async getMenus() {
      try {
        const result = await getMenus();
        if (result.status === 200) return result.data;
        return false;
      } catch (error) {
        console.error(`get menus error:${error}`);
      }
    },
    // 获取用户菜单
    async getRoleMenus(roleId) {
      try {
        const res = await getRoleMenus(roleId);
        if (res.status === 200) return res.data;
        return false;
      } catch (error) {
        console.error(`get role menus error:${error}`);
      }
    },
    // 修改用户菜单
    async postRoleMenus(roleId, menuArray) {
      try {
        const res = await postRoleMenus(roleId, menuArray);
        console.log(res);
        if (res.status !== 200) return false;
        this.$message({
          type: 'success',
          message: '修改角色菜单成功'
        });
        return true;
      } catch (error) {
        console.error(`post role menus error:${error}`);
      }
    },
    // 页面逻辑
    // 获取所有菜单
    async loadAllMenus() {
      const result = await this.getMenus();
      this.data = result;
      this.flatTreeData(this.data);
    },
    // 获取用户菜单，并选中已有菜单
    async loadRoleMenus() {
      const res = await this.getRoleMenus(this.roleId);
      if (!res) return;
      this.checkedTree = res.content.map((x) => x.id);
    },
    async editRoleMenus() {
      const roleMenu = this.$refs.tree.getCheckedKeys();
      this.buttonLoading = true;
      const result = await this.postRoleMenus(this.roleId, roleMenu);
      this.buttonLoading = false;
      if (!result) return;
      this.cancel();
    },
    flatTreeData(data) {
      for (const x of data) {
        if (x.subs.length > 0) {
          this.flatTreeData(x.subs);
        }
        this.dataSet.add(x.id);
      }
    },
    // 通信事件
    // 发送关闭dialog事件，按钮处理和reset表单
    cancel(done) {
      this.$emit('update:visible', false);
      this.buttonLoading = false;
      this.resetForm();
    },
    async submit(refName) {
      await this.editRoleMenus();
    },
    // 重置表单
    resetForm() {
      for (const propName in this.form) {
        this.form[propName] = null;
      }
    },
    open() {
      this.buttonLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.tree-head {
  margin: 10px 0 10px 0;
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f7fa;
  height: 40px;
  border-bottom: 1px solid rgba(230, 230, 230, 0.3);
}
.custom-tree-node {
  flex: 1;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}
.tree-buttons {
  flex: 0 0 200px;
  // justify-content: flex-end;
  text-align: center;
}
</style>
