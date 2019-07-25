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

import '@mdi/font/css/materialdesignicons.css';

import Navigation from '@/components/Views/Navigation.vue';
import NavigationToolbar from '@/components/Views/NavigationToolbar.vue';

Vue.component('v-btn', VBtn);
Vue.component('v-tooltip', VTooltip);
Vue.component('v-icon', VIcon);
Vue.component('v-img', VImg);
Vue.component('v-text-field', VTextField);
Vue.component('v-navigation-drawer', VNavigationDrawer);

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

Vue.component('v-container', VContainer);
Vue.component('v-layout', VLayout);
Vue.component('v-flex', VFlex);

export const methods = {
  onClick: action('clicked'),
};

export const navItems = [
  { title: 'Home', icon: 'envidat', active: false },
  { title: 'Login', icon: 'dashboard', active: false },
  { title: 'Guidelines', icon: 'map', active: false },
  { title: 'Policies', icon: 'list', active: false },
  { title: 'About', icon: 'info', active: false },
];

storiesOf('Navigation', module)
  .add('menu', () => ({
    components: { Navigation },
    template: `
    <v-container>
    <navigation
                :navItems="navItems"
          />
    </v-container>`,
    data: () => ({ navItems }),
    methods,
  }))
  .add('toolbar', () => ({
    components: { NavigationToolbar },
    template: `
      <navigation-toolbar
                  labelText="Search for something"
            @click="onClick"/>
            `,
    methods,
  }));
