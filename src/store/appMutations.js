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
  GENERIC_ERROR,
} from './mutationsConsts';

import {
  successMessage,
  warningMessage,
  errorMessage
} from '@/factories/notificationFactory';

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
    // state.error = reason;
  },
  [CHECK_FRONTEND_VERSION](state, version) {
    if (version > process.env.VUE_APP_VERSION) {
      state.showVersionModal = true;
      state.newVersion = version;
    }
  },
  [GENERIC_ERROR](state, reason){
    state.error = errorMessage(reason.response.message, reason.response.status + ' ' + reason.response.statusText, reason.response.stack);
  },
};
