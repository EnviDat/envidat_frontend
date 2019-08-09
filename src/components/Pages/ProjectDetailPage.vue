<template>
  <v-container tag="article"
                fluid fill-height
                pa-0 >

    <v-layout row wrap>

      <v-flex xs3 pa-3
        v-for="(project, index) in projectsCardsParents()"
        :key="index" >

        <project-card :id="project.id"
                      :title="project.title"
                      :img="project.image_url"
                      :defaultImg="defaultImg"
                      :description="project.description"
                      :subProjects="project.subProjects"
                      @clickedEvent="onCardClick"
                      @clickedTag="onTagClick"
        />
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
import { GET_PROJECTS } from '@/store/projectsMutationsConsts';

import ProjectCard from '@/components/Cards/ProjectCard';


export default {
  /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, 'projectPage');
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
      projects: 'projects/projects',
    }),
  },
  methods: {
    projectsCardsParents() {
      let noSubs = [];

      for (let i = 0; i < this.projects.length; i++) {
        const p = this.projects[i];
        if (!p.parent){
          noSubs.push(p);
        }
      }

      return noSubs;
    },
  },
  components: {
    ProjectCard,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
  }),
};
</script>
