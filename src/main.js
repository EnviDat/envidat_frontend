// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import axios from 'axios';

import Vue2Filters from 'vue2-filters';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App';
import router from './router';
import store from './store/store';
import globalMethods from './factories/globalMethods';
import { GENERIC_ERROR } from '@/store/mutationsConsts';



Vue.use(InfiniteLoading /* , { options } */);
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

Vue.mixin(globalMethods);

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('interceptor got ' + response.status);
  return response;
}, function (error) {
  console.log('interceptor error ' + error);
  store.commit(GENERIC_ERROR, error );
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

window.onerror = function (message, source, lineno, colno, error) {
  /// what you want to do with error here
  console.log('window error ' + error);
  store.commit(GENERIC_ERROR, message + ' ' + error );
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // mixins: [globalMethods],
  router,
  store,
  components: { App },
  template: '<App/>',
});


