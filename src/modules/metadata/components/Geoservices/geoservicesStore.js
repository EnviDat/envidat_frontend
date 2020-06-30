import axios from 'axios';

export const geoservices = {
  state: {
    basemap: null,
    config: null,
    selectedLayer: null,
    splitLayer: null,
    splitScreen: false,
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
  },
  actions: {
    fetchConfig({ commit }, url) {
      axios.get(url)
        .then((res) => {
          commit('setConfig', res.data);
          commit('setSelectedLayer', res.data.layers.find(layer => layer.visibility).name);
        });
    },
  },
};
