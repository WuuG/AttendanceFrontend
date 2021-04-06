import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import store from './store/index'
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//钩子函数，路由守卫，在每个页面进入时，进行权限的判断 每次都要判断是不是有点不合理
router.beforeEach((to, from, next) => {
    //修改每次路由跳转前，要去页面的title值。
    document.title = `${to.meta.title} | 到云后台管理系统`;
    let isLogin = localStorage.getItem('toKen');
    // console.log(this.$store.state);//这里还挺有趣的，因为beforeEach 所以此时store还没有挂载，所以会出错。
    // console.log(router.app.$options.store.state.userInfo); // 在挂载前可以这样获取。
    // console.log(!isLogin);
    if (!isLogin) {
        if (to.path != '/passport/login' && to.path != '/passport/register') {
            next('/passport/login')
        } else {
            next()
        }
    } else {
        next();
    }




    // const role = localStorage.getItem('ms_username');
    // 判断是否有role，没有的话进入登陆页。
    // next()
});

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
