
<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
      <el-breadcrumb-item>数据子项</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button @click="back" icon="el-icon-arrow-left" type="primary">返回</el-button>
          <el-button>批量删除</el-button>
        </template>
        <template #right-content>
          <el-button type="primary">保存</el-button>
          <el-button>重置</el-button>
        </template>
      </header-bar>
      <el-row class="table">
        <el-table :data="dicInfo" border>
          <el-table-column prop="id" label="字典ID"> </el-table-column>
          <el-table-column prop="name" label="字典名称"> </el-table-column>
          <el-table-column prop="des" label="字典描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <el-main class="main-content">
      <el-row class="table">
        <el-table :data="dicItem" border empty-text="暂时没有数据">
          <el-table-column type="index" width="50" label="顺序" align="center"> </el-table-column>
          <el-table-column prop="name" label="数据名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="value" label="参数值"> </el-table-column>
          <el-table-column prop="default" label="默认值"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleItemEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" icon="el-icon-caret-top" @click="sort(scope.$index, scope.$index - 1)"></el-button>
              <el-button size="mini" icon="el-icon-caret-bottom" @click="sort(scope.$index, scope.$index + 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <item-edit-dialog
        :visible="editItemDialogVisible"
        @dialog-cancel="editItemDialogVisible = false"
        @submit="saveItemEdit"
        ref="itemEditDialog"
      ></item-edit-dialog>
    </el-main>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import ItemEditDialog from './child-comps/DicEditDialog.vue';
export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: ''
      },
      //
      dicInfo: [{ id: 0, name: '性别', des: '性别，用于表示男，女等。', createTime: '2020-1-12 12:00:00' }],
      dicItem: [
        { name: '男', value: 0, default: '是' },
        { name: '女', value: 1, default: '否' },
        { name: '未知', value: 2, default: '否' }
      ],
      editItemDialogVisible: false
    };
  },
  props: {
    id: String
  },
  components: {
    HeaderBar,
    ItemEditDialog
  },
  methods: {
    // 网络请求方法
    getDictionary() {
      console.log(this.id);
    },
    // 逻辑方法
    handleEdit(index, row) {
      this.isEdit = true;
      this.activeForm = row;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.dicItem.splice(index, 1);
      console.log(index, row);
    },
    back() {
      this.$router.push('/dataDictionary');
    },
    handleItemEdit(row) {
      this.editItemDialogVisible = true;
      this.$refs['itemEditDialog'].form = { ...row };
    },
    sort(oldIndex, newIndex) {
      console.log(this.dicItem);
      const length = this.dicItem.length;
      if (newIndex < 0 || newIndex > length - 1) {
        console.log(1);
        return;
      }
      let temp = this.dicItem[oldIndex];
      this.dicItem[oldIndex] = this.dicItem[newIndex];
      this.dicItem[newIndex] = temp;
      const tempArray = [...this.dicItem];
      this.dicItem = [...tempArray];
    },
    saveItemEdit(form) {
      if (form.default === '是') {
        this.dicItem.forEach((element) => {
          element.default = '是';
          if (element.value !== form.value) {
            element.default = '否';
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.main-content {
  &:nth-of-type(2) {
    margin-top: 10px;
    .table {
      padding-top: 0;
    }
  }
}
</style>