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
          <el-button type="primary" @click="save" :loading="saveButtonLoading">保存</el-button>
          <el-button @click="showAddDialog">添加字典明细</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </header-bar>

      <el-row class="table">
        <add-dictionary ref="addDictionary" />
      </el-row>
    </el-main>

    <el-main class="main-content">
      <el-row class="table">
        <el-table :data="details" empty-text="暂时没有数据">
          <el-table-column prop="name" label="明细项名"> </el-table-column>
          <el-table-column prop="default" label="默认值"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
          <el-table-column prop="code" label="明细标识"> </el-table-column>
          <el-table-column prop="hidden" label="是否隐藏"> </el-table-column>
          <el-table-column>
            <template #default="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index)">编辑</el-button>
              <el-button type="danger" @click="deletedetail(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <add-detail-dialog
      :visible="addNewInfoDialogVisible"
      :dic-info="details"
      :active="activeObj"
      :isEdit="isEdit"
      @dialog-cancel="addNewInfoDialogVisible = false"
      @submit="addDicDetail"
      ref="addDialog"
    ></add-detail-dialog>
  </div>
</template>

<script>
import { postDictionaries, AddForm } from '../../../network/dictionary';

import HeaderBar from 'components/context/HeaderBar.vue';
import AddDictionary from './chid-comps/DicForm.vue';
import AddDetailDialog from '../common/DetailsDialog.vue';

export default {
  name: 'DataDictionary',
  data() {
    return {
      details: [],
      addNewInfoDialogVisible: false,
      form: {},
      saveButtonLoading: false,
      // 判断是新增还是编辑明细
      isEdit: false,
      // 活跃的索引和活跃的对象
      activeIndex: -1,
      activeObj: {}
    };
  },
  components: {
    HeaderBar,
    AddDictionary,
    AddDetailDialog
  },
  methods: {
    // 网络方法
    async addNewDictionaries(form) {
      try {
        console.log(form);
        const result = await postDictionaries(form);
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '数据字典添加成功'
          });
          return true;
        }

        return false;
      } catch (error) {
        console.error(`page:add new Dictionary error:${error}`);
      }
    },

    // 组件通信方法
    // 弹出新增明细dialog，并修改内部默认内容。
    showAddDialog() {
      this.isEdit = false;
      this.$refs['addDialog'].form.value = this.details.length;
      this.$refs['addDialog'].buttonDisable(false);
      this.addNewInfoDialogVisible = true;
    },
    // 弹出修改明细dialog，并修改内部内容，并设置活跃明细
    showEditDialog(value, index) {
      this.isEdit = true;
      this.$refs['addDialog'].form = { ...value };
      this.$refs['addDialog'].buttonDisable(false);
      this.activeIndex = index;
      this.activeObj = value;
      this.addNewInfoDialogVisible = true;
    },

    // 页面逻辑
    toDictionary() {
      this.$router.replace('/dataDictionary');
    },
    // 对form数据进行拼接处理。 再发送请求
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
    },
    // 删除字典明细
    deletedetail(index) {
      this.details.splice(index, 1);
    },
    // 添加字典明细到明细表中,根据编辑还是新建进行不同的处理
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
    // 重置数据。
    reset() {
      // 理论上是需要改成null的，但是如果是null的话details为空就有两种情况了，一种是[],一种是null,为了统一所以初始化为[]
      (this.form = null), (this.details = []);
      this.$refs['addDictionary'].reset();
    },
    // 对展示的数据进行处理,将bool值转换为是与否
    transform(data) {
      for (const x in data) {
        if (x !== 'default' && x !== 'hidden') {
          continue;
        }
        data[x] = data[x] === 'true' ? '是' : '否';
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