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
import store from '@/store/store';
import globalMethods from './factories/globalMethods';
import {
  handleGenericError,
  handleGenericAPIError,
} from '@/factories/notificationFactory';


Vue.use(InfiniteLoading /* , { options } */);
Vue.use(Vue2Filters);
Vue.config.productionTip = false;
Vue.mixin(globalMethods);


Vue.config.errorHandler = function (err, vm, info) {
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  // console.log('Vue.config.errorHandler vm: ' + store + ' ' + err + ' \n\n ' + info);
  handleGenericError(error, info);
}

// Vue.config.warnHandler = function (msg, vm, trace) {
//   // `trace` is the component hierarchy trace
//   console.log('Vue.config.warnHandler vm: ' + vm.$store + ' ' + msg + ' \n\n ' + trace);
//   // vm.$store.commit(ADD_USER_NOTIFICATION, msg + ' ' + trace );
// }

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('interceptor got ' + response.status);
  return response;
}, function (error) {
  // console.log('interceptor error ' + error);
  if (error.status >= 500) {
    handleGenericAPIError(error);
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // throw new Error(error);
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});


