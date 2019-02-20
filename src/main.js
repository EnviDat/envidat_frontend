// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vue2Filters from 'vue2-filters';
import App from './App';
import router from './router';
import store from './store/store';
import globalMethods from './components/globalMethods';

Vue.use(Vue2Filters);

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B', // teal darken-1
    secondary: '#4DB6AC', // teal lighten-2
    accent: '#FFD740', // amber accent-2
    highlight: '#B2DFDB', // teal lighten-4
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

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
