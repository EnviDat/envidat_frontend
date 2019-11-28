<template>
  <v-card :class="cardClass">
    <v-card-title v-if="title"
                  class="metadata_title title">
      {{ title }}
    </v-card-title>
    
    <v-card-title v-if="showPlaceholder && !title" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer"
            style="width: 100%;">
        <div class="bone bone-type-heading" />
      </div>
    </v-card-title>

    <v-card-text v-if="fullText"
                  ref="text"
                  style="overflow-x: hidden;"
                  class="heightAndScroll pb-4" >

      <m-markdown-preview :markdown="fullText"
                          :options="{ html: true,
                                      xhtmlOut: true,
                                      linkify: true,
                                      breaks: true }" />
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !fullText" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !fullText"
                  :style="`color: ${emptyTextColor};`" >
      {{ emptyText }}
    </v-card-text>

    <v-card-actions v-if="maxTextLengthReached"
                    class="ma-0 pa-2"
                    :style="`position: absolute; bottom: 5px; right: ${rightPos()};`" >

      <base-icon-button class="mr-2"
                        material-icon-name="expand_more"
                        :iconColor="showFullText ? 'primary' : 'accent'"
                        :color="showFullText ? 'accent' : 'primary'"
                        :outlined="showFullText"
                        :rotateOnClick="true"
                        :rotateToggle="showFullText"
                        :tooltipText="showFullText ? 'Collaspe text' : 'Show full text'"
                        @clicked="readMore" />

    </v-card-actions>

  </v-card>
</template>

<script>
/**
 * ExpandableTextLayout.vue renders markdown showing the text of the metadatas.
 * Long text is cropped and a expand button is shown.
 *
 * @summary shows the markdown text in an expanable card
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-20 13:07:27
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import MMarkdownPreview from 'm-markdown-preview';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  name: 'ExpandableTextLayout',
  components: {
    MMarkdownPreview,
    BaseIconButton,
  },
  props: {
    title: String,
    text: String,
    showPlaceholder: Boolean,
    maxTextLength: {
      type: Number,
      default: 1000,
    },
    emptyText: {
      type: String,
      default: 'No text found for dataset.',
    },
    emptyTextColor: {
      type: String,
      default: 'red',
    },
    cardClass: String,
  },
  computed: {
    fullText() {
      if (this.text) {
        if (this.maxTextLengthReached) {
          return this.showFullText ? this.text.trim() : `${this.text.trim().substring(0, this.maxTextLength)}...`;
        }

        return this.text.trim();
      }

      return '';
    },
    maxTextLengthReached() {
      return this.text && this.text.length > this.maxTextLength;
    },
  },
  methods: {
    readMore() {
      this.showFullText = !this.showFullText;
    },
    rightPos() {
      return this.$refs.text && this.$refs.text.clientHeight >= 500 ? '0px' : '10px';
    },
  },
  data: () => ({
    showFullText: false,
  }),
};
</script>

<style scoped>

  .heightAndScroll {
    max-height: 500px;
    overflow-y: auto !important;
  }
</style>
