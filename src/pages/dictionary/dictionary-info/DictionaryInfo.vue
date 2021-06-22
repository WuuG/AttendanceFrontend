
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
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="showAddDialog('detailDialog')">添加明细</el-button>
          <el-button>重置</el-button>
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
        <el-table :data="details" border empty-text="暂时没有数据">
          <el-table-column prop="name" label="明细项名"> </el-table-column>
          <el-table-column prop="default" label="默认值"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
          <el-table-column prop="code" label="明细标识"> </el-table-column>
          <el-table-column prop="hidden" label="是否隐藏"> </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index, 'detailDialog')" size="mini">编辑</el-button>
              <el-button type="danger" @click="comfirmDialogVisible = true" size="mini">删除</el-button>
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
    </el-main>

    <comfirm-dialog
      :visible="comfirmDialogVisible"
      @cancel="comfirmDialogVisible = false"
      @comfirm="deletedetail"
      :activeIndex="activeIndex"
    ></comfirm-dialog>

    <detail-dialog
      :visible="DetailDialogVisible"
      :dic-info="details"
      :active="activeObj"
      :isEdit="isEdit"
      @dialog-cancel="DetailDialogVisible = false"
      @submit="addDicDetail"
      ref="detailDialog"
    />
  </div>
</template>

<script>
import { AddForm, patchDictionary } from '../../../network/dictionary';

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
      dicDialogVisible: false,
      dicButtonDisable: false
    };
  },
  components: {
    HeaderBar,
    DicDialog,
    DetailDialog,
    ComfirmDialog
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    // 网络请求方法
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
      this.$refs[refName].form = { ...value };
      this.$refs[refName].buttonDisable(false);
      this.DetailDialogVisible = true;
      this.activeIndex = index;
      this.activeObj = value;
    },
    back() {
      this.$router.push('/dataDictionary');
    },

    // 页面逻辑
    // 初始化获取数据字典信息
    init() {
      this.dicInfo = [JSON.parse(window.localStorage.getItem('dictionary'))];
      const tranformDetails = this.dicInfo[0].details.map((x) => this.transform(x));
      this.details = tranformDetails;
    },
    async modifyDicInfo(data) {
      this.dicTableLoading = true;
      this.dicButtonDisable = true;
      const result = await this.patchDictionary({ ...data });
      this.dicTableLoading = false;
      this.dicButtonDisable = false;
      if (!result) return;
      window.localStorage.setItem('dictionary', JSON.stringify(result));
      this.init();
    },
    // 删除数据字典明细
    deletedetail() {
      this.details.splice(this.activeIndex, 1);
    },
    // 添加字典明细
    addDicDetail(detail) {
      const showDetail = this.transform({ ...detail });
      if (this.isEdit) {
        this.$set(this.details, this.activeIndex, { ...showDetail });
        this.uniqueDefault(this.activeIndex);
        // this.$set(this.activeObj, { ...showDetail });
        console.log(this.details);
        return;
      }
      this.details.push(showDetail);
      this.uniqueDefault(this.details.length - 1);
    },
    transform(data) {
      for (const x in data) {
        if (x !== 'default' && x !== 'hidden') {
          continue;
        }
        data[x] = data[x] == 'true' ? '是' : '否';
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
    sort(oldIndex, newIndex) {
      console.log(this.details);
      const length = this.details.length;
      if (newIndex < 0 || newIndex > length - 1) {
        console.log(1);
        return;
      }
      let temp = this.details[oldIndex];
      this.details[oldIndex] = this.details[newIndex];
      this.details[newIndex] = temp;
      const tempArray = [...this.details];
      this.details = [...tempArray];
    },
    async save() {
      const detailForm = this.$refs.addDictionary.submit('form');
      if (!detailForm) return;
      this.saveButtonLoading = true;
      this.form = { ...detailForm };
      // 这里的对象需要深拷贝，防止修改数组内对象而导致显示的数据发生变化
      this.form.details = this.details.map((x) => {
        return { ...x };
      });
      // 对需要上传的表单进行处理,并获取最后需要上传的数据
      const { form } = new AddForm({ ...this.form });
      const result = await this.addNewDictionaries(form);
      this.saveButtonLoading = false;
      if (!result) return;
      this.$router.replace('/dataDictionary');
      this.reset();
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