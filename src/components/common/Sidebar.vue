<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      active-text-color="#20a0ff"
      text-color="#bfcbd9"
      background-color="#4e4e50"
      unique-opened
      router
    >
      <template v-for="item in items">
        <!-- 一级标签 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <!-- 这里删除了 slot="title" 因为看上去没有用 -->
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <!-- 二级标签 -->
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <!-- 有三级标签 -->
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <!-- 二级标签，无三级标签 -->
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级标签，无二级标签 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: '/dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: '/mybasetable',
          title: '基础表格'
        },
        {
          icon: 'el-icon-lx-read',
          index: '1',
          title: '课程管理',
          subs: [
            {
              index: '/courseInfo',
              title: '课程信息'
            }
          ]
        },
        {
          icon: 'el-icon-s-tools',
          index: '2',
          title: '系统管理',
          subs: [
            {
              index: '/systemParams',
              title: '系统参数'
            },
            {
              index: '/dataDictionary',
              title: '数据字典'
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          index: '3',
          title: '角色权限管理',
          subs: [
            {
              index: '/auth/organization',
              title: '组织架构'
            }
          ]
        }
        // {
        //   icon: 'el-icon-lx-emoji',
        //   index: 'icon',
        //   title: '自定义图标'
        // },
        // {
        //   icon: 'el-icon-pie-chart',
        //   index: 'charts',
        //   title: 'schart图表'
        // },
        // {
        //   icon: 'el-icon-rank',
        //   index: '6',
        //   title: '拖拽组件',
        //   subs: [
        //     {
        //       index: 'drag',
        //       title: '拖拽列表'
        //     },
        //     {
        //       index: 'dialog',
        //       title: '拖拽弹框'
        //     }
        //   ]
        // }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏 通信总线啦
    bus.$on('collapse', (msg) => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
