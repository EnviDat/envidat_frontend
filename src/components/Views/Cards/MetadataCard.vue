<template>

  <v-card
    ripple
    hover
    @click.native="cardClick"
    >

    <v-card-media
      class="imagezoom"
      height="150px">
      
      <!-- img :src="snowImg" /-->

      <v-container fill-height grid-list-xs>
        <v-layout column>
          <v-flex xs12 px-3 pt-3>
            <v-layout row  align-start>
              <v-flex xs12 >
                <h3 class="headline mb-0 white--text">{{ title | truncate(maxTitleLength) }}</h3>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 px-2>
            <v-layout row  align-end >
                <tag-chip v-if="tags" v-for="tag in tags.slice (0, maxTagNumber)" :key="tag.id"
                          :id="tag.id"
                          :name="tag.name"
                          class="card_tag" />
              
              <v-flex v-if="maxTagsReached">
                <tag-chip class="card_tag" :name="'...'" />
              </v-flex>
              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>


    </v-card-media>

    <v-card-title primary-title>
      <!--div>{{ title }}</div-->
      <div>
        <div class="subheading">{{ subtitle | truncate(maxSubtitleLength) }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      
      <v-btn icon slot="activator">
        <v-icon color="primary">cloud_download</v-icon>
      </v-btn>

      <!-- 
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="primary">cloud_download</v-icon>
        </v-btn>
        <span>download data</span>
      </v-tooltip>
      
       {{ showDataText }}
      -->
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
import snowImg from '@/assets/cards/snow_background.jpg';
// import woodImg from '@/assets/cards/wood_background.jpg';
// import landImg from '@/assets/cards/landscape_background.jpg';
import TagChip from './TagChip';

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
    id: String,
    title: String,
    subtitle: String,
    type: Number,
    restricted: Boolean,
    favourit: Boolean,
    tags: Array,
    /*
    tags:[{
      id: String,
      name: String,
    }],
    */
  },
  components: {
    TagChip,
  },
  methods: {
    cardClick: function cardClick() {
      this.$emit('clickedEvent', this.id);
    },
  },
  /*
  filters: {
    uppercase: function uppercase(value) {
      if (!value) return '';
      value = value.toString();
      return value.toUpperCase();
    },
  },
  */
  computed: {
    maxTagsReached: function maxTagsReached() {
      return this.tags !== undefined && this.tags.length > this.maxTagNumber;
    },
    maxTagNumber: function maxTagNumber() {
      let textLength = 0;
      let numberOfTags = 0;

      if (this.tags !== undefined) {
        for (let i = 0; i < this.tags.length; i++) {
          textLength += this.tags[i].name.length + 1;

          if (textLength >= this.maxTagTextlength) {
            break;
          }

          numberOfTags++;
        }
      }

      return numberOfTags;
    },
  },
  data: () => ({
    show: false,
    showDataText: 'SHOW DATA',
    maxTitleLength: 65,
    maxSubtitleLength: 125,
    // maxTags: 3,
    maxTagTextlength: 45,
    snowImg, // require('../../../assets/snow_background.jpg'),
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card_tag {
    opacity: 0.7;
  }

</style>
