/**
 * user store actions
 *
 * @summary user store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-07-15 17:40:13
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
// const ENVIDAT_PROXY = process.env.VUE_APP_ENVIDAT_PROXY;
const ENVIDAT_PROXY = 'http://envidat02.wsl.ch:5000';


export default {
  async [GET_USER_CONTEXT]({ commit }) {
    commit(GET_USER_CONTEXT);

    const url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);

    await axios.get(url)
      .then((response) => {
        commit(GET_USER_CONTEXT_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(GET_USER_CONTEXT_ERROR, reason);
      });
  },
  async [USER_SIGNIN]({ commit }, signInData) {
    commit(USER_SIGNIN);

    const url = urlRewrite(`passwordless_user_login?email=${signInData.email}&key=${signInData.key}`, API_BASE, ENVIDAT_PROXY);

    await axios.get(url)
      .then((response) => {
        commit(USER_SIGNIN_SUCCESS, response.data.result);

        // dispatch(GET_USER_CONTEXT);
      })
      .catch((reason) => {
        commit(USER_SIGNIN_ERROR, reason);
      });    
  },
  async [REQUEST_TOKEN]({ commit }, requestData) {
    commit(REQUEST_TOKEN);

    const url = urlRewrite(`passwordless_perform_reset?email=${requestData.email}`, API_BASE, ENVIDAT_PROXY);

    // await axios.get(url, { withCredentials: true })
    await axios.get(url)
      .then((response) => {
        commit(REQUEST_TOKEN_SUCCESS, response.data.result);

        console.log(`set cookie? ${response.headers['Set-cookie']} cookie ${response.cookie} ckan ${response.headers.cookie}`);
      })
      .catch((reason) => {
        commit(REQUEST_TOKEN_ERROR, reason);
      });
  },
  async [USER_SIGNOUT]({ commit }) {
    commit(USER_SIGNOUT);

    const url = urlRewrite('passwordless_user_logout', API_BASE, ENVIDAT_PROXY);

    await axios.get(url)
      .then((response) => {
        commit(USER_SIGNOUT_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(USER_SIGNOUT_ERROR, reason);
      });
  },  
};
