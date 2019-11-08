import Vue from 'vue';
import { configure, addDecorator } from '@storybook/vue';
import '@/plugins/vuetify';
import Vuetify, { VApp, VContainer, VLayout, VFlex } from 'vuetify/lib';

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { createTag } from '@/factories/metadataFilterMethods';
import globalMethods from '@/factories/globalMethods';

const cardImages = getCardImages(globalMethods);
import metadataCards from '@/stories/js/metadata';
import categoryCards from '@/store/modules/metadata/categoryCards';

metadataCards.forEach(element => {

  element.tags = (tagsStringArray, tagsEnabled) => {
    const tagObjs = [];

    tagsStringArray.forEach((element) => {
      tagObjs.push(createTag(element, { enabled: tagsEnabled }));
    });

    return tagObjs;
  };
});

globalMethods.methods.mixinMethods_enhanceMetadatas(metadataCards, cardImages, categoryCards);

import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const vuetifyViewports = {
  VuetifyLg: {
    name: 'Vuetify LG',
    styles: {
      width: '1904px'
    },
    type: 'desktop'
  },
  VuetifyXs: {
    name: 'Vuetify XS',
    styles: {
      width: '600px'
    },
    type: 'mobile'
  },
  VuetifySm: {
    name: 'Vuetify SM',
    styles: {
      width: '960px'
    },
    type: 'mobile'
  },
  VuetifyMd: {
    name: 'Vuetify MD',
    styles: {
      width: '1264px'
    },
    type: 'tablet'
  },
  VuetifyXl: {
    name: 'Vuetify XL',
    styles: {
      width: '4096px'
    },
    type: 'desktop'
  }
};

configureViewport({
  defaultViewport: 'VuetifyMd',
  viewports: {
    ...vuetifyViewports,
    ...INITIAL_VIEWPORTS
  }
});


Vue.component('v-app', VApp);
Vue.component('v-container', VContainer);
Vue.component('v-layout', VLayout);
Vue.component('v-flex', VFlex);

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  // template: '<v-app><story/></v-app>'
  template: `<v-app>
    <v-container fluid>
      <v-layout column fill-height>
        <v-flex>
          <story/>
        </v-flex>
      </v-layout>
    </v-container>
    </v-app>`
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


function getCardImages(globalMethods) {
  let cardImages = {};

  // alert(
  //   'globalMethods ' +
  //     typeof globalMethods +
  //     ' globalMethods.methods.mixinMethods_importImages ' +
  //     typeof globalMethods.methods.mixinMethods_importImages
  // );

  let imgPaths = require.context('@/assets/cards/landscape/', false, /\.jpg$/);
  cardImages.landscape = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/forest/', false, /\.jpg$/);
  cardImages.forest = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/snow/', false, /\.jpg$/);
  cardImages.snow = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/diversity/', false, /\.jpg$/);
  cardImages.diversity = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/hazard/', false, /\.jpg$/);
  cardImages.hazard = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context('@/assets/cards/meteo/', false, /\.jpg$/);
  cardImages.meteo = globalMethods.methods.mixinMethods_importImages(imgPaths);

  return cardImages;
}
