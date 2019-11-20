/**
 * metadata store module
 *
 * @summary metadata store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-11-01 08:45:09
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

// import createPersist from 'vuex-localstorage';

import metaDataFactory from '@/factories/metaDataFactory';

import mutations from '@/store/modules/metadata/metadataMutations';
import actions from '@/store/modules/metadata/metadataActions';
import categoryCards from '@/store/modules/metadata/categoryCards';
import tags from '@/store/modules/metadata/metadataTags';

for (let i = 0; i < tags.length; i++) {
  const tag = tags[i];
  tag.color = metaDataFactory.getTagColor(categoryCards, tag.name);
}

const initialState = {
  /**
   * The placeholder text for the search bars
   */
  searchPlaceholderTextSmall: 'Enter search term',
  searchPlaceholderText: 'Enter research term, topic or author name',
  /**
   * metadataIds properties are used for step by step loading all the metadata
   */
  loadingMetadataIds: false,
  metadataIdsOK: false,
  metadataIds: [],
  /**
   * metadatasContent properties are used for "bulk" loading all the metadata when the app starts up
   */
  loadingMetadatasContent: false,
  loadingCurrentMetadataContent: false,
  metadatasContentOK: false,
  metadatasContent: {},
  /**
   * the Search properties used when the users makes a full text search
   */
  searchedMetadatasContent: {},
  searchingMetadatasContent: false,
  searchingMetadatasContentOK: false,
  /**
   * filteredContent is the Metadata which is actually shown on the BrowsePage
   */
  isFilteringContent: false,
  filteredContent: [],
  /**
   * currentMetadataContent is set when clicking on a MetadataCard / entry
   * it's used by the MetadataDetailPage
   */
  currentMetadataContent: {},
  /**
   * virtual List properties for MetaDataCards of the BrowsePage via MetadataListLayout
   */
  vIndex: 0,
  vReloadAmount: 16,
  vReloadDelay: 150,
  // scrollPositionDelay has to be more than the vReloadDelay
  scrollPositionDelay: 200,
  /**
   * Pinned Elements from the MapFilter
   */
  pinnedIds: [],
  /**
   * FilterBar properties
   */
  allTags: tags,
  loadingAllTags: false,
  updatingTags: false,
  /**
   * Route properties
   */
  detailPageBackRoute: null,
  aboutPageBackRoute: null,
  /**
   * static category cards for the suggestions of search categories
   */
  categoryCards,
  /**
   * The idRemapping Map is a key value pair which is used for the metadatadetail page
   * to remap an metadataid (it's the name of the ckan json object) to another one
   * because a User might have given the direct url to a paper and later on changed it
   */
  idRemapping: new Map([
    ['als‐based‐snow‐depth‐and‐canopy‐height‐maps‐from‐flights‐in‐2017‐grisons‐ch‐and‐grand‐mesa‐co', 'grand-mesa-co']
  ]),
};

export const metadata = {
  namespaced: true,
  state: initialState,
  getters: {
    searchPlaceholderTextSmall: state => state.searchPlaceholderTextSmall,
    searchPlaceholderText: state => state.searchPlaceholderText,
    loadingMetadataIds: state => state.loadingMetadataIds,
    loadingMetadatasContent: state => state.loadingMetadatasContent,
    metadataIds: state => state.metadataIds,
    metadatasContent: state => state.metadatasContent,
    searchedMetadatasContent: state => state.searchedMetadatasContent,
    searchingMetadatasContent: state => state.searchingMetadatasContent,
    searchingMetadatasContentOK: state => state.searchingMetadatasContentOK,
    loadingCurrentMetadataContent: state => state.loadingCurrentMetadataContent,
    currentMetadataContent: state => state.currentMetadataContent,
    isFilteringContent: state => state.isFilteringContent,
    filteredContent: state => state.filteredContent,
    vIndex: state => state.vIndex,
    vReloadAmount: state => state.vReloadAmount,
    vReloadDelay: state => state.vReloadDelay,
    scrollPositionDelay: state => state.scrollPositionDelay,
    pinnedIds: state => state.pinnedIds,
    allTags: state => state.allTags,
    loadingAllTags: state => state.loadingAllTags,
    updatingTags: state => state.updatingTags,
    detailPageBackRoute: state => state.detailPageBackRoute,
    aboutPageBackRoute: state => state.aboutPageBackRoute,
    categoryCards: state => state.categoryCards,
    idRemapping: state => state.idRemapping,
  },
  mutations,
  actions,
};
