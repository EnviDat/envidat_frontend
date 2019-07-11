import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/store/policiesMutationsConsts';

export default {
  [GET_POLICIES](state) {
    state.loading = true;
  },
  [GET_POLICIES_SUCCESS](state, payload) {
    state.policiesInfo = payload;
    state.loading = false;
  },
  [GET_POLICIES_ERROR](state, reason) {
    state.policiesInfo = `There occured an error while loading the policies: ${reason}`;
    if (process.env.NODE_ENV === 'development') {
      state.policiesInfo += ' \nThis is normal when developing locally on localhost:8080';
    }
    state.error = reason;
    state.loading = false;
  },
};