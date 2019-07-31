/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import { VBtn, VTooltip, VIcon, VImg } from "vuetify/lib";

Vue.component("v-btn", VBtn);
Vue.component("v-tooltip", VTooltip);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);

import BaseIconLabelView from "@/components/BaseElements/BaseIconLabelView.vue";
// import App.vue for the envidatIcon & metadataInfoIcon css class
import App from "@/App.vue";
import fileIcon from "@/assets/icons/fileAudio.png";
import contact2Icon from "@/assets/icons/contact2.png";

// icon: String,
// iconTooltip: String,
// label: String,
// text: String,
// alignLeft: Boolean,
// bold: Boolean,
// usePlaceholder: Boolean,
// wordBreak: Boolean,
// compactLayout: Boolean,

storiesOf("1 Lables | IconLabel Collection", module).add("different labels", () => ({
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
    contact2Icon
  })
}));
