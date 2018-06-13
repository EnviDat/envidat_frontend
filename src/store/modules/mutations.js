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
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  ADD_METADATA,
  ADD_TEST_METADATA,
  LOAD_ALL_TAGS,
  LOAD_ALL_TAGS_SUCCESS,
  LOAD_ALL_TAGS_ERROR,
  LOAD_POPULAR_TAGS,
  LOAD_POPULAR_TAGS_SUCCESS,
  LOAD_POPULAR_TAGS_ERROR,
} from '../metadataMutationsConsts';
import { stat } from 'fs';

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
    state.metadataIdsOK = true;
    state.metadatasContentOK = true;
  },
  [LOAD_ALL_METADATA_ERROR](state, reason) {
    state.loadingMetadataIds = false;
    state.loadingMetadatasContent = false;
    state.metadataIdsOK = false;
    state.error = reason;
  },
  [LOAD_METADATA_IDS](state) {
    state.loadingMetadataIds = true;
    state.metadataIds = [];
  },
  [LOAD_METADATA_IDS_SUCCESS](state, payload) {
    state.loadingMetadataIds = false;
    state.metadataIdsOK = true;
    state.metadataIds = payload;
  },
  [LOAD_METADATA_IDS_ERROR](state, reason) {
    state.loadingMetadataIds = false;
    state.metadataIdsOK = false;
    state.error = reason;
  },
  [LOAD_METADATAS_CONTENT](state) {
    state.loadingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [LOAD_METADATAS_CONTENT_SUCCESS](state) {
    state.loadingMetadatasContent = false;
    state.metadatasContentOK = true;
  },
  [LOAD_METADATAS_CONTENT_ERROR](state, reason) {
    state.loadingMetadatasContent = false;
    state.metadatasContentOK = false;
    state.error = reason;
  },
  [SEARCH_METADATA](state) {
    state.searchingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [SEARCH_METADATA_SUCCESS](state, payload) {
    state.searchingMetadatasContentOK = true;

    /* eslint-disable no-underscore-dangle */
    for (let i = 0; i < payload.length; i++) {
      const element = payload[i];
      this._vm.$set(state.searchedMetadatasContent, element.id, element);
    }

    state.searchingMetadatasContent = false;
  },
  [SEARCH_METADATA_ERROR](state, reason) {
    state.searchingMetadatasContent = false;
    state.searchingMetadatasContentOK = false;
    state.error = reason;
  },
  [ADD_METADATA](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // use $set to trigger the update cycle (https://vuejs.org/v2/guide/list.html#Caveats)
    this._vm.$set(state.metadatasContent, payload.id, payload);
    // state.metadatasContent.set(payload.id, payload);
    // const value = { key: payload.id, value: payload };
    // state.metadatasContent.push(value);
  },
  [ADD_TEST_METADATA](state, payload) {
    this._vm.$set(state.metadatasContent, payload.id, payload);
  },

  [LOAD_ALL_TAGS](state) {
    state.loadingAllTags = true;
    state.allTags = [];
  },
  [LOAD_ALL_TAGS_SUCCESS](state, payload) {
    state.loadingAllTags = false;
    state.allTags = payload.search_facets.tags.items;
  },
  [LOAD_ALL_TAGS_ERROR](state, reason) {
    state.loadingAllTags = false;
    state.error = reason;
  },
  [LOAD_POPULAR_TAGS](state) {
    state.loadingPopularTags = true;
    state.popularTags = [];
  },
  [LOAD_POPULAR_TAGS_SUCCESS](state, payload) {
    state.loadingPopularTags = false;
    state.popularTags = payload.search_facets.tags.items;
  },
  [LOAD_POPULAR_TAGS_ERROR](state, reason) {
    state.loadingPopularTags = false;
    state.error = reason;
  },
};
