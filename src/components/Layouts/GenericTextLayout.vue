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
   * Generic component which renders an array of markdown strings.
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
