/**
 * @summary story of BaseIconLabelView for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-24 11:01:43
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import './js/vuetify-components';

import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView.vue';
import fileIcon from '@/assets/icons/fileAudio.png';
import contact2Icon from '@/assets/icons/contact2.png';


storiesOf('1 Lables | IconLabel Collection', module).add('different labels', () => ({
  components: { BaseIconLabelView },
  template: `
    <v-layout row wrap
    style="border: solid 1px;">

      <v-flex xs12>
        <p>hover over the icon label for a description of the properties used</p>
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          iconTooltip="icon label view with label & text"
          label="label text: "
          text="somefilename.mp4"
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          iconTooltip="icon label view with alignLeft, label & text"
          label="label text: "
          text="somefilename.mp4"
          alignLeft
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          iconTooltip="icon label view with alignLeft, wordBreak, label & text"
          label="label text: "
          text="somefilename.mp4"
          alignLeft
          wordBreak
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          :icon="fileIcon"
          iconTooltip="icon label view with bold, icon, label & text"
          label="label text: "
          text="somefilename.mp4"
          bold
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          :icon="contact2Icon"
          iconTooltip="icon label view with alignLeft, icon, label & text"
          label="label text: "
          text="somefilelongerfilename.mp4"
          alignLeft
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          :icon="contact2Icon"
          iconTooltip="icon label view without text & usePlaceholder, alignLeft, icon, label"
          label="label text: "
          alignLeft
          usePlaceholder
          />
      </v-flex>



      <v-flex xs4>
        <base-icon-label-view
          :icon="contact2Icon"
          iconTooltip="icon label view with wordBreak, icon, label & text"
          label="label text: "
          text="somefilename.mp4"
          wordBreak
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          :icon="contact2Icon"
          iconTooltip="icon label view with compactLayout, icon, label & text"
          label="label text: "
          text="somefilename.mp4"
          compactLayout
          />
      </v-flex>


      
      <v-flex xs4>
        <base-icon-label-view
          :icon="contact2Icon"
          iconTooltip="icon label view with icon, text & without label text"
          text="somefilename.mp4"
          />
      </v-flex>

      <v-flex xs4>
        <base-icon-label-view
          :icon="fileIcon"
          iconTooltip="icon label view with compactLayout, alignLeft, icon, text & without label text"
          text="somefilename.mp4"
          alignLeft
          compactLayout
          />
      </v-flex>

    </v-layout>
          `,
  // methods,
  data: () => ({
    fileIcon,
    contact2Icon,
  }),
}));
