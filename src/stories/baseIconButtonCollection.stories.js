/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg, VLayout, VFlex, VBadge } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-badge", VBadge);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import BaseIconButton from "@/components/BaseElements/BaseIconButton.vue";
import BaseIconCountView from "@/components/BaseElements/BaseIconCountView.vue";
// import App.vue for the envidatIcon & metadataInfoIcon css class
import App from "@/App.vue";
import fileIcon from "@/assets/icons/file.png";
import contact2Icon from "@/assets/icons/contact2.png";

export const methods = {
  onClick: action("clicked")
};

storiesOf("2 Buttons | Icon buttons", module)
  .add("icon buttons with envidat icons", () => ({
    components: { BaseIconButton },
    template: `
    <v-layout row wrap>

      <v-flex xs1>
        <base-icon-button
          class="mr-2"
          :customIcon="contact2Icon"
          iconColor="accent"
          color="transparent"
          :isToggled="showFullDescription"
          :rotateOnClick="true"
          :rotateToggle="showFullDescription"
          @clicked="showFullDescription = !showFullDescription"
        />
      </v-flex>

      <v-flex xs1>
        <base-icon-button
          class="mr-2"
          materialIconName="expand_more"
          color="transparent"
          :isToggled="showFullDescription"
          :rotateOnClick="true"
          :rotateToggle="showFullDescription"
          @clicked="showFullDescription = !showFullDescription"
        />
      </v-flex>

      <v-flex xs1>
        <base-icon-button
          class="mr-2"
          materialIconName="close"
          iconColor="accent"
          color="transparent"
          :isToggled="showFullDescription"
          :rotateOnClick="true"
          :rotateToggle="showFullDescription"
          @clicked="showFullDescription = !showFullDescription"
        />
      </v-flex>

    </v-layout>`,
    methods,
    data: () => ({
      showFullDescription: false,
      contact2Icon
    })
  }))
  .add("envidat icons with count badge", () => ({
    components: { BaseIconCountView },
    template: `
    <v-layout row wrap>

      <v-flex xs1>
        <div style="position: absolute; top: 10px; left: 20px;" >
          <base-icon-count-view
            class="mr-2"
            :iconString="fileIcon"
            :count="counter"
            :tooltip="tooltip"
          />
        </div>
      </v-flex>

      <v-flex xs1>
        <div style="position: absolute; top: 10px; left: 80px;" >
          <base-icon-count-view
            class="mr-2"
            :iconString="contact2Icon"
            :count="counter"
            :tooltip="tooltip"
          />
        </div>
      </v-flex>

    </v-layout>`,
    methods,
    data: () => ({
      showFullDescription: false,
      fileIcon,
      contact2Icon,
      counter: 55,
      tooltip: "This is the tooltip of the icon count view"
    })
  }));
