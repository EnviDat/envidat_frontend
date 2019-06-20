<template>
  <v-layout row wrap >


    <v-flex xs12 my-2
            v-for="(info, index) in textArray" :key="index" >
      <m-markdown-preview :markdown="info"
                          :options="markdownOptions" />
    </v-flex>

  </v-layout>
</template>

<script>
  /**
   * Generic component which renders an array of markdown strings.
   */
  import MMarkdownPreview from 'm-markdown-preview';


  export default {
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
    components: {
      MMarkdownPreview,
    },
  };
</script>

