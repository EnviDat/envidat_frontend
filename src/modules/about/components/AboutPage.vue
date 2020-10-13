<template>
  <v-container class="pa-0 ma-0"
                tag="article"
                fluid
                id="AboutPage" >
      <!-- Tabs -->
      <v-tabs v-model="activeTab"
              slider-color="accent"
              color="white"
              grow
              icons-and-text
              background-color="highlight">

        <v-tab v-for="tab in tabs"
              :key="tab.name"
              class="pa-0">
            {{ $vuetify.breakpoint.smAndUp ? tab.name : ''}}

          <v-icon>{{tab.icon}}</v-icon>
        </v-tab>
      </v-tabs>

      <!-- Tab contents -->
      <v-tabs-items v-model="activeTab">

        <!-- About -->
        <v-tab-item :key="tabs[0].name">

          <about-tab-layout title="About EnviDat"
                            :titleImage="missionImg" >

            <v-row >

              <v-col v-for="(card, index) in aboutCardInfo"
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

          </about-tab-layout>

        </v-tab-item>

        <!-- Guidelines -->
        <v-tab-item :key="tabs[1].name">

          <about-tab-layout title="Guidelines"
                            :titleImage="guidelineImg"
                            :loading="guidelinesLoading"
                            loadingText="Loading Guidelines..."
                            :markdownContent="guidelinesMarkdownText" />

        </v-tab-item>

        <!-- Policies -->
        <v-tab-item :key="tabs[2].name">

          <about-tab-layout title="Policies"
                            :titleImage="policiesImg"
                            :loading="policiesLoading"
                            loadingText="Loading Policies..."
                            :markdownContent="policiesMarkdownText" />

        </v-tab-item>

        <!-- DMP -->
        <v-tab-item :key="tabs[3].name">

          <about-tab-layout title="Data Management Plan"
                            :titleImage="dmpImg"
                            :loading="dmpLoading"
                            loadingText="Loading Data Management Plan infos..."
                            :markdownContent="dmpMarkdownText" />

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
 * Last modified  : 2020-10-13 22:18:24
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


import orga from '@/assets/about/EnviDat_organigram.png';

import ExpandableCard from '@/modules/about/components/ExpandableCard';
import AboutTabLayout from './AboutTabLayout';


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
    aboutCardInfo() {
      const handsSmall = this.mixinMethods_getWebpImage('about/hands_small', this.$store.state);
      const conceptImg = this.mixinMethods_getWebpImage('about/concept_small', this.$store.state);

      const communityImg = this.mixinMethods_getWebpImage('about/community_small', this.$store.state);
      const wslLogoImg = this.mixinMethods_getWebpImage('about/wslLogo', this.$store.state);
      const teamImg = this.mixinMethods_getWebpImage('about/team_small', this.$store.state);

      return [
        {
          title: 'Our Mission',
          text: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible. <p><a href="https://www.wsl.ch/en/about-wsl/programmes-and-initiatives/envidat.html" target="_blank" onclick="event.stopPropagation();" >More about EnviDat as Program of WSL</a></p>',
          img: handsSmall,
          widthClass: 'col-12 col-sm-6 col-md-4',
        },
        {
          title: 'Concept',
          text: 'EnviDat supports the user-friendly registration, documentation, storage, publication, search and retrieval of data sets from the environmental domain. We provide various services to our users and we follow a set of principles as summarized in our concept image below. Additional detailed information can be found in our <a href="https://www.dora.lib4ri.ch/wsl/islandora/object/wsl:18703" target="_blank" onclick="event.stopPropagation();" >concept paper on DORA</a>.',
          img: conceptImg,
          widthClass: 'col-12 col-sm-6 col-md-4',
        },
        {
          title: 'Community',
          text: 'With EnviDat, WSL aims to disseminate its data sets as broadly as possible in order to foster international research cooperation in the field of environmental science and contribute to the ongoing cultural evolution in research towards openness, shared data and opportunities for collaboration. Consequently, we are registered in <a href="https://fairsharing.org/biodbcore-001178/" target="_blank" onclick="event.stopPropagation();" >FAIRsharing.org</a> and <a href="https://www.re3data.org/repository/r3d100012587" target="_blank" onclick="event.stopPropagation();" >re3data.org</a> and a contributor community to <a href="http://geoportal.org/community/envidat-community" target="_blank" onclick="event.stopPropagation();" >ESA Geoportal </a>, <a href="https://gcmd.nasa.gov/search/Titles.do?AutoDisplayTitles=true&subset=envidat#titles" target="_blank" onclick="event.stopPropagation();" >NASA GCMD</a> and <a href="http://b2find.eudat.eu/dataset?groups=envidat" target="_blank" onclick="event.stopPropagation();" >EOSC-Hub via B2FIND</a>. ',
          img: communityImg,
          widthClass: 'col-12 col-sm-6 col-md-4',
        },
        {
          title: 'WSL',
          text: 'The Swiss Federal Institute for Forest, Snow and Landscape Research is concerned with the use, development and protection of natural and urban spaces. The focus of our research is on solving problems to do with the responsible use of landscapes and forests and a prudent approach to natural hazards, especially those common in mountainous countries. WSL occupies a leading position internationally in these research areas. We also provide groundwork for sustainable environmental policies in Switzerland. <p><a href="https://www.wsl.ch" target="_blank" onclick="event.stopPropagation();" >For more information have a look at the Website of WSL</a></p>',
          img: wslLogoImg,
          widthClass: 'col-12 col-sm-6 col-md-4',
        },
        {
          title: 'Team',
          /* eslint-disable prefer-template */
          text: '<img src="' + this.orga + '" style="width: 100%; height: 100%;" />',
          img: teamImg,
          widthClass: 'col-12 col-sm-12 col-md-8',
        },
      ];
    },
    missionImg() {
      const imgPath = this.$vuetify.breakpoint.mdAndUp ? 'about/mission' : 'about/mission_small';
      return this.mixinMethods_getWebpImage(imgPath, this.$store.state);
    },
    policiesMarkdownText() {
      return remark().use(html).processSync(this.policiesMarkdown).toString();
    },
    policiesImg() {
      const imgPath = this.$vuetify.breakpoint.mdAndUp ? 'about/policies' : 'about/policies_small';
      return this.mixinMethods_getWebpImage(imgPath, this.$store.state);
    },
    guidelinesMarkdownText() {
      return remark().use(html).processSync(this.guidelinesMarkdown).toString();
    },
    guidelineImg() {
      const imgPath = this.$vuetify.breakpoint.mdAndUp ? 'about/guidelines' : 'about/guidelines_small';
      return this.mixinMethods_getWebpImage(imgPath, this.$store.state);
    },
    dmpImg() {
      const imgPath = this.$vuetify.breakpoint.mdAndUp ? 'about/dmp' : 'about/dmp_small';
      return this.mixinMethods_getWebpImage(imgPath, this.$store.state);
    },
    dmpMarkdownText() {
      return remark().use(html).processSync(this.dmpMarkdown).toString();
    },
  },
  components: {
    ExpandableCard,
    AboutTabLayout,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    orga,
    activeTab: null,
    tabs: [{
      name: 'about',
      icon: 'info',
    },
    {
      name: 'guidelines',
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

<style>
  /* Overwrite tab style vuetify, needed for smallscreen */
  .v-slide-group__prev--disabled {
      display: none !important;
  }
</style>

<style scoped>
 /* Overwrite default vuetify background class */
  .theme--light.v-tabs-items {
    background-color: transparent;
  }
</style>
