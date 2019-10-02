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

      <div v-if="currentProject.subProjects" >
        <v-flex xs12 lg10 offset-lg1
                py-2 px-3 >
          <project-subprojects :defaultImg="creatorImg"
                                :subProjects="currentProject.subProjects"
                                @projectClick="catchProjectClick"
                                @subprojectClick="catchSubprojectClick"
                                />
        </v-flex>
      </div>

      <v-flex xs12 lg10 offset-lg1
              py-2 px-3 >
        <v-card>
          <div v-if="hasMetadatas" >

            <v-card-title class="metadataList_title title">Metadatas</v-card-title>

            <metadata-list-layout class="px-3"
                                :listContent="currentProject.packages"
                                :showMapFilter="false"
                                :mapFilteringPossible="mapFilteringPossible"
                                :placeHolderAmount="placeHolderAmount"
                                @clickedTag="catchTagClicked"
                                :allTags="allMetadataTags"
                                :selectedTagNames="selectedTagNames"
                                @clickedTagClose="catchTagCloseClicked"
                                @clickedClear="catchTagCleared"                             />
                                />

          </div>

          <div v-if="!hasMetadatas" >
            <v-card-title class="metadataList_title title">{{ currentProject.title }} has no Metadata connected</v-card-title>
          </div>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
   * The projects page lists all the projects and their subprojects.
   */
import { mapGetters } from 'vuex';
import { PROJECTS_PATH, PROJECT_DETAIL_PAGENAME } from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mutationsConsts';
import {
  GET_PROJECTS,
  PROJECTS_NAMESPACE,
  METADATA_NAMESPACE,
  SET_PROJECTDETAIL_PAGE_BACK_URL,
} from '@/store/projectsMutationsConsts';

import ProjectHeader from '@/components/ProjectDetailViews/ProjectHeader';
import ProjectBody from '@/components/ProjectDetailViews/ProjectBody';
import ProjectSubprojects from '@/components/ProjectDetailViews/ProjectSubprojects';
import MetadataListLayout from '@/components/Layouts/MetadataListLayout';

import missionImg from '@/assets/about/mission.jpg';
import creator from '@/assets/cards/data_creator.jpg';
import creatorSmall from '@/assets/cards/data_creator_small.jpg';


export default {
  /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, PROJECT_DETAIL_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);

      let backRoute = { path: PROJECTS_PATH };

      if (vm.currentProject.parent) {
        backRoute = {
          name: PROJECT_DETAIL_PAGENAME,
          params: { id: vm.currentProject.parent.id },
        };
      }

      vm.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, backRoute);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const toProject = this.getProject(to.params.id);
    let backRoute = { path: PROJECTS_PATH };

    if (toProject.parent) {
      backRoute = {
        name: PROJECT_DETAIL_PAGENAME,
        params: { id: toProject.parent.id },
      };
    }
    this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, backRoute);

    next();
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
      metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
    }),
    projectId() {
      return this.$route.params.id;
    },
    currentProject() {
      return this.getProject(this.projectId);
    },
    mapFilteringPossible: function mapFilteringPossible() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    hasMetadatas() {
      return this.currentProject.packages && this.currentProject.packages.length > 0;
    },
    creatorImg() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return creator;
      }

      return creatorSmall;
    },
    allMetadataTags() {
      const allTags = [];

      if (this.hasMetadatas) {
        for (let i = 0; i < this.currentProject.packages.length; i++) {
          const el = this.currentProject.packages[i];
          const dataset = this.getMetadataContent(el.id);
          const tags = dataset.tags;

          if (tags && tags.length > 0){
            tags.forEach(tag => {
              const index = this.allTags.indexOf(tag.name);
              if (index < 0){
                this.allTags.push( { name: tag.name, enabled: true } );
              }
            });
          }
        }
      }

      return allTags;
    },
  },
  methods: {
    getMetadataContent(id) {
      if (!this.metadatasContent) {
        return null;
      }

      for (let i = 0; i < this.metadatasContent.length; i++) {
        const el = this.metadatasContent[i];

        if (el.id === id) {
          return el;
        }
      }

      return null;
    },
    getProject(id) {
      let current = null;

      for (let i = 0; i < this.projects.length; i++) {
        const el = this.projects[i];

        if (el.id === id) {
          current = el;
          break;
        }
      }

      return current;
    },
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
    catchProjectClick(projectId) {
      this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: PROJECT_DETAIL_PAGENAME,
        params: { id: projectId },
      });
    },
    catchSubprojectClick(subprojectId) {
      this.$store.commit(`${PROJECTS_NAMESPACE}/${SET_PROJECTDETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: PROJECT_DETAIL_PAGENAME,
        params: { id: subprojectId },
      });
    },
    isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    catchTagClicked(tagName) {
      if (!this.isTagSelected(tagName)) {
        this.selectedTagNames.push(tagName);
      }
    },
    catchTagCloseClicked(tagId) {
      if (this.selectedTagNames === undefined) {
        return;
      }

      if (this.isTagSelected(tagName)) {
        const index = this.selectedTagNames.indexOf(tagName);
        this.selectedTagNames = this.selectedTagNames.filter(tag => tag !== tagId);
      }
    },
    catchTagCleared() {
      this.selectedTagNames = [];
    },
  },
  components: {
    ProjectHeader,
    ProjectBody,
    ProjectSubprojects,
    MetadataListLayout,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    missionImg,
    creator,
    creatorSmall,
    placeHolderAmount: 3,
    selectedTagNames: [],
  }),
};
</script>

<style >
  .metadataList_title {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }
</style>
