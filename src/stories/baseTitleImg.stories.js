/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import BaseTitleImg from '../components/BaseElements/BaseTitleImg';
import categorycards from '@/store/modules/categorycards';
import './js/vuetify-components';

storiesOf('7 Unknown | TitleImage ', module).add('CategoryCard Collection', () => ({
  components: { BaseTitleImg },
  template: `
    <v-layout row wrap>
      <v-flex xs6 pa-2>
            <base-title-img :parallax="true"
                            :dark="true"
                            :blur="false"
                            :img="categorycards[1].img"
                            :height="20"
                            :title="'This is the title'"
                            :sub-title="subTitle"
                            :text-background-color="textBackgroundColor"
            />
      </v-flex>
    </v-layout>
    `,
  data: () => ({
    categorycards,
  }),
}));
