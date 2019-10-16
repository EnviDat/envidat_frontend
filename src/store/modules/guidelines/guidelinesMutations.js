import {
  GET_GUIDELINES,
  GET_GUIDELINES_SUCCESS,
  GET_GUIDELINES_ERROR,
} from '@/store/guidelinesMutationsConsts';

import { errorMessage } from '@/factories/notificationFactory';

export default {
  [GET_GUIDELINES](state) {
    state.loading = true;
  },
  [GET_GUIDELINES_SUCCESS](state, payload) {
    state.guidelinesMarkdown = payload;
    state.loading = false;
  },
  [GET_GUIDELINES_ERROR](state, reason) {
    state.loading = false;

    const details = 'An error occured while loading the guidelines';
    state.guidelinesMarkdown = details + ': ' + reason;

    if (process.env.NODE_ENV === 'development') {
      state.guidelinesMarkdown += ' \nThis is normal when developing locally on localhost:8080';
    }

    let errObj = errorMessage(reason, details);

    if (reason.response) {
      const status = reason.response.status + ' ' + reason.response.statusText;
      errObj = errorMessage(status, details, reason.response.stack);
    }

    state.error = errObj;
  },
};
