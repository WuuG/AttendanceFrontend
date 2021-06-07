
<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
      <el-breadcrumb-item>数据子项</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="data-dic-content">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="9" :xs="20" :md="9" :lg="5">
          <el-button @click="back" icon="el-icon-arrow-left" type="primary">返回</el-button>
          <el-button @click="addNewDic">新增</el-button>
          <el-button>批量删除</el-button>
        </el-col>
        <el-col class="search-bar hidden-xs-only" :md="8" :lg="10" :span="12">
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataDicSearch">搜索</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
      <el-row class="table">
        <el-table :data="dicItem" border empty-text="暂时没有数据" @selection-change="selection" @select-all="selectAll">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="id" label="数据ID"> </el-table-column>
          <el-table-column prop="itemKey" label="数据Key"> </el-table-column>
          <el-table-column prop="itemValue" label="数据名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orderValue" label="排序"> </el-table-column>
          <el-table-column prop="display" label="是否显示"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">子项</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="activeForm">
            <el-form-item label="数据名称" :label-width="formLabelWidth">
              <el-input v-model="activeForm.itemValue" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据key" :label-width="formLabelWidth">
              <el-input v-model="activeForm.itemKey"></el-input>
            </el-form-item>
            <el-form-item label="数据排序" :label-width="formLabelWidth">
              <el-input v-model="activeForm.orderValue"></el-input>
            </el-form-item>
            <el-form-item label="默认显示" :label-width="formLabelWidth">
              <el-input v-model="activeForm.defaultValue"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" :label-width="formLabelWidth">
              <el-input v-model="activeForm.display"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savaDicData">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: ''
      },
      dicItem: [
        { id: 0, itemKey: 0, itemValue: '男', orderValue: 0, defaultValue: 0, display: 1 },
        { id: 1, itemKey: 0, itemValue: '女', orderValue: 1, defaultValue: 0, display: 1 }
      ],
      //判断是编辑还是新建。
      isEdit: false,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      activeName: '0',
      dialogFormVisible: false,
      activeForm: { id: '', itemKey: null, itemValue: '', orderValue: null, defaultValue: null, display: null }
    };
  },
  props: {
    userId: String
  },
  methods: {
    addNewDic() {
      this.isEdit = false;
      this.activeForm = { id: '', itemKey: null, itemValue: '', orderValue: null, defaultValue: null, display: null };
      this.dialogFormVisible = true;
    },
    dataDicSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.activeForm = row;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.dicItem.splice(index, 1);
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    selectAll(sel) {
      console.log('selecte all ', this.userId);
      console.log(sel);
    },
    //处理子项tab之间的变化
    childTabClick() {},
    //保存对数据字典数据进行的更改
    savaDicData() {
      if (!this.isEdit) {
        this.activeForm.id = this.dicItem.length + 1;
        this.dicItem.push(this.activeForm);
      } else {
      }
      this.dialogFormVisible = false;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.data-dic-content {
  background-color: #fff;
  min-width: 440px;
  .search-bar {
    display: flex;
    justify-content: flex-end;
  }
  .table {
    padding-top: 10px;
  }
}
</style>