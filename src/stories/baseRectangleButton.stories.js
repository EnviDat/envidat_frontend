/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);

import BaseRectangleButton from "@/components/BaseElements/BaseRectangleButton.vue";

export const methods = {
  onClick: action("clicked")
};

storiesOf("BaseRectangleButton", module)
  .add("basic with tool tip", () => ({
    components: { BaseRectangleButton },
    template: `<base-rectangle-button
      buttonText="SEARCH"
      toolTipText="Text for the tool tip"
      @click="onClick"/> `,
    methods
  }))
  .add("disabled", () => ({
    components: { BaseRectangleButton },
    template: `<base-rectangle-button
      buttonText="SEARCH"
      :disabled='true'
      @click="onClick"/> `,
    methods
  }))
  .add("basic with icon", () => ({
    components: { BaseRectangleButton },
    template: `<base-rectangle-button materialIconName="add"
      buttonText="SEARCH"
      toolTipText="Text for the tool tip"
      @click="onClick"/> `,
    methods
  }))
  .add("small", () => ({
    components: { BaseRectangleButton },
    template: `<base-rectangle-button
      buttonText="text"
      isSmall
      @click="onClick"/> `,
    methods
  }));
