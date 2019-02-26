<template>

  <v-card ripple
          hover
          v-on:click.native="buttonCallback">  

        <!-- v-bind="{['style'] : dynamicCardBackground }"
        height="150px" -->
      
      <v-container grid-list-md pa-0>
        <v-layout v-bind="{ 'row' : $vuetify.breakpoint.xsOnly ? false : true,
                            'column' : $vuetify.breakpoint.xsOnly ? true : false,
                          }" >

          <v-flex xs5 py-0>
            <v-img
                :src="fingertipsImg"
                :style="{ 'max-height': '200px', 'min-height': '100%' }"
            />
          </v-flex>

          <!-- <v-flex xs5 py-0>
            <v-card-media class="imagezoom"
                          height="100px">
              <img :src="imageSrc" />                        
            </v-card-media>
          </v-flex> -->

          <v-flex xs7 pa-2>

            <div class="hidden-sm-and-down envidatSlogan display-1"
              v-html="slogan">
            </div>

            <div class="hidden-xs-only hidden-md-and-up envidatSlogan headline px-2"
              v-html="slogan">
            </div>

            <div class="hidden-sm-and-up envidatSlogan headline x"
                  style="text-align: center;"
              v-html="slogan">
            </div>

            <div class="pt-3 pb-5"
                :class="{'px-2': $vuetify.breakpoint.smAndDown }"
                :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 14px !important;' : '' "
            >
              {{ subSlogan }}
            </div>
          </v-flex>

        </v-layout>
      </v-container>


    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;">

      <rectangle-button 
                    :buttonText="buttonText"
                    :isSmall="true"
                    v-on:clicked="buttonCallback"
      />

    </v-card-actions>
  </v-card>

</template>


<script>
import fingertipsImg from '../../../assets/cards/fingertips_small.jpg';
import RectangleButton from '../../Elements/RectangleButton';

export default {
  props: {
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
  },
  components: {
    RectangleButton,
  },
  created: function created() {
  },
  methods: {
  },
  computed: {
    // responsiveLayout: function responsiveLayout() {
    //   return 
    // },
  },
  data: () => ({
    fingertipsImg,
  }),
};
</script>

<style scoped>

</style>
