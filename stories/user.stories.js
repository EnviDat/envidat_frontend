/**
 * @summary story of SigninPage sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2020-08-11 15:24:30
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import SigninView from '@/modules/user/components/SigninView.vue';
import UserAvatar from '@/components/Layouts/UserAvatar.vue';
import UserCard from '@/components/Layouts/UserCard.vue';

import authorCollection from '../public/testdata/authorCollection.json';

export const methods = {
  authors() {
    const items = Object.values(authorCollection);
    return items.splice(1, 5);
  },
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
        <Signin-view signedInEmail="dominik.haas@wsl.ch" signedIn  />
      </v-col>

    </v-row>
    `,
    methods,
  }))
  .add('User Avatar', () => ({
    components: { UserAvatar },
    template: `
    <v-row >

      <v-col >
        <UserAvatar :size="32" />
      </v-col>

      <v-col >
        <UserAvatar />
      </v-col>

      <v-col >
        <UserAvatar :size="64" />
      </v-col>

      <v-col >
        <UserAvatar :size="128" />
      </v-col>

      <v-col >
        <UserAvatar :size="32" nameInitials="DH" />
      </v-col>
            
      <v-col >
        <UserAvatar nameInitials="DH" />
      </v-col>

      <v-col >
        <UserAvatar :size="64" nameInitials="DH" />
      </v-col>

      <v-col >
        <UserAvatar :size="128" nameInitials="DH" />
      </v-col>

      <v-col >
        <UserAvatar :size="32" 
                    emailHash="7e6b6dca84df35a663ba4518360095a8"  />
      </v-col>
            
      <v-col >
        <UserAvatar 
                    emailHash="7e6b6dca84df35a663ba4518360095a8"  />
      </v-col>

      <v-col >
        <UserAvatar :size="64" 
                    emailHash="7e6b6dca84df35a663ba4518360095a8"  />
      </v-col>

      <v-col >
        <UserAvatar :size="128" 
                    emailHash="7e6b6dca84df35a663ba4518360095a8"  />
      </v-col>

      <v-col >
        <UserAvatar :size="32"
                    defaultGavatar="robohash"
                    emailHash="7e6b6d1213f35a663ba4518360095a8" />
      </v-col>

      <v-col >
        <UserAvatar defaultGavatar="robohash"
                    emailHash="7e6b6dca2344df35a663ba4518360095a8" />
      </v-col>

      <v-col >
        <UserAvatar :size="64"
                    defaultGavatar="robohash"
                    emailHash="7e6b6dca84df351234518360095a8" />
      </v-col>

      <v-col >
        <UserAvatar :size="128"
                    defaultGavatar="robohash"
                    emailHash="4c6104f35821eb25ef16742fc23eb13e"
                    nameInitials="KP" />
      </v-col>      

      <v-col >
        <UserAvatar :size="32"
                    nameInitials="II"
                    emailHash="b4fbef7455319e3124fbb0a1622902f3" />
      </v-col>

      <v-col >
        <UserAvatar nameInitials="II"
                    emailHash="b4fbef7455319e3124fbb0a1622902f3" />
      </v-col>

      <v-col >
        <UserAvatar :size="64"
                    nameInitials="II"
                    emailHash="b4fbef7455319e3124fbb0a1622902f3" />
      </v-col>

      <v-col >
        <UserAvatar :size="128"
                    nameInitials="II"
                    emailHash="b4fbef7455319e3124fbb0a1622902f3" />
      </v-col>

    </v-row>
    `,
    methods,
  }))
  .add('User Card', () => ({
    components: { UserCard },
    template: `
    <v-row >

      <v-col v-for="(author, index) in authors()"
              :key="index" >
        <UserCard :author="author" />
      </v-col>

    </v-row>
    `,
    methods,
  }));
