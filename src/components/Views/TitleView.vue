<template>
  
    <v-layout>

      <v-flex xs12 md6 offset-md6>

        <v-layout column>
          <v-flex xs12 >

            <v-layout row align-center>

              <v-flex xs4 lg3
                      hidden-md-and-down >
                <img style="width: 200px;"
                      :src="lgLogo" :alt="alternativeText" >
              </v-flex>

              <v-flex hidden-sm-and-down hidden-lg-and-up
                      xs3
              >
                <img 
                      :src="mdLogo" :alt="alternativeText" >
              </v-flex>

              <v-flex hidden-xs-only hidden-md-and-up
                      xs1
              >
                <img 
                      :src="smLogo" :alt="alternativeText" >
              </v-flex>

              <v-flex xs3
                      hidden-sm-and-up >
                <img 
                      :src="smLogo" :alt="alternativeText" >
              </v-flex>

              <v-flex xs8 lg9 pl-5
                      hidden-md-and-down
                      class="envidatTitle display-4"
                      style="font-size: 100px !important;"
                      >
                {{ title }}
              </v-flex>

              <v-flex xs8 pl-2
                      hidden-sm-and-down hidden-lg-and-up 
                      class="envidatTitle display-3">
                {{ title }}
              </v-flex>

              <v-flex xs8 pl-2
                      hidden-xs-only hidden-md-and-up
                      class="envidatTitle display-2">
                {{ title }}
              </v-flex>

              <v-flex xs9 
                      hidden-sm-and-up
                      class="envidatTitle display-3">
                {{ title }}
              </v-flex>


            </v-layout>
          </v-flex>

          <v-flex pt-5 >
            <slogan-card :slogan="slogan"
                        :subSlogan="subSlogan"
                        :buttonText="buttonText"
                        :buttonCallback="buttonCallback" />
          </v-flex>

          <!-- <v-flex hidden-sm-and-down pt-5
                  class="envidatSlogan display-1">
            {{ slogan }}
          </v-flex>

          <v-flex hidden-xs-only hidden-md-and-up pt-3
                  class="envidatSlogan headline">
            {{ slogan }}
          </v-flex>

          <v-flex hidden-sm-and-up pt-3
                  class="envidatSlogan headline">
            {{ slogan }}
          </v-flex> -->

        </v-layout>
      </v-flex>
  
    </v-layout>

</template>

<script>
import SloganCard from './Cards/SloganCard';
// import xsLogo from '../../assets/logo/EnviDat_logo_32.png';
import smLogo from '../../assets/logo/EnviDat_logo_64.png';
import mdLogo from '../../assets/logo/EnviDat_logo_128.png';
import lgLogo from '../../assets/logo/EnviDat_logo_256.png';

export default {
  props: {
    title: String,
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
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
  components: {
    SloganCard,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
  .mt-md-pct{
    margin-top: 15%;
  }

  .mt-sm-pct{
    margin-top: 8%;
  }
  
</style>