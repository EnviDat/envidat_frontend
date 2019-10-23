<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="(info, index) in textArray"
      :key="index"
      xs12
      my-2
    >
      <m-markdown-preview
        :markdown="info"
        :options="markdownOptions"
      />
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * GenericTextLayout.vue renders a list of markdown objects
 *
 * @summary renders a list of markdown objects
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:54:16
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import MMarkdownPreview from 'm-markdown-preview';

export default {
  components: {
    MMarkdownPreview,
  },
  props: {
    textArray: Array,
  },
  computed: {
    markdownOptions() {
      return {
        html: true,
        xhtmlOut: true,
        linkify: true,
        breaks: true,
      };
    },
  },
};
</script>
