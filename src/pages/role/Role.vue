<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="addDialogVisible = true" type="success" plain>新增</el-button>
        </template>
        <template #right-content>
          <el-button @click="load">刷新</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table :data="data" empty-text="暂时没有数据" v-loading="tableLoading" row-key="id">
          <el-table-column prop="name" label="角色名称"> </el-table-column>
          <el-table-column prop="code" label="权限标识" show-overflow-tooltip> </el-table-column>
          <el-table-column label="显示顺序(拖拽排序)">
            <template #default="{ $index }">
              {{ $index }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" type="primary" plain @click="moreOpera(scope.row)">更多操作</el-button>
              <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
    <add-dialog :visible="addDialogVisible" @cancel="addDialogVisible = false" @submit="load"></add-dialog>
    <delete-dialog
      :visible="deleteDialogVisible"
      @cancel="deleteDialogVisible = false"
      @comfirm="load"
      :active="activeData"
    ></delete-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { getRole } from 'network/auth/role';
import { setLocalStorge, KEY } from '../../utils/localStorge';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDialog from './child-comps/AddDialog.vue';
import DeleteDialog from './child-comps/DeleteDialog.vue';

export default {
  name: 'Role',
  data() {
    const _this = this;
    return {
      data: [],
      tableLoading: false,
      sortableOptions: {
        animation: 150,
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.data.splice(oldIndex, 1)[0];
          _this.data.splice(newIndex, 0, currRow);
        }
      },
      //通信数据
      active: null,
      addDialogVisible: false,
      deleteDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    AddDialog,
    DeleteDialog
  },
  computed: {
    activeData() {
      return this.active ? { ...this.active } : {};
    }
  },
  mounted() {
    this.load();
    this.rowDrop();
  },
  methods: {
    // 网络请求
    async getRole() {
      try {
        const res = await getRole();
        if (res.status !== 200) {
          return null;
        }
        return res.data;
      } catch (error) {
        console.error(`get role error:${error}`);
      }
    },
    // 挂载拖拽组件
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      Sortable.create(tbody, this.sortableOptions);
    },
    async load() {
      this.tableLoading = true;
      const result = await this.getRole();
      this.tableLoading = false;
      if (!result) return;
      this.data = result;
    },
    moreOpera(row) {
      console.log(row);
      setLocalStorge(KEY.ROLE, row);
      this.$router.push({
        // 这里无法使用path传参,只能用name。 path只能用拼接id的方法
        // path: '/auth/role/users',
        name: 'roleUsers',
        params: { id: row.id }
      });
    },
    onDelete(row) {
      this.active = row;
      this.deleteDialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
</style>