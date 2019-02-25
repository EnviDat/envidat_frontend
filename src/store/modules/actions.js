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
} from '../metadataMutationsConsts';

// import randomInt from '../../components/globalMethods';
const globalMethods = require('../../components/globalMethods');
/* eslint-disable no-unused-vars  */

const ENVIDAT_PROXY = process.env.ENVIDAT_PROXY;
const SOLR_PROXY = process.env.SOLR_PROXY;
const API_BASE = '/api/3/action/';
const SOLR_API_BASE = '/solr/ckan_default/';

function urlRewrite(url, baseUrl, proxyUrl) {
  // const from = url;
  // url = url.replace(/&/g, '%26');
  url = url.replace('?', '&');
  url = url.replace("'", '%22');

  url = `${proxyUrl}${baseUrl}${url}`;

  // console.log("from " + from + " to " + url);
  return url;
}

function enhanceSearchWithTags(allTags, searchResult) {
  if (searchResult === undefined || searchResult.length <= 0 || allTags === undefined) {
    return undefined;
  }

  for (let i = 0; i < searchResult.length; i++) {
    const el = searchResult[i];

    for (let j = 0; j < el.tags.length; j++) {
      const element = el.tags[j];

      const index = allTags.findIndex(obj => obj.name === element);
      const tag = allTags[index];

      if (tag) {
        /* eslint-disable no-param-reassign */
        el.tags[j] = tag;
      }
    }
  }

  return searchResult;
}

function enhanceMetadataEntry(entry, cardBGImages) {
  if (!entry.titleImg) {
    globalMethods.default.methods.enhanceTitleImg(entry, cardBGImages);
  }

  return entry;
}

function enhanceMetadata(metadatas, cardBGImages) {
  if (metadatas === undefined && metadatas.length <= 0) {
    return undefined;
  }

  // console.log("enhanceMetadata " + Array.isArray(metadatas) + " " + cardBGImages );

  if (Array.isArray(metadatas)) {
    for (let i = 0; i < metadatas.length; i++) {
      const el = metadatas[i];

      if (!el.titleImg) {
        globalMethods.default.methods.enhanceTitleImg(el, cardBGImages);
      }
    }
  }

  return metadatas;
}

function enhanceContent(metadatas, cardBGImages) {
  let enhancedContent = [];

  if (metadatas && metadatas.length > 0) {
    enhancedContent = enhanceMetadata(metadatas, cardBGImages);
  }

  return enhanceContent;
}

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

function tagsIncludedInSelectedTags(tags, selectedTagNames) {
  let selectedTagFound = 0;

  for (let j = 0; j < selectedTagNames.length; j++) {
    const el = selectedTagNames[j];

    for (let k = 0; k < tags.length; k++) {
      const tag = tags[k];

      if (tag.name.includes(el)) {
        selectedTagFound++;
        break;
      }
    }
  }

  return selectedTagFound === selectedTagNames.length;
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

    // tags:SNOW%20AND%20notes:snow
    // maybe use notes:"snow avalanche"
    // select?indent=on&q=tags:${searchTerm}%20AND%20notes:${searchTerm}&wt=json

    const splitSpaces = searchTerm.split(' ');
    if (splitSpaces.length > 1) {
      searchTerm = splitSpaces[0];
      for (let i = 1; i < splitSpaces.length; i++) {
        const el = splitSpaces[i];
        searchTerm += ` OR ${el}`;
      }
    }

    const url = urlRewrite(`select?indent=on&q=notes:${searchTerm} OR title:${searchTerm} OR authors:${searchTerm}&wt=json&rows=1000`, SOLR_API_BASE, SOLR_PROXY);

    axios.get(url)
      .then((response) => {
        commit(SEARCH_METADATA_SUCCESS, response.data.response.docs);
      })
      .catch((reason) => {
        commit(SEARCH_METADATA_ERROR, reason);
      });
  },
  async [LOAD_METADATA_CONTENT_BY_ID]({ commit }, metadataId) {
    commit(LOAD_METADATA_CONTENT_BY_ID);

    const url = urlRewrite(`package_show?id=${metadataId}`, API_BASE, ENVIDAT_PROXY);

    axios.get(url).then((response) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_ERROR, reason);
    });
  },
  async [BULK_LOAD_METADATAS_CONTENT]({ dispatch, commit, showRestrictedContent = false }) {
    commit(BULK_LOAD_METADATAS_CONTENT);
    // console.log(BULK_LOAD_METADATAS_CONTENT);

    // const url = urlRewrite('package_search', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('select?q=title:*&wt=json&rows=1000', SOLR_API_BASE, SOLR_PROXY);
    const url = `${SOLR_PROXY}${SOLR_API_BASE}select&q=title:*&wt=json&rows=1000`;

    axios.get(url)
      .then((response) => {
        commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, response.data.response.docs, showRestrictedContent);

        // for the case when loaded up on landingpage
        dispatch(FILTER_METADATA, []);
      })
      .catch((reason) => {
        commit(BULK_LOAD_METADATAS_CONTENT_ERROR, reason);
      });
  },
  [UPDATE_TAGS]({ commit }) {
    if (this.getters['metadata/updatingTags']) {
      return;
    }

    const filteredContent = this.getters['metadata/filteredContent'];
    const allTags = this.getters['metadata/allTags'];

    if (!filteredContent || !allTags) {
      return;
    }

    commit(UPDATE_TAGS);

    setTimeout(() => {
      try {
        const updatedTags = [];

        for (let i = 0; i < allTags.length; i++) {
          const tag = allTags[i];
          let found = false;

          for (let j = 0; j < filteredContent.length; j++) {
            const el = filteredContent[j];

            if (el.tags && el.tags.length > 0) {
              const index = el.tags.findIndex(obj => obj.name.includes(tag.name));

              if (index >= 0) {
                found = true;
                break;
              }
            }
          }

          updatedTags.push({ name: tag.name, enabled: found });
        }

        commit(UPDATE_TAGS_SUCCESS, updatedTags);
      } catch (error) {
        commit(UPDATE_TAGS_ERROR, error);
      }
    }, 100);
  },
  async [FILTER_METADATA]({ dispatch, commit }, selectedTagNames) {
    commit(FILTER_METADATA);

    // use timeout to make sure the placeholder as loading indicators will show up
    setTimeout(() => {
      let content = [];
      // console.log("filteredMetadataContent");

      const isSearchResultContent = this.getters['metadata/searchingMetadatasContentOK'];

      try {
        if (isSearchResultContent) {
          const searchContent = this.getters['metadata/searchedMetadatasContent'];
          const searchContentSize = contentSize(searchContent);

          if (searchContentSize > 0) {
            const allTags = this.getters['metadata/allTags'];

            content = Object.values(searchContent);
            content = enhanceSearchWithTags(allTags, content);
          }
        } else {
          const metadatasContent = this.getters['metadata/metadatasContent'];
          content = Object.values(metadatasContent);
        }

        const filteredContent = [];
        let keep = false;

        for (let i = 0; i < content.length; i++) {
          const entry = content[i];
          keep = contentFilterAccessibility(entry);

          if (keep) {
            keep = contentFilteredByTags(entry, selectedTagNames);
          }

          if (keep) {
            filteredContent.push(entry);
          }
        }

        const cardBGImages = this.getters.cardBGImages;
        enhanceContent(filteredContent, cardBGImages);
        content = filteredContent;

        commit(FILTER_METADATA_SUCCESS, content);

        dispatch(UPDATE_TAGS);
      } catch (error) {
        commit(FILTER_METADATA_ERROR, error);
      }
    }, 100);
  },
};
