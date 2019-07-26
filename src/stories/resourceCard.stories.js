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
  VSpacer
} from "vuetify/lib";

import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

import globalMethods from "@/components/globalMethods";
Vue.mixin(globalMethods);

Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-chip", VChip);
Vue.component("v-spacer", VSpacer);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import ResourceCard from "@/components/Cards/ResourceCard.vue";
import ResourceCardPlaceholder from "@/components/Cards/ResourceCardPlaceholder.vue";
import App from "@/App.vue";
import fileSizeIcon from "@/assets/icons/fileSize.png";
import doiIcon from "@/assets/icons/doi.png";
import linkIcon from "@/assets/icons/link.png";
import downloadIcon from "@/assets/icons/download.png";
import dateCreatedIcon from "@/assets/icons/dateCreated.png";
import lastModifiedIcon from "@/assets/icons/dateModified.png";

const conversion = require("@/store/modules/metadata/conversion");

const iconFiles = getIcons();

// let str = '';
// for (let [key, value] of iconFiles) {
//   str += "got key " + key + " value " + value + " \n";
// }

// alert('icons ' + str);

import unFormatedMetadataCards from "@/stories/metadata";
let metadataCards = [];

unFormatedMetadataCards.forEach(el => {
  let formatted = conversion.solrResultToCKANJSON(el);
  // let keys = Object.keys(el.tags[0]);
  // let props = "";
  // keys.forEach(element => {
  //   props += element + " ";
  // });
  // alert(typeof el.resources + " resources: " + el.resources.length + " " + el.resources instanceof Array);
  metadataCards.push(formatted);
});

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("3 Cards | Resource Cards", module)
  .add("Resource card collection twoColumnLayout", () => ({
    components: { ResourceCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(res, index) in metadataCards[0].resources"
        :key="index"
      >
        <resource-card
          v-bind="res"
          :doiIcon="doiIcon"
          :linkIcon="linkIcon"
          :downloadIcon="downloadIcon"
          :fileSizeIcon="fileSizeIcon"
          :dateCreatedIcon="dateCreatedIcon"
          :lastModifiedIcon="lastModifiedIcon"
          :fileExtensionIcon="iconFiles"
          twoColumnLayout
          @clicked="onCardClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
      v-for="(res, index) in metadataCards[1].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      twoColumnLayout
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
      v-for="(res, index) in metadataCards[2].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      twoColumnLayout
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      doiIcon,
      linkIcon,
      downloadIcon,
      fileSizeIcon,
      dateCreatedIcon,
      lastModifiedIcon,
      iconFiles
    })
  }))

  .add("Resource card collection", () => ({
    components: { ResourceCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(res, index) in metadataCards[0].resources"
        :key="index"
      >
        <resource-card
          v-bind="res"
          :doiIcon="doiIcon"
          :linkIcon="linkIcon"
          :downloadIcon="downloadIcon"
          :fileSizeIcon="fileSizeIcon"
          :dateCreatedIcon="dateCreatedIcon"
          :lastModifiedIcon="lastModifiedIcon"
          :fileExtensionIcon="iconFiles"
          @clicked="onCardClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
      v-for="(res, index) in metadataCards[1].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
      v-for="(res, index) in metadataCards[2].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      doiIcon,
      linkIcon,
      downloadIcon,
      fileSizeIcon,
      dateCreatedIcon,
      lastModifiedIcon,
      iconFiles
    })
  }))

  .add("Resource Placeholder collection", () => ({
    components: { ResourceCardPlaceholder },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder twoColumnLayout />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder twoColumnLayout />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({})
  }));


  function getIcons() {
    let icons  = new Map();

    let imgPaths = require.context("@/assets/icons/", false, /\.png$/);

    imgPaths.keys().forEach(iconFileName => {
      let splits = iconFileName.split('/');
      let key = splits[splits.length - 1];
      key = key.replace('.png', '');
      icons.set(key, iconFileName);
    });
  
    return icons;
  }
  