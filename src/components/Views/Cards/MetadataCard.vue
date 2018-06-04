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

      <v-container>
        <v-layout row wrap>
          <v-flex xs12 >
            <h3 class="headline mb-0 white--text">{{ truncatedTitle }}</h3>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-between>
          <v-flex v-if="tags" v-for="tag in tags.slice(0, maxTags)" :key="tag.id">
            <tag-chip :id="tag.id"
                      :name="tag.name"
                      class="card_tag" />
          </v-flex>

          <v-flex v-if="maxTagsReached">
            <tag-chip class="card_tag" :name="'...'" />
          </v-flex>
          
        </v-layout>
      </v-container>


    </v-card-media>

    <v-card-title primary-title>
      <!--div>{{ title }}</div-->
      <div>
        <div class="subheading">{{ truncatedSubtitle }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn
      large
      color="primary">
        {{ showDataText }}
      </v-btn>

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
      this.$emit('clickedEvent', this.title);
    },
  },
  computed: {
    maxTagsReached: function maxTagsReached() {
      return this.tags !== undefined && this.tags.length > this.maxTags;
    },
    truncatedSubtitle: function truncatedSubtitle() {
      if (this.subtitle.length > this.maxSubtitleLength) {
        return `${this.subtitle.substring(0, this.maxSubtitleLength)} ...`;
      }

      return this.subtitle;
    },
    truncatedTitle: function truncatedTitle() {
      if (this.title.length > this.maxTitleLength) {
        return `${this.title.substring(0, this.maxTitleLength)} ...`;
      }

      return this.title;
    },
  },
  data: () => ({
    show: false,
    showDataText: 'SHOW DATA',
    maxTitleLength: 65,
    maxSubtitleLength: 125,
    maxTags: 3,
    snowImg, // require('../../../assets/snow_background.jpg'),
    /*
    tags: [
      { id: 'bla', name: 'snow', closeable: false },
      { id: 'blaads', name: 'avalanche', closeable: true },
      { id: 'bluu', name: 'weather', closeable: false },
      { id: 'asdfasdf', name: 'aprettylongtagname', closeable: false },
    ],
    */
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card_tag {
    opacity: 0.7;
  }

</style>
