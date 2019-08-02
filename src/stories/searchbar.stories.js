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
  VCard,
  VCardActions,
  VChip,
  VLayout,
  VFlex,
} from 'vuetify/lib';

import SearchBarView from '../components/Filtering/SearchBarView.vue';
import SmallSearchBarView from '../components/Filtering/SmallSearchBarView.vue';

Vue.component('v-btn', VBtn);
Vue.component('v-tooltip', VTooltip);
Vue.component('v-icon', VIcon);
Vue.component('v-img', VImg);
Vue.component('v-text-field', VTextField);
Vue.component('v-card', VCard);
Vue.component('v-card-actions', VCardActions);
Vue.component('v-chip', VChip);

Vue.component('v-layout', VLayout);
Vue.component('v-flex', VFlex);


export const methods = {
  onClick: action('clicked'),
  onClear: action('clicked on clear'),
};

storiesOf("4 Filtering | SearchBarView", module)
  .add("basic", () => ({
    components: { SearchBarView },
    template: `
    <search-bar-view labelText="Search for something"
                    buttonText="SEARCH"
                    hasButton
          @clicked="onClick"
          @searchCleared="onClear"
          />`,
    methods,
  }))
  .add('small', () => ({
    components: { SmallSearchBarView },
    template: `
    <v-layout column>
        <v-flex py-1>
            <small-search-bar-view
                        labelText="Search for something"
                        buttonText="SEARCH"
                        hasButton
                        :searchCount='0'
                        compactLayout
                        @clicked="onClick"
                        @searchCleared="onClear"
                          />
        </v-flex>
        <v-flex py-1>
            <small-search-bar-view
                        labelText="Search for something"
                        buttonText="SEARCH"
                        :searchCount='0'
                        compactLayout
                        @clicked="onClick"
                        @searchCleared="onClear"
                          />
        </v-flex>

        <v-flex py-1>
            <v-layout row>
            <v-flex xs6>
                <small-search-bar-view
                            labelText="xs6 optimal for button search"
                            buttonText="SEARCH"
                            hasButton
                            :searchCount='0'
                            compactLayout
                />
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex>
            <v-layout row>
            <v-flex xs4 px-1>
                <small-search-bar-view
                            labelText="xs4 no button"
                            :searchCount='0'
                            compactLayout
                />
            </v-flex>

            <v-flex xs3 px-1>
                <small-search-bar-view
                            labelText="xs3 with compactLayout"
                            :searchCount='0'
                            compactLayout
                />
            </v-flex>

            <v-flex xs3 px-1>
                <small-search-bar-view
                            labelText="xs3 no compactLayout"
                            :searchCount='0'
                />
            </v-flex>
            
            </v-layout>
        </v-flex>

      </v-layout>`,
    methods: {
      onClick() {
        action('clicked search');
      },
      onClear() {
        action('cleared Search')(this.searchTerm);
      }
    },
    data: () => ({
      searchTerm: '',
    }),
  }));
