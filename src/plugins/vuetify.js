import Vue from 'vue';

// vuetify loader installation https://vuetifyjs.com/en/getting-started/quick-start#vuetify-loader-installation
// importing from lib should only load the components which are used
import Vuetify from 'vuetify/lib';

// Full installation https://vuetifyjs.com/en/getting-started/quick-start#full-installation
// import Vuetify from 'vuetify/dist/vuetify.min';

import 'vuetify/dist/vuetify.min.css';

// icons are imported in the App.vue via sass/scss
// Icons list: https://jossef.github.io/material-design-icons-iconfont/

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B', // teal darken-1
    secondary: '#4DB6AC', // teal lighten-2
    accent: '#FFD740', // amber accent-2
    highlight: '#B2DFDB', // teal lighten-4
    error: '#FF5252',
    errorHighlight: '#FF8A80', // red lighten-4
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
});
