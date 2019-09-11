/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import './js/vuetify-components';
import {action} from "@storybook/addon-actions";
import SloganCard from '../components/Cards/SloganCard';


export const methods = {
  onClick: action('clicked'),
};

storiesOf('3 Cards | Slogan Cards', module)
  .add('Collection of Slogan Cards', () => ({
    components: { SloganCard },
    template: `
    <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>
      <v-flex xs3>
        <slogan-card
            @click="onClick"
            :slogan="'Random Slogan'"
            :subSlogan="'Subslogan normally longer than the slogan'"
            :buttonText="'Fun button'"
        />
      </v-flex>
    </v-layout>
    </v-container>
    `,
    methods,
  }));
