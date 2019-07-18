import axios from 'axios';

import {
  GET_GUIDELINES,
  GET_GUIDELINES_SUCCESS,
  GET_GUIDELINES_ERROR,
} from '@/store/guidelinesMutationsConsts';

export default {
  [GET_GUIDELINES]({ commit }) {
    commit(GET_GUIDELINES);

    const url = `./guidelines/guidelines.md?nocache=${new Date().getTime()}`;

    axios.get(url)
      .then((response) => {
        commit(GET_GUIDELINES_SUCCESS, response.data);
      })
      .catch((reason) => {
        commit(GET_GUIDELINES_ERROR, reason);
      });
  },
};
