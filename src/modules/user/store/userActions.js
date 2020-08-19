/**
 * user store actions
 *
 * @summary user store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:51:52
 * Last modified  : 2020-08-19 16:43:12
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

import { urlRewrite } from '@/factories/apiFactory';

import {
  FETCH_USER_DATA,
} from './userMutationsConsts';

// don't have an api base url or proxy to be able to load local testdata
const API_BASE = process.env.NODE_ENV === 'development' ? '' : '/api/action/';
const ENVIDAT_PROXY = process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_ENVIDAT_PROXY;


export default {
  async [FETCH_USER_DATA]({ commit }, payload) {
    commit(payload.mutation);

    let body = { };

    if (payload) {
      body = payload.body;
    }

    // unpack the action because it might be wrapped to provide a test url
    const actionUrl = typeof (payload.action) === 'function' ? payload.action() : payload.action;
    const url = urlRewrite(actionUrl, API_BASE, ENVIDAT_PROXY);

    // if the url is directly to a file it has to be a get call
    const method = url.includes('.json') ? 'get' : 'post';

    await axios({ method, url, body })
    .then((response) => {
        if (payload.commit) {
          commit(`${payload.mutation}_SUCCESS`, response.data.result);
        }
      })
    .catch((error) => {
      commit(`${payload.mutation}_ERROR`, error);
    });
 },
};
