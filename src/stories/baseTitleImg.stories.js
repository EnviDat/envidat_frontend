/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import BaseTitleImg from '../components/BaseElements/BaseTitleImg';
import mission from '@/assets/about/mission.jpg';
import missionSmall from '@/assets/about/mission_small.jpg';
import './js/vuetify-components';

storiesOf('7 Project | TitleImage ', module).add('CategoryCard Collection', () => ({
  components: { BaseTitleImg },
  template: `
    <v-layout row wrap>
      <v-flex xs6 pa-2>
            <base-title-img :parallax="true"
                            :dark="true"
                            :blur="false"
                            :img="mission"
                            :height="100"
                            :title="'This is the title'"
                            :sub-title="subTitle"
                            :text-background-color="textBackgroundColor"
            />
      </v-flex>
    </v-layout>
    `,
  data: () => ({
    mission,
  }),
}));
