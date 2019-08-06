// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import './plugins/vuetify';

import Vue2Filters from 'vue2-filters';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App';
import router from './router';
import store from './store/store';
import globalMethods from './components/globalMethods';


Vue.use(InfiniteLoading /* , { options } */);
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

Vue.mixin(globalMethods);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // mixins: [globalMethods],
  router,
  store,
  components: { App },
  template: '<App/>',
});
