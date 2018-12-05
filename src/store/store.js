import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

/* eslint-disable no-unused-vars */
import { metadata } from './modules/metadata';
import mutations from './appMutations';
import aboutText from './data/about';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    currentPage: 'none',
    organizations: [],
    projects: [],
    // use a './' before the img for the img name for the local path
    appBGImage: './app_b_landingpage.jpg',
    cardBGImages: {},
    iconImages: {},
    aboutText,
  },
  getters: {
    currentPage: state => state.currentPage,
    appBGImage: state => state.appBGImage,
    cardBGImages: state => state.cardBGImages,
    iconImages: state => state.iconImages,
    aboutText: state => state.aboutText,
  },
  mutations,
  modules: {
    metadata,
  },
  plugins: [createPersist({
    namespace: 'metadata',
    // using this.state seems to prevent a double allocation of the metadata.state
    // but the whole state is part of the localStorage (sessionStorage)
    initialState: this.state,
    // use sessionStorage which expires once the browser is closed
    provider: sessionStorage,
    // ONE_WEEK
    // expires: 7 * 24 * 60 * 60 * 1e3,
  })],

});
