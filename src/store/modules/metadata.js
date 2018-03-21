import axios from 'axios';

/* eslint-disable no-unused-vars */
import {
  GET_ALL_METADATA,
  GET_ALL_METADATA_SUCCESS,
  GET_ALL_METADATA_ERROR,
  GET_METADATA_BY_ID,
  GET_METADATA_BY_ID_SUCCESS,
  GET_METADATA_BY_ID_ERROR,
  ADD_METADATA,
} from '../mutations';

const API_BASE = 'https://www.envidat.ch/api/3/';

export const dataGetters = {
  // Get Metadata by ID
  dataById: (state, getters) => (id) => {
    if (getters.metadatas.length > 0) {
      return getters.metadatas.filter(d => d.id === id)[0];
    }

    return state.metadatas;
  },
};

export const dataMutations = {
  [GET_ALL_METADATA](state) {
    state.loadingMetaDatas = true;
  },
  [GET_ALL_METADATA_SUCCESS](state, payload) {
    state.loadingMetaDatas = false;
    state.loadingMetaDatasOK = true;
    state.metadatas = payload;
  },
  [GET_ALL_METADATA_ERROR](state, reason) {
    state.loadingMetaDatas = false;
    state.loadingMetaDatasNOK = true;
    state.error = reason;
  },
  [GET_METADATA_BY_ID](state) {
    state.loadingMetaDatas = true;
  },
  [GET_METADATA_BY_ID_SUCCESS](state, payload) {
    state.loadingMetaDatas = false;
    state.currentMetaData = payload;
  },
  [ADD_METADATA](state, payload) {
    state.loadingMetaDatas = true;
    state.metadatas.push(payload);
  },
};


export const dataActions = {
  [GET_ALL_METADATA]({ commit }) {
    commit(GET_ALL_METADATA);
    // Fetch actual data from the API

    axios.get(`${API_BASE}action/package_list`, { crossDomain: true, 'Access-Control-Allow-Origin': 'https://www.envidat.ch' }).then((response) => {
      commit(GET_ALL_METADATA_SUCCESS, response.data);
    }).catch((reason) => {
      commit(GET_ALL_METADATA_ERROR, reason);
    });
  },
};

export const metadata = {
  namespaced: true,
  state: {
    loadingMetaDatas: false,
    loadingMetaDatasOK: false,
    loadingMetaDatasNOK: false,
    currentMetaData: Object,
    metadatas: [],
    error: Object,
  },
  mutations: dataMutations,
  actions: dataActions,
  getters: dataGetters,
};
