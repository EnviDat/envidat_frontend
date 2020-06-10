/**
 * main vuex store module it contains all other store modules.
 *
 * @summary main vuex store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-11-22 13:28:12
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
import { dmp } from '@/store/modules/dmp/dmp';
import { projects } from '@/store/modules/projects/projects';
import mutations from '@/store/mainMutations';
import actions from '@/store/mainActions';


import { getCardBackgrounds } from '@/factories/metaDataFactory';
import { LISTCONTROL_MAP_ACTIVE } from '@/store/metadataMutationsConsts';
import globalMethods from '@/factories/globalMethods';

const errReport = process.env.VUE_APP_ERROR_REPORTING_ENABLED;
// the check for 'NULL' is needed because simply nothing will not work
let errorReportingEnabled = false;

if (typeof errReport === 'string') {
  errorReportingEnabled = errReport.toLowerCase() === 'true';
}

function importIcons() {
  const iconImages = {};
  const imgPaths = require.context('../assets/icons/', false, /\.png$/);
  const images = globalMethods.methods.mixinMethods_importImages(imgPaths);

  const keys = Object.keys(images);
  keys.forEach((key) => {
    // console.log('icon ' + key + ' value ' + images[key]);
    iconImages[key] = images[key];
  });

  return iconImages;
}

const cardBGImages = getCardBackgrounds();
const iconImages = importIcons();

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    currentPage: '',
    // use a './' before the img for the img name for the local path
    appBGImage: '',
    cardBGImages,
    iconImages,
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
    dmp,
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
