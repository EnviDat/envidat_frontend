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
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton.vue';

export const methods = {
  onClick: action('clicked'),
};


const stories = storiesOf('2 Buttons | Rectangle', module)
  .add('basic with tool tip', () => ({
    components: { BaseRectangleButton },
    props: {
      isDisabled: {
        default: boolean('Disabled', true),
      },
      buttonText: {
        default: text('buttonText', 'SEARCH'),
      },
    },    
    template: `
    <v-row>
      <v-col>
        <base-rectangle-button
          :buttonText="buttonText"
          toolTipText="Text for the tool tip"
          @click="onClick"/>
      </v-col>
      <v-col>
          <base-rectangle-button
          :buttonText="buttonText"
          :disabled="isDisabled"
          @click="onClick"/>
      </v-col>
      <v-col>
          <base-rectangle-button
          materialIconName="settings"
          iconColor="white"
          buttonText="With Icon"
          tooltipText="Text for the tool tip"
          @click="onClick"/>
      </v-col>
      <v-col>
          <base-rectangle-button
          buttonText="small"
          isSmall
          @click="onClick"/>
      </v-col>
    </v-row>
    `,
    methods,
}));

stories.addDecorator(withKnobs);
