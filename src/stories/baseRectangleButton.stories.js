/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton.vue';

export const methods = {
  onClick: action('clicked'),
};

storiesOf("2 Buttons | Rectangle", module)
  .add("basic with tool tip", () => ({
    components: { BaseRectangleButton },
    template: `
    <v-layout row wrap>
      <v-flex>      
        <base-rectangle-button
          buttonText="SEARCH"
          toolTipText="Text for the tool tip"
          @click="onClick"/>
      </v-flex>      

      <v-flex>      
          <base-rectangle-button
          buttonText="disabled"
          :disabled='true'
          @click="onClick"/>
      </v-flex>      
      
      <v-flex>      
          <base-rectangle-button
          materialIconName="mdi-settings"
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
