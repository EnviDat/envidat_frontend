/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import BaseClickCard from '@/components/BaseElements/BaseClickCard.vue';
import categorycards from '@/store/modules/categorycards';

export const methods = {
  onClick: action('clicked'),
};

storiesOf('3 Cards | Base Click Cards ', module).add('CategoryCard Collection', () => ({
  components: { BaseClickCard },
  template: `
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="card in categorycards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              @clicked="onClick"
            />
      </v-flex>

      <v-flex xs4 pa-2
        v-for="card in categorycards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              @clicked="onClick"
            />
      </v-flex>

      <v-flex xs3 pa-2
        v-for="card in categorycards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              @clicked="onClick"
            />
      </v-flex>

    </v-layout>`,
  methods,
  data: () => ({
    categorycards,
  }),
}));
