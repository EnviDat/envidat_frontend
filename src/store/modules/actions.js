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
  BULK_LOAD_METADATAS_CONTENT,
  BULK_LOAD_METADATAS_CONTENT_SUCCESS,
  BULK_LOAD_METADATAS_CONTENT_ERROR,
} from '../metadataMutationsConsts';

/* eslint-disable no-unused-vars  */

const ENVIDAT_PROXY = process.env.ENVIDAT_PROXY;
const SOLR_PROXY = process.env.SOLR_PROXY;
const API_BASE = '/api/3/action/';
const SOLR_API_BASE = '/solr/ckan_default/';

function urlRewrite(url, baseUrl, proxyUrl) {
  // const from = url;
  // url = url.replace(/&/g, '%26');
  url = url.replace('?', '&');
  url = url.replace("'", '%22');

  url = `${proxyUrl}${baseUrl}${url}`;

  // console.log("from " + from + " to " + url);
  return url;
}

function loadMetadataIdsPromise() {
  return axios.get(urlRewrite('package_list', API_BASE, ENVIDAT_PROXY));
}

function loadMetadataContentPromises(commit, metadataIds) {
  const calls = [];

  for (let index = 0; index < metadataIds.length; index += 1) {
    const packageId = metadataIds[index];

    // console.log(`adding call to ${packageId}`);
    // calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`));

    /* eslint-disable no-loop-func */

    const url = urlRewrite(`package_show?id=${packageId}`, API_BASE, ENVIDAT_PROXY);

    calls.push(axios.get(url).then((response) => {
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

    const splitSpaces = searchTerm.split(' ');
    if (splitSpaces.length > 1) {
      searchTerm = splitSpaces[0];
      for (let i = 1; i < splitSpaces.length; i++) {
        const el = splitSpaces[i];
        searchTerm += ` OR ${el}`;
      }
    }

    const url = urlRewrite(`select?indent=on&q=notes:${searchTerm} OR title:${searchTerm}&wt=json&rows=1000`, SOLR_API_BASE, SOLR_PROXY);

    axios.get(url)
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

    const url = urlRewrite(`package_show?id=${metadataId}`, API_BASE, ENVIDAT_PROXY);

    axios.get(url).then((response) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_ERROR, reason);
    });
  },

  async [LOAD_ALL_TAGS]({ commit }) {
    commit(LOAD_ALL_TAGS);

    const url = urlRewrite('select&q=*:*&wt=json&facet=true&facet.field=tags&facet.limit=1000&rows=0', SOLR_API_BASE, SOLR_PROXY);

    axios.get(url)
      .then((response) => {
        commit(LOAD_ALL_TAGS_SUCCESS, response.data.facet_counts.facet_fields.tags);
      })
      .catch((reason) => {
        commit(LOAD_ALL_TAGS_ERROR, reason);
      });
  },
  async [BULK_LOAD_METADATAS_CONTENT]({ commit, showRestrictedContent = false }) {
    commit(BULK_LOAD_METADATAS_CONTENT);

    // const url = urlRewrite('package_search', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('select?q=title:*&wt=json&rows=1000', SOLR_API_BASE, SOLR_PROXY);
    const url = `${SOLR_PROXY}${SOLR_API_BASE}select&q=title:*&wt=json&rows=1000`;

    axios.get(url)
      .then((response) => {
        commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, response.data.response.docs, showRestrictedContent);
      })
      .catch((reason) => {
        commit(BULK_LOAD_METADATAS_CONTENT_ERROR, reason);
      });
  },

};

