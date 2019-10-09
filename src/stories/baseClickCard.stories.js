/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg, VLayout, VFlex } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import BaseClickCard from "@/components/BaseElements/BaseClickCard.vue";
import categoryCards from "@/store/modules/metadata/categoryCards";

export const methods = {
  onClick: action("clicked")
};

storiesOf("3 Cards | Click Cards ", module).add("CategoryCcard Collection", () => ({
  components: { BaseClickCard },
  template: `
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              :color="card.color"
              @clicked="onClick"
            />
      </v-flex>

      <v-flex xs4 pa-2
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              :color="card.color"
              @clicked="onClick"
            />
      </v-flex>

      <v-flex xs3 pa-2
        v-for="card in categoryCards" :key="card.title">
            <base-click-card
              :title="card.title"
              :img="card.img"
              :color="card.color"
              @clicked="onClick"
            />
      </v-flex>

    </v-layout>`,
  methods,
  data: () => ({
    categoryCards
  })
}));
