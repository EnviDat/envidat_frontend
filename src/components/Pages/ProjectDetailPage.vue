<template>
  <v-container tag="article"
                fluid fill-height
                pa-0 >

    <v-layout row wrap>

      <v-flex xs12 lg10 offset-lg1
              elevation-5
              style="z-index: 1;" >

        <project-header :title="currentProject.title"
                        :titleImg="currentProject.image_display_url"
                        :defaultImg="missionImg"
                        :showPlaceholder="!currentProject"
                        @clickedBack="catchBackClicked"
                        />
      </v-flex>

      <v-flex xs12 lg10 offset-lg1
              px-3
              style="z-index: 0;" >

        <project-body :description="currentProject.description"
                      :subProjects="currentProject.subProjects"
                      :metadatas="currentProject.packages"
                       />
      </v-flex>


      <v-flex xs12 lg10 offset-lg1
              py-2 px-3 >
        <window-view :subProjects="currentProject.subProjects" />
      </v-flex>

      <v-flex v-if="hasMetadatas"
              xs12 lg10 offset-lg1 >

        <v-card-title class="metadataList_title title">Metadatas</v-card-title>
      </v-flex>

      <v-flex v-if="hasMetadatas"
              xs12 lg10 offset-lg1
              py-2 px-3 >

        <metadata-list-view :listContent="currentProject.packages"
                            :showMapFilter="false"
                            :mapFilteringPossible="mapFilteringPossible"
                            :placeHolderAmount="placeHolderAmount"
                            />

      </v-flex>

      <v-flex v-if="!hasMetadatas"
              xs12 lg10 offset-lg1 >

        <v-card-title class="metadataList_title title">{{ currentProject.title }} has no Metadata connected</v-card-title>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
   * The projects page lists all the projects and their subprojects.
   */
import { mapGetters } from 'vuex';
import { PROJECTS_PATH } from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mutationsConsts';
import {
  GET_PROJECTS,
  PROJECTS_NAMESPACE,
  PROJECTS_DETAIL_PAGE,
} from '@/store/projectsMutationsConsts';

import ProjectHeader from '@/components/ProjectDetailViews/ProjectHeader';
import ProjectBody from '@/components/ProjectDetailViews/ProjectBody';
import MetadataListView from '@/components/Views/MetadataListView';
import WindowView from '@/components/ProjectDetailViews/WindowView';

import missionImg from '@/assets/about/mission.jpg';


export default {
  /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, PROJECTS_DETAIL_PAGE);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    if (this.projects.length <= 0) {
      this.$store.dispatch(`${PROJECTS_NAMESPACE}/${GET_PROJECTS}`);
    }
  },
  /**
   * @description reset the scrolling to the top,
   * because of the scrolling is set from the browsePage or metaDetailPage
   */
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      projects: `${PROJECTS_NAMESPACE}/projects`,
      projectsPageBackRoute: `${PROJECTS_NAMESPACE}/projectsPageBackRoute`,
    }),
    projectId() {
      return this.$route.params.id;
    },
    currentProject() {
      for (let i = 0; i < this.projects.length; i++) {
        const el = this.projects[i];

        if (el.id === this.projectId) {
          return el;
        }
      }

      return null;
    },
    mapFilteringPossible: function mapFilteringPossible() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    hasMetadatas() {
      return this.currentProject.packages && this.currentProject.packages.length > 0;
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
    /**
     * @description changes the url to page the user was before. Fallback: PROJECTS_PATH
     */
    catchBackClicked() {
      const backRoute = this.projectsPageBackRoute;

      if (backRoute) {
        this.$router.push({
          path: backRoute.path,
          query: backRoute.query,
          params: backRoute.params,
        });
        return;
      }

      this.$router.push({ path: PROJECTS_PATH });
    },
  },
  components: {
    ProjectHeader,
    ProjectBody,
    MetadataListView,
    WindowView,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    missionImg,
    placeHolderAmount: 6,
  }),
};
</script>

<style >
  .metadataList_title {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }
</style>
