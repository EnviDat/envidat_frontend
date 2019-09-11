<template>
  <div  @mouseover="hovered = true"
        @mouseleave="hovered = false" >
    <v-card ripple
            height="150px"
            :class="`elevation-${hovered ? 5 : 3}`"
            style="z-index: 1;"
            @click.native="cardClick" >

      <v-layout row
                fill-height
                style="max-width: 100%; background-color: white; border-radius: 2px;"
                class="ma-0" >

          <v-flex v-if="img"
                  xs6 pa-0 >

            <v-img style="height: 100%; border-radius: 2px 0px 0px 2px;"
                    :cover="img ? img.width < 200 : true"
                    :contain="img ? img.width > 200 : false"
                    :src="img"
                    :lazy-src="defaultImg"
                    />
          </v-flex>

        <v-flex xs6 ma-auto>
          <div class="title"
                style="word-break: break-word;"
                :class="this.dark ? 'white--text' : 'black--text'"
          >
            {{ truncatedTitle }}
          </div>
        </v-flex>

      </v-layout>
    </v-card>

    <v-card ripple
            height="100%"
            style="z-index: 0;"
            :class="`elevation-${hovered ? 10 : 2}`"
            class="mx-2"
            @click.native="cardClick" >

      <v-card-text >
        {{ truncatedDescription }}
      </v-card-text>

      <v-card-text v-if="subProjects"
                  class="py-0" >
        <strong>Subprojects</strong>
      </v-card-text>

      <v-card-text v-if="subProjects" >

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
  },
  data: () => ({
    // headerImgWidth: 400,
    maxDescriptionLength: 290,
    maxTitleLength: 100,
    // maxTags: 3,
    maxTagTextlength: 40,
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    hovered: false,
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
