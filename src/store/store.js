import Vue from 'vue';
import Vuex from 'vuex';

/* eslint-disable no-unused-vars */
import { metadata } from './modules/metadata';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    showLoader: false,
    organizations: [],
    projects: [],
  },
  modules: {
    metadata,
  },
});
