import mutations from './mutations';
import actions from './actions';

export const metadata = {
  namespaced: true,
  state: {
    loadingMetadatas: false,
    loadingMetadatasOK: false,
    loadingMetadatasNOK: false,
    currentMetadata: {},
    metadatas: [],
    metadataIds: [],
    error: Object,
  },
  getters: {
    allOk: state => state.loadingMetadatasOK,
    loading: state => state.loadingMetadatas,
    metadataOverview: state => state.metadataIds,
    metadatas: state => state.metadatas,
    currentMetadata: state => state.currentMetadata,
  },
  mutations,
  actions,
};

