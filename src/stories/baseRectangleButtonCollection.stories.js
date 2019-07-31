/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg, VLayout, VFlex } from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import BaseRectangleButton from "@/components/BaseElements/BaseRectangleButton.vue";

export const methods = {
  onClick: action("clicked")
};

storiesOf("2 Buttons | Rectangle Collection", module)
  .add("buttons with differents states", () => ({
    components: { BaseRectangleButton },
    template: `
    <v-layout row wrap>

      <v-flex xs4>
        <base-rectangle-button
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

      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          isOutlined
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          isFlat
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          isOutlined
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          isFlat
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isOutlined
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isFlat
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          disabled
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isOutlined
          disabled
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isFlat
          disabled
          toolTipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

    </v-layout>`,
    methods
  }))
  .add("buttons with icons", () => ({
    components: { BaseRectangleButton },
    template: `
    <v-layout row wrap>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          materialIconName="mdi-settings"
          iconColor="white"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          materialIconName="mdi-settings"
          iconColor="secondary"
          isOutlined
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          iconColor="accent"
          materialIconName="mdi-settings"
          isFlat
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          materialIconName="mdi-settings"
          disabled
          @click="onClick"/>       
      </v-flex>

    </v-layout>`,
    methods
  }));
