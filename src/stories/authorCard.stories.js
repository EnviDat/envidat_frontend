/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import {
  VBtn,
  VTooltip,
  VIcon,
  VImg,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VCardTitle,
  VCardMedia,
  VChip,
  VSpacer,
  VHover
} from "vuetify/lib";

Vue.component("v-hover", VHover);
Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-chip", VChip);
Vue.component("v-spacer", VSpacer);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import AuthorCard from "@/components/Cards/AuthorCard.vue";

import authorCollection from "@/testdata/authorCollection.json";

export const methods = {
  authors() {
    const items = Object.values(this.authorCollection);
    return items.splice(0, items.length - 50);
  },
};

storiesOf("3 Cards | Author Cards", module)
  .add("Author Cards", () => ({
    components: { AuthorCard },
    template: `
    <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>

      <v-flex xs3
        v-for="(author, index) in authors()"
        :key="index"
      >
        <author-card :author="author" />
      </v-flex>

    </v-layout>
    </v-container>
    `,
    methods,
    data: () => ({
      authorCollection,
    })
  }));
