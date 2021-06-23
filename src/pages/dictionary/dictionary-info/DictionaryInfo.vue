
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
          <el-button @click="showAddDialog('detailDialog')">添加明细</el-button>
          <el-button @click="init">刷新</el-button>
        </template>
      </header-bar>
      <el-row class="table">
        <el-table :data="dicInfo" border v-loading="dicTableLoading">
          <el-table-column prop="name" label="字典名称"> </el-table-column>
          <el-table-column prop="code" label="字典标识" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="description" label="字典描述" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template v-slot:default="scope">
              <el-button size="mini" @click="onDicEdit(scope.row, 'dicDialog')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <dic-dialog
      :visible="dicDialogVisible"
      @cancel="dicDialogVisible = false"
      ref="dicDialog"
      @submit="modifyDicInfo"
      :buttonDisable="dicButtonDisable"
    ></dic-dialog>

    <el-main class="main-content">
      <el-row class="table">
        <el-table :data="details" border empty-text="暂时没有数据" v-loading="detailTableLoading">
          <el-table-column prop="name" label="明细项名"> </el-table-column>
          <el-table-column prop="default" label="默认值">
            <template #default="scope">
              {{ scope.row.default ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
          <el-table-column prop="code" label="明细标识"> </el-table-column>
          <el-table-column prop="hidden" label="是否隐藏">
            <template #default="scope">
              {{ scope.row.hidden ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index, 'detailDialog')" size="mini">编辑</el-button>
              <el-button type="danger" @click="showDeleteDialog(scope.row)" size="mini">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="排序" width="150" align="center" v-if="details.length > 1">
            <template v-slot:default="scope">
              <el-button
                size="mini"
                icon="el-icon-caret-top"
                @click="sort(scope.$index, scope.$index - 1)"
                v-if="scope.$index > 0"
                :loading="sortButtonLoading"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-caret-bottom"
                @click="sort(scope.$index, scope.$index + 1)"
                v-if="scope.$index < details.length - 1"
                :loading="sortButtonLoading"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <comfirm-dialog
      :visible="comfirmDialogVisible"
      @cancel="comfirmDialogVisible = false"
      @comfirm="onDeleteDetail"
      :activeIndex="activeIndex"
      :disable="comfirmButtonDisable"
    ></comfirm-dialog>

    <detail-dialog
      :visible="DetailDialogVisible"
      :dic-info="details"
      :active="activeObj"
      :isEdit="isEdit"
      @dialog-cancel="DetailDialogVisible = false"
      @submit="submitDetail"
      ref="detailDialog"
    />
  </div>
</template>

<script>
import {
  patchDictionary,
  patchDetail,
  DetailForm,
  getDictionary,
  dicDetailsSort,
  postDicdetail,
  deleteDicDetail
} from '../../../network/dictionary';

import HeaderBar from 'components/context/HeaderBar.vue';
import DetailDialog from '../common/DetailsDialog.vue';
import DicDialog from './child-comps/DicDialog.vue';
import ComfirmDialog from '../common/ComfirmDialog.vue';

export default {
  name: 'DataDictionary',
  data() {
    return {
      // 页面数据
      dicInfo: [],
      details: [],
      dicTableLoading: false,
      detailTableLoading: false,
      dicButtonDisable: false,
      sortButtonLoading: false,
      // 通信数据
      comfirmDialogVisible: false,
      comfirmButtonDisable: false,
      DetailDialogVisible: false,
      saveButtonLoading: false,
      // 判断是新增还是编辑明细
      isEdit: false,
      // 活跃的索引和活跃的对象
      activeIndex: -1,
      activeObj: {},
      dicDialogVisible: false
    };
  },
  props: {
    id: String
  },
  components: {
    HeaderBar,
    DicDialog,
    DetailDialog,
    ComfirmDialog
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    // 网络请求方法
    // 修改数据字典父类
    async patchDictionary(form) {
      try {
        const result = await patchDictionary(form);
        console.log(result);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '字典父类修改成功！'
          });
          return result.data;
        }
        this.$message({
          type: 'warning',
          message: result.message
        });
        return false;
      } catch (error) {
        console.error(`patch dictionary error ${error}`);
      }
    },
    async patchDetail(dicId, form) {
      try {
        const result = await patchDetail(dicId, form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '数据明细修改成功'
          });
          return result.data;
        }
        this.$message({
          type: 'warning',
          message: result.message
        });
      } catch (error) {
        console.error(`patch detail error: ${error}`);
      }
    },
    async getDictionary(dicId) {
      try {
        const result = await getDictionary(dicId);
        if (result.status === 200) {
          return result.data;
        }
        this.$message({
          type: 'warning',
          message: result.message
        });
      } catch (error) {
        console.error(`get dictionary error: ${error}`);
      }
    },
    async postSort(dicId, form) {
      try {
        const result = await dicDetailsSort(dicId, form);
        if (result.status != 200) {
          this.$message({
            type: 'warning',
            message: result.message
          });
        }
      } catch (error) {
        console.error(`post sort error ${error}`);
      }
    },
    async postDetail(dicId, form) {
      try {
        const result = await postDicdetail(dicId, form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '字典明细添加成功'
          });
          return;
        }
        this.$message({
          type: 'warning',
          message: result.message
        });
      } catch (error) {
        console.error(`post detail error:${error}`);
      }
    },
    async deleteDetail(dicId, detailId) {
      try {
        const result = await deleteDicDetail(dicId, detailId);
        if (result.status == 200) {
          this.$message({
            type: 'success',
            message: '删除字典明细成功'
          });
          return;
        }
        this.$message({
          type: 'warning',
          message: result.message
        });
      } catch (error) {
        console.error(`delte detail error:${error}`);
      }
    },
    // 组件通信
    onDicEdit(row, refName) {
      this.$refs[refName].form = {
        id: row.id,
        name: row.name,
        code: row.code,
        description: row.description
      };
      this.dicDialogVisible = true;
    },
    // 弹出新增明细dialog，并修改内部默认内容。
    showAddDialog(refName) {
      this.isEdit = false;
      this.$refs[refName].form.value = this.details.length;
      this.$refs[refName].buttonDisable(false);
      this.DetailDialogVisible = true;
    },
    // 弹出修改明细dialog，并修改内部内容，并设置活跃明细
    showEditDialog(value, index, refName) {
      this.isEdit = true;
      const inform = this.transform({ ...value });
      console.log(inform);
      this.$refs[refName].form = this.transform({ ...value });
      this.$refs[refName].buttonDisable(false);
      this.DetailDialogVisible = true;
      this.activeIndex = index;
      this.activeObj = value;
    },
    showDeleteDialog(row) {
      this.comfirmDialogVisible = true;
      this.activeObj = row;
    },
    back() {
      this.$router.push('/dataDictionary');
    },

    // 页面逻辑
    // 初始化获取数据字典信息
    async init() {
      (this.dicTableLoading = true), (this.detailTableLoading = true);
      await this.load();
      (this.dicTableLoading = false), (this.detailTableLoading = false);
    },
    async load() {
      const result = await this.getDictionary(this.id);
      this.dicInfo = [result];
      this.details = this.dicInfo[0].details;
    },
    async modifyDicInfo(data) {
      this.dicTableLoading = true;
      this.dicButtonDisable = true;
      const result = await this.patchDictionary({ ...data });
      this.load();
      this.dicButtonDisable = false;
      this.dicTableLoading = false;
      if (!result) return;
    },
    // 删除数据字典明细
    async onDeleteDetail() {
      this.comfirmButtonDisable = true;
      this.detailTableLoading = true;
      await this.deleteDetail(this.id, this.activeObj.id);
      await this.load();
      this.comfirmButtonDisable = false;
      this.detailTableLoading = false;
    },
    // 字典明细提交，根据是否编辑进行处理
    submitDetail(detail) {
      if (this.isEdit) {
        this.editDetail(detail);
        return;
      }
      this.addDetial(detail);
    },
    async editDetail(showDetail) {
      const dicId = this.dicInfo[0].id;
      // 转换获取到的'true'和'false'
      const { form } = new DetailForm(showDetail);
      this.detailTableLoading = true;
      const result = await this.patchDetail(dicId, form);
      this.detailTableLoading = false;
      this.details = result.details;
    },
    async addDetial(detail) {
      const form = this.transform({ ...detail });
      form.order = this.details.length;
      this.detailTableLoading = true;
      await this.postDetail(this.id, form);
      this.load();
      this.detailTableLoading = false;
    },
    // 将ture或者'true' 转换成是与否
    transform(data) {
      for (const x in data) {
        if (x !== 'default' && x !== 'hidden') {
          continue;
        }
        if (data[x] == true || data[x] == false) {
          data[x] = data[x] == true ? 'true' : 'false';
        } else {
          data[x] = data[x] == 'true' ? true : false;
        }
      }
      return data;
    },
    // 字典明细的默认值的排他处理
    uniqueDefault(index) {
      if (this.details.length > 0 && this.details[index].default === '是') {
        this.details.forEach((x, i) => {
          if (i === index) return;
          console.log(`修改时的index：${index}和被修改的i:${i}`);
          x.default = '否';
        });
      }
    },
    // 排序
    async sort(oldIndex, newIndex) {
      const length = this.details.length;
      if (newIndex < 0 || newIndex > length - 1) {
        return;
      }
      const form = this.details.map((x) => x.id);
      let temp = form[oldIndex];
      form[oldIndex] = form[newIndex];
      form[newIndex] = temp;
      this.detailTableLoading = true;
      this.sortButtonLoading = true;
      await this.postSort(this.id, form);
      await this.load();
      this.detailTableLoading = false;
      this.sortButtonLoading = false;
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