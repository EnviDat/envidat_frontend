/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);

import BaseIconLabelView from "@/components/BaseElements/BaseIconLabelView.vue";

export const methods = {
  onClick: action("clicked")
};

storiesOf("Lables | IconLabel", module).add("Combination of label", () => ({
  components: { BaseIconLabelView },
  template: `<base-icon-label-view
      buttonText="SEARCH"
      toolTipText="Text for the tool tip"
      @click="onClick"/> `,
  methods
}));
