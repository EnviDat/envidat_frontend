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
  VDivider,
  VAvatar,
  VForm,
  VTextarea
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
Vue.component("v-form", VForm);
Vue.component("v-textarea", VTextarea);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import ProjectHeader from "@/components/ProjectDetailViews/ProjectHeader.vue";
import ProjectBody from "@/components/ProjectDetailViews/ProjectBody.vue";

// import for css classes
// import App from "@/App.vue";
// import MetadataDetailPage from "@/components/Pages/MetadataDetailPage.vue";

// get Project test data and enhance it
import projectJSON from "@/testdata/projects";
import projectDataFactory from "@/components/projectsDataFactory";
const enhancedProjects = projectDataFactory.enhanceSubprojectsFromExtras(projectJSON.result);
const projects = enhancedProjects;

import globalMethods from "@/components/globalMethods";
const imgPaths = require.context( '../assets/about/', false, /\.jpg$/);
const imgName = 'mission';
const images = globalMethods.methods.mixinMethods_importImages(imgPaths, imgName);
const defaultImg = images[`./${imgName}.jpg`];

const header1 = projects[5];
const header2 = projects[6];
const header3 = projects[7];


const body1 = projects[5];
const body2 = projects[6];
const body3 = projects[8];

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("7 Project | Detail Views", module)
  .add("Header", () => ({
    components: { ProjectHeader },
    template: `
    <v-layout row wrap>
      <v-flex xs12 py-3>
        <project-header />
      </v-flex>

      <v-flex xs12 py-3>
        <project-header :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-3>
        <project-header
          :title="header1.title"
          :titleImg="header1.image_url"
          :defaultImg="defaultImg"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <project-header
        :title="header2.title"
        :titleImg="header2.image_url"
        :defaultImg="defaultImg"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <project-header
        :title="header3.title"
        :titleImg="header3.image_url"
        :defaultImg="defaultImg"
        />
      </v-flex>        

    </v-layout>        
    `,
    methods,
    data: () => ({
      header1,
      header2,
      header3,
      defaultImg,
    })
  }))
  .add("Body", () => ({
    components: { ProjectBody },
    template: `
    <v-layout row wrap>
      <v-flex xs12 py-3>
        <project-body />
      </v-flex>

      <v-flex xs12 py-3>
        <project-body
          :showPlaceholder="true"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <project-body
          :description="body1.description"
          :subProjects="body1.subProjects"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <project-body
          :description="body2.description"
          :subProjects="body2.subProjects"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <project-body
          :description="body3.description"
          :subProjects="body3.subProjects"
        />
      </v-flex>        

    </v-layout>        
    `,
    methods,
    data: () => ({
      body1,
      body2,
      body3,
    })
  }));  