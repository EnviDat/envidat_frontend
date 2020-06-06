import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import NoSearchResultsView from '@/components/Filtering/NoSearchResultsView';
import categoryCards from '@/store/modules/metadata/categoryCards';

export const methods = {
  onClick: action('clicked on card'),
};

storiesOf('4 Filtering | NoSearchResultsView ', module).add('NoSearchResultView', () => ({
  components: { NoSearchResultsView },
  template: `
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <no-search-results-view :categoryCards="categoryCards"
                                  @clickedCategory="onClick" />
      </v-flex>
      <v-flex xs6 pa-2>
        <no-search-results-view :categoryCards="categoryCards"
                                  @clickedCategory="onClick" />
      </v-flex>
    </v-layout>`,
  methods,
  data: () => ({
    categoryCards,
  }),
}));
