import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    // deleteAccount(state) {
    //   delete state.userInfo
  },
  actions: {
    updateUserInfo(context, userInfo) {
      // console.log('这里在vuex中，通过对userInfo的赋值，修改了userInfo');
      context.state.userInfo = userInfo;
    },
  }
});

export default store