<template emplate>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-s-tools"></i>权限管理 </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="data-dic-content">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="9" :xs="20" :md="9" :lg="10">
          <el-button @click="addNewItem">新增</el-button>
          <el-button>修改</el-button>
          <el-button>删除</el-button>
        </el-col>
        <el-col class="search-bar hidden-xs-only" :md="8" :lg="10" :span="12">
          <el-col>
            <el-input prefix-icon="el-icon-search" v-model="query.name"> </el-input>
          </el-col>
          <el-button @click="dataSearch">搜索</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
      <el-row class="table">
        <el-table :data="userData" border empty-text="暂时没有数据" @selection-change="selection" @selection-all="selectAll">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="id" label="用户id"> </el-table-column>
          <el-table-column prop="loginName" label="用户名"> </el-table-column>
          <el-table-column prop="realName" label="真实姓名" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="gender" label="性别"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="academicId" label="学院ID"> </el-table-column>
          <el-table-column prop="schoolMajorName" label="专业"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { getUsers } from 'network/userInfo';
export default {
  name: 'DataDictionary',
  data() {
    return {
      query: {
        key: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      userData: [],
      //判断是编辑还是新建。
      isEdit: false,
      //统一设置表单的宽度
      labelWidth: '80px',
      //活跃的子项
      activeName: '0'
    };
  },
  created() {
    this.getUsers(1, 10);
  },
  activated() {
    this.getUsers(1, 10);
  },
  methods: {
    //后台接口方法
    getUsers(curPage, pageSize) {
      setTimeout(() => {
        getUsers(curPage, pageSize)
          .then((res) => {
            console.log(res);
            this.userData = res.data;
            this.pageTotal = res.data.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 200);
    },
    deletUser(uid) {},
    //前端处理逻辑
    addNewItem() {
      this.isEdit = false;
    },
    dataSearch() {
      console.log('handle search');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //选择时，将被选择的表项记录下来。
    selection(sel) {
      console.log(sel);
    },
    selectAll(sel) {
      console.log(sel);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
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