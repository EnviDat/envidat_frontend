/* eslint-disable no-underscore-dangle */
/**
* user store mutations
*
* @summary user store mutations
* @author Dominik Haas-Artho
*
* Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-08-11 17:37:40
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
  USER_SIGNOUT,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_ERROR,
  VALIDATION_ERROR,
  USER_GET_DATASETS,
  USER_GET_DATASETS_SUCCESS,
  USER_GET_DATASETS_ERROR,
} from './userMutationsConsts';

function extractErrorObject(error) {
  let type = '';
  let field = '';
  let msg = 'There was an error on the server, please try again. If it consists please contact envidat@wsl.ch.';
  
  if (error) {
    type = error.__type;
    
    switch (type) {
      case VALIDATION_ERROR: {
        const errKey = Object.keys(error)[1];
        
        field = errKey;
        msg = error[errKey];
        break;
      }
      default: {
        msg = error;
        break;
      }
    }
  }
  
  return { type, field, msg };
}

function resetErrorObject(state) {
  state.error = null;
  state.errorType = '';
  state.errorField = '';
}

export default {
  [GET_USER_CONTEXT](state) {
    state.userLoading = true;

    resetErrorObject(state);
  },
  [GET_USER_CONTEXT_SUCCESS](state, payload) {
    state.userLoading = false;
    state.user = payload || null;
  },
  [GET_USER_CONTEXT_ERROR](state, reason) {
    state.userLoading = false;

    const error = reason.response.data.error;
    const errObj = extractErrorObject(error);

    state.errorField = errObj.field;
    state.errorType = errObj.type;
    state.error = errObj.msg;
  },
  [USER_SIGNIN](state) {
    state.signInLoading = true;

    resetErrorObject(state);
  },
  [USER_SIGNIN_SUCCESS](state, payload) {
    state.signInLoading = false;
    state.signInSuccess = true;
    state.user = payload.user;    
  },
  [USER_SIGNIN_ERROR](state, reason) {
    state.signInLoading = false;
    state.signInSuccess = false;
    
    const error = reason.response.data.error;
    const errObj = extractErrorObject(error);

    state.errorField = errObj.field;
    state.errorType = errObj.type;
    state.error = errObj.msg;
  },
  [REQUEST_TOKEN](state) {
    state.requestLoading = true;
    state.requestSuccess = false;
    state.signInLoading = false;
    state.signInSuccess = false;

    resetErrorObject(state);
  },
  [REQUEST_TOKEN_SUCCESS](state, payload) {
    state.requestLoading = false;
    state.requestSuccess = payload && payload.includes('successful');
  },
  [REQUEST_TOKEN_ERROR](state, reason) {
    state.requestLoading = false;
    state.requestSuccess = false;
    
    const error = reason.response.data.error;
    const errObj = extractErrorObject(error);
    
    state.errorField = errObj.field;
    state.errorType = errObj.type;
    state.error = errObj.msg;
  },
  [USER_SIGNOUT](state) {
    state.signInLoading = false;
    state.signInSuccess = false;
    state.requestLoading = false;
    state.requestSuccess = false;
    state.userLoading = false;    
    state.user = null;    

    resetErrorObject(state);
  },
  [USER_SIGNOUT_SUCCESS](state) {
    state.signInLoading = false;
    state.signInSuccess = false;
    state.requestLoading = false;
    state.requestSuccess = false;
    state.userLoading = false;
    state.user = null;

    resetErrorObject(state);
  },
  [USER_SIGNOUT_ERROR](state, reason) {
    const error = reason.response.data.error;
    const errObj = extractErrorObject(error);

    state.errorField = errObj.field;
    state.errorType = errObj.type;
    state.error = errObj.msg;
  },
  [USER_GET_DATASETS](state) {
    state.userLoading = true;

    resetErrorObject(state);
  },
  [USER_GET_DATASETS_SUCCESS](state, payload) {
    state.userLoading = false;
    state.user.datasets = payload.datasets;

    resetErrorObject(state);
  },
  [USER_GET_DATASETS_ERROR](state, reason) {
    state.userLoading = false;

    const error = reason.response.data.error;
    const errObj = extractErrorObject(error);

    state.errorField = errObj.field;
    state.errorType = errObj.type;
    state.error = errObj.msg;
  },
};
