<template>
  <v-container tag="article"
                fluid fill-height
                pa-0
  >  

    <v-layout row wrap >

      <v-flex xs12 lg10 offset-lg1>

        <img-and-text-layout :dark="true"
                        :blur="true"
                        :img="missionImg"
                        :height="300"
                        :textFontSize="16"
                        :parallax="true"
                        title="About EnviDat"
                        >

          <base-icon-button style="position: absolute; top: 0px; right: 0px; z-index: 10;"
                                  materialIconName="close"
                                  :outlined="true"
                                  color="white"
                                  iconColor="white"
                                  toolTipText ="Close About Page"
                                  :toolTipBottom="true"
                                  v-on:clicked="catchBackClicked" />

        </img-and-text-layout>
      </v-flex>

      <v-flex xs12 lg10 offset-lg1 px-3 mt-5 
      >
        <v-container grid-list-lg pa-0>
          <v-layout row wrap >

            <v-flex my-2
                    :class="card.widthClass"
                    v-for="(card, index) in AboutCardInfos()" :key="index">

                <expandable-card :title="card.title"
                                  :text="card.text"
                                  :img="card.img"
                                  :minHeight="100"
                                  :maxHeight="150"
                                  :contain="card.title === 'WSL'"
                />

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
   */
  import { mapGetters } from 'vuex';
  import { BROWSE_PATH } from '@/router/routeConsts';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '@/store/mutationsConsts';
  import BaseIconButton from '@/components/BaseElements/BaseIconButton';

  import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';

  import team from '@/assets/about/team.jpg';
  import teamSmall from '@/assets/about/team_small.jpg';
  import mission from '@/assets/about/mission.jpg';
  import missionSmall from '@/assets/about/mission_small.jpg';
  import handsSmall from '@/assets/about/hands_small.jpg';
  import orga from '@/assets/about/EnviDat_organigram.png';
  import orgaSmall from '@/assets/about/EnviDat_organigram_small.png';

  import conceptSmall from '@/assets/about/concept_small.jpg';
  import communitySmall from '@/assets/about/community_small.jpg';
  import wslLogo from '@/assets/about/wslLogo.jpg';
  import wslLogoSmall from '@/assets/about/wslLogo_small.jpg';

  import ExpandableCard from '@/components/Cards/ExpandableCard';

  export default {
    /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, 'aboutPage');
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
        aboutPageBackRoute: 'metadata/aboutPageBackRoute',
      }),
      /**
       * @returns teamImage based on the screen size
       */
      teamImg: function teamImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return team;
        }

        return teamSmall;
      },
      /**
       * @returns missionImage based on the screen size
       */
      missionImg: function teamImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return mission;
        }

        return missionSmall;
      },
    },
    methods: {
      /**
       * @returns the infos of the about page topics. consiting of
       * - title
       * - text
       * - img
       * - widthClass
       */
      AboutCardInfos: function AboutCardInfos() {
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
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      team,
      teamSmall,
      mission,
      missionSmall,
      handsSmall,
      conceptSmall,
      communitySmall,
      wslLogo,
      wslLogoSmall,
      orga,
      orgaSmall,
    }),
    components: {
      ImgAndTextLayout,
      ExpandableCard,
      BaseIconButton,
    },
  };
</script>

