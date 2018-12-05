<template>
  <v-container fluid
                grid-list-lg
                tag="article"
                py-2
  >  
    <v-layout column >

      <!-- <v-card> -->


      <v-flex xs12>
        <parallax-card :dark="true"
                        :blur="true"
                        :img="mission"
                        :height="500"
                        :textFontSize="18"
                        title="EnviDat Mission"
                        subTitle="Super Service Mission"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />

      </v-flex>

      <v-flex xs12>
        <parallax-card :dark="true"
                        :blur="true"
                        :leftAlign="true"
                        :img="team"
                        :height="500"
                        :textFontSize="16"
                        title="EnviDat Team"
                        subTitle="super duper Team"
                        :text="aboutText.platform1 + ' ' + aboutText.platform2"
                        />

      </v-flex>

      <v-flex xs12>
        <v-layout row wrap>

          <v-flex xs12 md6 >

            <div class="envidatTitle"
                :class="{
                  'black--text': true,
                  'display-3' : $vuetify.breakpoint.mdAndUp, 
                  'display-1' : $vuetify.breakpoint.smAndDown, 
                }"
            >
              Organigram
            </div>

          </v-flex>

          <v-flex xs12 md6 >
            <v-img :src="orga" aspect-ratio="0.9"/>
          </v-flex>

        </v-layout>

      </v-flex>

      <!-- </v-card> -->
    </v-layout>


  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '../../store/mutationsConsts';

  import ParallaxCard from '../Views/Cards/ParallaxCard';

  import team from '../../assets/about/team_1.jpg';
  import mission from '../../assets/about/mission_6.jpg';
  import orga from '../../assets/about/EnviDat_organigram.png';

  import banner from '../../assets/about/envidat_programmbanner.jpg';
  import banner2 from '../../assets/about/envidat_programmbanner_hero.jpg';

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
    },
    methods: {
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      banner,
      banner2,
      team,
      mission,
      orga,
    }),
    components: {
      ParallaxCard,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  
</style>
