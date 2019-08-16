// import createPersist from 'vuex-localstorage';

import mutations from './mutations';
import actions from './actions';
import categorycards from '../categorycards';
import tags from './tags';

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
   * virtual List properties for MetaDataCards of the BrowsePage via MetadataListView
   */
  vIndex: 0,
  vReloadAmount: 12,
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
  popularTags: [],
  loadingPopularTags: false,
  /**
   * Route properties
   */
  detailPageBackRoute: null,
  aboutPageBackRoute: null,
  /**
   * static category cards for the suggestions of search categories
   */
  categorycards,
  /**
   * Error properties for general Error handling in the app (incomplete)
   */
  error: Object,
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
    popularTags: state => state.popularTags,
    loadingPopularTags: state => state.loadingPopularTags,
    detailPageBackRoute: state => state.detailPageBackRoute,
    aboutPageBackRoute: state => state.aboutPageBackRoute,
    categorycards: state => state.categorycards,
  },
  mutations,
  actions,
};
