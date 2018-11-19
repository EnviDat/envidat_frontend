<template>
  <v-card ripple
          hover
          v-on:click.native="clicked">  
          
    <v-container grid-list-md pa-0>
      <v-layout row align-center>

        <v-flex xs5 px-1 py-0>
          <v-card-media class="imagezoom"
                        :height=" $vuetify.breakpoint.xsOnly ? '75px' : '100px' ">
            <img :src="imageSrc" />                        
          </v-card-media>
        </v-flex>

        <v-flex xs7 px-1 mt-1>
            <div class="headline"
                :class="{ 'compactTitle' : this.$vuetify.breakpoint.mdAndDown }"
            >
              {{ title }}
            </div>
        </v-flex>

      </v-layout>
    </v-container>

  </v-card>
</template>


<script>
  import defaultImg from '@/assets/cards/default.png';
  import snowImg from '@/assets/cards/c_b_snow_icy2_small.jpg';
  import woodImg from '@/assets/cards/c_b_forest_texture_bark2_small.jpg';
  import landImg from '@/assets/cards/c_b_landscape_view_small.jpg';
  import hazardImg from '@/assets/cards/c_b_hazard_cloud_small.jpg';
  import diversityImg from '@/assets/cards/b_c_diversity_meadow_small.jpg';
  import dataCreatorImg from '../../../assets/cards/data_creator_small.jpg';

  // un blurry zooming
  // https://stackoverflow.com/questions/36143337/how-to-prevent-blur-from-css-transform

  export default {
    props: {
      title: String,
      type: String,
    },
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.title.toLowerCase());
      },
    },
    computed: {
      imageSrc: function imageSrc() {
        if (this.type === 'snow') {
          return snowImg;
        }

        if (this.type === 'forest') {
          return woodImg;
        }

        if (this.type === 'landscape') {
          return landImg;
        }

        if (this.type === 'hazard') {
          return hazardImg;
        }

        if (this.type === 'diversity') {
          return diversityImg;
        }

        if (this.type === 'login') {
          return dataCreatorImg;
        }

        return defaultImg;
      },
    },
    data: () => ({
      defaultImg,
      snowImg,
      woodImg,
      landImg,
      hazardImg,
      diversityImg,
      dataCreatorImg,
    }),
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card .headline {
    font-size: 1.45em !important;
    overflow: inherit !important;
    text-overflow: inherit !important;
    max-height: inherit !important;
    line-height: inherit !important;
  }

  .compactTitle { 
    font-size: 15px !important; 
    line-height: 1.3em !important; 
  } 

  .v-card__media img {
    width: inherit !important;
  }
</style>