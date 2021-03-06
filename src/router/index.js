import Vue from 'vue';
import Router from 'vue-router';

const MyBaseTable = () => import('../components/context/base-table/BaseTable.vue')
const DraggableTable = () => import('../components/context/base-table/DraggableTable.vue')
const Dictionary = () => import('../pages/dictionary/Dictionary.vue')
const DictionaryInfo = () => import('../pages/dictionary/dictionary-info/DictionaryInfo.vue')
const DictionaryAdd = () => import('../pages/dictionary/dictionary-add/DicAdd.vue')
const SystemParams = () => import('../pages/system-params/SystemParams.vue')
const Organization = () => import('../pages/organization/Organization.vue')
const UserList = () => import('../pages/userList/UserList.vue')
const MenuCtrl = () => import('../pages/menu-ctrl/MenuCtrl.vue')
const Role = () => import('../pages/role/Role.vue')
const RoleUsers = () => import('../pages/role/users/User.vue')
const MyInfo = () => import('../pages/my-info/MyInfo.vue')

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
                    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/courseInfo',
                    name: 'courseInfo',
                    component: () => import('../pages/course/info/CourseInfo.vue'),
                    meta: { title: '课程信息' }
                },
                {
                    path: '/courseInfo/details',
                    name: 'studentInfo',
                    component: () => import('../pages/course/details/Details.vue'),
                    meta: { title: '课程详情' },
                    props: route => ({ courseId: route.query.id, courseCode: route.query.code })
                },
                {
                    path: '/myInfo',
                    name: 'myInfo',
                    component: MyInfo,
                    meta: { title: '我的信息' }
                },
                {
                    path: '/dataDictionary',
                    name: 'dataDictionary',
                    component: Dictionary,
                    meta: { title: '数据字典' }
                },
                {
                    path: '/dataDictionary/details',
                    name: 'dicChildData',
                    component: DictionaryInfo,
                    meta: { title: '数据列表' },
                    props: route => ({ id: route.query.id })
                },
                {
                    path: '/dataDictionary/add',
                    name: 'dicadd',
                    component: DictionaryAdd,
                    meta: { title: '新增数据字典' },
                },
                {
                    path: '/systemParams',
                    name: 'systemParams',
                    component: SystemParams,
                    meta: { title: '系统参数' }
                },
                ,
                {
                    path: '/auth/organization',
                    name: 'routeName',
                    meta: { title: '组织架构' },
                    component: Organization
                },
                {
                    path: '/auth/userList',
                    name: 'userList',
                    meta: { title: '用户列表' },
                    component: UserList
                },
                {
                    path: '/auth/menuControl',
                    name: 'menuControl',
                    component: MenuCtrl,
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/draggableTable',
                    name: 'draggableTable',
                    meta: { title: '拖拽表格' },
                    component: DraggableTable
                },
                {
                    path: '/mybasetable',
                    name: 'mybasetable',
                    component: MyBaseTable,
                    meta: { title: '基础表格' }
                },
                {
                    path: '/auth/role',
                    name: 'role',
                    component: Role,
                    meta: { title: '角色权限管理' }
                },
                {
                    path: '/auth/role/users/:id',
                    name: 'roleUsers',
                    component: RoleUsers,
                    meta: { title: '角色用户列表' },
                    props: true
                },
            ]
        },

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
