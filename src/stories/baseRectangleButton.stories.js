/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import Vue from 'vue';
import {
  VBtn, VTooltip, VIcon, VImg, VFlex, VLayout
} from 'vuetify/lib';

Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton.vue';

export const methods = {
  // onClick: action('clicked'),
};


const stories = storiesOf("2 Buttons | Rectangle", module)
  .add("basic with tool tip", () => ({
    components: { BaseRectangleButton },
    props: {
      isDisabled: {
        default: boolean('Disabled', true)
      },
      buttonText: {
        default: text('buttonText', 'SEARCH')
      }
    },    
    template: `
    <v-layout row wrap>
      <v-flex>      
        <base-rectangle-button
          :buttonText="buttonText"
          toolTipText="Text for the tool tip"
          @click="onClick"/>
      </v-flex>      

      <v-flex>      
          <base-rectangle-button
          :buttonText="buttonText"
          :disabled="isDisabled"
          @click="onClick"/>
      </v-flex>      
      
      <v-flex>      
          <base-rectangle-button
          materialIconName="settings"
          iconColor="white"
          buttonText="With Icon"
          toolTipText="Text for the tool tip"
          @click="onClick"/>
      </v-flex>      
      
      <v-flex>      
          <base-rectangle-button
          buttonText="small"
          isSmall
          @click="onClick"/>
      </v-flex>      
    </v-layout>
    `,
    methods,
}));

stories.addDecorator(withKnobs);
