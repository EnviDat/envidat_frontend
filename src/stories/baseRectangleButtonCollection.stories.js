/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import './js/vuetify-components';

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
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          isOutlined
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          isFlat
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          isOutlined
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="secondary color"
          color="secondary"
          isFlat
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          isOutlined
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="accent color"
          color="accent"
          isFlat
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isOutlined
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isFlat
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          disabled
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isOutlined
          disabled
          tooltipText="Text for the tool tip"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="small button"
          isSmall
          isFlat
          disabled
          tooltipText="Text for the tool tip"
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
          materialIconName="edit"
          iconColor="white"
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          materialIconName="add"
          iconColor="secondary"
          isOutlined
          @click="onClick"/>       
      </v-flex>
      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          iconColor="accent"
          materialIconName="settings"
          isFlat
          @click="onClick"/>       
      </v-flex>

      <v-flex xs4>
        <base-rectangle-button
          buttonText="normal button"
          materialIconName="search"
          disabled
          @click="onClick"/>       
      </v-flex>

    </v-layout>`,
    methods
  }));
