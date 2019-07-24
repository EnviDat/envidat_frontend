import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

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
