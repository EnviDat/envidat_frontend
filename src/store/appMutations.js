import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
  ADD_CARD_IMAGES,
  ADD_ICON_IMAGE,
  SET_CONTROLS,
  SET_BROWSE_SCROLL_POSITION,
  SET_CONFIG_SUCCESS,
  SET_CONFIG_ERROR,
  CHECK_FRONTEND_VERSION,
  ADD_USER_NOTIFICATION,
  TRIM_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
} from './mutationsConsts';

import { getSpecificApiError } from '@/factories/notificationFactory';
import { Object } from 'core-js';

export default {
  [SET_APP_BACKGROUND](state, bgImg) {
    state.appBGImage = bgImg;
  },
  [SET_CURRENT_PAGE](state, page) {
    state.currentPage = page;
  },
  [ADD_CARD_IMAGES](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // state.cardBGImages[payload.key] = payload.value;
    this._vm.$set(state.cardBGImages, payload.key, payload.value);
  },
  [ADD_ICON_IMAGE](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // state.cardBGImages[payload.key] = payload.value;
    this._vm.$set(state.iconImages, payload.key, payload.value);
  },
  [SET_CONTROLS](state, payload) {
    state.controls = payload;
  },
  [SET_BROWSE_SCROLL_POSITION](state, payload) {
    state.browseScrollPosition = payload;
  },
  [SET_CONFIG_SUCCESS](state, payload) {
    state.config = payload;
  },
  [SET_CONFIG_ERROR](state, reason) {
    let notificationObj = getSpecificApiError('Config could not ge loaded!', reason);
    this.commit(ADD_USER_NOTIFICATION, notificationObj);
  },
  [CHECK_FRONTEND_VERSION](state, version) {
    if (version > process.env.VUE_APP_VERSION) {
      state.showVersionModal = true;
      state.newVersion = version;
    }
  },
  [TRIM_NOTIFICATIONS](state) {
    if (!state.notifications) return;

    const keys = Object.keys(state.notifications);
    const trimedNots = {};

    for (let i = 0; i < state.maxNotifications; i++) {
      const k = keys[i];
      trimedNots[k] = state.notifications[k];
    }

    state.notifications = trimedNots;
  },
  [HIDE_NOTIFICATIONS](state, key) {
    if (!state.notifications || !state.notifications[key]) return;

    state.notifications[key].show = false;
  },
  [ADD_USER_NOTIFICATION](state, notificationObj) {
    const key = notificationObj.message + '_' + notificationObj.details.length;
    notificationObj.key = key;

    if (!state.notifications[key]) {
      this._vm.$set(state.notifications, key, notificationObj);
    } else {
      const existingNotification = state.notifications[key];
      if (existingNotification.details !== notificationObj.details){
        this._vm.$set(state.notifications, key, notificationObj);
      }
    }
  },
};
