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
  CLEAN_CURRENT_METADATA,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  ADD_METADATA,
  ADD_TEST_METADATA,
  LOAD_ALL_TAGS,
  LOAD_ALL_TAGS_SUCCESS,
  LOAD_ALL_TAGS_ERROR,
} from '../metadataMutationsConsts';

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
    state.metadatasContentOK = false;
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
    state.searchedMetadatasContent = {};
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
  [LOAD_METADATA_CONTENT_BY_ID](state) {
    state.loadingCurrentMetadataContent = true;
    state.currentMetadataContent = {};
    // this._vm.$set(state.currentMetadataContent, {});
  },
  [LOAD_METADATA_CONTENT_BY_ID_SUCCESS](state, payload) {
    state.loadingCurrentMetadataContent = false;
    state.currentMetadataContent = payload;
    // this._vm.$set(state.currentMetadataContent, payload);
  },
  [LOAD_METADATA_CONTENT_BY_ID_ERROR](state, reason) {
    state.loadingCurrentMetadataContent = false;
    state.error = reason;
  },
  [CLEAN_CURRENT_METADATA](state) {
    state.loadingCurrentMetadataContent = false;
    state.currentMetadataContent = {};
  },
  [LOAD_ALL_TAGS](state) {
    state.loadingAllTags = true;
    state.allTags = [];
  },
  [LOAD_ALL_TAGS_SUCCESS](state, payload) {
    const tagList = [];

    for (let i = 0; i < payload.length + 1; i += 2) {
      const tag = { name: payload[i], count: payload[i + 1] };

      if (tag.name) {
        tagList.push(tag);
      }
    }

    state.allTags = tagList;
    state.loadingAllTags = false;
  },
  [LOAD_ALL_TAGS_ERROR](state, reason) {
    state.loadingAllTags = false;
    state.error = reason;
  },
};
