<template>
  <v-card :class="{ ['pt-2']: this.isOnTop }">
    <v-card-title >
      <v-container pa-0>
      <v-layout row justify-end>
        <v-flex grow
                class="title metadata_title">
          Data and resources
        </v-flex>

        <v-flex shrink>
          <base-icon-count-view v-if="!showPlaceholder && resources && resources.length > 0"
                                :count="resources.length"
                                :icon-string="fileIcon" />
        </v-flex>
      </v-layout>
      </v-container>
    </v-card-title>

    <v-container v-if="resources && resources.length > 0"
                fluid
                pa-3
                grid-list-lg
                class="heightAndScroll" >

      <v-layout v-if="showPlaceholder"
                  row wrap >
        <v-flex v-for="n in 2"
                  :key="n"
                  xs12 sm6 >
          <resource-card-placeholder :two-column-layout="twoColumnLayout" />
        </v-flex>
      </v-layout>

      <v-layout v-if="!showPlaceholder"
                row wrap >

        <v-flex v-for="res in resources"
                :key="res.id"
                xs12 sm6 >
          <resource-card v-bind="res"
                          :doiIcon="doiIcon"
                          :linkIcon="linkIcon"
                          :downloadIcon="downloadIcon"
                          :fileSizeIcon="fileSizeIcon"
                          :dateCreatedIcon="dateCreatedIcon"
                          :lastModifiedIcon="lastModifiedIcon"
                          :twoColumnLayout="twoColumnLayout"
                          @clicked="resClicked(res)" />
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-text
      v-if="!showPlaceholder && (!resources || resources.length <= 0)"
      style="color: red;"
    >
      {{ emptyText }}
    </v-card-text>

  </v-card>
</template>

<script>
/**
 * MetadataResources.vue shows all the resources of a metadata entry in a list.
 *
 * @summary shows the resources the a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 16:01:41
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import ResourceCard from '@/components/Cards/ResourceCard';
import ResourceCardPlaceholder from '@/components/Cards/ResourceCardPlaceholder';
import BaseIconCountView from '@/components/BaseElements/BaseIconCountView';

export default {
  components: {
    ResourceCard,
    ResourceCardPlaceholder,
    BaseIconCountView,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    showAllResources: false,
    emptyText: 'No resources found for this dataset',
  }),
  computed: {
    doi() {
      return this.mixinMethods_getGenericProp('doi');
    },
    resources() {
      return this.mixinMethods_getGenericProp('resources');
    },
    twoColumnLayout() {
      return this.mixinMethods_getGenericProp('twoColumnLayout');
    },
    isOnTop() {
      return this.mixinMethods_getGenericProp('isOnTop');
    },
    doiIcon() {
      return this.mixinMethods_getGenericProp('doiIcon');
    },
    downloadIcon() {
      return this.mixinMethods_getGenericProp('downloadIcon');
    },
    linkIcon() {
      return this.mixinMethods_getGenericProp('linkIcon');
    },
    fileSizeIcon() {
      return this.mixinMethods_getGenericProp('fileSizeIcon');
    },
    fileIcon() {
      return this.mixinMethods_getIcon('file');
    },
    dateCreatedIcon() {
      return this.mixinMethods_getGenericProp('dateCreatedIcon');
    },
    lastModifiedIcon() {
      return this.mixinMethods_getGenericProp('lastModifiedIcon');
    },
  },
  methods: {
    readMore() {
      this.showAllResources = !this.showAllResources;
    },
    resClicked(res) {
      this.$router.push({
        name: 'ResourceDetailPage',
        params: {
          id: res.id,
        },
      });
    },
  },
};
</script>

<style scoped>

  .heightAndScroll {
    max-height: 750px;
    overflow-y: auto !important;
  }

</style>
