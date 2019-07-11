import axios from 'axios';

import {
  SET_CONFIG,
  SET_CONFIG_SUCCESS,
  SET_CONFIG_ERROR,
  CHECK_FRONTEND_VERSION,
} from '@/store/mutationsConsts';

export default {
  [SET_CONFIG]({ commit }) {
    const url = `./config.json?nocache=${new Date().getTime()}`;

    axios.get(url)
      .then((response) => {
        try {
          let config;
          if (typeof (response.data) === 'string') {
            config = JSON.parse(response.data);
          } else {
            config = response.data;
          }

          commit(SET_CONFIG_SUCCESS, config);

          if (config.version) {
            commit(CHECK_FRONTEND_VERSION, config.version);
          }
        } catch (error) {
          console.error(`tried loading config, error: ${error}`);
        }
      })
      .catch((reason) => {
        commit(SET_CONFIG_ERROR, reason);
      });
  },
};
