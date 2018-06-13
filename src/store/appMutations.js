import {
  CHANGE_APP_BG,
  ADD_CARD_IMAGES,
} from './mutationsConsts';

export default {
  [CHANGE_APP_BG](state, bgImg) {
    state.appBGImage = bgImg;
  },
  [ADD_CARD_IMAGES](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // state.cardBGImages[payload.key] = payload.value;
    this._vm.$set(state.cardBGImages, payload.key, payload.value);
  },
};
