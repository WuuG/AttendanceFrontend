<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button>新增</el-button>
        </template>
        <template #right-content>
          <el-button>重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <el-table :data="data" empty-text="暂时没有数据" v-loading="tableLoading" row-key="id">
          <el-table-column prop="name" label="角色名称"> </el-table-column>
          <el-table-column prop="code" label="权限字符" show-overflow-tooltip> </el-table-column>
          <el-table-column label="显示顺序(拖拽排序)">
            <template #default="{ $index }">
              {{ $index }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import HeaderBar from 'components/context/HeaderBar.vue';

export default {
  name: 'Role',
  data() {
    const _this = this;
    return {
      data: [
        {
          id: 0,
          name: '管理员',
          code: 'admin',
          order: 0,
          state: 0
        },
        {
          id: 1,
          name: '教师',
          code: 'teacher',
          order: 1,
          state: 0
        },
        {
          id: 2,
          name: '教师',
          code: 'teacher',
          order: 3,
          state: 0
        }
      ],
      tableLoading: false,
      sortableOptions: {
        animation: 150,
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.data.splice(oldIndex, 1)[0];
          _this.data.splice(newIndex, 0, currRow);
        }
      }
    };
  },
  components: {
    HeaderBar
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    // 挂载拖拽组件
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      Sortable.create(tbody, this.sortableOptions);
    },
    onEdit(index, row) {
      console.log(index, row);
    },
    onDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style lang="less" scoped>
</style>