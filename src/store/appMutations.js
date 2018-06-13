import { CHANGE_APP_BG } from './mutationsConsts';

export default {
  [CHANGE_APP_BG](state, bgImg) {
    state.appBGImage = bgImg;
  },
};
