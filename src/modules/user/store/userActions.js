/**
 * user store actions
 *
 * @summary user store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-07-14 18:14:18
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

// import { urlRewrite } from '@/factories/apiFactory';

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


// const API_BASE = '/api/action/';
// const ENVIDAT_PROXY = process.env.VUE_APP_ENVIDAT_PROXY;


export default {
  async [GET_USER_CONTEXT]({ commit }) {
    commit(GET_USER_CONTEXT);

    // let url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    const url = 'http://envidat02.wsl.ch:5000/api/action/envidat_context_user_show';

    // if (process.env.NODE_ENV === 'development') {
    //   url = './testdata/projects.json';
    // }

    await axios.get(url)
      .then((response) => {
        commit(GET_USER_CONTEXT_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(GET_USER_CONTEXT_ERROR, reason);
      });
  },
  async [USER_SIGNIN]({ commit }, signInData) {
  // async [USER_SIGNIN]({ dispatch, commit }, email, token) {
    commit(USER_SIGNIN);

    // let url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    const url = `http://envidat02.wsl.ch:5000/api/action/passwordless_user_login?email=${signInData.email}&key=${signInData.key}`;

    // if (process.env.NODE_ENV === 'development') {
    //   url = './testdata/projects.json';
    // }

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

    // let url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('envidat_context_user_show', API_BASE, ENVIDAT_PROXY);
    const url = `http://envidat02.wsl.ch:5000/api/action/passwordless_perform_reset?email=${requestData.email}`;

    // if (process.env.NODE_ENV === 'development') {
    //   url = './testdata/projects.json';
    // }

    await axios.get(url)
      .then((response) => {
        commit(REQUEST_TOKEN_SUCCESS, response.data.result);
      })
      .catch((reason) => {
        commit(REQUEST_TOKEN_ERROR, reason);
      });
  },
};
