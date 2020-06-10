<template>
  <v-layout>
    <v-flex xs12 md6 offset-md6 >

      <v-layout column>

        <v-flex xs12>
          <v-layout row align-center >

            <v-flex hidden-sm-and-down
                    xs3 >
              <img :src="mdLogo" :alt="alternativeText">
            </v-flex>

            <v-flex hidden-xs-only
                    hidden-md-and-up
                    xs1 >
              <img :src="smLogo"
                    :alt="alternativeText" >
            </v-flex>

            <v-flex xs3 hidden-sm-and-up >
              <img :src="smLogo"
                    :alt="alternativeText" >
            </v-flex>

            <v-flex xs8 lg9
                    pl-5
                    hidden-md-and-down
                    class="envidatTitle display-4"
                    style="font-size: 80px !important;" >
              {{ title }}
            </v-flex>

            <v-flex xs8
                    pl-2
                    hidden-sm-and-down
                    hidden-lg-and-up
                    class="envidatTitle display-3" >
              {{ title }}
            </v-flex>

            <v-flex xs8
                    pl-2
                    hidden-xs-only
                    hidden-md-and-up
                    class="envidatTitle display-2" >
              {{ title }}
            </v-flex>

            <v-flex xs9
                    hidden-sm-and-up
                    class="envidatTitle display-3" >
              {{ title }}
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex pt-5>
          <slogan-card :slogan="slogan"
                        :subSlogan="subSlogan"
                        :buttonText="buttonText"
                        :buttonCallback="buttonCallback"
                        :moreButtonText="moreButtonText"
                        :moreButtonCallback="moreButtonCallback" />
        </v-flex>

      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * TheTitleScreenLayout.vue shows the EnviDat logo and the SloganCard
 * with different layouts for the differen screen sizes.
 *
 * @summary responsive layout for the title screen with logo and SloganCard
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-31 08:20:02
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import SloganCard from './SloganCard';
import smLogo from '../assets/EnviDat_logo_64.png';
import mdLogo from '../assets/EnviDat_logo_128.png';
import lgLogo from '../assets/EnviDat_logo_256.png';

export default {
  components: {
    SloganCard,
  },
  props: {
    title: String,
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
    moreButtonText: String,
    moreButtonCallback: Function,
  },
  data: () => ({
    // xsLogo,
    smLogo,
    mdLogo,
    lgLogo,
    alternativeText: 'EnviDat logo',
  }),
  computed: {
  },
};
</script>

<style scoped>

  .mt-md-pct{
    margin-top: 15%;
  }

  .mt-sm-pct{
    margin-top: 8%;
  }

</style>
