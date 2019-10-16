import {
  LOAD_METADATA_CONTENT_BY_ID,
  LOAD_METADATA_CONTENT_BY_ID_SUCCESS,
  LOAD_METADATA_CONTENT_BY_ID_ERROR,
  CLEAN_CURRENT_METADATA,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  CLEAR_SEARCH_METADATA,
  BULK_LOAD_METADATAS_CONTENT,
  BULK_LOAD_METADATAS_CONTENT_SUCCESS,
  BULK_LOAD_METADATAS_CONTENT_ERROR,
  UPDATE_TAGS,
  UPDATE_TAGS_SUCCESS,
  UPDATE_TAGS_ERROR,
  FILTER_METADATA,
  FILTER_METADATA_SUCCESS,
  FILTER_METADATA_ERROR,
  PIN_METADATA,
  CLEAR_PINNED_METADATA,
  SET_DETAIL_PAGE_BACK_URL,
  SET_ABOUT_PAGE_BACK_URL,
  SET_VIRTUAL_LIST_INDEX,
  METADATA_NAMESPACE,
} from '@/store/metadataMutationsConsts';
import {
  handleGenericAPIError,
  // successMessage,
  warningMessage,
  errorMessage
} from '@/factories/notificationFactory';

import metaDataFactory from '@/factories/metaDataFactory';
import globalMethods from '@/factories/globalMethods';
import { Object } from 'core-js';
import { stat } from 'fs';


function enhanceMetadatas(store, datasets) {
  if (!(datasets instanceof Array)) {
    throw new Error('enhanceMetadatas() expects an array of datasets got ' + typeof datasets);
  }
  const { cardBGImages } = store.getters;
  const categoryCards = store.getters[`${METADATA_NAMESPACE}/categoryCards`];
  const metadatasContent = {};

  for (let i = 0; i < datasets.length; i++) {
    let dataset = datasets[i];
    dataset = globalMethods.methods.mixinMethods_enhanceTitleImg(dataset, cardBGImages, categoryCards);
    dataset = globalMethods.methods.mixinMethods_enhanceTags(dataset, categoryCards);

    dataset.location = metaDataFactory.createLocation(dataset);

    metadatasContent[dataset.id] = dataset;
  }

  return metadatasContent;
}


export default {
  [SEARCH_METADATA](state) {
    state.searchingMetadatasContent = true;
    state.searchingMetadatasContentOK = false;
    state.searchedMetadatasContent = {};
  },
  [SEARCH_METADATA_SUCCESS](state, payload) {

    state.searchedMetadatasContent = enhanceMetadatas(this, payload);

    // this._vm.$set(state.searchedMetadatasContent, ckanJSON.id, ckanJSON);
    state.searchingMetadatasContentOK = true;
    state.searchingMetadatasContent = false;
  },
  [SEARCH_METADATA_ERROR](state, reason) {
    state.searchingMetadatasContent = false;
    state.searchingMetadatasContentOK = false;
    handleGenericAPIError(reson);
  },
  [CLEAR_SEARCH_METADATA](state) {
    state.searchingMetadatasContent = false;
    state.searchingMetadatasContentOK = false;
    state.searchedMetadatasContent = {};
  },
  [LOAD_METADATA_CONTENT_BY_ID](state) {
    state.loadingCurrentMetadataContent = true;
    state.currentMetadataContent = {};
    // this._vm.$set(state.currentMetadataContent, {});
  },
  [LOAD_METADATA_CONTENT_BY_ID_SUCCESS](state, payload) {
    state.loadingCurrentMetadataContent = false;
    const enhancedPayload = enhanceMetadatas(this, [payload]);
    state.currentMetadataContent = Object.values(enhancedPayload)[0];
  },
  [LOAD_METADATA_CONTENT_BY_ID_ERROR](state, reason) {
    state.loadingCurrentMetadataContent = false;

    notificationFactory
    handleGenericAPIError(reson);
  },
  [CLEAN_CURRENT_METADATA](state) {
    state.loadingCurrentMetadataContent = false;
    state.currentMetadataContent = {};
  },
  [BULK_LOAD_METADATAS_CONTENT](state) {
    state.loadingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [BULK_LOAD_METADATAS_CONTENT_SUCCESS](state, payload) {
    state.metadatasContent = enhanceMetadatas(this, payload);

    state.metadatasContentOK = true;
    state.loadingMetadatasContent = false;
  },
  [BULK_LOAD_METADATAS_CONTENT_ERROR](state, reason) {
    state.loadingMetadatasContent = false;
    state.metadatasContentOK = false;
    handleGenericAPIError(reson);
  },
  [UPDATE_TAGS](state) {
    state.updatingTags = true;
  },
  [UPDATE_TAGS_SUCCESS](state, payload) {
    state.updatingTags = false;
    state.allTags = payload;
  },
  [UPDATE_TAGS_ERROR](state, reason) {
    state.updatingTags = false;
    state.error = reason;
  },
  [FILTER_METADATA](state) {
    state.isFilteringContent = true;
  },
  [FILTER_METADATA_SUCCESS](state, payload) {
    state.isFilteringContent = false;
    state.filteredContent = payload;
  },
  [FILTER_METADATA_ERROR](state, reason) {
    state.isFilteringContent = false;
    state.error = reason;
  },
  [PIN_METADATA](state, payload) {
    if (state.pinnedIds.includes(payload)) {
      state.pinnedIds = state.pinnedIds.filter(el => el !== payload);
    } else {
      state.pinnedIds.push(payload);
    }
  },
  [CLEAR_PINNED_METADATA](state) {
    state.pinnedIds = [];
  },
  [SET_DETAIL_PAGE_BACK_URL](state, payload) {
    state.detailPageBackRoute = payload;
  },
  [SET_ABOUT_PAGE_BACK_URL](state, payload) {
    state.aboutPageBackRoute = payload;
  },
  [SET_VIRTUAL_LIST_INDEX](state, payload) {
    state.vIndex = payload;
  },
};
