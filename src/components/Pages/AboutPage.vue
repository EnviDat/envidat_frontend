<template>
  <v-container tag="article"
               py-2
  >  
    <v-layout column >

      <v-flex xs12>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :img="missionImg"
                        :height="300"
                        :textFontSize="16"
                        :parallax="true"
                        title="About EnviDat"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>

      <v-flex xs12 mt-5>
        <v-container grid-list-lg px-0>
          <v-layout row wrap >

            <v-flex xs12 sm6 md4 my-2
                    v-for="(card, index) in AboutCardInfos()" :key="index">

                <expandable-card :title="card.title"
                                  :text="card.text"
                                  :img="card.img"
                                  :minHeight="100"
                                  :maxHeight="150"
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
 * @description The main component which makes the AboutPage
 */
  import { mapGetters } from 'vuex';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '../../store/mutationsConsts';

  import ImgAndTextLayout from '../Layouts/ImgAndTextLayout';

  import team from '../../assets/about/team.jpg';
  import teamSmall from '../../assets/about/team_small.jpg';
  import mission from '../../assets/about/mission.jpg';
  import missionSmall from '../../assets/about/mission_small.jpg';
  import handsSmall from '../../assets/about/hands_small.jpg';
  import orga from '../../assets/about/EnviDat_organigram.png';
  import orgaSmall from '../../assets/about/EnviDat_organigram_small.png';

  import conceptSmall from '../../assets/about/concept_small.jpg';
  import communitySmall from '../../assets/about/community_small.jpg';
  import wslLogo from '../../assets/about/wslLogo.jpg';
  import wslLogoSmall from '../../assets/about/wslLogo_small.jpg';

  import ExpandableCard from '../Views/Cards/ExpandableCard';

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
    computed: {
      ...mapGetters({
        aboutText: 'aboutText',
      }),
      /**
       * @returns Returns the team image either in small format for mobile or in normal.
       */
      teamImg: function teamImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return team;
        }

        return teamSmall;
      },
      /**
       * @returns Returns the mission image either in small format for mobile or in normal.
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
       * @description
       * @returns {any}
       */
      AboutCardInfos: function AboutCardInfos() {
        return [
          {
            title: 'Our Mission',
            text: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible.',
            img: this.handsSmall,
          },
          {
            title: 'Team',
            text: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible.',
            img: this.teamSmall,
          },
          {
            title: 'Organigram',
            text: '<img src="' + this.orga + '" style="width: 100%; height: 100%;" />',
            img: this.orgaSmall,
          },
          {
            title: 'Concept',
            text: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible.',
            img: this.conceptSmall,
          },
          {
            title: 'Community',
            text: 'We are registered in <a href="http://www.FAIR-sharing.org" target="_blank" onclick="event.stopPropagation();" >FAIR-sharing.org</a>, and <a href="http://www.re3data.org" target="_blank" onclick="event.stopPropagation();" >re3data.org</a> and a contributor community to ESA Geoportal.',
            img: this.communitySmall,
          },
          {
            title: 'WSL',
            text: 'The Swiss Federal Institute for Forest, Snow and Landscape Research is concerned with the use, development and protection of natural and urban spaces. The focus of our research is on solving problems to do with the responsible use of landscapes and forests and a prudent approach to natural hazards, especially those common in mountainous countries. WSL occupies a leading position internationally in these research areas. We also provide groundwork for sustainable environmental policies in Switzerland. <p><a href="https://www.wsl.ch" target="_blank" onclick="event.stopPropagation();" >For more information have a look at the Website of WSL</a></p>',
            img: this.$vuetify.breakpoint.smAndDown ? this.wslLogoSmall : this.wslLogo,
          },
        ];
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
      AboutInfo: {
        mainTitle: 'EnviDat Mission',
        mainSubtitle: 'Services & Tools for environmental researchers',
        mainText: 'EnviDat is the environmental data portal and repository developed by the Swiss Federal Research Institute WSL. We have the capability to integrate, host and publish data sets. We make environmental monitoring and research data accessible.',
        teamTitle: 'Team',
        teamSubtitle: 'A diverse team for diverse challenges',
        communityTitle: 'Community',
        communitySubtitle: 'Connected with the environmental science community',
        communityText: 'We are registered in FAIR-sharing.org, and re3data.org and a contributor community to ESA Geoportal. (links zu jeder)',
        conceptTitle: 'Concept',
        conceptText: 'EnviDat supports the user-friendly registration, documentation, storage, publication, search and retrieval of data sets from the environmental domain. We provide various services to our users and we follow a set of principles as summarized in our concept image below. Additional detailed information can be found in our concept paper (link zu DORA?). ',
      },
    }),
    components: {
      ImgAndTextLayout,
      ExpandableCard,
    },
  };
</script>

