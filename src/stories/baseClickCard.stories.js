/**
 * @summary story of baseClickCard for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-11-28 16:53:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import BaseClickCard from '@/components/BaseElements/BaseClickCard.vue';
import categoryCards from '@/store/modules/metadata/categoryCards';

export const methods = {
  onClick: action('clicked'),
};

storiesOf('3 Cards | Click Cards ', module).add('CategoryCcard Collection', () => ({
  components: { BaseClickCard },
  template: `
    <v-layout row wrap>

      <v-flex xs6 py-1
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @click='onClick'
            />
      </v-flex>

      <v-flex xs4 py-1
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @click='onClick'
            />
      </v-flex>

      <v-flex xs3 py-1
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @click='onClick'
            />
      </v-flex>

    </v-layout>`,
  methods,
  data: () => ({
    categoryCards,
  }),
}));
