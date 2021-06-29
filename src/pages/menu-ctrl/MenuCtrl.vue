<template emplate>
  <div id="menu-control-content">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="success" plain @click="addTopMenu">新增顶层菜单</el-button>
        </template>
        <template #right-content>
          <el-button @click="load">重置</el-button>
        </template>
      </header-bar>

      <el-row class="custom-tree-node tree-head" type="flex" justify="flex">
        <el-col>
          <el-col :span="itemSpan" v-for="title in titles" :key="title.id">
            {{ title }}
          </el-col>
        </el-col>
        <div class="tree-buttons">操作</div>
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
          v-loading="treeLoading"
          default-expand-all
        >
          <template #default="{ node, data }">
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
              <div class="tree-buttons">
                <el-button size="mini" @click.stop="() => showEdiedialog(data, node)"> 编辑 </el-button>
                <el-button size="mini" type="success" plain @click.stop="() => showAddDialog(data)" v-if="node.level < 3"> 添加 </el-button>
                <el-button size="mini" type="danger" @click.stop="() => showDeleteDialog(data)"> 删除 </el-button>
              </div>
            </el-row>
          </template>
        </el-tree>
      </el-row>
    </el-main>

    <add-dialog :visible="addDialogVisible" @cancel="addDialogVisible = false" :parentId="activeMenuData.id" @submit="load" />
    <edit-dialog :visible="editDialogVisible" @cancel="editDialogVisible = false" :activeMenu="activeMenuData" @submit="EditDialogSubmit" />
    <delete-dialog
      :visible="deleteDialogVisible"
      :activeMenu="activeMenuData"
      @cancel="deleteDialogVisible = false"
      @comfirm="load"
    ></delete-dialog>
  </div>
</template>

<script>
import { getMenus, putMenuOrders } from '../../network/auth/menuCtrl';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './chil-comps/AddDialog.vue';
import EditDialog from './chil-comps/EditDialog.vue';
import DeleteDialog from './chil-comps/DeleteDialog.vue';

export default {
  name: 'MenuCtrl',
  data() {
    return {
      data: [],
      activeTreeNode: null,
      // 表头标题
      titles: ['菜单名', '路径', '菜单图标'],
      // 通信数据
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      treeLoading: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    EditDialog,
    DeleteDialog
  },
  computed: {
    activeMenuData() {
      return this.activeTreeNode ? { ...this.activeTreeNode } : { id: '0' };
    },
    // 需要显示的菜单项
    itemSpan() {
      return 24 / this.titles.length;
    }
  },
  async mounted() {
    await this.load();
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
    async putMenuOrders(pid, MenuArray) {
      try {
        const res = await putMenuOrders(pid, MenuArray);
        if (res.status === 200) return true;
        return false;
      } catch (error) {
        console.error(`put menu orders error: ${error}`);
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
    showDeleteDialog(data) {
      this.activeTreeNode = data;
      this.deleteDialogVisible = true;
    },
    // 页面逻辑
    async load() {
      this.treeLoading = true;
      const result = await this.getMenus();
      this.treeLoading = false;
      this.data = result;
    },
    /**
     * 再拖拽结束后进行排序处理
     * @dropType 判断同级排序
     * @pid 获取其父亲节点id,若undefined，说明其父亲是顶层节点，也就是0
     * @formArray 其父亲节点所有子节点的排序后的id数组
     */
    async handleDragEnd(draggingNode, dropNode, dropType, ev) {
      if (dropType === 'none') {
        this.$message({
          type: 'warning',
          message: '只能在同一级别内进行排序'
        });
        return;
      }
      const pid = dropNode.parent.key ? dropNode.parent.key : '0';
      const MenuArray = dropNode.parent.childNodes;
      const formArray = MenuArray.map((x) => x.key);
      this.treeLoading = true;
      await this.putMenuOrders(pid, formArray);
      this.treeLoading = false;
    },
    allowDrop(draggingNode, dropNode, type, ev) {
      if (type === 'inner' || draggingNode.data.parentId !== dropNode.data.parentId) {
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
}
.tree-buttons {
  flex: 0 0 200px;
  // justify-content: flex-end;
  text-align: center;
}
</style>
<style >
#menu-control-content .el-tree-node__content {
  height: 40px;
}
</style>