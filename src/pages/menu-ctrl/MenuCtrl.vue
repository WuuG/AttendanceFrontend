<template emplate>
  <div id="menu-control-content">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>基础组件</el-breadcrumb-item>
      <el-breadcrumb-item>拖拽表格</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="success" plain @click="addTopMenu">新增顶层菜单</el-button>
        </template>
        <template #right-content>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <el-row class="custom-tree-node tree-head" type="flex" justify="flex">
        <el-col :span="10">
          <el-col :span="8" class="tree-info">菜单名</el-col>
          <el-col :span="8" class="tree-info">路径名</el-col>
          <el-col :span="8" class="tree-info">菜单图标</el-col>
        </el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <el-row>
        <el-tree
          :data="data"
          :props="{ children: 'subs' }"
          node-key="id"
          @node-drag-end="handleDragEnd"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <template #default="{ node, data }">
            <el-row type="flex" justify="space-between" class="custom-tree-node">
              <el-col :span="10">
                <el-col :span="8">
                  {{ data.title }}
                </el-col>
                <el-col :span="8">
                  {{ data.index }}
                </el-col>
                <el-col :span="8">
                  <i :class="data.icon"></i>
                </el-col>
              </el-col>
              <el-col :span="4" class="tree-buttons">
                <el-button size="mini" @click.stop="() => showEdiedialog(data, node)"> 编辑 </el-button>
                <el-button size="mini" type="success" plain @click.stop="() => showAddDialog(data)" v-if="node.level < 2"> 添加 </el-button>
                <el-button size="mini" type="danger" @click.stop="() => remove(node, data)"> 删除 </el-button>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-row>
    </el-main>

    <add-dialog :visible="addDialogVisible" @cancel="addDialogVisible = false" :parentId="activeMenuData.id" />
    <edit-dialog
      :visible="editDialogVisible"
      @cancel="editDialogVisible = false"
      :activeMenu="activeMenuData"
      @submit="EditDialogSubmit"
    ></edit-dialog>
  </div>
</template>

<script>
import { getMenus } from '../../network/auth/menuCtrl';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './chil-comps/AddDialog.vue';
import EditDialog from './chil-comps/EditDialog.vue';

export default {
  name: 'MenuCtrl',
  data() {
    return {
      data: [],
      activeTreeNode: null,
      // 通信数据
      addDialogVisible: false,
      editDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    EditDialog
  },
  computed: {
    activeMenuData() {
      return this.activeTreeNode ? { ...this.activeTreeNode } : { id: '0' };
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    // 网络请求
    async getMenus() {
      try {
        const result = await getMenus();
        if (result.status === 200) return result.data;
        return false;
      } catch (error) {
        console.error(`get menus error:${error}`);
      }
    },
    // 组件通信
    addTopMenu() {
      this.activeTreeNode = null;
      this.addDialogVisible = true;
    },
    showAddDialog(data) {
      this.activeTreeNode = data;
      this.addDialogVisible = true;
    },
    showEdiedialog(data, node) {
      this.activeTreeNode = data;
      this.editDialogVisible = true;
    },
    // 编辑submit成功后的回调事件
    EditDialogSubmit(data) {
      // 为了本地修改动态显示，因此需要使用set。 直接赋值会失效，为啥呢？
      for (const x in data) {
        this.$set(this.activeTreeNode, x, data[x]);
      }
    },
    // 页面逻辑
    async load() {
      const result = await this.getMenus();
      console.log(result);
      this.data = result;
    },
    remove(node, data) {
      console.log(node, data);
    },

    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      if (dropType === 'none') {
        this.$message({
          type: 'warning',
          message: '只能在同一级别内进行排序'
        });
      }
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type === 'inner' || draggingNode.data.parentId !== dropNode.data.parentId) {
        // console.log(draggingNode, dropNode, type);
        return false;
      }
      return true;
    },
    allowDrag(draggingNode) {
      return true;
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
  .tree-buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style >
#menu-control-content .el-tree-node__content {
  height: 40px;
}
</style>