<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">到云后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
            <i class="el-icon-bell"></i>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img v-if="imgURL" :src="imgURL" alt="" />
          <img v-else src="~assets/img/img.jpeg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>

          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link :underline="false" href="https://github.com/WuuG/fzu-engineering-practice" target="_blank">仓库地址</el-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="modifyMyInfo">修改个人信息</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus';
import { getUserInfo } from 'network/userInfo';
import { setLocalStorge, KEY } from '../../utils/localStorge';
import CONST from '../../utils/const';
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      defaultName: '这是默认名字，若看到就是bug',
      message: 2,
      userInfo: null
    };
  },
  computed: {
    username() {
      if (this.$store.state.userInfo && this.$store.state.userInfo.loginName) {
        return this.$store.state.userInfo.loginName;
      } else {
        return this.$store.state.userInfo.phone;
      }
    },
    imgURL() {
      if (this.userInfo && this.userInfo.avatar) {
        return CONST.IMG_BASEURL + this.userInfo.avatar;
      }
      return false;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('toKen');
        localStorage.removeItem('uid');
        this.$store.dispatch('updateUserInfo', {});
        this.$router.push('/passport/login');
      } else if (command == 'modifyMyInfo') {
        this.$router.push({
          name: 'myInfo'
        });
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    //getUserInfo 获取用户信息
    getUserInfo() {
      let uid = localStorage.getItem('uid');
      getUserInfo(uid)
        .then((res) => {
          this.$store.dispatch('updateUserInfo', res.data);
          this.userInfo = res.data;
          setLocalStorge(KEY.USERINFO, res.data);
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  //header创建的时候获取用户信息。
  created() {
    this.getUserInfo();
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 60px;
  transition: all 0.5s;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 60px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
