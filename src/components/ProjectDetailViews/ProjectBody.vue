<template>
  <v-card :dark="dark" >

    <v-card-title class="bodyTitle title">Description</v-card-title>

    <v-card-text v-if="fullDescription"
                  ref="description"
                  class="heightAndScroll pb-4" >

      <m-markdown-preview :markdown="fullDescription"
                          :options="{ html: true,
                                      xhtmlOut: true,
                                      linkify: true,
                                      breaks: true }" />
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !fullDescription" >      
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !fullDescription"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>


    <v-card-actions v-if="maxDescriptionLengthReached"
                    class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 0px;" >

      <base-icon-button class="mr-2"
                        material-icon-name="expand_more"
                        icon-color="accent"
                        color="accent"
                        outlined
                        :rotateOnClick="true"
                        :rotateToggle="showFullDescription"
                        :toolTipText="showFullDescription ? 'Hide full description' : 'Show full description'"
                        @clicked="showFullDescription = !showFullDescription" />

    </v-card-actions>


  </v-card>
</template>

<script>
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import MMarkdownPreview from 'm-markdown-preview';

export default {
  components: {
    BaseIconButton,
    MMarkdownPreview,
  },
  props: {
    description: String,
    subProjects: Array,
    metadatas: Array,
    dark: Boolean,
    showPlaceholder: Boolean,
  },
  computed: {
    fullDescription: function fullDescription() {
      if (this.description) {
        if (this.maxDescriptionLengthReached) {
          return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
        }

        return this.description.trim();
      }

      return '';
    },
    maxDescriptionLengthReached: function maxDescriptionLengthReached() {
      return this.description && this.description.length > this.maxTextLength;
    },
  },
  methods: {
  },
  data: () => ({
    showFullDescription: false,
    maxTextLength: 1000,
    emptyText: 'No description found for this project.',
  }),
};
</script>

<style scoped>

  .bodyTitle {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }

  .heightAndScroll {
    max-height: 500px;
    overflow-y: auto !important;
  }

</style>
