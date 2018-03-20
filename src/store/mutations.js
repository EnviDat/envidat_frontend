export const GET_ALL_METADATA = 'GET_ALL_METADATA';
export const GET_ALL_METADATA_SUCCESS = 'GET_ALL_METADATA_SUCCESS';
export const GET_ALL_METADATA_ERROR = 'GET_ALL_METADATA_ERROR';

export const GET_METADATA_BY_ID = 'GET_METADATA_BY_ID';
export const GET_METADATA_BY_ID_SUCCESS = 'GET_METADATA_BY_ID_SUCCESS';
export const GET_METADATA_BY_ID_ERROR = 'GET_METADATA_BY_ID_ERROR';

export const ADD_METADATA = 'ADD_METADATA';


export const dataMutations = {
  [GET_ALL_METADATA](state) {
    state.showLoader = true;
  },
  [GET_ALL_METADATA_SUCCESS](state, payload) {
    state.showLoader = false;
    state.metadatas = payload;
  },
  [GET_METADATA_BY_ID](state) {
    state.showLoader = true;
  },
  [GET_METADATA_BY_ID_SUCCESS](state, payload) {
    state.showLoader = false;
    state.currentMetaData = payload;
  },
  [ADD_METADATA](state, payload) {
    state.showLoader = true;
    state.metadatas.push(payload);
  },
};

