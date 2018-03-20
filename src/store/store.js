import Vue from 'vue';
import Vuex from 'vuex';
import dataGetters from './getters';
import { dataMutations, ADD_METADATA } from './mutations';
import dataActions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    showLoader: false,
    currentMetaData: Object,
    metadatas: [],
    organizations: [],
    projects: [],
  },
  // GETTERS
  getters: Object.assign({}, dataGetters),
  // MUTATIONS
  mutations: Object.assign({}, dataMutations),
  // ACTIONS
  actions: Object.assign({}, dataActions),
  // METHODS
  /*
  methods: {
    [ADD_METADATA](data) {
      this.$store.commit([ADD_METADATA], data);
    },
  },
  */
  // MODULES
});
