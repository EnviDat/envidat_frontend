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
                        :tooltipText="showFullDescription ? 'Hide full description' : 'Show full description'"
                        @clicked="showFullDescription = !showFullDescription" />

    </v-card-actions>


  </v-card>
</template>

<script>
/**
 * ProjectBody.vue renders markdown showing the description of the project.
 *
 * @summary shows the description of a project entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 16:02:55
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import MMarkdownPreview from 'm-markdown-preview';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    BaseIconButton,
    MMarkdownPreview,
  },
  props: {
    description: String,
    dark: Boolean,
    showPlaceholder: Boolean,
  },
  computed: {
    fullDescription() {
      if (this.description) {
        if (this.maxDescriptionLengthReached) {
          return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
        }

        return this.description.trim();
      }

      return '';
    },
    maxDescriptionLengthReached() {
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
