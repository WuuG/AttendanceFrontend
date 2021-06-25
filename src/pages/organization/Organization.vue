<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织架构</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="showAddDialog">新增组织</el-button>
          <el-button @click="deleteSelectedItem">删除</el-button>
        </template>
        <template #right-content>
          <el-button @click="load">重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table
          ref="table"
          :data="data"
          empty-text="暂时没有数据"
          @selection-change="selection"
          v-loading="tableLoading"
          row-key="id"
          lazy
          :load="loadOrganization"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="学校名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="childrenCount" label="子节点数量" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="id" label="学校id" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="level" label="层级" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="loading" label="加载" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.loading ? 'true' : 'false' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="showEditDialog(scope.row)" :loading="scope.row.loading">编辑</el-button>
              <el-button
                size="mini"
                :disabled="scope.row.level > 1"
                :loading="scope.row.loading"
                @click="showAddDialog(scope.row)"
                type="success"
                plain
                >添加</el-button
              >
              <el-button size="mini" type="danger" @click="showDeleteDialog(scope.row)" :loading="scope.row.loading">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-row>
        <el-col>
          <div class="pagination">
            <el-pagination
              background
              layout="total,-> ,prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>

    <add-dialog
      :visible="addDialogVisible"
      @cancel="addDialogVisible = false"
      :parentId="parentId"
      @submit="reloadOrganization"
      @before-submit="setButtonLoading"
    ></add-dialog>

    <delete-dialog
      :visible="deleteDialogVisible"
      @cancel="deleteDialogVisible = false"
      :organization="organization"
      @comfirm="deleteReloadOrganization"
      @before-comfirm="setButtonLoading"
    ></delete-dialog>

    <edit-dialog :visible="editDialogVisible" :organization="organization" @cancel="editDialogVisible = false"></edit-dialog>
  </div>
</template>

<script>
import { getOrganization, getSchools } from '../../network/auth/organization';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './chil-comps/AddDialog.vue';
import DeleteDialog from './chil-comps/deleteDialog.vue';
import EditDialog from './chil-comps/EditDialog.vue';
export default {
  name: 'DataDictionary',
  data() {
    return {
      // 表格页面pagenation的参数
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      data: [],
      initId: '1',
      tableLoading: false,
      activeOrganization: null,
      treeMap: new Map(),
      //通信数据
      addDialogVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    DeleteDialog,
    EditDialog
  },
  computed: {
    parentId() {
      return this.activeOrganization ? this.activeOrganization.id : this.initId;
    },
    organization() {
      return this.activeOrganization ? { ...this.activeOrganization } : {};
    },
    tableState() {
      return this.$refs.table ? this.$refs.table.store.states : {};
    }
  },
  created() {
    this.load();
  },
  methods: {
    async getOrganization(id) {
      try {
        const result = await getOrganization(id);
        return result.data.children;
      } catch (error) {
        console.error(`get organization error:${error}`);
      }
    },
    async getSchools(curPage, pageSize, form) {
      try {
        const result = await getSchools(curPage, pageSize, form);
        return result.data.childrenWrapper;
      } catch (error) {
        console.error(`get schools error:${error}`);
      }
    },
    // 组件通信
    showAddDialog(row) {
      if (row) {
        this.activeOrganization = row;
        this.addDialogVisible = true;
        return;
      }
      this.activeOrganization.id = this.initId;
    },
    showEditDialog(row) {
      this.activeOrganization = row;
      this.editDialogVisible = true;
    },
    showDeleteDialog(row) {
      this.activeOrganization = row;
      this.deleteDialogVisible = true;
    },
    // 设置按钮loading,因为本身没有loading，所以需要使用this.$set
    setButtonLoading() {
      this.$set(this.activeOrganization, 'loading', true);
    },
    // 页面逻辑
    /**
     * 获取组织架构
     * @result 所有学校的数据
     */
    async load() {
      this.tableLoading = true;
      const result = await this.getSchools(this.query.pageIndex, this.query.pageSize);
      this.tableLoading = false;
      this.data = result.content;
      this.data = this.setTreeParams(this.data, 0);
      this.pageTotal = result.total;
    },
    /**
     * 对展开的tree节点所对饮的tree，treeNode，resolve进行存储。待之后使用
     * 并通过当前节点层级，对其子节点进行层级赋值
     * @treeMap 以id作为key进行存储的Map,存储tree,treeNode,resolve
     * @level 获取当前节点的层级
     * @id 当前节点id
     * @result 当前节点下所有子节点的数组
     * @children 进行处理后的子节点数组
     */
    async loadOrganization(tree, treeNode, resolve) {
      const { level } = tree;
      const id = tree.id;
      this.treeMap.set(id, { tree, treeNode, resolve });
      const result = await this.getOrganization(tree.id);
      const children = this.setTreeParams(result, level + 1);
      resolve(children);
    },
    /**
     * 对获取到的数据进行处理，添加参数
     * @hasChildren 在table中用以判断其是否有子节点。根据childrenCount来判断
     * @level 节点层级
     */
    setTreeParams(data, level) {
      const temp = Array.from(data);
      temp.forEach((item) => {
        if (item.childrenCount > 0) {
          item.hasChildren = true;
        }
        if (level !== 0 && !level) return;
        item.level = level;
      });
      return temp;
    },
    /**
     * 对已经存在懒加载书树中的数据进行更新，用之前存下来的三个参数，进行前端界面的处理。
     * @treeParam 获取之前存取的关于tree的三个参数
     * @result 以tree.id 所获取子节点数据
     * @loading 结束按钮loading的状态
     */
    async reloadOrganization() {
      if (this.activeOrganization.level === 0) {
        await this.load();
      }
      for (const x in this.tableState.lazyTreeNodeMap) {
        const treeParam = this.treeMap.get(x);
        if (!treeParam) break;
        const { tree, resolve } = treeParam;
        const { level } = tree;
        const result = await this.getOrganization(tree.id);
        if (!result) break;
        const children = this.setTreeParams(result, level + 1);
        await resolve(children);
      }
      this.$set(this.activeOrganization, 'loading', false);
    },
    // 删除节点时，判断其父亲节点在删除了一个子节点后，是否还能展开，若不能展开就将其子节点设为空。 并在treeMap中删去被删除节点所存储的参数。最后进行reload
    async deleteReloadOrganization() {
      const parentId = this.organization.parentId;
      const length = this.$refs.table.store.states.lazyTreeNodeMap[parentId].length - 1;
      if (!length) {
        this.$set(this.$refs.table.store.states.lazyTreeNodeMap, parentId, []);
        this.treeMap.delete(this.organization.id);
      }
      this.reloadOrganization();
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    // 删除已选
    deleteSelectedItem() {},
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.load();
    }
  }
};
</script>
<style lang="less" scoped>
</style>