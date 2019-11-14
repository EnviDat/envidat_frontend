<template>
  <v-container tag="article" fluid fill-height pa-0 >
    <v-layout row wrap >
      <v-flex xs12 lg10 offset-lg1 >
        <img-and-text-layout
          :img="missionImg"
          :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
          title="About EnviDat"
        />
      </v-flex>

      <v-flex xs12 lg10 offset-lg1 px-3 mt-5 >
        <v-container grid-list-lg pa-0 >
          <v-layout row wrap >
            <v-flex v-for="(card, index) in aboutCardInfo"
                    :key="index"
                    my-2
                    :class="card.widthClass" >

              <expandable-card :title="card.title"
                                :text="card.text"
                                :img="card.img"
                                :min-height="100"
                                :max-height="150"
                                :contain="card.title === 'WSL'" />
            </v-flex>
          </v-layout>

        </v-container>
      </v-flex>

    </v-layout>
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
 * Last modified  : 2019-10-23 16:25:52
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { ABOUT_PAGENAME } from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';

import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';

import teamSmall from '@/assets/about/team_small.jpg';
import mission from '@/assets/about/mission.jpg';
import missionSmall from '@/assets/about/mission_small.jpg';
import handsSmall from '@/assets/about/hands_small.jpg';
import orga from '@/assets/about/EnviDat_organigram.png';

import conceptSmall from '@/assets/about/concept_small.jpg';
import communitySmall from '@/assets/about/community_small.jpg';
import wslLogo from '@/assets/about/wslLogo.jpg';
import wslLogoSmall from '@/assets/about/wslLogo_small.jpg';

import ExpandableCard from '@/components/Cards/ExpandableCard';

export default {
  name: 'AboutPage',
  /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
  // TODO: Wieso die aktuelle Seite abspeichern? Ist ja im router. + Wenn Bild abhänig von CurrentPage --> im Code so reflektieren
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm, this, vm === this);
      vm.$store.commit(SET_CURRENT_PAGE, ABOUT_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  /**
     * @description reset the scrolling to the top,
     * because of the scrolling is set from the browsePage or metaDetailPage
     */
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
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
  }),
};
</script>
