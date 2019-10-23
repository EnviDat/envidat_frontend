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
        Loading Policies...
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
          :markdown="policiesMarkdown"
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
 *
 * @summary policies page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-10-23 16:29:11
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import MMarkdownPreview from 'm-markdown-preview';
import {
  BROWSE_PATH,
  POLICIES_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import { GET_POLICIES, POLICIES_NAMESPACE } from '@/store/policiesMutationsConsts';

// import BaseIconButton from '@/components/BaseElements/BaseIconButton';
// import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';

export default {
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, POLICIES_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    this.$store.dispatch(`${POLICIES_NAMESPACE}/${GET_POLICIES}`);
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
      policiesPageBackRoute: `${POLICIES_NAMESPACE}/policiesPageBackRoute`,
      policiesMarkdown: `${POLICIES_NAMESPACE}/policiesMarkdown`,
      loading: `${POLICIES_NAMESPACE}/loading`,
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
      const backRoute = this.policiesPageBackRoute;

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
