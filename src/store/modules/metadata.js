// import axios from 'axios';

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

// import packageListJSON from '../../testdata/packagelist';

const packageListJSON = {
  help: 'https://www.envidat.ch/api/3/action/help_show?name=package_list',
  success: true,
  result: [
    '10-16904-1',
    '10-16904-10',
    '10-16904-19',
    '10-16904-2',
    '10-16904-21',
    '10-16904-22',
    '10-16904-23',
    '10-16904-3',
    '10-16904-4',
    '10-16904-5',
    '10-16904-6',
    '10-16904-7',
    '10-16904-8',
    '10-16904-9',
    '10-16904-envidat-24',
    '10-16904-envidat-25',
    '10-16904-envidat-27',
    '10-16904-envidat-28',
    '10-16904-envidat-29',
    '10-16904-envidat-30',
    '2016gl071822',
    'asrb-dav',
    'asrb-vf',
    'asrb-wfj',
    'avalanche-fatalities-european-alps-1969-2015',
    'avalanche-fatalities-per-calendar-year-since-1936',
    'avalanche-fatalities-switzerland-1936',
    'ch2014',
    'ckanext-restricted-test',
    'cosmo-wrf-documentation',
    'data-for-huelsmann_et_al_ecol_appl_2016',
    'datasets-for-testing-the-repository-and-storage',
    'experimental-rockfall-dataset-tschamut-grisons-switzerland',
    'face-stillberg',
    'fatal-avalanche-accidents-switzerland-1995',
    'flu-a-bh',
    'forest-type-nfi',
    'gcos-swe-data',
    'gem2',
    'gem-bh',
    'gtree',
    'hillshade-for-vegetation-height-model-nfi',
    'longterm-hydrological-observatory-alptal-central-switzerland',
    'lwf-tea-bag-sites',
    'mountland-jura',
    'pfynwald',
    'rit1',
    'snow-deltao18-metamorphism-advection',
    'snowmip',
    'soil-moisture-measurements-davos',
    'stillberg-climate',
    'stillberg-reforestation',
    'swiss-biomass-potentials',
    'uas-based-snow-depth-maps-bramabuel-davos-ch',
    'vegetation-height-model-nfi',
  ],
};

const PROD_API_BASE = 'https://www.envidat.ch/api/3/';
const DEV_API_BASE = 'http://localhost:8080/ui/AjaxProxyServlet?server=0&url=http://envidat03.wsl.ch/api/3/';
/*
export const getters = {
  // Get Metadata by ID
  dataById: (state, localgetters) => (id) => {
    if (localgetters.metadatas.length > 0) {
      return localgetters.metadatas.filter(d => d.id === id)[0];
    }

    return state.metadatas;
  },
  metadatas: state => state.metadatas,
};
*/
export const mutations = {
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


export const actions = {
  [GET_ALL_METADATA]({ commit }) {
    commit(GET_ALL_METADATA);
    // Fetch actual data from the API

    /*
    alert("packageListJSON.result "  + packageListJSON.result);
    commit(GET_ALL_METADATA_SUCCESS, packageListJSON.result);

    // axios.get(`${API_BASE}action/package_list`).then((response) => {
    axios.get('https://www.reddit.com/dev/api/api/trending_subreddits').then((response) => {
      commit(GET_ALL_METADATA_SUCCESS, response.data);
    }).catch((reason) => {
      commit(GET_ALL_METADATA_ERROR, reason);
    });
    */

    commit(GET_ALL_METADATA_SUCCESS, packageListJSON.result);
  /*
    axios.get(`${DEV_API_BASE}action/package_list`).then((response) => {
      commit(GET_ALL_METADATA_SUCCESS, response.data);
    }).catch((reason) => {
      commit(GET_ALL_METADATA_ERROR, reason);
    });
  */
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
  mutations,
  actions,
  getters: {
    allOk: state => state.loadingMetaDatasOK,
    metadataOverview: state => state.metadatas,
  },
};
