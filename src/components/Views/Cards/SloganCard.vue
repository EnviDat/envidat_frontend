<template>

  <v-card ripple
          hover
          v-on:click.native="buttonCallback">  

        <!-- v-bind="{['style'] : dynamicCardBackground }"
        height="150px" -->
      
      <v-container grid-list-md pa-0>
        <v-layout row align-center>

          <v-flex xs5 py-0>
            <v-img
                :src="fingertipsImg"
                height="200px"
            />
          </v-flex>

          <!-- <v-flex xs5 py-0>
            <v-card-media class="imagezoom"
                          height="100px">
              <img :src="imageSrc" />                        
            </v-card-media>
          </v-flex> -->

          <v-flex xs7>

            <div class="hidden-sm-and-down envidatSlogan display-1"
              v-html="slogan">
            </div>

            <div class="hidden-xs-only hidden-md-and-up envidatSlogan headline"
              v-html="slogan">
            </div>

            <div class="hidden-sm-and-up envidatSlogan headline"
              v-html="slogan">
            </div>

            <div class="pt-3">{{ subSlogan }}</div>
          </v-flex>

        </v-layout>
      </v-container>


    <!-- <v-card-title primary-title>
      <div>{{ subSlogan }}</div>
    </v-card-title> -->

    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;">
    <!-- <v-card-actions > -->
      <!-- <v-spacer></v-spacer> -->

      <v-btn @click.native="buttonCallback"
              color="primary"
              small
      >
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
import fingertipsImg from '../../../assets/cards/fingertips_small.jpg';

export default {
  props: {
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
  },
  components: {
  },
  created: function created() {
  },
  methods: {
  },
  computed: {
  },
  data: () => ({
    fingertipsImg,
  }),
};
</script>

<style scoped>

</style>
