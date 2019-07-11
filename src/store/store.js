import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

/* eslint-disable no-unused-vars */
import { metadata } from '@/store/modules/metadata/metadata';
import { policies } from '@/store/modules/policies/policies';
import mutations from '@/store/appMutations';
import actions from '@/store/appActions';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    currentPage: 'none',
    organizations: [],
    projects: [],
    // use a './' before the img for the img name for the local path
    appBGImage: './app_b_landingpage.jpg',
    cardBGImages: {},
    iconImages: {},
    // controls default: [1] means the second [0,1] is active -> map filtering is active per default
    controls: [1],
    browseScrollPosition: 0,
    showVersionModal: false,
    newVersion: process.env.VERSION,
    config: null,
    error: null,
  },
  getters: {
    currentPage: state => state.currentPage,
    appBGImage: state => state.appBGImage,
    cardBGImages: state => state.cardBGImages,
    iconImages: state => state.iconImages,
    aboutText: state => state.aboutText,
    controls: state => state.controls,
    browseScrollPosition: state => state.browseScrollPosition,
    showVersionModal: state => state.showVersionModal,
    newVersion: state => state.newVersion,
    config: state => state.config,
    error: state => state.error,
  },
  mutations,
  actions,
  modules: {
    metadata,
    policies,
  },
});

const persistPlugin = createPersist({
  namespace: 'metadata',
  // using this.state seems to prevent a double allocation of the metadata.state
  // but the whole state is part of the localStorage (sessionStorage)
  initialState: store.state.metadata,
  // use sessionStorage which expires once the browser is closed
  provider: sessionStorage,
  // ONE_WEEK
  // expires: 7 * 24 * 60 * 60 * 1e3,
});

store.plugins = [persistPlugin];

export default store;
