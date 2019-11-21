<template>
  <expandable-text-layout v-bind="body"
                            :showPlaceholder="showPlaceholder" />

  <!-- <v-card :class="{ ['pt-2']: this.isOnTop }">
    <v-card-title class="metadata_title title">Description</v-card-title>

    <v-card-text v-if="fullDescription"
                  ref="description"
                  style="overflow-x: hidden;"
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

  </v-card> -->
</template>

<script>
/**
 * MetadataBody.vue renders markdown showing the description of the metadatas.
 *
 * @summary shows the description of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-20 13:07:27
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import ExpandableTextLayout from '@/components/Layouts/ExpandableTextLayout';

export default {
  name: 'MetadataBody',
  components: {
    ExpandableTextLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  computed: {
    body() {
      let body = this.mixinMethods_getGenericProp('body');

      if (!body) {
        body = { title: 'Description' };
      }

      return body;
    },
  },
  methods: {
  },
  data: () => ({
  }),
};
</script>

<style scoped>

  /* .heightAndScroll {
    max-height: 500px;
    overflow-y: auto !important;
  } */
</style>
