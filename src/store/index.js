import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const store = new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    updateUserInfo(state, account) {
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      console.log('这里在vuex中，通过对userInfo的赋值，修改了userInfo');
      state.userInfo = userInfo;
    },
    // deleteAccount(state) {
    //   delete state.userInfo
    // }
  }

});

export default store