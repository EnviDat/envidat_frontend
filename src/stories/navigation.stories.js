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

import Navigation from "@/components/Views/Navigation.vue";
import NavigationToolbar from "@/components/Views/NavigationToolbar.vue";
// import BaseRectangleButton from "@/components/BaseElements/BaseRectangleButton.vue";

export const methods = {
  onMenuClick: action("clicked on menu"),
  onSearchClick: action("clicked on search"),
  onLoginClick: action("clicked on login")
};

export const navItems = [
  { title: "Home", icon: "envidat", toolTip: "Back to the start page" },
  { title: "Login", icon: "dashboard", toolTip: "Login to upload data" },
  { title: "Guidelines", icon: "map", toolTip: "Guidlines about the creation of metadata" },
  { title: "About", icon: "info", toolTip: "What is EnviDat? How is behind EnviDat?" },
  { title: "Policies", icon: "list", toolTip: "The rules of EnviDat" },
  { title: "Contact", icon: "info", toolTip: "What is EnviDat? How is behind EnviDat?" }
];

storiesOf("5 Navigation | Redesigned Navigation", module).add("Menu", () => ({
  components: { Navigation },
  template: `
    <navigation
                :navItems="navItems"
          />`,
  data: () => ({ navItems }),
  methods
})).add("Toolbar", () => ({
  components: { NavigationToolbar },
  template: `
      <navigation-toolbar
                  labelText="Search for something"
            v-on:menuClick="onMenuClick"
            v-on:searchClick="onSearchClick"
            v-on:loginClick="onLoginClick"
            />`,
  methods
})).add("Menu & Toolbar", () => ({
  components: { Navigation, NavigationToolbar },
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

