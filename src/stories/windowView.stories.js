/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import './js/vuetify-components';

import WindowVerticalView from "@/components/ProjectDetailViews/WindowVerticalView.vue";
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
  .add("Window Vertical View", () => ({
    components: { WindowVerticalView },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2 >
        <window-vertical-view :showPlaceholder="false" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-vertical-view :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-vertical-view :subProjects="projectDetail1.subProjects" :metadatas="projectDetail1.packages" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-vertical-view :subProjects="projectDetail2.subProjects" :metadatas="projectDetail2.packages" />
      </v-flex>
      
    </v-layout>
    `,
    methods,
    data: () => ({
      projectDetail1,
      projectDetail2,
    })
  }))
  .add("Window View", () => ({
    components: { WindowView },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2 >
        <window-view :showPlaceholder="false" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :subProjects="projectDetail1.subProjects" :metadatas="projectDetail1.packages" />
      </v-flex>

      <v-flex xs12 py-2 >
        <window-view :subProjects="projectDetail2.subProjects" :metadatas="projectDetail2.packages" />
      </v-flex>
      
    </v-layout>
    `,
    methods,
    data: () => ({
      projectDetail1,
      projectDetail2,
    })
  }));

