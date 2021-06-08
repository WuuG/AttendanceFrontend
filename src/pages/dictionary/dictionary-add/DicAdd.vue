<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
      <el-breadcrumb-item>新增数据字典</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-content">
      <header-bar>
        <template #left-content>
          <el-button type="primary" @click="toDictionary">返回</el-button>
        </template>
        <template #right-content>
          <el-button type="primary">保存</el-button>
          <el-button @click="showAddDialog">添加字典明细</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </header-bar>
      <el-row class="table">
        <dic-table></dic-table>
      </el-row>
    </el-main>

    <el-main class="main-content">
      <el-row class="table">
        <el-table :data="dicInfo" empty-text="暂时没有数据">
          <el-table-column prop="name" label="明细项名"> </el-table-column>
          <el-table-column prop="default" label="默认值"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
          <el-table-column prop="description" label="明细项描述" show-overflow-tooltip> </el-table-column>
          <el-table-column>
            <template #default="scope">
              <el-button>编辑</el-button>
              <el-button type="danger" @click="deleteDicInfo(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <add-dic-info-dialog
      :visible="addNewInfoDialogVisible"
      :dic-info="dicInfo"
      @dialog-cancel="addNewInfoDialogVisible = false"
      @submit="addNewDicInfo"
      ref="addDialog"
    ></add-dic-info-dialog>
  </div>
</template>

<script>
import HeaderBar from 'components/context/HeaderBar.vue';
import DicTable from './chid-comps/DicAddTable.vue';
import AddDicInfoDialog from './chid-comps/AddDicInfo.vue';
export default {
  name: 'DataDictionary',
  data() {
    return {
      dicInfo: [],
      addNewInfoDialogVisible: false
    };
  },
  components: {
    HeaderBar,
    DicTable,
    AddDicInfoDialog
  },
  methods: {
    toDictionary() {
      this.$router.push('dataDictionary');
    },
    addNewDicInfo(dicInfo) {
      this.dicInfo.push(dicInfo);
    },
    deleteDicInfo(index) {
      this.dicInfo.splice(index, 1);
    },
    showAddDialog() {
      this.$refs['addDialog'].form.value = this.dicInfo.length;
      this.addNewInfoDialogVisible = true;
    },
    reset() {
      this.$router.go(0);
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