// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Vue from 'vue';
import {
  VBtn,
  VTooltip,
  VIcon,
  VImg,
  VTextField,
  VLayout,
  VFlex,
  VToolbar,
  VNavigationDrawer,
  VContainer,
  VToolbarSideIcon,
  VToolbarItems,
  VToolbarTitle,
  VTab,
  VSpacer,
  VDivider,
  VList,
  VListGroup,
  VListTile,
  VListTileAction,
  VListTileActionText,
  VListTileAvatar,
  VListTileContent,
  VListTileSubTitle,
  VListTileTitle,
} from 'vuetify/lib';


Vue.component("v-toolbar", VToolbar);
Vue.component("v-toolbar-items", VToolbarItems);
Vue.component("v-toolbar-side-icon", VToolbarSideIcon);
Vue.component("v-toolbar-title", VToolbarTitle);
Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-text-field", VTextField);

Vue.component("v-navigation-drawer", VNavigationDrawer);
Vue.component("v-spacer", VSpacer);
Vue.component("v-divider", VDivider);
Vue.component("v-list", VList);
Vue.component("v-list-group", VListGroup);
Vue.component("v-list-tile", VListTile);
Vue.component("v-list-tile-action", VListTileAction);
Vue.component("v-list-tile-aciton-text", VListTileActionText);
Vue.component("v-list-tile-avatar", VListTileAvatar);
Vue.component("v-list-tile-content", VListTileContent);
Vue.component("v-list-tile-sub-title", VListTileSubTitle);
Vue.component("v-list-tile-title", VListTileTitle);

Vue.component('v-spacer', VSpacer);
Vue.component('v-divider', VDivider);
Vue.component('v-list', VList);
Vue.component('v-list-group', VListGroup);
Vue.component('v-list-tile', VListTile);
Vue.component('v-list-tile-action', VListTileAction);
Vue.component('v-list-tile-aciton-text', VListTileActionText);
Vue.component('v-list-tile-avatar', VListTileAvatar);
Vue.component('v-list-tile-content', VListTileContent);
Vue.component('v-list-tile-sub-title', VListTileSubTitle);
Vue.component('v-list-tile-title', VListTileTitle);

import TheNavigation from "@/components/Navigation/TheNavigation.vue";
import TheNavigationSmall from "@/components/Navigation/TheNavigationSmall.vue";
import TheNavigationToolbar from "@/components/Navigation/TheNavigationToolbar.vue";
// import BaseRectangleButton from "@/components/BaseElements/BaseRectangleButton.vue";

export const methods = {
  onMenuClick: action("clicked on menu"),
  onSearchClick: action("clicked on search"),
  onLoginClick: action("clicked on login")
};
const appVersion = process.env.VUE_APP_VERSION;

const navItems = [
  { title: "Home", icon: "envidat", toolTip: "Back to the start page", active: false },
  { title: "Explore", icon: "search", toolTip: "Explore research data", active: false },
  { title: "Login", icon: "person", toolTip: "Login to upload data", active: false },
  { title: "Organizations", icon: "account_tree", toolTip: "Explore research data", active: false },
  { title: "Projects", icon: "library_books", toolTip: "Explore research data", active: false },
  { title: "Guidelines", icon: "local_library", toolTip: "Guidlines about the creation of metadata", active: false },
  { title: "Policies", icon: "policy", toolTip: "The rules of EnviDat", active: false },
  { title: "About", icon: "info", toolTip: "What is EnviDat? How is behind EnviDat?", active: false },
  { title: "Contact", icon: "contact_support", toolTip: "Do you need support?", active: false },
  { title: "Menu", icon: "menu", active: true }
];

storiesOf("5 Navigation | Redesigned Navigation", module)
.add("Menu", () => ({
  components: { Navigation },
  template: `
    <v-container>
      <navigation :navItems="navItems" :version="appVersion" />

      <p v-for="(item, index) in navItems" :key="index" 
          v-show="item.active"
          style="margin: 100px;" >
        {{ item.title }}
      </p>
    </v-container>
  `,
  data: () => ({
    navItems,
    appVersion,
  }),
  methods
}))
.add("Menu Mini", () => ({
  components: { TheNavigationSmall },
  template: `
    <v-container>
      <navigation-mini :navItems="navItems"
                        style="position: fixed; top: auto; left: auto; bottom: 25px; right: 25px;"
                        class="elevation-2"
                        />
      <p v-for="(item, index) in navItems" :key="index" 
          v-show="item.active">
        {{ item.title }}
      </p>

    </v-container>    
  `,
  data: () => ({ navItems }),
  methods
}))
.add("Toolbar", () => ({
  components: { TheNavigationToolbar },
  template: `
      <navigation-toolbar
                  labelText="Search for something"
            v-on:menuClick="onMenuClick"
            v-on:searchClick="onSearchClick"
            v-on:loginClick="onLoginClick"
            />`,
  methods
})).add("Menu & Toolbar", () => ({
  components: { TheNavigation, TheNavigationToolbar },
  template: `
      <navigation
        :navItems="navItems"
      />  
      <navigation-toolbar
                  labelText="Search for something"
            @menuClick="onMenuClick"
            @searchClick="onSearchClick"
            @loginClick="onLoginClick"
            />
  `,
  data: () => ({ navItems }),
  methods
}));

