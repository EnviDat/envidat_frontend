import Vue from 'vue';
import Vuex from 'vuex';
/*
import dataGetters from './getters';
// import { dataMutations, ADD_METADATA } from './mutations';
import dataMutations from './mutations';
import dataActions from './actions';
*/

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
  // MODULES
  modules: {
    metadata,
  },
});
