import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

/* eslint-disable no-unused-vars */
import { metadata } from '@/store/modules/metadata/metadata';
import { policies } from '@/store/modules/policies/policies';
import { guidelines } from '@/store/modules/guidelines/guidelines';
import { projects } from '@/store/modules/projects/projects';
import mutations from '@/store/appMutations';
import actions from '@/store/appActions';

const globalMethods = require('@/components/globalMethods');

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    currentPage: '',
    // use a './' before the img for the img name for the local path
    appBGImage: '',
    cardBGImages: {},
    iconImages: {},
    // controls default: [1] means the second [0,1] is active -> map filtering is active per default
    controls: [1],
    browseScrollPosition: 0,
    showVersionModal: false,
    newVersion: process.env.VUE_APP_VERSION,
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
    guidelines,
    projects,
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

function importCardBackgrounds(store) {
  setImages(store, 'landscape', require.context('@/assets/cards/landscape/', false, /\.jpg$/));
  setImages(store, 'forest', require.context('@/assets/cards/forest/', false, /\.jpg$/));
  setImages(store, 'snow', require.context('@/assets/cards/snow/', false, /\.jpg$/));
  setImages(store, 'diversity', require.context('@/assets/cards/diversity/', false, /\.jpg$/));
  setImages(store, 'hazard', require.context('@/assets/cards/hazard/', false, /\.jpg$/));
}

function setImages(store, categoryName, imgPaths){
  const images = globalMethods.default.methods.mixinMethods_importImages(imgPaths);
  store.state.cardBGImages[categoryName] = images;
  // this._vm(store.state.cardBGImages, categoryName, images);
}

function importIcons(store) {
  const imgPaths = require.context('../assets/icons/', false, /\.png$/);
  const images = globalMethods.default.methods.mixinMethods_importImages(imgPaths);

  const keys = Object.keys(images);
  keys.forEach((key) => {
    // console.log('icon ' + key + ' value ' + images[key]);
    store.state.iconImages[key] = images[key];
  });
}

importCardBackgrounds(store);
importIcons(store);

export default store;
