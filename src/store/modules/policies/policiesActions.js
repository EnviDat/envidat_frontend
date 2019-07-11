import axios from 'axios';

import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/store/policiesMutationsConsts';

export default {
  [GET_POLICIES]({ commit }) {
    commit(GET_POLICIES);

    const url = `./policies/policies.md?nocache=${new Date().getTime()}`;

    axios.get(url)
      .then((response) => {
        commit(GET_POLICIES_SUCCESS, response.data);
      })
      .catch((reason) => {
        commit(GET_POLICIES_ERROR, reason);
      });
  },
};
