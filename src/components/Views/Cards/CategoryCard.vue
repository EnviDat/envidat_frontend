<template>
  <v-card ripple
          hover
          v-on:click.native="clicked">  
          
    <v-container grid-list-md pa-0>
      <v-layout row align-center>

        <v-flex xs5 py-0>
          <v-card-media class="imagezoom"
                        height="100px">
            <img :src="imageSrc" />                        
          </v-card-media>
        </v-flex>

        <v-flex xs7 mt-1>
            <div class="headline">{{ title }}</div>
        </v-flex>

      </v-layout>
    </v-container>

  </v-card>
</template>


<script>
  import defaultImg from '@/assets/cards/default.png';
  import snowImg from '@/assets/cards/snow/c_b_snow_icy2_small.jpg';
  import woodImg from '@/assets/cards/forest/c_b_forest_texture_bark2_small.jpg';
  import landImg from '@/assets/cards/landscape/c_b_landscape_view_small.jpg';
  import hazardImg from '@/assets/cards/hazard/c_b_hazard_cloud_small.jpg';
  import diversityImg from '@/assets/cards/diversity/b_c_diversity_meadow_small.jpg';

  export default {
    props: {
      title: String,
      type: String,
    },
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.title);
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
</style>