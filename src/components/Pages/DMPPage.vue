<template>
  <v-container tag="article"
                fluid
                fill-height
                pa-0 >
    <v-layout row wrap >

      <v-flex xs12 lg10 offset-lg1>
        <img-and-text-layout :img="dmpImg"
                              :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                              title="Data Management Plan" />
      </v-flex>

      <v-flex v-if="loading"
              offset-md1
              offset-lg1
              shrink
              pt-5 >
        Loading DMP Infos...
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
 * The DMP page of EnviDat. It consists of:
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
  DMP_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import { GET_DMP, DMP_NAMESPACE } from '@/store/dmpMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
import dmp from '@/assets/about/dmp.jpg';
import dmpSmall from '@/assets/about/dmp_small.jpg';


export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, DMP_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    this.$store.dispatch(`${DMP_NAMESPACE}/${GET_DMP}`);
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
      dmpPageBackRoute: `${DMP_NAMESPACE}/dmpPageBackRoute`,
      dmpMarkdown: `${DMP_NAMESPACE}/dmpMarkdown`,
      loading: `${DMP_NAMESPACE}/loading`,
    }),
    markdownText() {
      return remark().use(html).processSync(this.dmpMarkdown);
    },
    dmpImg() {
      return this.$vuetify.breakpoint.mdAndUp ? dmp : dmpSmall;
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
