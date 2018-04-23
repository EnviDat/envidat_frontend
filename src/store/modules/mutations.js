import {
  GET_METADATA_IDS,
  GET_METADATA_IDS_SUCCESS,
  GET_METADATA_IDS_ERROR,
  LOAD_METADATAS,
  LOAD_METADATAS_SUCCESS,
  LOAD_METADATAS_ERROR,
  GET_METADATA_BY_ID,
  GET_METADATA_BY_ID_SUCCESS,
  ADD_METADATA,
  ADD_TEST_METADATA,
} from '../mutation_consts';

export default {
  [GET_METADATA_IDS](state) {
    state.loadingMetadatas = true;
    state.metadataIds = [];
  },
  [GET_METADATA_IDS_SUCCESS](state, payload) {
    state.loadingMetadatas = false;
    state.loadingMetadatasOK = true;
    state.metadataIds = payload;
  },
  [GET_METADATA_IDS_ERROR](state, reason) {
    state.loadingMetadatas = false;
    state.loadingMetadatasNOK = true;
    state.error = reason;
  },
  [LOAD_METADATAS](state) {
    state.loadingMetadatas = true;
    state.metadatas = {};
  },
  [LOAD_METADATAS_SUCCESS](state) {
    state.loadingMetadatas = false;
    state.loadingMetadatasOK = true;
  },
  [LOAD_METADATAS_ERROR](state, reason) {
    state.loadingMetadatas = false;
    state.loadingMetadatasOK = true;
    state.error = reason;
  },
  [GET_METADATA_BY_ID](state) {
    state.loadingMetaDatas = true;
  },
  [GET_METADATA_BY_ID_SUCCESS](state, payload) {
    state.loadingMetadatas = false;
    state.currentMetadata = payload;
  },
  [ADD_METADATA](state, payload) {
    state.loadingMetadatas = true;
    state.currentMetadata = null;
    state.metadatas.push(payload);
  },
  [ADD_TEST_METADATA](state, payload) {
    state.metadatas[payload.id] = payload.data;
  },
};
