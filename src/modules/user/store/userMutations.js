/**
 * user store mutations
 *
 * @summary user store mutations
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-07-14 18:05:19
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
// import { ADD_USER_NOTIFICATION } from '@/store/mainMutationsConsts';

// import { getSpecificApiError } from '@/factories/notificationFactory';

import {
  GET_USER_CONTEXT,
  GET_USER_CONTEXT_SUCCESS,
  GET_USER_CONTEXT_ERROR,
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
} from './userMutationsConsts';

export default {
  [GET_USER_CONTEXT](state) {
    state.userLoading = true;
  },
  [GET_USER_CONTEXT_SUCCESS](state, payload) {
    state.userLoading = false;
    state.user = payload && payload.length > 0 ? payload : null;
  },
  [GET_USER_CONTEXT_ERROR](state, reason) {
    state.error = reason;
    state.userLoading = false;

    // const details = 'An error occured while loading the policies§!';
    // const errObj = getSpecificApiError(details, reason);

    // this.commit(ADD_USER_NOTIFICATION, errObj);
  },
  [USER_SIGNIN](state) {
    state.signInLoading = true;
  },
  [USER_SIGNIN_SUCCESS](state, payload) {
    state.signInLoading = false;
    state.signInSuccess = true;
    state.user = payload;    
  },
  [USER_SIGNIN_ERROR](state, reason) {
    state.error = reason;
    state.signInLoading = false;
    state.signInSuccess = false;
  },
  [REQUEST_TOKEN](state) {
    state.signInLoading = true;
  },
  [REQUEST_TOKEN_SUCCESS](state, payload) {
    state.requestLoading = false;
    state.requestSuccess = payload && payload.includes('successful');
  },
  [REQUEST_TOKEN_ERROR](state, reason) {
    state.error = reason;
    state.requestLoading = false;
    state.requestSuccess = false;
  },
};
