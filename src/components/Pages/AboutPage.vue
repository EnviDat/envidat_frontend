<template>
  <v-container fluid
                grid-list-lg
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
                        :title="AboutInfo.MainTitle"
                        :subTitle="AboutInfo.MainSubtitle"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>

      <v-flex xs12 my-5>
        <img-and-text-layout :dark="true"
                        :blur="true"
                        :leftAlign="true"
                        :img="teamImg"
                        :height="300"
                        :textFontSize="16"
                        :title="AboutInfo.TeamTitle"
                        :subTitle="AboutInfo.TeamSubtitle"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />
      </v-flex>

      <v-flex xs12 mb-5>
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
  import mission from '../../assets/about/mission.jpg';
  import missionSmall from '../../assets/about/mission_small.jpg';
  import orga from '../../assets/about/EnviDat_organigram.png';

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
      orga,
      AboutInfo: {
        MainTitle: 'EnviDat Mission',
        MainSubtitle: 'Services & Tools for environmental researchers',
        TeamTitle: 'EnviDat Team',
        TeamSubtitle: 'A diverse team for diverse challenges',

      },
    }),
    components: {
      ImgAndTextLayout,
    },
  };
</script>

