<template>
  <div @mouseover="hovered = true"
        @mouseleave="hovered = false"
        style="cursor: pointer;" >

    <!-- Top of Card -->
    <v-card ripple
            :height="headerCardHeight"
            :class="`elevation-${hovered ? 5 : 3}`"
            style="z-index: 1;"
            @click.native="cardClick" >

      <v-layout fill-height style="max-width: 100%; background-color: white; border-radius: 2px;" class="ma-0" >
          <v-flex xs6 pa-0 >
            <v-img style="border-radius: 2px 0px 0px 2px;"
                    :contain="headerImg ? headerImg.width > headerImg.height : false"
                    :cover="headerImg ? headerImg.width < headerImg.height : false"
                    :height="headerCardHeight"
                    :src="headerImg ? headerImg.src : ''"
                    :lazy-src="defaultImg"
                    />
          </v-flex>

        <v-flex xs6 ma-auto>
          <div class="title"
                style="word-break: break-word;"
                :class="dark ? 'white--text' : 'black--text'"
          >
            {{ truncatedTitle }}
          </div>
        </v-flex>

      </v-layout>
    </v-card>

    <!-- Bottom of Card -->
    <v-card ripple
            height="100%"
            style="z-index: 0;"
            :class="`elevation-${hovered ? 10 : 2}`"
            class="mx-2"
            @click.native="cardClick" >

      <v-card-text >
        {{ truncatedDescription }}
      </v-card-text>

      <v-card-text v-if="subProjects" class="py-0" >
        <strong>Subprojects</strong>
      </v-card-text>

      <v-card-text v-if="subProjects" >
        <v-layout v-for="sub in subProjects" :key="sub.id" wrap align-center pr-2>
          <v-flex xs11 py-0>{{ sub.title }}</v-flex>
          <v-flex xs1 py-0>
            <base-icon-button materialIconName="find_in_page"
                            color="transparent"
                            iconColor="secondary"
                            :tooltipText="`Open Subproject ${sub.title}`"
                            tooltipBottom
                            :isSmall="true"
                            @clicked="subprojectClick(sub.id)" />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
/**
 * ProjectCard.vue creates a card with a header image, title, keywords and preview description.
 * When clicked its emits the 'clickedEvent' event, also the clickedTag can be emitted.
 *
 * @summary card with img, title, keywords and preview description
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-28 12:57:06
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

/**
 * TODO: Difference defaultImage vs img
 */

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  name: 'ProjectCard',
  components: {
    BaseIconButton,
  },
  props: {
    id: String,
    defaultImg: String,
    img: String,
    title: String,
    subtitle: String,
    description: String,
    subProjects: Array,
    dark: Boolean,
  },
  computed: {
    headerImg() {
      const img = new Image();
      let imgSrc = this.defaultImg;

      if (this.img) {
        imgSrc = this.img;
      }

      img.src = imgSrc;
      img.onload = () => {
        // forced to make the check with for the contain property again
        this.$forceUpdate();
      };

      return img;
    },
    maxTitleLengthReached() {
      return this.title.length > this.maxTitleLength;
    },
    truncatedTitle() {
      const maxLength = this.maxTitleLength;

      if (this.title !== undefined && this.title.length > 0) {
        let modifiedTitle = this.title.trim();
        const splits = this.title.split('(');
        if (splits.length > 0) {
          modifiedTitle = splits[0].trim();
        }
        if (this.maxTitleLengthReached) {
          return `${modifiedTitle.substring(0, maxLength)}...`;
        }
        return modifiedTitle;
      }
      return '';
    },
    truncatedDescription() {
      if (this.description !== undefined && this.description.length > 0) {
        return `${this.description.substring(0, this.maxDescriptionLength)}...`;
      }
      return `No description found for ${this.truncatedTitle}`;
    },
  },
  methods: {
    cardClick() {
      this.$emit('cardClick', this.id);
    },
    subprojectClick(subprojectId) {
      this.$emit('subprojectClick', subprojectId);
    },
  },
  data: () => ({
    maxDescriptionLength: 290,
    maxTitleLength: 100,
    hovered: false,
    headerCardHeight: 150,
  }),
};
</script>

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
