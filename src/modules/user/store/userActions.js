/**
 * user store actions
 *
 * @summary user store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-08-11 17:41:03
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

import { urlRewrite } from '@/factories/apiFactory';

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
} from './userMutationsConsts';


const API_BASE = '/api/action/';
const ENVIDAT_PROXY = process.env.VUE_APP_ENVIDAT_PROXY;


export default {
  async [GET_USER_CONTEXT]({ commit }) {
    commit(GET_USER_CONTEXT);

    const url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);

    await axios.get(url)
      .then((response) => {
        commit(GET_USER_CONTEXT_SUCCESS, response.data.result ? response.data.result.user : null);
      })
      .catch((reason) => {
        commit(GET_USER_CONTEXT_ERROR, reason);
      });
  },
  async [USER_SIGNIN]({ commit }, signInData) {
    commit(USER_SIGNIN);

    const url = urlRewrite('passwordless_user_login', API_BASE, ENVIDAT_PROXY);

    await axios.post(url, { email: signInData.email, key: signInData.key })
      .then((response) => {
        commit(USER_SIGNIN_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(USER_SIGNIN_ERROR, reason);
      });    
  },
  async [REQUEST_TOKEN]({ commit }, requestData) {
    commit(REQUEST_TOKEN);

    const url = urlRewrite('passwordless_perform_reset', API_BASE, ENVIDAT_PROXY);

    await axios.post(url, { email: requestData.email })
      .then((response) => {
        commit(REQUEST_TOKEN_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(REQUEST_TOKEN_ERROR, reason);
      });
  },
  async [USER_SIGNOUT]({ commit }) {
    commit(USER_SIGNOUT);

    const url = urlRewrite('passwordless_user_logout', API_BASE, ENVIDAT_PROXY);

    await axios.post(url)
      .then((response) => {
        commit(USER_SIGNOUT_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(USER_SIGNOUT_ERROR, reason);
      });
  },  
};
