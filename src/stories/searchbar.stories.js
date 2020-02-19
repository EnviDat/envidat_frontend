/**
 * @summary story of SearchBarView & SmallSearchBarView for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-24 10:46:15
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

// /* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import SearchBarView from '../components/Filtering/SearchBarView.vue';
import SmallSearchBarView from '../components/Filtering/SmallSearchBarView.vue';


storiesOf('4 Filtering | SearchBarView', module)
  .add('basic', () => ({
    components: { SearchBarView },
    template: `
    <search-bar-view labelText="Search for something"
                    buttonText="SEARCH"
                    hasButton
          @clicked="onClick"
          @searchCleared="onClear"
          />`,
    methods: {
      onClick(searchTerm) {
        action(`clicked search for "${searchTerm}"`);
      },
      onClear() {
        action('cleared Search')(this.searchTerm = '');
      },
    },
    data: () => ({
      searchTerm: '',
    }),
  }))
  .add('small', () => ({
    components: { SmallSearchBarView },
    template: `
    <v-layout column>
        <v-flex py-1>
            <small-search-bar-view
                        labelText="Search for something"
                        :searchTerm="searchTerm"
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
                        :searchTerm="searchTerm"
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
                            :searchTerm="searchTerm"
                            buttonText="SEARCH"
                            hasButton
                            showSearchCount
                            :searchCount='0'
                            compactLayout
                            @clicked="onClick"
                            @searchCleared="onClear"
                              />
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex>
            <v-layout row>
            <v-flex xs4 px-1>
                <small-search-bar-view
                            labelText="xs4 no button"
                            :searchTerm="searchTerm"
                            showSearchCount
                            :searchCount='123'
                            compactLayout
                            @clicked="onClick"
                            @searchCleared="onClear"
                              />
            </v-flex>

            <v-flex xs3 px-1>
                <small-search-bar-view
                            labelText="xs3 with compactLayout"
                            :searchTerm="searchTerm"
                            showSearchCount
                            :searchCount='12'
                            compactLayout
                            @clicked="onClick"
                            @searchCleared="onClear"
                            />
            </v-flex>

            <v-flex xs3 px-1>
                <small-search-bar-view
                            labelText="xs3 no compactLayout"
                            :searchTerm="searchTerm"
                            showSearchCount
                            :searchCount='0'
                            @clicked="onClick"
                            @searchCleared="onClear"
                              />
            </v-flex>
            
            </v-layout>
        </v-flex>

      </v-layout>`,
    methods: {
      onClick(search) {
        action(`clicked search for "${search}"`);
      },
      onClear() {
        action('cleared Search')(this.searchTerm = '');
      },
    },
    data: () => ({
      searchTerm: '',
    }),
  }));
