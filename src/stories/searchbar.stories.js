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
};

storiesOf("4 Filtering | SearchBarView", module)
  .add("basic", () => ({
    components: { SearchBarView },
    template: `
    <search-bar-view labelText="Search for something"
                    buttonText="SEARCH"
                    hasButton
          @click="onClick"/>`,
    methods,
  }))
  .add('small', () => ({
    components: { SmallSearchBarView },
    template: `
    <v-layout column>
        <v-flex>
            <small-search-bar-view labelText="Search for something"
                        buttonText="SEARCH"
                        hasButton
                        :searchCount='0'
                        compactLayout
            @click="onClick"/>
        </v-flex>
        <v-flex>
            <v-layout row>
            <v-flex xs6>
                <small-search-bar-view
                            labelText="Flex with xs6 is might be optimal?"
                            buttonText="SEARCH"
                            hasButton
                            :searchCount='0'
                            compactLayout
                @click="onClick"/>
            </v-flex>
            </v-layout>
        </v-flex>
        </v-flex>
        <v-flex>
            <v-layout row>
            <v-flex xs4>
                <small-search-bar-view
                            labelText="Flex with xs4"
                            buttonText="SEARCH"
                            hasButton
                            :searchCount='0'
                            compactLayout
                @click="onClick"/>
            </v-flex>
            <v-flex xs3>

            </v-flex>
            <v-flex xs3>
                <small-search-bar-view
                            labelText="Flex with xs3"
                            buttonText="SEARCH"
                            hasButton
                            :searchCount='0'
                            compactLayout
                @click="onClick"/>
            </v-flex>

            </v-layout>
        </v-flex>

        </v-layout>`,
    methods,
  }));
