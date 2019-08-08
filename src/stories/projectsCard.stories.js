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

import ProjectCard from "@/components/Cards/ProjectCard.vue";
import MetadataCardPlaceholder from "@/components/Cards/MetadataCardPlaceholder.vue";
import App from "@/App.vue";
import fileIcon from "@/assets/icons/file.png";
import lockedIcon from "@/assets/icons/lockClosed.png";
import unlockedIcon from "@/assets/icons/lockOpen.png";

// metadata gets enhance in the storybook config
import projectJSON from "@/testdata/projects.js";
const projectsCards = projectJSON.result;

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("3 Cards | Projects Cards", module)
  .add("collection", () => ({
    components: { ProjectCard },
    template: `
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(metadata, index) in projectsCards"
        :key="index"
      >
        <project-card
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
    `,
    methods,
    data: () => ({
      projectsCards,
      fileIcon,
      lockedIcon,
      unlockedIcon
    })
  }));
