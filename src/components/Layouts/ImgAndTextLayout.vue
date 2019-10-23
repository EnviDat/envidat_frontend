<template>
  <v-container pa-0 style="position: relative;">
    <slot />

    <v-layout v-if="!leftAlign && !rightAlign"
              column>
      <v-flex>
        <base-title-img :parallax="parallax"
                        :dark="dark"
                        :blur="blur"
                        :img="img"
                        :height="height"
                        :title="title"
                        :sub-title="subTitle"
                        :text-background-color="textBackgroundColor" />
      </v-flex>

      <v-flex v-if="text" mt-2>
        <div :style="textFontSizeStyle">
          <m-markdown-preview
            :markdown="text"
            :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }"
          />
        </div>
      </v-flex>

    </v-layout>

    <v-layout v-if="leftAlign"
              row wrap>

      <v-flex xs12 sm6 md4>
        <base-title-img
          :parallax="parallax"
          :dark="dark"
          :blur="blur"
          :img="img"
          :height="height"
          :title="title"
          :sub-title="subTitle"
          :text-background-color="textBackgroundColor"
        />
      </v-flex>

      <v-flex v-if="img2 && text" xs12 sm4 mt-2>
        <div :style="textFontSizeStyle">
          <m-markdown-preview
            :markdown="text"
            :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }"
          />
        </div>
      </v-flex>

      <v-flex v-if="!img2 && text" xs12 sm6 md8 mt-2>
        <div v-if="text" :style="textFontSizeStyle">
          <m-markdown-preview
            :markdown="text"
            :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }"
          />
        </div>
      </v-flex>

      <v-flex v-if="img2" xs12 sm6 md4>
        <base-title-img
          :parallax="parallax"
          :dark="dark"
          :blur="blur2"
          :img="img2"
          :height="height"
        />
      </v-flex>
    </v-layout>

    <v-layout v-if="rightAlign" row wrap>
      <v-flex v-if="text" xs12 sm6 md8 mt-2>
        <div :style="textFontSizeStyle">
          <m-markdown-preview
            :markdown="text"
            :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }"
          />
        </div>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <base-title-img :parallax="parallax"
                        :dark="dark"
                        :blur="blur"
                        :img="img"
                        :height="height"
                        :title="title"
                        :sub-title="subTitle"
                        :text-background-color="textBackgroundColor" />
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
 * TagChipPlaceholder.vue is a placeholder to show the placement any tag while the page is loading.
 *
 * @summary placeholder for tags
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:55:10
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import MMarkdownPreview from 'm-markdown-preview';
import BaseTitleImg from '@/components/BaseElements/BaseTitleImg';

export default {
  components: {
    BaseTitleImg,
    MMarkdownPreview,
  },
  props: {
    height: Number,
    textFontSize: Number,
    textBackgroundColor: String,
    title: String,
    subTitle: String,
    text: String,
    img: String,
    img2: String,
    dark: Boolean,
    parallax: Boolean,
    blur: Boolean,
    blur2: Boolean,
    leftAlign: Boolean,
    rightAlign: Boolean,
  },
  computed: {
    textFontSizeStyle: function textFontSizeStyle() {
      return this.textFontSize
        ? `font-size: ${this.textFontSize}px !important;`
        : "";
    }
  }
};
</script>

<style scoped>
</style>
