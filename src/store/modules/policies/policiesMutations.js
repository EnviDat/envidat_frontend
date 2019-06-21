import {
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/store/policiesMutationsConsts';

export default {
  [GET_POLICIES_SUCCESS](state, payload) {
    state.policiesInfo = payload;
  },
  [GET_POLICIES_ERROR](state, reason) {
    state.error = reason;
  },
};
