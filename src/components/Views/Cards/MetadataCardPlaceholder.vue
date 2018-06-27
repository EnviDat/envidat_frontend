<template>

  <v-card 
    px-2 py-2
    ripple
    hover
    >

    <v-card-media
      class="imagezoom placeholder"
      background-color="primary"
        v-bind="{['style'] : dynamicCardBackground }"
        height="150px"
      >
      
      <!-- <img :src="landImg" /> -->

      <v-container style="position: absolute;"
                  fill-height grid-list-xs>
        <v-layout column>
          <v-flex xs12 px-3 pt-3>
            <v-layout row  align-start>
              <v-flex xs12 >
                <h3 class="headline mb-0 black_title"
                >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</h3>
              </v-flex>
            </v-layout>
          </v-flex>
  
          <v-flex xs12 px-3 py-0>
            <v-layout row align-end >
                <tag-chip py-0
                          v-if="tags" v-for="n in 3" :key="n"
                          name="dummy text"
                          class="card_tag_placeholder" />
              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>


    </v-card-media>

    <v-card-title primary-title>
      <!--div>{{ title }}</div-->
      <div>
        <div class="subheading">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores</div>
      </div>
    </v-card-title>

    <v-card-actions>
      
      <v-btn icon slot="activator">
        <v-icon color="white">cloud_download</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn v-if="favourit" icon>
        <v-icon color="accent">star</v-icon>
      </v-btn>
      <v-btn v-if="!favourit" icon>
        <v-icon>star</v-icon>
      </v-btn> -->

    </v-card-actions>
    
    <v-slide-y-transition>
      <v-card-text v-show="show">
        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
      </v-card-text>
    </v-slide-y-transition>

  </v-card>

</template>


<script>
import TagChip from './TagChip';
import defaultTexture from '../../../assets/cards/forest/c_b_forest_texture_bark2.jpg';

// checkout possible transition animation
// https://codepen.io/balapa/pen/embYYB
// https://codepen.io/zavoloklom/pen/eNaEBM

// this one maybe for the guided content scrolling
// https://codepen.io/pgreg/pen/EDoFB

// Card design #2 probably only the header would be doable?
// https://codepen.io/marlenesco/pen/NqOozj

// Card opening animation
// https://codepen.io/luizotcarvalho/pen/yyQNRO


// check multi line truncation via css (only works with one-colored background)
// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/

export default {
  props: {
    id: String,
    title: String,
    subtitle: String,
    type: Number,
    restricted: Boolean,
    favourit: Boolean,
    tags: Array,
    titleImg: String,
    dark: Boolean,
  },
  components: {
    TagChip,
  },
  created: function created() {
  },
  methods: {
    cardClick: function cardClick() {
      this.$emit('clickedEvent', this.id);
    },
    favouritClicked: function favouritClicked() {
      this.$emit('clickedFavourit', this.id);
    },
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
  },
  computed: {
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.defaultTexture) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.defaultTexture}); background-position: center, center;`;
      }

      return '';
    },
    maxTagsReached: function maxTagsReached() {
      return this.tags !== undefined && this.tags.length > this.maxTagNumber;
    },
    maxTagNumber: function maxTagNumber() {
      let textLength = 0;
      let numberOfTags = 0;

      if (this.tags !== undefined) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].name !== undefined) {
            textLength += this.tags[i].name.length + 1;

            if (textLength >= this.maxTagTextlength) {
              break;
            }

            numberOfTags++;
          }
        }
      }

      return numberOfTags;
    },
  },
  data: () => ({
    defaultTexture,
    show: false,
    showDataText: 'SHOW DATA',
    maxTitleLength: 70,
    maxSubtitleLength: 190,
    // maxTags: 3,
    maxTagTextlength: 40,
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.25) 0%, rgba(255,255,255, 0.95) 60%',
    imageDefaults: {
      snow: 'c_b_snow_icy2',
      landscape: 'c_b_landscape_lake2', // or c_b_landscape_view ! c_b_landscape_long_lake
      forest: 'c_b_forest_texture_bark', // maybe c_b_forest_texture_bark2
      diversity: 'b_c_diversity_meadow',
      hazard: 'c_b_hazard_cloud_road', // maybe c_b_hazard_cloud
    },

  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .placeholder .black_title {
    background-color: rgba(0,0,0,.87) !important;
  }

  .placeholder card__title.subheading{
    color: white !important;
  }

  .black_title{
    color: rgba(0,0,0,.87) !important;
  }

  .white_title{
    color: rgba(255,255,255,.9) !important;
  }

  .card_tag_placeholder {
    /* opacity: 0.7; */
  }

</style>
