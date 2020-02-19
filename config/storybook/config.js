import Vue from 'vue';
import { configure, addDecorator, addParameters } from '@storybook/vue';
import '@/plugins/vuetify';
import {
  VApp, VContainer, VLayout, VFlex,
} from 'vuetify/lib';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import 'material-design-icons-iconfont/dist/material-design-icons.css';

// import { createTag } from '@/factories/metadataFilterMethods';
import globalMethods from '@/factories/globalMethods';
import {
  convertTags,
  enhanceMetadatas,
} from '@/factories/metaDataFactory';
import metadataCards from '@/stories/js/metadata';

import categoryCards from '@/store/modules/metadata/categoryCards';

const cardImages = () => {
  const imgs = {};

  let imgPaths = require.context('@/assets/cards/landscape/', false, /\.jpg$/);
  imgs.landscape = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/forest/', false, /\.jpg$/);
  imgs.forest = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/snow/', false, /\.jpg$/);
  imgs.snow = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/diversity/', false, /\.jpg$/);
  imgs.diversity = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/hazard/', false, /\.jpg$/);
  imgs.hazard = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/meteo/', false, /\.jpg$/);
  imgs.meteo = globalMethods.methods.mixinMethods_importImages(imgPaths);

  return imgs;
};

metadataCards.forEach((element) => {
  element.tags = convertTags(element.tags, true);
});

enhanceMetadatas(metadataCards, cardImages, categoryCards);


// const vuetifyViewports = {
//   VuetifyLg: {
//     name: 'Vuetify LG',
//     styles: {
//       width: '1904px',
//       height: '100%',
//     },
//     type: 'desktop'
//   },
//   VuetifyXs: {
//     name: 'Vuetify XS',
//     styles: {
//       width: '600px',
//       height: '100%',
//     },
//     type: 'mobile'
//   },
//   VuetifySm: {
//     name: 'Vuetify SM',
//     styles: {
//       width: '960px',
//       height: '100%',
//     },
//     type: 'mobile'
//   },
//   VuetifyMd: {
//     name: 'Vuetify MD',
//     styles: {
//       width: '1264px',
//       height: '100%',
//     },
//     type: 'tablet'
//   },
//   VuetifyXl: {
//     name: 'Vuetify XL',
//     styles: {
//       width: '4096px',
//       height: '100%',
//     },
//     type: 'desktop'
//   }
// };

// configureViewport({
addParameters({
  viewport: {
    // defaultViewport: 'VuetifyMd',
    viewports: {
      // ...vuetifyViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
});


Vue.component('v-app', VApp);
Vue.component('v-container', VContainer);
Vue.component('v-layout', VLayout);
Vue.component('v-flex', VFlex);

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  // template: '<v-app><story/></v-app>'
  template: `<v-app>
    <v-container fluid pa-2 grid-list-xs>
      <v-layout row wrap>
        <v-flex>
          <story/>
        </v-flex>
      </v-layout>
    </v-container>
    </v-app>`,
}));

const req = require.context('@/stories', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

/* eslint-disable import/no-extraneous-dependencies */
// import Vue from 'vue';
// import { configure } from '@storybook/vue';
// import Vuetify, { VApp } from 'vuetify/lib';

// // import 'vuetify/src/stylus/app.styl';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify, {
//   iconfont: 'md'
// });

// Vue.component('v-app', VApp);

// const req = require.context('../../src/stories', true, /.stories\.js$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);
