/**
 * main vuex store module it contains all other store modules.
 *
 * @summary main vuex store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-23 17:45:07
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

/* eslint-disable no-unused-vars */
import { metadata } from '@/store/modules/metadata/metadata';
import { policies } from '@/store/modules/policies/policies';
import { guidelines } from '@/store/modules/guidelines/guidelines';
import { projects } from '@/store/modules/projects/projects';
import mutations from '@/store/mainMutations';
import actions from '@/store/mainActions';
import {
  FOREST,
  SNOW,
  LAND,
  HAZARD,
  DIVERSITY,
  METEO,
} from '@/store/categoriesConsts';

import { LISTCONTROL_MAP_ACTIVE } from '@/store/metadataMutationsConsts';

const globalMethods = require('@/factories/globalMethods');

const errReport = process.env.VUE_APP_ERROR_REPORTING_ENABLED;
// the check for 'NULL' is needed because simply nothing will not work
let errorReportingEnabled = false;

if (typeof errReport === 'string') {
  errorReportingEnabled = errReport.toLowerCase() === 'true';
}

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    currentPage: '',
    // use a './' before the img for the img name for the local path
    appBGImage: '',
    cardBGImages: {},
    iconImages: {},
    controls: [LISTCONTROL_MAP_ACTIVE],
    appScrollPosition: 0,
    browseScrollPosition: 0,
    outdatedVersion: false,
    newVersion: process.env.VUE_APP_VERSION,
    // config can be overloaded from the backend
    config: { errorReportingEnabled },
    notifications: {},
    maxNotifications: 6,
  },
  getters: {
    currentPage: state => state.currentPage,
    appBGImage: state => state.appBGImage,
    cardBGImages: state => state.cardBGImages,
    iconImages: state => state.iconImages,
    aboutText: state => state.aboutText,
    controls: state => state.controls,
    appScrollPosition: state => state.appScrollPosition,
    browseScrollPosition: state => state.browseScrollPosition,
    outdatedVersion: state => state.outdatedVersion,
    newVersion: state => state.newVersion,
    config: state => state.config,
    notifications: state => state.notifications,
    maxNotifications: state => state.maxNotifications,
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

function setImages(categoryName, imgPaths) {
  const images = globalMethods.default.methods.mixinMethods_importImages(imgPaths);
  store.state.cardBGImages[categoryName] = images;
  // this._vm(store.state.cardBGImages, categoryName, images);
}

function importCardBackgrounds() {
  setImages(LAND, require.context('@/assets/cards/landscape/', false, /\.jpg$/));
  setImages(FOREST, require.context('@/assets/cards/forest/', false, /\.jpg$/));
  setImages(SNOW, require.context('@/assets/cards/snow/', false, /\.jpg$/));
  setImages(DIVERSITY, require.context('@/assets/cards/diversity/', false, /\.jpg$/));
  setImages(HAZARD, require.context('@/assets/cards/hazard/', false, /\.jpg$/));
  setImages(METEO, require.context('@/assets/cards/meteo/', false, /\.jpg$/));
}

function importIcons() {
  const imgPaths = require.context('../assets/icons/', false, /\.png$/);
  const images = globalMethods.default.methods.mixinMethods_importImages(imgPaths);

  const keys = Object.keys(images);
  keys.forEach((key) => {
    // console.log('icon ' + key + ' value ' + images[key]);
    store.state.iconImages[key] = images[key];
  });
}

importCardBackgrounds();
importIcons();

export default store;
