import axios from 'axios';

export const geoservices = {
  state: {
    basemap: 'streets',
    config: null,
    selectedLayer: null,
    splitLayer: null,
    splitScreen: false,
    show3d: false,
  },
  getters: {

  },
  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },
    setSelectedLayer(state, payload) {
      state.selectedLayer = payload;
    },
    setSplitLayer(state, payload) {
      state.splitLayer = payload;
    },
    setSplitScreen(state, payload) {
      state.splitScreen = payload;
    },
    setBasemap(state, payload) {
      state.basemap = payload;
    },
    setShow3d(state, payload) {
      state.show3d = payload;
    },
  },
  actions: {
    fetchConfig({ state, commit }, url) {
      if (!state.config) {
        axios.get(url)
          .then((res) => {
            commit('setConfig', res.data);
            commit('setSelectedLayer', res.data.layers.find(layer => layer.visibility).name);
          });
      }
    },
    startSplitScreen({ state, commit }) {
      commit('setSplitLayer', state.selectedLayer);
      commit('setSplitScreen', true);
    },
  },
};
