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
      state.userInfo.account = account;
    },
    deleteAccount(state) {
      delete state.userInfo.account
    }
  }

});

export default store