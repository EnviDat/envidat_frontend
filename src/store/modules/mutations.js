import {
  GET_METADATA_IDS,
  GET_METADATA_IDS_SUCCESS,
  GET_METADATA_IDS_ERROR,
  GET_METADATAS_CONTENT,
  GET_METADATAS_CONTENT_SUCCESS,
  GET_METADATAS_CONTENT_ERROR,
  SET_CURRENT_METADATA,
  ADD_METADATA,
  ADD_TEST_METADATA,
} from '../mutation_consts';

export default {
  [GET_METADATA_IDS](state) {
    state.loadingMetadataIds = true;
    state.metadataIds = [];
  },
  [GET_METADATA_IDS_SUCCESS](state, payload) {
    state.loadingMetadataIds = false;
    state.MetadataIdsOK = true;
    state.metadataIds = payload;
  },
  [GET_METADATA_IDS_ERROR](state, reason) {
    state.loadingMetadataIds = false;
    state.MetadataIdsOK = false;
    state.error = reason;
  },
  [GET_METADATAS_CONTENT](state) {
    state.loadingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [GET_METADATAS_CONTENT_SUCCESS](state) {
    state.loadingMetadatasContent = false;
    state.MetadatasContentOK = true;
  },
  [GET_METADATAS_CONTENT_ERROR](state, reason) {
    state.loadingMetadatasContent = false;
    state.MetadatasContentOK = false;
    state.error = reason;
  },
  [SET_CURRENT_METADATA](state, packageId) {
    state.currentMetadata = state.metadatasContent[packageId];
  },
  [ADD_METADATA](state, payload) {
    state.metadatasContent[payload.id] = payload;
  },
  [ADD_TEST_METADATA](state, payload) {
    state.metadatasContent[payload.id] = payload;
  },
};
