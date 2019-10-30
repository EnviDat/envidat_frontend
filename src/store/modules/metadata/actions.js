/**
 * metadata store actions
 *
 * @summary metadata store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-30 16:34:09
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

import {
  LOAD_METADATA_CONTENT_BY_ID,
  LOAD_METADATA_CONTENT_BY_ID_SUCCESS,
  LOAD_METADATA_CONTENT_BY_ID_ERROR,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  BULK_LOAD_METADATAS_CONTENT,
  BULK_LOAD_METADATAS_CONTENT_SUCCESS,
  BULK_LOAD_METADATAS_CONTENT_ERROR,
  UPDATE_TAGS,
  UPDATE_TAGS_ERROR,
  UPDATE_TAGS_SUCCESS,
  FILTER_METADATA,
  FILTER_METADATA_SUCCESS,
  FILTER_METADATA_ERROR,
  FILTER_SWISSFL,
  SWISSFL_MODE,
  METADATA_NAMESPACE,
} from '@/store/metadataMutationsConsts';

import { tagsIncludedInSelectedTags } from '@/factories/metadataFilterMethods';
import { urlRewrite, getEnabledTags } from '@/factories/apiFactory';

import {
  getAdditionalTagsFunction,
  removeModeTags,
  getHiddenFiltersFunction,
} from '@/factories/modeFactory';

import metadataTags from '@/store/modules/metadata/tags';


/* eslint-disable no-unused-vars  */
const PROXY = process.env.VUE_APP_ENVIDAT_PROXY;
const API_BASE = '/api/action/';
const useTestData = process.env.VUE_APP_USE_TESTDATA;


function contentSize(content) {
  return content !== undefined ? Object.keys(content).length : 0;
}

function contentFilterAccessibility(value) {
  if (value.capacity && value.capacity !== 'public') {
    // unpublished entries have 'private'
    return false;
  } else if (value.private && value.private === true) {
    return false;
  }

  return true;
}


function contentFilteredByTags(value, selectedTagNames) {
  if (value.tags && tagsIncludedInSelectedTags(value.tags, selectedTagNames)) {
    return true;
  }

  return false;
}

export default {
  async [SEARCH_METADATA]({ commit }, searchTerm) {
    commit(SEARCH_METADATA);

    searchTerm = searchTerm.trim();
    // using the envidat "query" action for performance boost (ckan package_search isn't performant)
    const url = urlRewrite(`query?q=title:"${searchTerm}" OR notes:"${searchTerm}" OR author:"${searchTerm}"&wt=json&rows=1000`,
                            '/', PROXY);

    axios
      .get(url)
      .then((response) => {
        commit(SEARCH_METADATA_SUCCESS, response.data.response.docs);
      })
      .catch((reason) => {
        commit(SEARCH_METADATA_ERROR, reason);
      });
  },
  async [LOAD_METADATA_CONTENT_BY_ID]({ commit }, metadataId) {
    commit(LOAD_METADATA_CONTENT_BY_ID);

    const metadatasContent = this.getters[`${METADATA_NAMESPACE}/metadatasContent`];
    const contents = Object.values(metadatasContent);

    const localEntry = contents.filter(entry => entry.name === metadataId);
    // filter() always return an array
    if (localEntry.length === 1) {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, localEntry[0]);
      return;
    }

    const url = urlRewrite(`package_show?id=${metadataId}`, API_BASE, PROXY);

    axios.get(url).then((response) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_ERROR, reason);
    });
  },
  async [BULK_LOAD_METADATAS_CONTENT]({ dispatch, commit }) {

    const url = urlRewrite('current_package_list_with_resources?limit=1000&offset=0',
                API_BASE, PROXY);

    if (typeof useTestData === 'string' && useTestData.toLowerCase() === 'true') {

      import('@/testdata/packagelist.js')
      .then((projectJSON) => {
        commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, projectJSON.default.result);
        dispatch(FILTER_METADATA, { selectedTagNames: [] });
      });

      return;
    }

    axios.get(url)
      .then((response) => {
        // commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, response.data.response.docs, showRestrictedContent);
        commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, response.data.result);

        // for the case when loaded up on landingpage
        dispatch(FILTER_METADATA, { selectedTagNames: [] });
      })
      .catch((reason) => {
        commit(BULK_LOAD_METADATAS_CONTENT_ERROR, reason);
      });
  },
  [UPDATE_TAGS]({ commit }, mode) {
    const filteredContent = this.getters[`${METADATA_NAMESPACE}/filteredContent`];
    const allTags = this.getters[`${METADATA_NAMESPACE}/allTags`];

    if (!filteredContent || !allTags) {
      return;
    }

    commit(UPDATE_TAGS);

    setTimeout(() => {
      try {
        let allWithExtras = allTags;

        const addExtraTagsFunction = getAdditionalTagsFunction(mode);
        if (addExtraTagsFunction) {
          allWithExtras = addExtraTagsFunction(allTags);
        } else {
          allWithExtras = metadataTags;
        }
    
        const updatedTags = getEnabledTags(allWithExtras, filteredContent);

        commit(UPDATE_TAGS_SUCCESS, updatedTags);
      } catch (error) {
        commit(UPDATE_TAGS_ERROR, error);
      }
    }, 100);
  },
  async [FILTER_METADATA]({ dispatch, commit }, { selectedTagNames, mode }) {
    commit(FILTER_METADATA);

    const extraFilterFunction = getHiddenFiltersFunction(mode);
    if (extraFilterFunction) {
      selectedTagNames = extraFilterFunction(selectedTagNames);
    }

    // use timeout to make sure the placeholder as loading indicators will show up
    setTimeout(() => {
      let content = [];
      // console.log("filteredMetadataContent");

      const isSearchResultContent = this.getters[`${METADATA_NAMESPACE}/searchingMetadatasContentOK`];

      try {
        if (isSearchResultContent) {
          const searchContent = this.getters[`${METADATA_NAMESPACE}/searchedMetadatasContent`];
          const searchContentSize = contentSize(searchContent);

          if (searchContentSize > 0) {
            content = Object.values(searchContent);
          }
        } else {
          const metadatasContent = this.getters[`${METADATA_NAMESPACE}/metadatasContent`];
          content = Object.values(metadatasContent);
        }

        let filteredContent = [];
        let keep = false;

        if (selectedTagNames.length > 0) {
          for (let i = 0; i < content.length; i++) {
            const entry = content[i];
            // keep = contentFilterAccessibility(entry);

            // if (keep && selectedTagNames.length > 0) {
            keep = contentFilteredByTags(entry, selectedTagNames);
            // }

            if (keep) {
              filteredContent.push(entry);
            }
          }
        } else {
          filteredContent = [...content];
        }

        commit(FILTER_METADATA_SUCCESS, filteredContent);

        dispatch(UPDATE_TAGS, mode);
      } catch (error) {
        commit(FILTER_METADATA_ERROR, error);
      }
    }, 100);
  },
  async [FILTER_SWISSFL]({ dispatch, commit }, selectedTagNames) {
    commit(FILTER_METADATA);

    // create a clone so the added swissFLTag won't show up in the
    // selectedTags list
    const secretTags = [...selectedTagNames];

    if (!selectedTagNames.includes(swissFLTag.name)) {
      secretTags.push(swissFLTag.name);
    }
    
    dispatch(FILTER_METADATA, { selectedTagNames: secretTags });
  },
};
