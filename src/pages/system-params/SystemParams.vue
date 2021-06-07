
<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>系统设置 </el-breadcrumb-item>
      <el-breadcrumb-item>系统参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="data-dic-content">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="9" :xs="20" :md="9" :lg="10">
          <el-button>修改</el-button>
          <el-button>删除</el-button>
        </el-col>
        <el-col class="search-bar hidden-xs-only" :md="8" :lg="10" :span="12">
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataSearch">搜索</el-button>
          <el-button @click="load">重置</el-button>
        </el-col>
      </el-row>
      <el-row class="table">
        <el-table :data="sysParams" empty-text="暂时没有数据" @selection-change="selection" @selection-all="selectAll">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="code" label="配置标识" width="170px"> </el-table-column>
          <el-table-column prop="name" label="配置标题" width="100px" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="value" label="配置参数" width="75px"> </el-table-column>
          <el-table-column prop="paramType" label="参数类型" width="75px" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="description" label="参数描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="range" label="数值范围"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增数据字典" :visible.sync="dialogFormVisible">
          <el-form :model="activeSysParams">
            <el-form-item label="配置ID" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置标题" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置标识" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.flag" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置值" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.configValue" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分组" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.group" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="配置项" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.configChoice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" :label-width="formLabelWidth">
              <el-input v-model="activeSysParams.order" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveSysParams">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { getdictionaries } from 'network/dictionary';
export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: ''
      },
      sysParams: [],
      activeSysParams: {
        id: null,
        name: '',
        flag: '',
        configValue: '',
        type: '',
        group: '',
        configChoice: '',
        order: null
      },
      //判断是编辑还是新建。
      isEdit: false,
      currentIndex: -1,
      //统一设置表单的宽度
      formLabelWidth: '80px',
      //活跃的子项
      activeName: '0',
      dialogFormVisible: false
    };
  },
  created() {
    this.load(0, 10);
  },
  methods: {
    // 网络请求方法
    async getdictionaries(curPage, pageSize) {
      const result = await getdictionaries(curPage, pageSize);
      if (result.status !== 200) {
        this.$message({
          type: 'warning',
          message: `发生错误，错误码为${result.status}`
        });
        return null;
      }
      return result.data;
    },

    // 逻辑方法
    saveSysParams() {
      if (this.isEdit) {
        for (let item in this.activeSysParams) {
          this.sysParams[this.currentIndex][item] = this.activeSysParams[item];
        }
      } else {
        this.sysParams.push(this.activeSysParams);
      }
      this.dialogFormVisible = false;
    },
    dataSearch() {
      console.log('handle search');
    },
    async load(curPage, pageSize) {
      const result = await this.getdictionaries(curPage, pageSize);
      this.sysParams = result;
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.currentIndex = index;
      for (let item in row) {
        this.activeSysParams[item] = row[item];
      }
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.sysParams.splice(index, 1);
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