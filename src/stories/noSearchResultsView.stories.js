import { storiesOf } from '@storybook/vue';
import './js/vuetify-components';

import NoSearchResultsView from '../components/Filtering/NoSearchResultsView';

storiesOf('7 Project | NoSearchResultsView ', module).add('NoSearchResultView', () => ({
  components: { NoSearchResultsView },
  template: `
    <v-layout row wrap>
      <v-flex xs6 pa-2>
      <no-search-results-view
          :no-result-text="'noResultText sadf sdahfjklasd asdfhjkasd dshjksda sadjfsda sdahjsdadf dasbn'"
          :suggestion-text="'suggestionText asdhfjk hh'"
          @clickedCategory="clickedCategory"
        />
      </v-flex>
    </v-layout>
`,
}));
