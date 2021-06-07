<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="data-dic-content">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="9" :xs="20" :sm="12" :md="9" :lg="10">
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
        <el-table :data="dicInfo" border empty-text="暂时没有数据" @selection-change="selection" @selection-all="selectAll">
          <el-table-column type="selection" align="center"></el-table-column>
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
        <el-dialog title="新增数据字典" :visible.sync="dialogFormVisible">
          <el-form :model="activeDicInfo">
            <el-form-item label="字典id" :label-width="formLabelWidth">
              <el-input v-model="activeDicInfo.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="activeDicInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="字典描述" :label-width="formLabelWidth">
              <el-input v-model="activeDicInfo.des" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveDicInfo">确 定</el-button>
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
      dicInfo: [
        {
          id: 0,
          name: '性别',
          des: '性别，用于表示男，女等。',
          createTime: '2020-1-12 12:00:00'
        },
        {
          id: 1,
          name: '签到形式',
          des: '签到的不同形式',
          createTime: '2020-1-12 12:00:00'
        }
      ],
      activeDicInfo: {
        id: null,
        name: '',
        des: ''
      },
      //判断是编辑还是新建。
      isEdit: false,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      activeName: '0',
      dialogFormVisible: false
    };
  },
  methods: {
    addNewDic() {
      this.activeDicInfo = { id: null, name: '', des: '' };
      this.isEdit = false;
      this.dialogFormVisible = true;
    },
    saveDicInfo() {
      this.activeDicInfo.createTime = '2021-4-12 23:12:12';
      this.dicInfo.push(this.activeDicInfo);
      this.dialogFormVisible = false;
    },
    dataDicSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.$router.push('/dicChildData/' + row.id);
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.dicInfo.splice(index, 1);
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    selectAll(sel) {
      console.log(sel);
    },
    //处理子项tab之间的变化
    childTabClick() {}
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