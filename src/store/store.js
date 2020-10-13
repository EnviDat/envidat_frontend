/**
 * main vuex store module it contains all other store modules.
 *
 * @summary main vuex store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2020-10-13 21:38:19
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

/* eslint-disable no-unused-vars */
import { about } from '@/modules/about/store/aboutStore';
import { projects } from '@/modules/projects/store/projectsStore';
import { metadata } from '@/modules/metadata/store/metadataStore';

import mutations from '@/store/mainMutations';
import actions from '@/store/mainActions';

import {
  checkWebpFeature,
  getCardBackgrounds,
} from '@/factories/metaDataFactory';

import { LISTCONTROL_MAP_ACTIVE } from '@/store/metadataMutationsConsts';
import globalMethods from '@/factories/globalMethods';
import categoryCards from './categoryCards';

const errReport = process.env.VUE_APP_ERROR_REPORTING_ENABLED;
// the check for 'NULL' is needed because simply nothing will not work
let errorReportingEnabled = false;

if (typeof errReport === 'string') {
  errorReportingEnabled = errReport.toLowerCase() === 'true';
}

const webpIsSupported = checkWebpFeature();
const cardBGImages = getCardBackgrounds(webpIsSupported);

const webpAssetPaths = webpIsSupported ? require.context('../assets/', true, /\.webp$/) : null;
const webpAssets = globalMethods.methods.mixinMethods_importImages(webpAssetPaths);

const jpgAssetPaths = require.context('../assets/', true, /\.jpg$/);
const jpgAssets = globalMethods.methods.mixinMethods_importImages(jpgAssetPaths);

const iconImgPath = require.context('../assets/icons/', false, /\.png$/);
const iconImages = globalMethods.methods.mixinMethods_importImages(iconImgPath);

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    webpIsSupported,
    currentPage: '',
    // use a './' before the img for the img name for the local path
    appBGImage: '',
    webpAssets,
    jpgAssets,
    cardBGImages,
    iconImages,
    categoryCards,
    defaultControls: [LISTCONTROL_MAP_ACTIVE],
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
    defaultControls: state => state.defaultControls,
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
    about,
    projects,
  },
});

// enhance the category cards dynamically with either webp or jpg images based
// on what the browser supports
for (let i = 0; i < store.state.categoryCards.length; i++) {
  const cardInfo = store.state.categoryCards[i];
  cardInfo.img = globalMethods.methods.mixinMethods_getWebpImage(cardInfo.imgPath, store.state);
}


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
