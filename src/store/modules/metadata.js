import mutations from './mutations';
import actions from './actions';

export const metadata = {
  namespaced: true,
  state: {
    loadingMetadataIds: false,
    MetadataIdsOK: false,
    loadingMetadatasContent: false,
    MetadatasContentOK: false,
    metadatasContent: {},
    metadataIds: [],
    filteredMetadataIds: [],
    error: Object,
  },
  getters: {
    loadingMetadataIds: state => state.loadingMetadataIds,
    loadingMetadatasContent: state => state.loadingMetadatasContent,
    metadataIds: state => state.metadataIds,
    metadatasContent: state => state.metadatasContent,
    currentMetadata: state => state.currentMetadata,
  },
  mutations,
  actions,
};

