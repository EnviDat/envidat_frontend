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

            <v-flex hidden-xs-only hidden-md-and-up xs1 >
              <img :src="smLogo" :alt="alternativeText" >
            </v-flex>

            <v-flex xs3 hidden-sm-and-up >
              <img :src="smLogo" :alt="alternativeText" >
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
                        :sub-slogan="subSlogan"
                        :button-text="buttonText"
                        @click="onSloganClicked" />
        </v-flex>

      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import SloganCard from '@/components/Cards/SloganCard';
// import xsLogo from '@/assets/logo/EnviDat_logo_32.png';
import smLogo from '@/assets/logo/EnviDat_logo_64.png';
import mdLogo from '@/assets/logo/EnviDat_logo_128.png';
import lgLogo from '@/assets/logo/EnviDat_logo_256.png';

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
  },
  data: () => ({
    // xsLogo,
    smLogo,
    mdLogo,
    lgLogo,
    alternativeText: 'EnviDat logo',
  }),
  methods: {
    onSloganClicked() {
      this.$emit('sloganClicked');
    },
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
