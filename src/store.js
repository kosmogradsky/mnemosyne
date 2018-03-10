/* eslint-disable no-param-reassign, no-plusplus */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    UPDATE_AUTH_STATE(state, payload) {
      state.user = payload;
    },
  },
});
