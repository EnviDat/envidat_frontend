import { storiesOf } from '@storybook/vue';
import './js/vuetify-components';

import NoSearchResultsView from '../components/Filtering/NoSearchResultsView';

// TODO: Import getters to storybook

storiesOf('7 Project | NoSearchResultsView ', module).add('NoSearchResultView', () => ({
  components: { NoSearchResultsView },
  template: `
    <v-layout row wrap>
      <v-flex xs6 pa-2>
      <no-search-results-view @clickedCategory="clickedCategory" />
      </v-flex>
    </v-layout>
`,
}));
