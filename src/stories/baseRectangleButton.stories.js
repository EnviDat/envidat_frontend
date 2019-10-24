/**
 * @summary story of BaseRectangleButton for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-23 16:46:09
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

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
          tooltipText="Text for the tool tip"
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
          tooltipText="Text for the tool tip"
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
