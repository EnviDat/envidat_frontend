<template>
  
    <v-layout column >

      <v-flex xs12 py-1>

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
                <v-btn class="ma-0"
                        flat
                        small
                        :href="aboutUrl"
                        :class="{
                          ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                        }" 
                        target="_blank" >
                  {{ aboutText }}
                </v-btn>
              </v-flex>

              <v-flex xs4 sm2 md2 lg1>
                <v-btn class="ma-0"
                        flat
                        color="primary"
                        small
                        :href="loginUrl"
                        :class="{
                          ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                        }" 
                        target="_blank" >
                  {{ loginText }}
                </v-btn>
              </v-flex>
            
            </v-layout>

        </v-card>

      </v-flex>

      <div style="position: absolute; right: 5px; top: 26px; font-size: 7px !important;" >
        {{ appVersion }}
      </div>

    </v-layout>

</template>

<script>
  import Logo from '../../assets/logo/EnviDat_logo_32.png';

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
      aboutUrl: 'https://www.envidat.ch/about',
      loginText: 'Creator Login',
      loginUrl: 'https://www.envidat.ch/user/reset',
      appVersion: process.env.VERSION,
    }),
    components: {
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