<template>
  <v-container
    tag="article"
    fluid
    fill-height
    pa-0
  >
    <v-layout
      row
      wrap
    >
      <v-flex v-show="loading">
        Loading Guidelines...
      </v-flex>


      <v-flex
        v-if="!loading"
        xs12
        md8
        offset-md2
        lg10
        offset-lg1
        mt-5
      >
        <m-markdown-preview
          :markdown="guidelinesMarkdown"
          :options="markdownOptions"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
   * The policies page of EnviDat. It consists of:
   * - TitleImage and Title (ImgAndTextLayout)
   */
import { mapGetters } from 'vuex';
import MMarkdownPreview from 'm-markdown-preview';
import { BROWSE_PATH } from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mutationsConsts';
import { GET_GUIDELINES } from '@/store/guidelinesMutationsConsts';


export default {
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, 'guidelinesPage');
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    this.$store.dispatch(`guidelines/${GET_GUIDELINES}`);
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
      guidelinesPageBackRoute: 'guidelines/guidelinesPageBackRoute',
      // guidelinesTitle: 'guidelines/guidelinesTitle',
      guidelinesMarkdown: 'guidelines/guidelinesMarkdown',
      loading: 'guidelines/loading',
    }),
    markdownOptions() {
      return {
        html: true,
        xhtmlOut: true,
        linkify: true,
        breaks: true,
      };
    },
  },
  methods: {
    /**
       * @description changes the url to page the user was before. Fallback: BrowsePage
       */
    catchBackClicked: function catchBackClicked() {
      const backRoute = this.aboutPageBackRoute;

      if (backRoute) {
        this.$router.push({
          path: backRoute.path,
          query: backRoute.query,
          params: backRoute.params,
        });
        return;
      }

      this.$router.push({
        path: BROWSE_PATH,
      });
    },
  },
  components: {
    MMarkdownPreview,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
  }),
};
</script>
