<template>

  <v-card
    tile
    ripple
    hover
    @click.native="cardClick"
    >

    <v-card-media
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
    </v-card-media>

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
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  */
</style>
