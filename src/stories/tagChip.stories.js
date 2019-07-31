/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg, VLayout, VFlex, VChip } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-chip", VChip);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import TagChip from "@/components/Cards/TagChip.vue";

export const methods = {
  onClick: action("clicked")
};

// name: String,
// closeable: Boolean,
// selectable: Boolean,
// highlighted: Boolean,
// count: Number,


storiesOf("2 Buttons | Keyword Tag", module)
  .add("Tag with differents states", () => ({
    components: { TagChip },
    template: `
    <v-layout row wrap>

      <v-flex xs4>
        <tag-chip
          buttonText="normal button"
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          isOutlined
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          isFlat
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

    </v-layout>`,
    methods
  }));
