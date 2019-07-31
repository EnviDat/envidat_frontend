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

import MetadataCard from "@/components/Cards/MetadataCard.vue";
import MetadataCardPlaceholder from "@/components/Cards/MetadataCardPlaceholder.vue";
import App from "@/App.vue";
import fileIcon from "@/assets/icons/file.png";
import lockedIcon from "@/assets/icons/lockClosed.png";
import unlockedIcon from "@/assets/icons/lockOpen.png";

import globalMethods from "@/components/globalMethods";
const conversion = require("@/store/modules/metadata/conversion");

// import solrResultToCKANJSON from "@/store/modules/metadata/conversion";

// alert(
//   "conversion " +
//     typeof conversion +
//     " conversion.solrResultToCKANJSON " +
//     conversion.solrResultToCKANJSON
// );
const cardImages = getCardImages(globalMethods);

import metadataCards from "@/stories/metadata";

export const methods = {
  hasRestrictedResources: function hasRestrictedResources(metadata) {
    if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
      return false;
    }

    /* eslint-disable consistent-return  */
    metadata.resources.forEach(res => {
      if (
        res.restricted !== undefined &&
        (res.restricted.allowed_users !== undefined ||
          (res.restricted.level !== undefined && res.restricted.level !== "public"))
      ) {
        return true;
      }
    });

    return false;
  },
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("3 Cards | Metadata Cards", module)
  .add("Metadata collection", () => ({
    components: { MetadataCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon
    })
  }))
  .add("Metadata collection flat", () => ({
    components: { MetadataCard },
    template: `
    <v-layout row wrap>

      <v-flex xs12 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          flatLayout
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>`,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon
    })
  }))
  .add("Metadata Placeholder collection", () => ({
    components: { MetadataCardPlaceholder },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="index in 3"
        :key="index"
      >
        <metadata-card-placeholder />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="index in 3"
        :key="index"
      >
        <metadata-card-placeholder />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="index in 3"
        :key="index"
      >
        <metadata-card-placeholder />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({})
  }));
// metadataCards.forEach(el => {
//   // el = conversion.solrResultToCKANJSON(el);
//   let keys = Object.keys(el.tags[0]);
//   let props = "";
//   keys.forEach(element => {
//     props += element + " ";
//   });
//   alert(el.name + " tags: " + props + " " + el.tags.length + " ");
// });

globalMethods.methods.mixinMethods_enhanceMetadatas(metadataCards, cardImages);

function getCardImages(globalMethods) {
  let cardImages = {};

  // alert(
  //   "globalMethods " +
  //     typeof globalMethods +
  //     " globalMethods.methods.mixinMethods_importImages " +
  //     typeof globalMethods.methods.mixinMethods_importImages
  // );

  let imgPaths = require.context("@/assets/cards/landscape/", false, /\.jpg$/);
  cardImages.landscape = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/forest/", false, /\.jpg$/);
  cardImages.forest = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/snow/", false, /\.jpg$/);
  cardImages.snow = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/diversity/", false, /\.jpg$/);
  cardImages.diversity = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/hazard/", false, /\.jpg$/);
  cardImages.hazard = globalMethods.methods.mixinMethods_importImages(imgPaths);

  return cardImages;
}
