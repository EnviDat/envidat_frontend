/**
 * policies store actions
 *
 * @summary policies store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-23 16:34:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/modules/about/store/policiesMutationsConsts';

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
