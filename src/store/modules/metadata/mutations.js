import {
  LOAD_METADATA_CONTENT_BY_ID,
  LOAD_METADATA_CONTENT_BY_ID_SUCCESS,
  LOAD_METADATA_CONTENT_BY_ID_ERROR,
  CLEAN_CURRENT_METADATA,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  CLEAR_SEARCH_METADATA,
  LOAD_ALL_TAGS,
  LOAD_ALL_TAGS_SUCCESS,
  LOAD_ALL_TAGS_ERROR,
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

import metaDataFactory from '@/components/metaDataFactory';
import globalMethods from '@/components/globalMethods';

const conversion = require('./conversion');

export default {
  [SEARCH_METADATA](state) {
    state.searchingMetadatasContent = true;
    state.searchingMetadatasContentOK = false;
    state.searchedMetadatasContent = {};
  },
  [SEARCH_METADATA_SUCCESS](state, payload) {
    /* eslint-disable no-underscore-dangle */
    for (let i = 0; i < payload.length; i++) {
      const element = payload[i];
      const ckanJSON = conversion.solrResultToCKANJSON(element);

      this._vm.$set(state.searchedMetadatasContent, ckanJSON.id, ckanJSON);
    }

    state.searchingMetadatasContentOK = true;
    state.searchingMetadatasContent = false;
  },
  [SEARCH_METADATA_ERROR](state, reason) {
    state.searchingMetadatasContent = false;
    state.searchingMetadatasContentOK = false;
    state.error = reason;
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
  [BULK_LOAD_METADATAS_CONTENT](state) {
    state.loadingMetadatasContent = true;
    state.metadatasContent = {};
  },
  [BULK_LOAD_METADATAS_CONTENT_SUCCESS](state, payload) {
    /* eslint-disable no-underscore-dangle */
    const { cardBGImages } = this.getters;
    const categoryCards = this.getters[`${METADATA_NAMESPACE}/categoryCards`];

    for (let i = 0; i < payload.length; i++) {
      let dataset = payload[i];
      dataset = globalMethods.methods.mixinMethods_enhanceTitleImg(dataset, cardBGImages, categoryCards);
      dataset = globalMethods.methods.mixinMethods_enhanceTags(dataset, categoryCards);

      dataset.location = metaDataFactory.createLocation(dataset);

      // this._vm.$set(state.metadatasContent, el.id, el);
      state.metadatasContent[dataset.id] = dataset;
    }

    state.metadatasContentOK = true;
    state.loadingMetadatasContent = false;
  },
  [BULK_LOAD_METADATAS_CONTENT_ERROR](state, reason) {
    state.loadingMetadatasContent = false;
    state.metadatasContentOK = false;
    state.error = reason;
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
