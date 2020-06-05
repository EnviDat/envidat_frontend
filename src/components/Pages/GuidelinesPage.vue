<template>
  <v-container tag="article"
                fluid
                fill-height
                pa-0 >
    <v-layout row wrap >

      <v-flex xs12 lg10 offset-lg1>
        <img-and-text-layout :img="guidelineImg"
                              :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                              title="Guidelines" />
      </v-flex>

      <v-flex v-if="loading"
              offset-md1
              offset-lg1
              shrink
              pt-5 >
        Loading Guidelines...
      </v-flex>


      <v-flex v-if="!loading"
                offset-md1
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
 * The guideline page of EnviDat. It consists of:
 * - TitleImage and Title (ImgAndTextLayout)
 *
 * @summary guideline page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-15 16:16:28
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import remark from 'remark';
import html from 'remark-html';
import { mapGetters } from 'vuex';

import {
  GUIDELINES_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import { GET_GUIDELINES, GUIDELINES_NAMESPACE } from '@/store/guidelinesMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
import guidelines from '@/assets/about/guidelines.jpg';
import guidelinesSmall from '@/assets/about/guidelines_small.jpg';


export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, GUIDELINES_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    this.$store.dispatch(`${GUIDELINES_NAMESPACE}/${GET_GUIDELINES}`);
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
      guidelinesMarkdown: `${GUIDELINES_NAMESPACE}/guidelinesMarkdown`,
      loading: `${GUIDELINES_NAMESPACE}/loading`,
    }),
    markdownText() {
      return remark().use(html).processSync(this.guidelinesMarkdown);
    },
    guidelineImg() {
      return this.$vuetify.breakpoint.mdAndUp ? guidelines : guidelinesSmall;
    },
  },
  methods: {
  },
  components: {
    ImgAndTextLayout,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
  }),
};
</script>
