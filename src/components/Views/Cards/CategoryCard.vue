<template>
  <v-card ripple
          hover
          v-on:click.native="clicked">  
          
    <v-container grid-list-lg pa-0>
      <v-layout row align-center>

        <v-flex xs5 py-0>
          <v-card-media class="imagezoom"
                        height="100px">
            <img :src="imageSrc" />                        
          </v-card-media>
        </v-flex>

        <v-flex xs7 my-auto>
            <div class="headline">{{ title }}</div>
        </v-flex>

      </v-layout>
    </v-container>

  </v-card>
</template>


<script>
  import defaultImg from '@/assets/cards/default.png';
  import snowImg from '@/assets/cards/snow_background.jpg';
  import woodImg from '@/assets/cards/wood_background.jpg';
  import landImg from '@/assets/cards/landscape_background.jpg';

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

        if (this.type === 'wood') {
          return woodImg;
        }

        if (this.type === 'land') {
          return landImg;
        }

        return defaultImg;
      },
    },
    data: () => ({
      defaultImg,
      snowImg,
      woodImg,
      landImg,
    }),
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>