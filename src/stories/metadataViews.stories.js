/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";

import {
  VBtn,
  VTooltip,
  VIcon,
  VImg,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VCardTitle,
  VCardMedia,
  VChip,
  VSpacer,
  VDivider,
  VAvatar
} from "vuetify/lib";

Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-chip", VChip);
Vue.component("v-avatar", VAvatar);
Vue.component("v-spacer", VSpacer);
Vue.component("v-divider", VDivider);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import MetadataHeader from "@/components/MetadataDetailViews/MetadataHeader.vue";

import App from "@/App.vue";
import doiIcon from "@/assets/icons/doi.png";
import mailIcon from "@/assets/icons/mail.png";
import contactIcon from "@/assets/icons/contact2.png";
import licenseIcon from "@/assets/icons/license.png";

import metaDataFactory from "@/components/metaDataFactory";
// metadata gets enhance in the storybook config
import metadata from "@/stories/metadata";

const smallHeader = metaDataFactory.createHeader(metadata[0], true);
const largeHeader = metaDataFactory.createHeader(metadata[1], false);

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("6 Metadata Detail | DetailView", module)
  .add("Header", () => ({
    components: { MetadataHeader },
    template: `
    <v-layout row wrap>
      <v-flex x12 py-3>
        <metadata-header
          :show-placeholder="true"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-header
          v-bind="smallHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <metadata-header
          v-bind="largeHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

    </v-layout>        
    `,
    methods,
    data: () => ({
      smallHeader,
      largeHeader,
      doiIcon,
      contactIcon,
      licenseIcon,
      mailIcon
    })
  }));
  
