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
          <base-icon-button style="position: absolute; top: 0px; right: 0px; z-index: 10;"
                            materialIconName="close"
                            :outlined="true"
                            color="white"
                            iconColor="white"
                            toolTipText="Close About Page"
                            :toolTipBottom="true"
                            @clicked="catchBackClicked" />
        </img-and-text-layout>
      </v-flex>

      <!-- <v-flex xs12 lg10 offset-lg1 px-3 mt-5>
        <v-container grid-list-lg pa-0>
          <v-layout row wrap>
            <v-flex
              v-for="(card, index) in AboutCardInfos()"
              :key="index"
              my-2
              :class="card.widthClass"
            >
              <project-card
                :title="card.title"
                :text="card.text"
                :img="card.img"
                :min-height="100"
                :max-height="150"
                :contain="card.title === 'WSL'"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
/**
 * The projects page lists all the projects and their subprojects.
 */
import { mapGetters } from 'vuex';
import { BROWSE_PATH } from '@/router/routeConsts';
import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mutationsConsts';
import {
  GET_PROJECTS,
  PROJECTS_NAMESPACE,
  PROJECTS_PAGE,
} from '@/store/projectsMutationsConsts';

import BaseIconButton from '@/components/BaseElements/BaseIconButton';
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
  mounted: function mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      projects: `${PROJECTS_NAMESPACE}/projects`,
      projectsPageBackRoute: `${PROJECTS_NAMESPACE}/projectsPageBackRoute`,
    }),
    /**
     * @returns missionImage based on the screen size
     */
    missionImg() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return mission;
      }

      return missionSmall;
    }
  },
  methods: {
    /**
     * @description changes the url to page the user was before. Fallback: BrowsePage
     */
    catchBackClicked: function catchBackClicked() {
      const backRoute = this.projectsPageBackRoute;

      if (backRoute) {
        this.$router.push({
          path: backRoute.path,
          query: backRoute.query,
          params: backRoute.params,
        });
        return;
      }

      this.$router.push({ path: BROWSE_PATH });
    },
  },
  components: {
    ImgAndTextLayout,
    BaseIconButton,
    ProjectCard,
  },
  data: () => ({
    PageBGImage: "./app_b_browsepage.jpg",
    mission,
    missionSmall,
  }),
};
</script>
