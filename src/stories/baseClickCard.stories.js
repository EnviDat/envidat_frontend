/**
 * @summary story of baseClickCard for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51 
 * Last modified  : 2019-10-23 16:46:09
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Vue from 'vue';
import { VBtn, VTooltip, VIcon, VImg, VLayout, VFlex } from 'vuetify/lib';

Vue.component('v-btn', VBtn);
Vue.component('v-tooltip', VTooltip);
Vue.component('v-icon', VIcon);
Vue.component('v-img', VImg);
Vue.component('v-layout', VLayout);
Vue.component('v-flex', VFlex);

import BaseClickCard from '@/components/BaseElements/BaseClickCard.vue';
import categoryCards from '@/store/modules/metadata/categoryCards';

export const methods = {
  onClick: action('clicked')
};

storiesOf('3 Cards | Click Cards ', module).add('CategoryCcard Collection', () => ({
  components: { BaseClickCard },
  template: `
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for='card in categoryCards' :key='card.title'>
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @clicked='onClick'
            />
      </v-flex>

      <v-flex xs4 pa-2
        v-for='card in categoryCards' :key='card.title'>
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @clicked='onClick'
            />
      </v-flex>

      <v-flex xs3 pa-2
        v-for='card in categoryCards' :key='card.title'>
            <base-click-card
              :title='card.title'
              :img='card.img'
              :color='card.color'
              @clicked='onClick'
            />
      </v-flex>

    </v-layout>`,
  methods,
  data: () => ({
    categoryCards
  })
}));
