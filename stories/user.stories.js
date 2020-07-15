/**
 * @summary story of SigninPage sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2020-07-15 23:37:05
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import SigninView from '@/modules/user/components/SigninView.vue';

export const methods = {
  onClick: action('clicked'),
};

storiesOf('7 User / SignIn', module)
  .add('Signin View', () => ({
    components: { SigninView },
    template: `
    <v-row >
      <v-col cols="12">
        <Signin-view />
      </v-col>

      <v-col cols="12">
        <Signin-view requestLoading />
      </v-col>

      <v-col cols="12">
        <Signin-view prefilledEmail="dominik.haas@wsl.ch" requestSuccess />
      </v-col>

      <v-col cols="12">
        <Signin-view prefilledEmail="dominik.haas@wsl.ch" prefilledKey="01234567890123456789012345678901" />
      </v-col>

      <v-col cols="12">
        <Signin-view prefilledEmail="dominik.haas@wsl.ch" prefilledKey="01234567890123456789012345678901" signInLoading />
      </v-col>

      <v-col cols="12">
        <Signin-view prefilledEmail="dominik.haas@wsl.ch" prefilledKey="01234567890123456789012345678901" signedIn />
      </v-col>

      </v-row>
    `,
    methods,
  }));
