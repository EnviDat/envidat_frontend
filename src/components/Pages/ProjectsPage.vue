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
        <v-container grid-list-lg pa-0>
          <v-layout row wrap>

            <v-flex v-for="(project, index) in projectsCardsParents()"
                    :key="index"
                    xs3 pa-3
            >
              <project-card :id="project.id"
                            :title="project.title"
                            :img="project.image_display_url"
                            :defaultImg="defaultImg"
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
 * The projects page lists all the projects and their subprojects.
 */
import { mapGetters } from 'vuex';
import { PROJECT_DETAIL_NAME } from '@/router/routeConsts';
import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mutationsConsts';
import {
  GET_PROJECTS,
  PROJECTS_NAMESPACE,
  PROJECTS_PAGE,
  SET_PROJECTDETAIL_PAGE_BACK_URL,
} from '@/store/projectsMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
import ProjectCard from '@/components/Cards/ProjectCard';

import mission from '@/assets/about/mission.jpg';
import missionSmall from '@/assets/about/mission_small.jpg';

export default {
  /**
   * @description beforeRouteEnter is used to change background image of this page.
   * It's called via vue-router.
   */
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, PROJECTS_PAGE);
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
        name: PROJECT_DETAIL_NAME,
        params: { id: projectId },
      });
    },
    onSubprojectClick(sub) {
      this.$emit('subprojectClick', sub.id);
    },
  },
  components: {
    ImgAndTextLayout,
    ProjectCard,
  },
  data: () => ({
    PageBGImage: "./app_b_browsepage.jpg",
    mission,
    missionSmall,
  }),
};
</script>
