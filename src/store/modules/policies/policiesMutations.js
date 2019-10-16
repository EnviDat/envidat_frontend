import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/store/policiesMutationsConsts';

import { errorMessage } from '@/factories/notificationFactory';

export default {
  [GET_POLICIES](state) {
    state.loading = true;
  },
  [GET_POLICIES_SUCCESS](state, payload) {
    state.policiesMarkdown = payload;
    state.loading = false;
  },
  [GET_POLICIES_ERROR](state, reason) {
    state.loading = false;

    const details = 'An error occured while loading the policies';

    state.policiesMarkdown = details + ': ' + reason;

    if (process.env.NODE_ENV === 'development') {
      state.policiesMarkdown += ' \nThis is normal when developing locally on localhost:8080';
    }

    let errObj = errorMessage(reason, details);

    if (reason.response) {
      const status = reason.response.status + ' ' + reason.response.statusText;
      errObj = errorMessage(status, details, reason.response.stack);
    }

    state.error = errObj;
  },
};
