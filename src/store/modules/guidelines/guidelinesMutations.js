/**
 * guidelines store mutations
 *
 * @summary guidelines store mutations
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51 
 * Last modified  : 2019-10-23 16:36:41
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {
  GET_GUIDELINES,
  GET_GUIDELINES_SUCCESS,
  GET_GUIDELINES_ERROR,
} from '@/store/guidelinesMutationsConsts';
import { ADD_USER_NOTIFICATION } from '@/store/mainMutationsConsts';
import { getSpecificApiError } from '@/factories/notificationFactory';

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

    const details = 'An error occured while loading the guidelines!';
    const errObj = getSpecificApiError(details, reason);
    state.guidelinesMarkdown = details + ': ' + reason;

    if (process.env.NODE_ENV === 'development') {
      state.guidelinesMarkdown += ' \nThis is normal when developing locally on localhost:8080';
    }

    this.commit(ADD_USER_NOTIFICATION, errObj);
  },
};
