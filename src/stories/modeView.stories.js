/**
 * @summary story of BaseIconLabelView for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-31 10:56:32
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import './js/vuetify-components';

import ModeView from '@/components/Layouts/ModeView.vue';
import { SWISSFL_MODE } from '@/store/metadataMutationsConsts';


storiesOf('1 Lables | Mode View', module).add('SwissForestLab implementation', () => ({
  components: { ModeView },
  template: `
  <!-- mode-view :mode="SWISSFL_MODE" / -->
  <v-layout row wrap>

    <v-flex xs12 style="border: solid 1px;" >
      <mode-view :mode="SWISSFL_MODE" />
    </v-flex>

    <v-flex xs12 style="border: solid 1px;" >
      <mode-view :mode="emptyMode" />
    </v-flex>

  </v-layout> `,
  data: () => ({
    SWISSFL_MODE,
    emptyMode: '',
  }),
}));
