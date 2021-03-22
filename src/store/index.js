import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {
    },

  },
  mutations: {
    addAccount(state, account) {
      console.log(account);
      state.userInfo = account;
    },
    deleteAccount(state) {
      delete state.userInfo.account
    }
  }

});

export default store