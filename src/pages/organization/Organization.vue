<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织架构</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="showAddDialog(false)">新增组织</el-button>
          <el-button @click="tempDialogVisible = true">删除</el-button>
        </template>
        <template #right-content>
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.key"> </el-input>
          </el-col>
          <el-button @click="dataSearch">搜索</el-button>
          <el-button @click="reset">重置</el-button>
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
          <el-table-column prop="level" label="节点层级" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="id" label="节点id" show-overflow-tooltip> </el-table-column>
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

      <temp-dialog :visible="tempDialogVisible" @cancel="tempDialogVisible = false"></temp-dialog>
    </el-main>

    <add-dialog
      :visible="addDialogVisible"
      @cancel="addDialogVisible = false"
      :parentId="parentId"
      @submit="addReloadOrganization"
      @before-submit="setButtonLoading"
    ></add-dialog>

    <delete-dialog
      :visible="deleteDialogVisible"
      @cancel="deleteDialogVisible = false"
      :organization="organization"
      @before-comfirm="setButtonLoading"
      @comfirm="deleteReloadOrganization"
    ></delete-dialog>

    <edit-dialog
      :visible="editDialogVisible"
      :organization="organization"
      @cancel="editDialogVisible = false"
      @before-submit="setButtonLoading"
      @submit="editeReloadOrganization"
    ></edit-dialog>
  </div>
</template>

<script>
import { getOrganization, getSchools, SearchParams } from '../../network/auth/organization';

import HeaderBar from 'components/context/HeaderBar.vue';
import TempDialog from '../../components/context/ConfirmDialog.vue';
import AddDialog from './chil-comps/AddDialog.vue';
import DeleteDialog from './chil-comps/deleteDialog.vue';
import EditDialog from './chil-comps/EditDialog.vue';
export default {
  name: 'Organization',
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
      editDialogVisible: false,
      tempDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    DeleteDialog,
    EditDialog,
    TempDialog
  },
  computed: {
    parentId() {
      const parentId = this.activeOrganization ? this.activeOrganization.id : this.initId;
      return parentId;
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
    async getSchools(curPage, pageSize, params) {
      try {
        const upParams = new SearchParams(params);
        const result = await getSchools(curPage, pageSize, upParams);
        if (result.data.childrenWrapper) {
          return result.data.childrenWrapper;
        }
        this.data = [];
      } catch (error) {
        console.error(`get schools error:${error}`);
      }
    },
    // 组件通信
    /**
     * 显示添加Dialog，需要判断其是否添加的是否是最大类。
     * 新增组织@row false 添加组织@row 传入row
     * @row 注意这里的row 若是按钮不传参数的话，会传入鼠标点击事件。
     */
    showAddDialog(row) {
      this.addDialogVisible = true;
      this.activeOrganization = row ? row : null;
      this.activeOrganization = row;
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
    setButtonLoading(bool) {
      if (!this.activeOrganization) return;
      this.$set(this.activeOrganization, 'loading', bool);
    },
    // 页面逻辑
    /**
     * 获取组织架构
     * @result 所有学校的数据
     * @length 若是最后一个数据删除后，索引减一
     */
    async load() {
      this.tableLoading = true;
      if (this.data.length === 1) {
        this.query.pageIndex--;
      }
      const result = await this.getSchools(this.query.pageIndex, this.query.pageSize, this.query);
      this.tableLoading = false;
      if (!result) return;
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
        item.hasChildren = false;
        if (item.childrenCount > 0) {
          item.hasChildren = true;
        }
        if (level !== 0 && !level) return;
        item.level = level;
      });
      return temp;
    },
    /**
     * 在添加后进行懒加载的更新
     * @id 要么是自己，要么是其父亲节点的id。通过是否在this.treeMap中进行判断
     * @reloadTreeArray 需要进行更新的节点相关数据的对象数组
     * @number 添加时只需要进行一次懒加载
     * @level 根据lever进行判断是否要进行数据的修改，不发请求，直接本地修改。通过hasChildren和children字段来使其可以展开
     */
    async addReloadOrganization() {
      if (!this.activeOrganization) {
        this.load();
        return;
      }
      let { id, parentId, childrenCount, level } = this.activeOrganization;
      if (level === 0) {
        this.$set(this.activeOrganization, 'childrenCount', childrenCount + 1);
        this.$set(this.activeOrganization, 'hasChildren', true);
        this.$set(this.activeOrganization, 'children', [{ id: 1, name: '骗人字段' }]);
      }
      id = this.treeMap.get(id) ? id : parentId;
      const reloadTreeArray = this.recurveGetTreeArray(id, [], 1);
      await this.reloadTree(reloadTreeArray);
      this.setButtonLoading(false);
    },
    deleteReloadOrganization() {
      const { id, parentId } = this.activeOrganization;
      this.treeMap.delete(id);
      if (parentId === this.initId) {
        this.load();
        return;
      }
      const { tree } = this.treeMap.get(parentId);
      let reloadTreeArray = [];
      if (this.tableState.lazyTreeNodeMap[tree.id].length === 1) {
        this.$set(this.tableState.lazyTreeNodeMap, tree.id, []);
      } else {
        reloadTreeArray = this.recurveGetTreeArray(tree.id, [], 1);
      }
      this.reloadTree(reloadTreeArray);
    },
    editeReloadOrganization(form) {
      this.activeOrganization.name = form.name;
      this.setButtonLoading(false);
    },
    /**
     * 递归获取存在 treeMap中的三个参数,并存下两个map用于以后处理
     * @initId 最外层id，到达后退出数组
     * @treeMap 存储懒加载树的相关参数
     * @treeArray 存储需要进行reload的懒加载树
     * @number 需要获取的最大数组个数
     */
    recurveGetTreeArray(id, treeArray, number) {
      if (this.treeMap.size === 0 || id == this.initId || treeArray.length > number) {
        return treeArray;
      }
      const { tree, resolve } = this.treeMap.get(id);
      treeArray.push({ tree, resolve });
      this.recurveGetTreeArray(tree.parentId, treeArray, number);
      return treeArray;
    },
    /**
     * 根据array对懒加载树进行load
     * @tree 树节点 @resolve 在该节点下添加数据的函数 @level 该节点层数
     */
    async reloadTree(array) {
      for (const treeParams of array) {
        const { tree, resolve } = treeParams;
        const { level } = tree;
        const orgArr = await this.getOrganization(tree.id);
        const filterdOrgArr = this.setTreeParams(orgArr, level + 1);
        resolve(filterdOrgArr);
      }
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
    },
    dataSearch() {
      this.query.pageIndex = 1;
      this.load();
    },
    reset() {
      this.query.pageIndex = 1;
      this.query.key = '';
      this.load();
    }
  }
};
</script>
<style lang="less" scoped>
</style>