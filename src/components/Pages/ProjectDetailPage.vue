<template>
  <v-container tag="article"
                fluid fill-height
                pa-0 >

    <v-layout row wrap>

      <v-flex xs12 lg10 offset-lg1
        elevation-5
        style="z-index: 1;"
      >
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
  PROJECTS_NAMESPACE,
  PROJECTS_DETAIL_PAGE,
} from '@/store/projectsMutationsConsts';

import ProjectHeader from '@/components/ProjectDetailViews/ProjectHeader';
import ProjectBody from '@/components/ProjectDetailViews/ProjectBody';


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
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
  }),
};
</script>
