import mutations from './mutations';
import actions from './actions';

export const metadata = {
  namespaced: true,
  state: {
    loadingMetadataIds: false,
    metadataIdsOK: false,
    loadingMetadatasContent: false,
    metadatasContentOK: false,
    metadatasContent: {},
    searchedMetadatasContent: {},
    searchingMetadatasContent: false,
    searchingMetadatasContentOK: false,
    metadataIds: [],
    filteredMetadataIds: [],
    allTags: [],
    loadingAllTags: false,
    popularTags: [],
    loadingPopularTags: false,
    error: Object,
  },
  getters: {
    loadingMetadataIds: state => state.loadingMetadataIds,
    loadingMetadatasContent: state => state.loadingMetadatasContent,
    metadataIds: state => state.metadataIds,
    metadatasContent: state => state.metadatasContent,
    searchedMetadatasContent: state => state.searchedMetadatasContent,
    searchingMetadatasContent: state => state.searchingMetadatasContent,
    searchingMetadatasContentOK: state => state.searchingMetadatasContentOK,
    currentMetadata: state => state.currentMetadata,
    allTags: state => state.allTags,
    loadingAllTags: state => state.loadingAllTags,
    popularTags: state => state.popularTags,
    loadingPopularTags: state => state.loadingPopularTags,
  },
  mutations,
  actions,
};

