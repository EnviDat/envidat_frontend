<template>
  <v-container tag="article"
                fluid
                fill-height
                pa-0 >
    <v-layout row wrap >

      <v-flex xs12 lg10 offset-lg1>
        <img-and-text-layout :img="policiesImg"
                              :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                              title="Policies" />
      </v-flex>

      <v-flex v-if="loading"
              offset-md2
              offset-lg1
              shrink
              pt-5 >
        Loading Policies...
      </v-flex>

      <v-flex v-if="!loading"
                offset-md2
                offset-lg1
                shrink
                pt-5
                v-html="markdownText" >
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
 * Last modified  : 2019-11-20 11:39:46
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import remark from 'remark';
import html from 'remark-html';
import { mapGetters } from 'vuex';

import {
  BROWSE_PATH,
  POLICIES_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import { GET_POLICIES, POLICIES_NAMESPACE } from '@/modules/about/store/policiesMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
import policies from '@/assets/about/policies.jpg';
import policiesSmall from '@/assets/about/policies_small.jpg';

export default {
  beforeRouteEnter(to, from, next) {
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
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      policiesPageBackRoute: `${POLICIES_NAMESPACE}/policiesPageBackRoute`,
      policiesMarkdown: `${POLICIES_NAMESPACE}/policiesMarkdown`,
      loading: `${POLICIES_NAMESPACE}/loading`,
    }),
    markdownText() {
      return remark().use(html).processSync(this.policiesMarkdown);
    },
    policiesImg() {
      return this.$vuetify.breakpoint.mdAndUp ? policies : policiesSmall;
    },
  },
  methods: {
    /**
       * @description changes the url to page the user was before. Fallback: BrowsePage
       */
    catchBackClicked() {
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
    ImgAndTextLayout,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
  }),
};
</script>
