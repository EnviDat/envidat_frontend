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

storiesOf("4 Filtering | Keyword Tag", module)
  .add("Tag states", () => ({
    components: { TagChip },
    template: `
    <v-layout row wrap>

      <v-flex>
        <tag-chip name="Snow" />
      </v-flex>

      <v-flex>
        <tag-chip name="some very long tag name" />       
      </v-flex>

      <v-flex>
        <tag-chip name="closeable" closeable />       
      </v-flex>

      <v-flex>
        <tag-chip name="closeable & selectable" closeable selectable />       
      </v-flex>

      <v-flex>
        <tag-chip name="highlighted" closeable selectable highlighted />
      </v-flex>

      <v-flex>
        <tag-chip name="count='5'" selectable :count="5" />       
      </v-flex>

    </v-layout>`,
    methods
  }));