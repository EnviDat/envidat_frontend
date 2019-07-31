import { configure, addDecorator } from "@storybook/vue";
import "@/plugins/vuetify";

import Vue from "vue";
import Vuetify, { VApp, VContainer, VLayout, VFlex } from "vuetify/lib";

// const dotenv = require('dotenv');

// dotenv.config();
// process.env.VUE_APP_VERSION = require('./package.json').version;
// console.log(`starting storybook ${process.env.VUE_APP_VERSION} on ${process.env.NODE_ENV}`);

// import "vuetify/src/stylus/app.styl";
// import "vuetify/dist/vuetify.min.css";

Vue.component("v-app", VApp);
Vue.component("v-container", VContainer);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
});

import { configureViewport, INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const vuetifyViewports = {
  VuetifyLg: {
    name: "Vuetify LG",
    styles: {
      width: "1904px"
    },
    type: "desktop"
  },
  VuetifyXs: {
    name: "Vuetify XS",
    styles: {
      width: "600px"
    },
    type: "mobile"
  },
  VuetifySm: {
    name: "Vuetify SM",
    styles: {
      width: "960px"
    },
    type: "mobile"
  },
  VuetifyMd: {
    name: "Vuetify MD",
    styles: {
      width: "1264px"
    },
    type: "tablet"
  },
  VuetifyXl: {
    name: "Vuetify XL",
    styles: {
      width: "4096px"
    },
    type: "desktop"
  }
};

configureViewport({
  defaultViewport: "VuetifyMd",
  viewports: {
    ...vuetifyViewports,
    ...INITIAL_VIEWPORTS
  }
});


// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  // template: "<v-app><story/></v-app>"
  template: `<v-app>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex>
          <story/>
        </v-flex>
      </v-layout>
    </v-container>
    </v-app>`
}));

const req = require.context("@/stories", true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

/* eslint-disable import/no-extraneous-dependencies */
// import Vue from "vue";
// import { configure } from "@storybook/vue";
// import Vuetify, { VApp } from "vuetify/lib";

// // import "vuetify/src/stylus/app.styl";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
// import "vuetify/dist/vuetify.min.css";

// Vue.use(Vuetify, {
//   iconfont: "md"
// });

// Vue.component("v-app", VApp);

// const req = require.context("../../src/stories", true, /.stories\.js$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);
