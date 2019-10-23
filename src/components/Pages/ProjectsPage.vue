<template>
  <v-container tag="article" fluid fill-height pa-0>

    <v-layout row wrap>

      <v-flex xs12 lg10 offset-lg1>

        <img-and-text-layout dark
                            :blur="true"
                            :img="missionImg"
                            :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                            :textFontSize="16"
                            :parallax="true"
                            title="Research Projects"
        >
        </img-and-text-layout>
      </v-flex>

      <v-flex xs12 lg10 offset-lg1 mt-5>
        <v-container fluid grid-list-lg
                      pa-1 >
          <v-layout row wrap>

            <v-flex v-for="(project, index) in projectsCardsParents()"
                    :key="index"
                    xs12 sm6 md4 xl3
                     >
                    <!-- v-bind="{['pa-3'] : $vuetify.breakpoint.smAndUp,
                             ['pa-0'] : $vuetify.breakpoint.xsOnly,
                             ['ma-0'] : $vuetify.breakpoint.xsOnly,}" -->
              <project-card :id="project.id"
                            :title="project.title"
                            :img="project.image_display_url"
                            :defaultImg="creatorImg"
                            :description="project.description"
                            :subProjects="project.subProjects"
                            @cardClick="onCardClick"
                            @subprojectClick="onSubprojectClick"
              />
            </v-flex>

          </v-layout>
        </v-container>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
 * The ProjectsPage shows an overview (list of ProjectCards) all the projects
 * and their subprojects.
 *
 * @summary projects page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-10-23 16:32:02
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import { PROJECTS_PAGENAME, PROJECT_DETAIL_PAGENAME } from '@/router/routeConsts';
import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mainMutationsConsts';
import {
  GET_PROJECTS,
  PROJECTS_NAMESPACE,
  SET_PROJECTDETAIL_PAGE_BACK_URL,
} from '@/store/projectsMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
import ProjectCard from '@/components/Cards/ProjectCard';

import mission from '@/assets/about/mission.jpg';
import missionSmall from '@/assets/about/mission_small.jpg';
import creator from '@/assets/cards/data_creator.jpg';
import creatorSmall from '@/assets/cards/data_creator_small.jpg';

export default {
  /**
   * @description beforeRouteEnter is used to change background image of this page.
   * It's called via vue-router.
   */
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, PROJECTS_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  /**
   * @description reset the scrolling to the top,
   * because of the scrolling is set from the browsePage or metaDetailPage
   */
  beforeMount() {
    this.$store.dispatch(`${PROJECTS_NAMESPACE}/${GET_PROJECTS}`);
  },
  mounted: function mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      projects: `${PROJECTS_NAMESPACE}/projects`,
      cardBGImages: 'cardBGImages',
    }),
    /**
     * @returns missionImage based on the screen size
     */
    missionImg() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return mission;
      }

      return missionSmall;
    },
    creatorImg() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return creator;
      }

      return creatorSmall;
    },
    defaultImg() {
      return this.cardBGImages['./c_b_forest_texture_bark2.jpg'];
    },
  },
  methods: {
    projectsCardsParents() {
      const noSubs = [];

      for (let i = 0; i < this.projects.length; i++) {
        const p = this.projects[i];
        if (!p.parent) {
          noSubs.push(p);
        }
      }

      return noSubs;
    },
    onCardClick(projectId) {
      this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: PROJECT_DETAIL_PAGENAME,
        params: { id: projectId },
      });
    },
    onSubprojectClick(subprojectId) {
      this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: PROJECT_DETAIL_PAGENAME,
        params: { id: subprojectId },
      });
    },
  },
  components: {
    ImgAndTextLayout,
    ProjectCard,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    mission,
    missionSmall,
    creator,
    creatorSmall,
  }),
};
</script>
