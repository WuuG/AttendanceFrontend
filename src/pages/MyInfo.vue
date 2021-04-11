<template>
  <div class="my-info-content">
    <el-row type="flex" justify="center">
      <h2 class="my-info-title">修改个人信息</h2>
    </el-row>
    <el-form :model="userInfo" label-width="100px" class="my-info-form" :rules="myInfoRules" ref="userInfo">
      <!-- <el-form-item v-for="(item, index) in showInfo" :key="item.id" :label="index">
        <el-input v-model="userInfo[index]"> </el-input>
      </el-form-item> -->
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="昵称" prop="loginName"> <el-input v-model="userInfo.loginName"></el-input> </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="真实姓名" prop="realName"><el-input v-model="userInfo.realName"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="手机号码" prop="phoneNum"><el-input v-model="userInfo.phoneNum"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="性别" prop="gender"><el-input v-model="userInfo.gender"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item :label="roleId == 1 ? '学号' : '教工号'" prop="identifyNum"
            ><el-input v-model="userInfo.identifyNum"></el-input
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="学校" prop="school"><el-input v-model="userInfo.school"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="邮箱" prop="email"><el-input v-model="userInfo.email"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item label="学院" prop="faculty"><el-input v-model="userInfo.faculty"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col v-if="roleId === 1" :span="10" :xs="16">
          <el-form-item label="专业" prop="major"><el-input v-model="userInfo.major"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10" :xs="16">
          <el-form-item><el-button style="float: right">确定</el-button></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
  

<script>
export default {
  name: 'MyInfo',
  data() {
    return {
      roleId: 1,
      userInfo: {
        loginName: '老哥',
        realName: '陈琛琛',
        phoneNum: '13003933440',
        gender: 'no-gender',
        identifyNum: '202921',
        school: '福州大学',
        email: '124093282@qq.com',
        faculty: '数学与计算机科学学院',
        major: '电子信息'
      },

      myInfoRules: {
        loginName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        phoneNum: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      }
    };
  }
};
</script>

  
<style lang="less" scoped
>
.my-info-content {
  width: 100%;
  height: 100%;
  min-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  .my-info-title {
    text-align: center;
  }
  .my-info-form {
    padding-top: 10px;
  }
}
</style>