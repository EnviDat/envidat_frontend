<template>
  <v-layout row wrap >

    <v-flex my-2
            v-for="(info, index) in textArray" :key="index" >

      <m-markdown-preview :markdown="info.title"
                          :options="markdownOptions" />

      <m-markdown-preview :markdown="info.text"
                          :options="markdownOptions" />

      <m-markdown-preview v-if="info.bulletTitle"
                          :markdown="info.bulletTitle"
                          :options="markdownOptions" />

      <ul v-if="info.bulletpoints">
        <li v-for="(point, index) in info.bulletpoints" :key="index" >

          <m-markdown-preview v-if="point"
                              :markdown="point"
                              :options="markdownOptions" />

          <ul v-if="point.bulletpoints">
            <li v-for="(subpoint, index2) in point.bulletpoints" :key="index2" >
              
              <m-markdown-preview v-if="subpoint"
                                  :markdown="subpoint"
                                  :options="markdownOptions" />
            </li>
          </ul>

        </li>
      </ul>

    </v-flex>
  </v-layout>
</template>

<script>
  /**
   * Generic component which renders Text data of a structure like:
   * [{
   *   title: 'Headline',
   *   text: 'FOREST FUNCTION DRINKING WATER FOREST FUNCTION GAME RESERVE FOREST FUNCTION LANDSCAPE PROTECTION FOREST FUNCTION MILITARY FOREST FUNCTION NATURE PROTECTION FOREST FUNCTION PROTECTION AGAINST NATURAL HAZARDS',
   *   bulletTitle: 'List title',
   *   bulletpoints: ['point 1', 'point2', 'point3'],
   *  },
   *  {
   *   title: 'Headline 2',
   *   text: 'FOREST FUNCTION DRINKING WATER FOREST FUNCTION GAME RESERVE FOREST FUNCTION LANDSCAPE PROTECTION FOREST FUNCTION MILITARY FOREST FUNCTION NATURE PROTECTION FOREST FUNCTION PROTECTION AGAINST NATURAL HAZARDS',
   *  }],
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

