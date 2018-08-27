import axios from 'axios';

import {
  LOAD_ALL_METADATA,
  LOAD_ALL_METADATA_SUCCESS,
  LOAD_ALL_METADATA_ERROR,
  LOAD_METADATA_IDS,
  LOAD_METADATA_IDS_SUCCESS,
  LOAD_METADATA_IDS_ERROR,
  LOAD_METADATAS_CONTENT,
  LOAD_METADATAS_CONTENT_SUCCESS,
  LOAD_METADATAS_CONTENT_ERROR,
  LOAD_METADATA_CONTENT_BY_ID,
  LOAD_METADATA_CONTENT_BY_ID_SUCCESS,
  LOAD_METADATA_CONTENT_BY_ID_ERROR,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  ADD_METADATA,
  LOAD_ALL_TAGS,
  LOAD_ALL_TAGS_SUCCESS,
  LOAD_ALL_TAGS_ERROR,
} from '../metadataMutationsConsts';

const API_BASE = '/api/3/action/';
const SOLR_API_BASE = '/solr/ckan_default/';

/* eslint-disable no-unused-vars  */

function loadMetadataIdsPromise() {
  return axios.get(`${API_BASE}package_list`);
}

function loadMetadataContentPromises(commit, metadataIds) {
  const calls = [];

  for (let index = 0; index < metadataIds.length; index += 1) {
    const packageId = metadataIds[index];

    // console.log(`adding call to ${packageId}`);
    // calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`));

    /* eslint-disable no-loop-func */
    calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
      commit(ADD_METADATA, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATAS_CONTENT_ERROR, reason);
    }));
  }

  return calls;
}

export default {
  async [LOAD_ALL_METADATA]({ commit }) {
    commit(LOAD_ALL_METADATA);

    let metadataIds = this.getters['metadata/metadataIds'];

    if (metadataIds === undefined || metadataIds.length <= 0) {
      const response = await loadMetadataIdsPromise();

      if (response.data.result !== undefined) {
        commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);
        metadataIds = this.getters['metadata/metadataIds'];
      }
    }

    const calls = loadMetadataContentPromises(commit, metadataIds);

    axios.all(calls).then((response) => {
      commit(LOAD_ALL_METADATA_SUCCESS);
    }).catch((reason) => {
      commit(LOAD_ALL_METADATA_ERROR, reason);
    });
  },
  async [SEARCH_METADATA]({ commit }, searchTerm) {
    commit(SEARCH_METADATA);

    // tags:SNOW%20AND%20notes:snow
    // maybe use notes:"snow avalanche"
    // select?indent=on&q=tags:${searchTerm}%20AND%20notes:${searchTerm}&wt=json

    axios.get(`${SOLR_API_BASE}select?indent=on&q=notes:${searchTerm} OR title:${searchTerm}&wt=json&rows=1000`)
      .then((response) => {
        commit(SEARCH_METADATA_SUCCESS, response.data.response.docs);
      })
      .catch((reason) => {
        commit(SEARCH_METADATA_ERROR, reason);
      });
  },
  async [LOAD_METADATA_IDS]({ commit }) {
    commit(LOAD_METADATA_IDS);

    // commit(LOAD_METADATA_IDS_SUCCESS, packageListJSON.result);
    // return;
    // /* eslint-disable no-unreachable  */

    loadMetadataIdsPromise().then((response) => {
      commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_IDS_ERROR, reason);
    });
  },
  async [LOAD_METADATAS_CONTENT]({ commit }, metadataIds) {
    commit(LOAD_METADATAS_CONTENT);

    // for (let index = 0; index < metadataIds.length; index += 1) {
    //   dataset.result.id += index;
    //   commit(ADD_METADATA, dataset.result);
    // }

    // commit(LOAD_METADATAS_CONTENT_SUCCESS);
    // return;
    // /* eslint-disable no-unreachable  */

    if (metadataIds === undefined || metadataIds.length <= 0) {
      loadMetadataIdsPromise().then((response) => {
        commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);

        /* eslint-disable no-param-reassign  */
        metadataIds = response.data.result;
        // console.log(`reload ids ${metadataIds}`);
      }).catch((reason) => {
        commit(LOAD_METADATA_IDS_ERROR, reason);
      });
    }

    const calls = loadMetadataContentPromises(commit, metadataIds);

    axios.all(calls).then(() => {
      commit(LOAD_METADATAS_CONTENT_SUCCESS);
    }).catch((reason) => {
      commit(LOAD_METADATAS_CONTENT_ERROR, reason);
    });
  },

  async [LOAD_METADATA_CONTENT_BY_ID]({ commit }, metadataId) {
    commit(LOAD_METADATA_CONTENT_BY_ID);

    axios.get(`${API_BASE}package_show?id=${metadataId}`).then((response) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_ERROR, reason);
    });
  },

  async [LOAD_ALL_TAGS]({ commit }) {
    commit(LOAD_ALL_TAGS);

    // axios.get(`${API_BASE}package_search?facet.field=[%22tags%22]&facet.limit=1000&rows=0`)

    axios.get(`${SOLR_API_BASE}select&q=*:*&wt=json&facet=true&facet.field=tags&facet.limit=10000&rows=0`)
      .then((response) => {
        commit(LOAD_ALL_TAGS_SUCCESS, response.data.facet_counts.facet_fields.tags);
      })
      .catch((reason) => {
        commit(LOAD_ALL_TAGS_ERROR, reason);
      });
  },
};

