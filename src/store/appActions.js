import axios from 'axios';

import {
  SET_CONFIG,
  SET_CONFIG_SUCCESS,
  SET_CONFIG_ERROR,
  CHECK_FRONTEND_VERSION,
} from '@/store/mutationsConsts';

// const globalMethods = require('@/components/globalMethods');
const ENVIDAT_PROXY = process.env.ENVIDAT_PROXY;

function urlRewrite(url, baseUrl, proxyUrl) {
  url = url.replace('?', '&');
  url = url.replace("'", '%22');

  url = `${proxyUrl}${baseUrl}${url}`;

  return url;
}


export default {
  [SET_CONFIG]({ commit }) {
    // const response = {
    //   data: { version: '0.5.72' },
    // };

    // const url = urlRewrite('./config.json', ENVIDAT_PROXY, '');
    const url = './config.json';
    // commit(CHECK_FRONTEND_VERSION, response.data);

    axios.get(url)
      .then((response) => {
        commit(SET_CONFIG_SUCCESS, response.data);

        if (response.data.version) {
          commit(CHECK_FRONTEND_VERSION, response.data.version);
        }
      })
      .catch((reason) => {
        commit(SET_CONFIG_ERROR, reason);
      });
  },
};
