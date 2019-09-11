<template>
  <v-container tag="article" fluid fill-height pa-0>
    <v-layout wrap>
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
        <v-container fluid grid-list-lg pa-1 >
          <v-layout wrap>

            <v-flex v-for="(project, index) in projectsCardsParents"
                    :key="index"
                    xs12 sm6 md4 xl3
                     >
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
 * The projects page lists all the projects and their subprojects.
 */
import { mapGetters } from 'vuex';
import { PROJECTS_PAGENAME, PROJECT_DETAIL_PAGENAME } from '@/router/routeConsts';
import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mutationsConsts';
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
  name: 'ProjectPage',
  /**
   * @description beforeRouteEnter is used to change background image of this page.
   * It's called via vue-router.
   */
  beforeRouteEnter(to, from, next) {
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
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
      /**
       * TODO: getter in store einbauen? Wieso parents?
       * */
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
    ...mapGetters({
      projects: `${PROJECTS_NAMESPACE}/projects`,
    }),
    missionImg() {
      return this.$vuetify.breakpoint.mdAndUp ? mission : missionSmall;
    },
    creatorImg() {
      return this.$vuetify.breakpoint.mdAndUp ? creator : creatorSmall;
    },
  },
  methods: {
    onCardClick(projectId) {
      this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, this.$route); //TODO: Was macht das?

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
