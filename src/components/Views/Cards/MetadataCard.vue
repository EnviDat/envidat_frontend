<template>

  <v-card
    tile
    ripple
    hover
    @click.native="cardClick"
    >

    <v-card-media
      class="imagezoom"
      height="200px">
      <img :src="snowImg" />
    </v-card-media>

    <!--v-card-media
      class="imagezoom"
      height="400px"
      :src="snowImg" >
    </v-card-media-->

    <!--v-card-media
      height="200px"
      v-if="type == 0"
    >
      <img src="@/assets/wood_background.jpg" />
    </v-card-media>

    <v-card-media
      height="200px"
      v-if="type == 1"
    > 
      <img src="@/assets/snow_background.jpg" />
    </v-card-media>

    <v-card-media
      height="200px"
      v-if="type == 2"
    > <img src="@/assets/landscape_background.jpg" />
    </v-card-media-->

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ type }} {{ title }}</h3>
        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>bookmark</v-icon>
      </v-btn>

      <v-btn v-if="favourit" icon>
        <v-icon color="accent">star</v-icon>
      </v-btn>
      <v-btn v-if="!favourit" icon>
        <v-icon>star</v-icon>
      </v-btn>

      <v-btn icon @click.native="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>      
    </v-card-actions>
    
    <v-slide-y-transition>
      <v-card-text v-show="show">
        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
      </v-card-text>
    </v-slide-y-transition>

  </v-card>

</template>


<script>
// import snowImg from '../../../assets/snow_background.jpg';
import snowImg from '@/assets/snow_background.jpg';

// checkout possible transition animation
// https://codepen.io/balapa/pen/embYYB
// https://codepen.io/zavoloklom/pen/eNaEBM

// this one maybe for the guided content scrolling
// https://codepen.io/pgreg/pen/EDoFB

// Card design #2 probably only the header would be doable?
// https://codepen.io/marlenesco/pen/NqOozj

// Card opening animation
// https://codepen.io/luizotcarvalho/pen/yyQNRO

export default {
  props: {
    title: String,
    datasetname: String,
    type: Number,
    restricted: Boolean,
    favourit: Boolean,
  },
  methods: {
    cardClick: function cardClick() {
      this.$emit('clickedEvent', this.datasetname);
    },
  },
  data: () => ({
    show: false,
    snowImg, // require('../../../assets/snow_background.jpg'),
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imagezoom,
  .imagezoom img {
    height: 200px;
    transition: all .2s;
  }

  .imagezoom img:hover,
  .imagezoom img:focus {
    transform: scale(1.2);
  }  
</style>
