<template>

  <v-card 
    px-2 py-2
    ripple
    hover
    height="330"
    >

    <v-card-media
      class="imagezoom"
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
                <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-pulse">

                  <div class='bone bone-type-multiline bone-style-steps'
                  :class="{['black_title'] : dark ? false : true,
                            ['white_title'] : dark ? true : false }"
                  ></div>
                </div>
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
      <div class="skeleton skeleton-color-silver skeleton-animation-pulse" style="width: 100%;">
        <div class='bone bone-type-multiline'></div>
        <div class='bone bone-type-multiline bone-style-paragraph'></div>
      </div>
    </v-card-title>

  </v-card>

</template>


<script>
import TagChip from './TagChip';
import defaultTexture from '../../../assets/cards/forest/c_b_forest_texture_bark2.jpg';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

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
