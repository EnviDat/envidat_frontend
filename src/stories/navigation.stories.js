// /* eslint-disable import/no-extraneous-dependencies */
import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import './js/vuetify-components';

import Navigation from '@/components/Navigation/Navigation.vue';
// import NavigationMini from "@/components/Navigation/NavigationMini.vue";
import NavigationToolbar from '@/components/Navigation/NavigationToolbar.vue';

export const methods = {
  onMenuClick: action('clicked on menu'),
  onSearchClick: action('clicked on search'),
  onLoginClick: action('clicked on login'),
};
const appVersion = process.env.VUE_APP_VERSION;

const navItems = [
  {
    title: 'Home', icon: 'envidat', tooltip: 'Back to the start page', active: false,
  },
  {
    title: 'Explore', icon: 'search', tooltip: 'Explore research data', active: false,
  },
  {
    title: 'Login', icon: 'person', tooltip: 'Login to upload data', active: false,
  },
  {
    title: 'Organizations', icon: 'account_tree', tooltip: 'Explore research data', active: false,
  },
  {
    title: 'Projects', icon: 'library_books', tooltip: 'Explore research data', active: false,
  },
  {
    title: 'Guidelines',
    icon: 'local_library',
    tooltip: 'Guidlines about the creation of metadata',
    active: false,
  },
  {
    title: 'Policies', icon: 'policy', tooltip: 'The rules of EnviDat', active: false,
  },
  {
    title: 'About', icon: 'info', tooltip: 'What is EnviDat? How is behind EnviDat?', active: false,
  },
  {
    title: 'Contact', icon: 'contact_support', tooltip: 'Do you need support?', active: false,
  },
  {title: 'Menu', icon: 'menu', active: true},
];

storiesOf('5 Navigation | Redesigned Navigation', module)
  .add('Menu', () => ({
    components: {Navigation},
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
    methods,
  }))
  // .add("Menu Mini", () => ({
  //   components: { NavigationMini },
  //   template: `
  //     <v-container>
  //       <navigation-mini :navItems="navItems"
  //                         style="position: fixed; top: auto; left: auto; bottom: 25px; right: 25px;"
  //                         class="elevation-2"
  //                         />
  //       <p v-for="(item, index) in navItems" :key="index"
  //           v-show="item.active">
  //         {{ item.title }}
  //       </p>
  //
  //     </v-container>
  //   `,
  //   data: () => ({ navItems }),
  //   methods
  // }))
  .add('Toolbar', () => ({
    components: {NavigationToolbar},
    template: `<navigation-toolbar
                  labelText="Search for something"
            v-on:menuClick="onMenuClick"
            v-on:searchClick="onSearchClick"
            v-on:loginClick="onLoginClick"
            />`,
    methods,
  })).add('Menu & Toolbar', () => ({
  components: { Navigation, NavigationToolbar },
  template: `<navigation :navItems="navItems" />
                <navigation-toolbar
                    labelText="Search for something"
                    @menuClick="onMenuClick"
                    @searchClick="onSearchClick"
                    @loginClick="onLoginClick" />`,
  data: () => ({navItems}),
  methods,
}));
