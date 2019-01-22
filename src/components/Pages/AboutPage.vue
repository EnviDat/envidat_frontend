<template>
  <v-container grid-list-lg
                tag="article"
                py-2
  >  
    <v-layout column >

      <v-flex xs12>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :img="missionImg"
                        :height="500"
                        :textFontSize="16"
                        :parallax="true"
                        :title="AboutInfo.mainTitle"
                        :subTitle="AboutInfo.mainSubtitle"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>


      <v-flex xs12 my-4>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :leftAlign="true"
                        :img="handsMission"
                        :height="500"
                        :textFontSize="16"
                        :title="AboutInfo.mainTitle"
                        :subTitle="AboutInfo.mainSubtitle"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>

      <v-flex xs12 my-4>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :rightAlign="true"
                        :img="teamImg"
                        :height="500"
                        :textFontSize="16"
                        :title="AboutInfo.teamTitle"
                        :subTitle="AboutInfo.teamSubtitle"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>

      <v-flex xs12 my-4>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :leftAlign="true"
                        :img="community3"
                        :height="600"
                        :textFontSize="16"
                        :title="AboutInfo.communityTitle"
                        :subTitle="AboutInfo.communitySubtitle"
                        :text="AboutInfo.communityText"
                        />
      </v-flex>

      <v-flex xs12 my-4>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :leftAlign="true"
                        :img="teamImg"
                        :blur2="false"
                        :img2="orga"
                        :height="500"
                        :textFontSize="16"
                        :title="AboutInfo.teamTitle"
                        :subTitle="AboutInfo.teamSubtitle"
                        textBackgroundColor="white"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>


      <!-- <v-flex xs12 mb-5>
        <v-layout row wrap>

          <v-flex xs12 md8 >
            <div>
              {{ aboutText.platform2 }}
            </div>
          </v-flex>

          <v-flex xs12 md4 >
            <v-img :src="orga" aspect-ratio="1.116"/>
          </v-flex>

        </v-layout>

      </v-flex>
 -->
    </v-layout>


  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '../../store/mutationsConsts';

  import ImgAndTextLayout from '../Layouts/ImgAndTextLayout';

  import team from '../../assets/about/team.jpg';
  import teamSmall from '../../assets/about/team_small.jpg';

  import handsMission from '../../assets/about/hands_small.jpg';

  import mission from '../../assets/about/mission.jpg';
  import missionSmall from '../../assets/about/mission_small.jpg';
  import orga from '../../assets/about/EnviDat_organigram.png';

  import community1 from '../../assets/about/community_1.jpg';
  import community2 from '../../assets/about/community_2.jpg';
  import community3 from '../../assets/about/community_3_small.jpg';
  import community4 from '../../assets/about/community_4.jpg';
  import community5 from '../../assets/about/community_5.jpg';

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_CURRENT_PAGE, 'aboutPage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    computed: {
      ...mapGetters({
        aboutText: 'aboutText',
      }),
      teamImg: function teamImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return team;
        }

        return teamSmall;
      },
      missionImg: function teamImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return mission;
        }

        return missionSmall;
      },
    },
    methods: {
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      team,
      teamSmall,
      mission,
      missionSmall,
      handsMission,
      community1,
      community2,
      community3,
      community4,
      community5,
      orga,
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
    },
  };
</script>

