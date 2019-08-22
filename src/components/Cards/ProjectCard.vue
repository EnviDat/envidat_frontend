<template>
  <v-card ripple
          hover
          height="100%"
          style=" /* max-width: 350px */"
          @click.native="cardClick" >

    <v-card-title class="pa-0" style="height: 150px;">
      <v-container grid-list-lg fill-height pa-0 >
        <!-- grid-list-lg is needed for the negative margin on the v-layout
              fill-heigth is needed if the v-card-title is a fixed height -->
        <v-layout row
                  style="background-color: white; border-radius: 2px;"
                  class="elevation-2" >

          <v-flex v-if="cardImg.src"
                  xs6 pa-0 >

            <v-img style="height: 100%; border-radius: 2px 0px 0px 2px;"
                    :cover="imgWidth < 200"
                    :contain="imgWidth > 200"
                    :src="fallbackImg ? fallbackImg : cardImg.src"
                    />
          </v-flex>

          <!-- <v-flex xs8 ml-3>
            <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
              <div class="bone bone-type-multiline bone-style-steps" />
            </div>
          </v-flex> -->

          <v-flex xs6 ma-auto>
            <div class="headline"
                  :class="this.dark ? 'white--text' : 'black--text'"
            >
              {{ truncatedTitle }}
            </div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-text  >
      {{ truncatedDescription }}
    </v-card-text>


    <strong v-if="subProjects"
            class="px-3 py-0">Subprojects</strong>

    <v-card-text v-if="subProjects">

      <v-layout v-for="sub in subProjects"
                :key="sub.id"
                row wrap
                align-center
                pr-2>

        <v-flex xs11 py-0>{{ sub.title }}</v-flex>

        <v-flex xs1 py-0>
          <base-icon-button materialIconName="find_in_page"
                          color="transparent"
                          iconColor="secondary"
                          :toolTipText="`Open Subproject ${sub.title}`"
                          toolTipBottom
                          :isSmall="true"
                          @clicked="subprojectClick(sub.id)" />
        </v-flex>
      </v-layout>

    </v-card-text>

  </v-card>
</template>


<script>
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
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
    cardImg() {
      const img = new Image();
      let imgSrc = this.defaultImg;

      if (this.img) {
        imgSrc = this.img;
        if (!imgSrc.includes('http')) {
          imgSrc = `https://www.envidat.ch/uploads/group/${imgSrc}`;
        }
      }

      if (imgSrc !== undefined) {
        img.src = imgSrc;
      }
      img.onload = this.setHeightAndWidth;
      img.onerror = this.setDefaultImg;

      return img;
    },
    maxTitleLengthReached() {
      return this.title.length > this.maxTitleLength;
    },
    truncatedTitle() {
      const maxLength = this.maxTitleLength;

      if (this.title !== undefined && this.title.length > 0) {
        let modifiedTitle = this.title;
        const splits = this.title.split('(');
        if (splits.length > 0) {
          modifiedTitle = splits[0];
        }

        if (this.maxTitleLengthReached) {
          return `${modifiedTitle.substring(0, maxLength)}...`;
        }

        return modifiedTitle;
      }

      return '';
    },
    truncatedDescription() {
      const maxLength = this.maxDescriptionLength;

      if (this.description !== undefined && this.description.length > 0) {
        return `${this.description.substring(0, maxLength)}...`;
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
    setHeightAndWidth() {
      this.imgWidth = this.cardImg.width;
      this.imgHeight = this.cardImg.height;
    },
    setDefaultImg() {
      this.fallbackImg = this.defaultImg;
    },
  },
  data: () => ({
    // headerImgWidth: 400,
    fallbackImg: null,
    imgWidth: 0,
    imgHeight: 0,
    maxDescriptionLength: 290,
    maxTitleLength: 100,
    // maxTags: 3,
    maxTagTextlength: 40,
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
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
