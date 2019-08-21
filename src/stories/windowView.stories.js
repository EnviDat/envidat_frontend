/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import {
  VBtn,
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
  VSlideYTransition,
  VWindow,
  VWindowItem,
  VItem,
  VItemGroup
} from "vuetify/lib";

Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-slide-y-transition", VSlideYTransition);
Vue.component("v-chip", VChip);
Vue.component("v-spacer", VSpacer);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-window", VWindow);
Vue.component("v-window-item", VWindowItem);
Vue.component("v-item", VItem);
Vue.component("v-item-group", VItemGroup);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import WindowView from "@/components/ProjectDetailViews/WindowView.vue";

import projectJSON from "@/testdata/projects";
import projectDataFactory from "@/components/projectsDataFactory";
const enhancedProjects = projectDataFactory.enhanceSubprojects(projectJSON.result);
const projects = enhancedProjects;

const projectDetail1 = projects[6];
const projectDetail2 = projects[3];

export const methods = {
  onCardClick: action("clicked on card"),
};

storiesOf("7 Project | Detail Views", module)
  .add("Window View", () => ({
    components: { WindowView },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2 >
        <window-view :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :subProjects="projectDetail1.subProjects" :metadatas="projectDetail1.packages" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :subProjects="projectDetail2.subProjects" :metadatas="projectDetail2.packages" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :showPlaceholder="false" />
      </v-flex>
      
    </v-layout>
    `,
    methods,
    data: () => ({
      projectDetail1,
      projectDetail2,
    })
  }));
