import Vue from 'vue';
import Vuex from 'vuex';

/* eslint-disable no-unused-vars */
import { metadata } from './modules/metadata';
import mutations from './appMutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    showLoader: false,
    organizations: [],
    projects: [],
    // use a './' before the img for the img name for the local path
    appBGImage: './app_b_landingpage.jpg',
    cardBGImages: {},
  },
  getters: {
    appBGImage: state => state.appBGImage,
    cardBGImages: state => state.cardBGImages,
  },
  mutations,
  modules: {
    metadata,
  },
});
