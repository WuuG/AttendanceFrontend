import Vue from 'vue';
import Router from 'vue-router';

const MyBaseTable = () => import('../components/context/base-table/BaseTable.vue')
const DataDictionary = () => import('../pages/data-dictionary/DataDictionary.vue')
const DataDicSub = () => import('../pages/data-dictionary-subs/DicSubData.vue')
const SystemParams = () => import('../pages/system-params/SystemParams.vue')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },

        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/info',
                    name: 'courseInfo',
                    component: () => import('../pages/course/CourseInfo.vue'),
                    meta: { title: '课程信息' }
                },
                {
                    path: '/studentInfo',
                    name: 'StudentInfo',
                    component: () => import('../pages/course/StudentInfo.vue'),
                    meta: { title: '学生信息' }
                },
                {
                    path: 'myInfo',
                    name: 'myInfo',
                    component: () => import('../pages/MyInfo.vue'),
                    meta: { title: '我的信息' }
                },
                {
                    path: 'dataDictionary',
                    name: 'dataDictionary',
                    component: DataDictionary,
                    meta: { title: '数据字典' }
                },
                {
                    path: 'dicChildData/:userId',
                    name: 'dicChildData',
                    component: DataDicSub,
                    meta: { title: '数据列表' },
                    props: true
                },
                {
                    path: 'systemParams',
                    name: 'systemParams',
                    component: SystemParams,
                    meta: { title: '系统参数' }
                },
                {
                    path: 'userList',
                    name: 'userList',
                    component: () => import('pages/authorityManagement/UserList.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: 'mybasetable',
                    name: 'mybasetable',
                    component: MyBaseTable,
                    meta: { title: '基础表格' }
                },
            ]
        },
        // {
        //     path: '/login',
        //     component: () => import(/* webpackChunkName: "login" */ 'pages/passport/login/Login.vue'),
        //     meta: { title: '登录' },
        // },
        {
            path: '/passport',
            component: () => import('pages/passport/Passport.vue'),
            meta: { title: 'passport' },
            children: [
                {
                    path: 'register',
                    component: () => import('pages/passport/register/Register.vue'),
                    meta: { title: '注册' },

                },
                {
                    path: 'login',
                    component: () => import('pages/passport/login/Login.vue'),
                    meta: { title: '登录' },

                },
            ]

        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    //切换为history模式
    // mode:"history"
});
