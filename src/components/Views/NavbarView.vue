<template>
  
    <v-layout column >

      <v-flex xs12>

        <v-card raised >

            <v-layout row align-center >

              <v-flex xs5 sm3 md2 lg2 pl-1>
                <v-btn icon
                        href="./" class="ma-0"
                        >
                  <img :src="Logo" alt="envidat_logo" >
                </v-btn>

                <div class="headline envidatLogoText"
                    :class="{
                      ['envidatNavbarTitleSmall']: this.$vuetify.breakpoint.xsOnly,
                    }" 
                >
                  {{ logoText }} 
                </div>


              </v-flex>

              <v-flex sm5 md8 lg8>
                <!-- spacer -->
              </v-flex>

              <v-flex xs3 sm2 md1 >

                <rectangle-button marginClass="ma-0"
                                  :class="{
                                    ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                                  }" 
                                  :isFlat="true"
                                  :buttonText="loginText"
                                  :toolTipText="loginToolTip"
                                  :isSmall="true"
                                  :url="loginUrl"
                />

              </v-flex>

              <v-flex xs4 sm2 md2 lg1>

                <rectangle-button marginClass="ma-0"
                                  :class="{
                                    ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                                  }" 
                                  :isFlat="true"
                                  :buttonText="aboutText"
                                  :toolTipText="aboutToolTip"
                                  :isSmall="true"
                                  :url="aboutUrl"
                />

              </v-flex>
            
            </v-layout>

        </v-card>

      </v-flex>


      <div style="position: absolute; right: -10px; top: 2px; font-size: 8px !important;" >
        {{ appVersion }}
      </div>

    </v-layout>

</template>

<script>
import Logo from '../../assets/logo/EnviDat_logo_32.png';
import RectangleButton from '../Elements/RectangleButton';

export default {
  props: {
  },
  computed: {
  },
  methods: {
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    aboutText: 'About',
    aboutToolTip: 'What is the EnviDat Portal?',
    aboutUrl: 'https://www.envidat.ch/about',
    loginText: 'Creator Login',
    loginToolTip: 'Login to add and manage datasets',
    loginUrl: 'https://www.envidat.ch/user/reset',
    appVersion: process.env.VERSION,
  }),
  components: {
    RectangleButton,
  },
};
</script>

<style>


  .envidatLogoText {
    display: inline;
    vertical-align: middle;
    position: relative;
    bottom: -2px;
  }

  .envidatNavbarLinksSmall {
    font-size: 10px !important;
  }

  .envidatNavbarTitleSmall {
    font-size: 18px !important;
  }

</style>