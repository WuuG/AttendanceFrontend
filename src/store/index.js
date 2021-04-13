import Vue from 'vue';
import Vuex from 'vuex';
import { getUserInfo } from "network/userInfo"

Vue.use(Vuex);

let toKen = localStorage.getItem('toKen');
// let userInfo = toKen ? atob(toKen.split('.')[1]) : '';
let userInfo = undefined;
const store = new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    updateUserInfo(state, account) {
      // console.log('这里在vuex中，通过对userInfo的赋值，修改了userInfo');
      state.userInfo = account;
    },
    // deleteAccount(state) {
    //   delete state.userInfo
    // }
  }

});

export default store