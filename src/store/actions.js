import axios from 'axios';
import {
  GET_ALL_METADATA,
  GET_ALL_METADATA_SUCCESS,
  GET_ALL_METADATA_ERROR,
  /* GET_METADATA_BY_ID,
  GET_METADATA_BY_ID_SUCCESS,
  GET_METADATA_BY_ID_ERROR,
  ADD_METADATA,
  */
} from './mutations';

// const API_BASE = 'https://www.envidat.ch/api/3/';

export const dataActions = {
  getAllMetadata({ commit }) {
    commit(GET_ALL_METADATA);
    // Fetch actual data from the API

    // axios.get(`${API_BASE}action/package_list`).then((response) => {
    axios.get('https://www.reddit.com/dev/api/api/trending_subreddits').then((response) => {
      commit(GET_ALL_METADATA_SUCCESS, response.data);
    }).catch((reason) => {
      commit(GET_ALL_METADATA_ERROR, reason);
    });
  },
  randomMethod() {
    alert('random');
  },
};
