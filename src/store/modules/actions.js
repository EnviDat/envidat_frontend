import axios from 'axios';

import {
  GET_METADATA_IDS,
  GET_METADATA_IDS_SUCCESS,
  GET_METADATA_IDS_ERROR,
  GET_METADATAS_CONTENT,
  GET_METADATAS_CONTENT_SUCCESS,
  GET_METADATAS_CONTENT_ERROR,
  SET_CURRENT_METADATA,
  // SET_CURRENT_METADATA_SUCCESS,
  ADD_METADATA,
} from '../mutation_consts';

const API_BASE = '/api/3/action/';


export default {
  [GET_METADATA_IDS]({ commit }) {
    commit(GET_METADATA_IDS);

    axios.get(`${API_BASE}package_list`).then((response) => {
      commit(GET_METADATA_IDS_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(GET_METADATA_IDS_ERROR, reason);
    });
  },
  async [GET_METADATAS_CONTENT]({ commit }, metadataIds) {
    commit(GET_METADATAS_CONTENT);

    const calls = [];

    for (let index = 0; index < metadataIds.length; index += 1) {
      const packageId = metadataIds[index];

      calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
        commit(ADD_METADATA, response.data.result);
      }).catch((reason) => {
        commit(GET_METADATA_IDS_ERROR, reason);
      }));
    }

    axios.all(calls).then(() => {
      commit(GET_METADATAS_CONTENT_SUCCESS);
    }).catch((reason) => {
      commit(GET_METADATAS_CONTENT_ERROR, reason);
    });

    /* eslint-disable no-await-in-loop */
    /*
    for (let index = 0; index < metadataIds.length; index += 1) {
      const packageId = metadataIds[index];

      await axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
        commit(ADD_METADATA, response.data.result);
      }).catch((reason) => {
        commit(GET_METADATA_IDS_ERROR, reason);
      });
    }

    commit(GET_METADATAS_CONTENT_SUCCESS);
    */
  },
  [SET_CURRENT_METADATA]({ commit, packageId }) {
    commit(SET_CURRENT_METADATA, packageId);
  },
};
