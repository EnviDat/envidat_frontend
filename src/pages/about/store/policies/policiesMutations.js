/**
 * policies store mutations
 *
 * @summary policies store mutations
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51 
 * Last modified  : 2019-10-23 16:34:51 
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/pages/about/store/policiesMutationsConsts';
import { ADD_USER_NOTIFICATION } from '@/store/mainMutationsConsts';
import { getSpecificApiError } from '@/factories/notificationFactory';

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

    const details = 'An error occured while loading the policies!';
    const errObj = getSpecificApiError(details, reason);

    state.policiesMarkdown = `${details}: ${reason}`;

    if (process.env.NODE_ENV === 'development') {
      state.policiesMarkdown += ' \nThis is normal when developing locally on localhost:8080';
    }

    this.commit(ADD_USER_NOTIFICATION, errObj);
  },
};
