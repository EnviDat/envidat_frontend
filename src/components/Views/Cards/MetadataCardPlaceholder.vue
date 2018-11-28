<template>

  <v-card 
    ripple
    hover
    style="height: 100%;"
    >

    <v-img
        background-color="primary"
        :style="!flatLayout ? dynamicCardBackground : ''"
        :height="flatLayout? '70px' : $vuetify.breakpoint.xsOnly ? '110px'
                                    : $vuetify.breakpoint.smAndDown ? '120px' : '135px'"
    >
      
      <!-- <img :src="landImg" /> -->

      <v-container style="position: absolute;"
                  fill-height grid-list-xs pb-0>
        <v-layout column>
          <v-flex xs12 py-0>
            <v-layout row  align-start>
              <v-flex xs12 >
                <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
                  <div class='bone bone-type-multiline bone-style-steps'></div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
  
          <v-flex xs12 py-0 mx-1>
            <v-layout row fill-height align-end >

                <tag-chip-placeholder py-0
                          v-for="n in 3" :key="n"
                          class="card_tag_placeholder" />              
              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>


    </v-img>

    <v-card-title primary-title v-if="!show">
      <div class="skeleton skeleton-color-silver skeleton-animation-shimmer" style="width: 100%;">
        <div class='bone bone-type-multiline'></div>
        <div class='bone bone-type-multiline bone-style-paragraph'></div>
      </div>
    </v-card-title>

  </v-card>

</template>


<script>
import TagChipPlaceholder from './TagChip';
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
    TagChipPlaceholder,
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
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.defaultTexture});
                background-position: center, center;
                background-size: cover; background-repeat: initial; `;
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
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
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
    opacity: 0.75;
  }

  .expand-enter-active, .expand-leave-active {
    transition: all 4s ease;
    background-color: red;
  }

  .expand-enter, .expand-leave-to {
    opacity: 0;
    background-color: black;
  }

</style>
