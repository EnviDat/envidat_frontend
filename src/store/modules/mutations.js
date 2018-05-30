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
  ADD_METADATA,
  ADD_TEST_METADATA,
} from '../mutation_consts';

export default {
  [LOAD_ALL_METADATA](state) {
    state.loadingMetadataIds = true;
    state.loadingMetadatasContent = true;
    state.metadataIds = [];
    state.metadatasContent = {};
  },
  [LOAD_ALL_METADATA_SUCCESS](state) {
    state.loadingMetadataIds = false;
    state.loadingMetadatasContent = false;
    state.MetadataIdsOK = true;
    state.MetadatasContentOK = true;
  },
  [LOAD_ALL_METADATA_ERROR](state, reason) {
    state.loadingMetadataIds = false;
    state.loadingMetadatasContent = false;
    state.MetadataIdsOK = false;
    state.error = reason;
  },
  [LOAD_METADATA_IDS](state) {
    state.loadingMetadataIds = true;
    state.metadataIds = [];
  },
  [LOAD_METADATA_IDS_SUCCESS](state, payload) {
    state.loadingMetadataIds = false;
    state.MetadataIdsOK = true;
    state.metadataIds = payload;
  },
  [LOAD_METADATA_IDS_ERROR](state, reason) {
    state.loadingMetadataIds = false;
    state.MetadataIdsOK = false;
    state.error = reason;
  },
  [LOAD_METADATAS_CONTENT](state) {
    state.loadingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [LOAD_METADATAS_CONTENT_SUCCESS](state) {
    state.loadingMetadatasContent = false;
    state.MetadatasContentOK = true;
  },
  [LOAD_METADATAS_CONTENT_ERROR](state, reason) {
    state.loadingMetadatasContent = false;
    state.MetadatasContentOK = false;
    state.error = reason;
  },
  [ADD_METADATA](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // use $set to trigger the update cycle (https://vuejs.org/v2/guide/list.html#Caveats)
    this._vm.$set(state.metadatasContent, payload.id, payload);
  },
  [ADD_TEST_METADATA](state, payload) {
    this._vm.$set(state.metadatasContent, payload.id, payload);
  },
};
