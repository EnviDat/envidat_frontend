<template>
  <v-container class="pa-0" tag="article">
        <v-tabs v-model="activeTab" slider-color="accent" grow background-color="highlight">

          <v-tab v-for="tab in tabs" :key="tab.name">
            <v-icon>{{tab.icon}}</v-icon>
          </v-tab>

        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-col class="mt-3" cols="12">
              <img-and-text-layout :img="missionImg"
                                    :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                                    title="About EnviDat" />
            </v-col>

            <v-col class="px-3 mt-5" cols="12" >

              <v-container class="pa-0">
                <v-row >

                  <v-col class="my-2" v-for="(card, index) in aboutCardInfo"
                          :key="index"
                          :class="card.widthClass" >

                    <expandable-card :title="card.title"
                                      :text="card.text"
                                      :img="card.img"
                                      :min-height="100"
                                      :max-height="150"
                                      :contain="card.title === 'WSL'" />
                  </v-col>
                </v-row>

              </v-container>
            </v-col>
          </v-tab-item>

          <v-tab-item>
            <v-col class="mt-3" cols="12" >
              <img-and-text-layout :img="guidelineImg"
                                    :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                                    title="Guidelines" />
            </v-col>

            <v-col class="pt-5" v-if="guidelinesLoading"
                    cols="12"
                    >
              Loading Guidelines...
            </v-col>

            <v-col class="pt-5" v-if="!guidelinesLoading"
                    cols="12"

                    v-html="guidelinesMarkdownText" >
            </v-col>

          </v-tab-item>

          <v-tab-item >
            <v-col class="mt-3" cols="12" >
              <img-and-text-layout :img="policiesImg"
                                    :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                                    title="Policies" />
            </v-col>

            <v-col class="pt-5" v-if="policiesLoading"
                    cols="12"
                    >
              Loading Policies...
            </v-col>

            <v-col class="pt-5" v-if="!policiesLoading"
                    cols="12"
                    v-html="policiesMarkdownText" >
            </v-col>
          </v-tab-item>

          <v-tab-item>
            <v-col class="mt-3" cols="12" >
              <img-and-text-layout :img="dmpImg"
                                    :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
                                    title="Data Management Plan" />
            </v-col>

            <v-col class="shrink pt-5" v-if="dmpLoading"
                    offset-md="1"
                    offset-lg="1"

                    >
              Loading DMP Infos...
            </v-col>


            <v-col class="pt-5" v-if="!dmpLoading"
                    cols="12"
                    v-html="dmpMarkdownText" >
            </v-col>
          </v-tab-item>
</v-tabs-items>

  </v-container>

</template>

<script>
/**
 * The about page of EnviDat. It consists of:
 * - TitleImage and Title (ImgAndTextLayout)
 * - Different Card with infomation about some about topics (ExpandableCard)
 *
 * @summary about page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-20 13:39:14
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import remark from 'remark';
import html from 'remark-html';
import { mapGetters } from 'vuex';

import { ABOUT_PAGENAME } from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import {
  GET_POLICIES,
} from '@/modules/about/store/policiesMutationsConsts';
import {
  GET_GUIDELINES,
} from '@/modules/about/store/guidelinesMutationsConsts';
import {
  GET_DMP,
} from '@/modules/about/store/dmpMutationsConsts';


import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';

import teamSmall from '@/modules/about/assets/team_small.jpg';
import mission from '@/modules/about/assets/mission.jpg';
import missionSmall from '@/modules/about/assets/mission_small.jpg';
import handsSmall from '@/modules/about/assets/hands_small.jpg';
import orga from '@/modules/about/assets/EnviDat_organigram.png';

import conceptSmall from '@/modules/about/assets/concept_small.jpg';
import communitySmall from '@/modules/about/assets/community_small.jpg';
import wslLogo from '@/modules/about/assets/wslLogo.jpg';
import wslLogoSmall from '@/modules/about/assets/wslLogo_small.jpg';

import policies from '@/modules/about/assets/policies.jpg';
import policiesSmall from '@/modules/about/assets/policies_small.jpg';
import guidelines from '@/modules/about/assets/guidelines.jpg';
import guidelinesSmall from '@/modules/about/assets/guidelines_small.jpg';

import ExpandableCard from '@/modules/about/components/ExpandableCard';
import dmp from '../assets/dmp.jpg';
import dmpSmall from '../assets/dmp_small.jpg';


export default {
  name: 'AboutPage',
  /**
   * @description beforeRouteEnter is used to change background image of this page.
   * It's called via vue-router.
   */
  // TODO: Wieso die aktuelle Seite abspeichern? Ist ja im router. + Wenn Bild abhänig von CurrentPage --> im Code so reflektieren
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, ABOUT_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  beforeMount() {
    this.$store.dispatch(`about/${GET_POLICIES}`);
    this.$store.dispatch(`about/${GET_GUIDELINES}`);
    this.$store.dispatch(`about/${GET_DMP}`);
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
      guidelinesMarkdown: 'about/guidelinesMarkdown',
      guidelinesLoading: 'about/guidelinesLoading',
      policiesMarkdown: 'about/policiesMarkdown',
      policiesLoading: 'about/policiesLoading',
      dmpMarkdown: 'about/dmpMarkdown',
      dmpLoading: 'about/dmpLoading',
    }),
    missionImg() {
      return this.$vuetify.breakpoint.mdAndUp ? mission : missionSmall;
    },
    aboutCardInfo() {
      return [
        {
          title: 'Our Mission',
          text: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible. <p><a href="https://www.wsl.ch/en/about-wsl/programmes-and-initiatives/envidat.html" target="_blank" onclick="event.stopPropagation();" >More about EnviDat as Program of WSL</a></p>',
          img: this.handsSmall,
          widthClass: 'xs12 sm6 md4',
        },
        {
          title: 'Concept',
          text: 'EnviDat supports the user-friendly registration, documentation, storage, publication, search and retrieval of data sets from the environmental domain. We provide various services to our users and we follow a set of principles as summarized in our concept image below. Additional detailed information can be found in our <a href="https://www.dora.lib4ri.ch/wsl/islandora/object/wsl:18703" target="_blank" onclick="event.stopPropagation();" >concept paper on DORA</a>.',
          img: this.conceptSmall,
          widthClass: 'xs12 sm6 md4',
        },
        {
          title: 'Community',
          text: 'With EnviDat, WSL aims to disseminate its data sets as broadly as possible in order to foster international research cooperation in the field of environmental science and contribute to the ongoing cultural evolution in research towards openness, shared data and opportunities for collaboration. Consequently, we are registered in <a href="https://fairsharing.org/biodbcore-001178/" target="_blank" onclick="event.stopPropagation();" >FAIRsharing.org</a> and <a href="https://www.re3data.org/repository/r3d100012587" target="_blank" onclick="event.stopPropagation();" >re3data.org</a> and a contributor community to <a href="http://geoportal.org/community/envidat-community" target="_blank" onclick="event.stopPropagation();" >ESA Geoportal </a>, <a href="https://gcmd.nasa.gov/search/Titles.do?AutoDisplayTitles=true&subset=envidat#titles" target="_blank" onclick="event.stopPropagation();" >NASA GCMD</a> and <a href="http://b2find.eudat.eu/dataset?groups=envidat" target="_blank" onclick="event.stopPropagation();" >EOSC-Hub via B2FIND</a>. ',
          img: this.communitySmall,
          widthClass: 'xs12 sm6 md4',
        },
        {
          title: 'WSL',
          text: 'The Swiss Federal Institute for Forest, Snow and Landscape Research is concerned with the use, development and protection of natural and urban spaces. The focus of our research is on solving problems to do with the responsible use of landscapes and forests and a prudent approach to natural hazards, especially those common in mountainous countries. WSL occupies a leading position internationally in these research areas. We also provide groundwork for sustainable environmental policies in Switzerland. <p><a href="https://www.wsl.ch" target="_blank" onclick="event.stopPropagation();" >For more information have a look at the Website of WSL</a></p>',
          img: this.wslLogoSmall,
          widthClass: 'xs12 sm6 md4',
        },
        {
          title: 'Team',
          /* eslint-disable prefer-template */
          text: '<img src="' + this.orga + '" style="width: 100%; height: 100%;" />',
          img: this.teamSmall,
          widthClass: 'xs12 sm12 md8',
        },
      ];
    },
    policiesMarkdownText() {
      return remark().use(html).processSync(this.policiesMarkdown);
    },
    policiesImg() {
      return this.$vuetify.breakpoint.mdAndUp ? policies : policiesSmall;
    },
    guidelinesMarkdownText() {
      return remark().use(html).processSync(this.guidelinesMarkdown);
    },
    guidelineImg() {
      return this.$vuetify.breakpoint.mdAndUp ? guidelines : guidelinesSmall;
    },
    dmpImg() {
      return this.$vuetify.breakpoint.mdAndUp ? dmp : dmpSmall;
    },
    dmpMarkdownText() {
      return remark().use(html).processSync(this.dmpMarkdown);
    },
  },
  components: {
    ImgAndTextLayout,
    ExpandableCard,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    teamSmall,
    mission,
    missionSmall,
    handsSmall,
    conceptSmall,
    communitySmall,
    wslLogo,
    wslLogoSmall,
    orga,
    activeTab: null,
    tabs: [{
      name: 'about',
      icon: 'info',
    },
      {
      name: 'guidlines',
      icon: 'local_library',
    },
      {
      name: 'policies',
      icon: 'policy',
    },
      {
      name: 'dmp',
      icon: 'menu_book',
    }],
  }),
};
</script>
<style scoped>
 /* Overwrite default vuetify background class */
  .theme--light.v-tabs-items {
    background-color: transparent;
  }
</style>
