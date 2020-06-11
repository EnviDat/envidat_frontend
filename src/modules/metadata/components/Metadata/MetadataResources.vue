<template>
  <v-card :class="{ ['pt-2']: this.isOnTop }">
    <v-card-title >
      <v-container class="pa-0" >
      <v-row justify="end">
        <v-col 
                class="title metadata_title grow">
          Data and resources
        </v-col>

        <v-col class="shrink" >
          <base-icon-count-view v-if="!showPlaceholder && resources && resources.length > 0"
                                :count="resources.length"
                                :icon-string="fileIcon"
                                style="opacity: 0.85;" />
        </v-col>
      </v-row>
      </v-container>
    </v-card-title>

    <v-container v-if="resources && resources.length > 0"
                fluid
                
                grid-list-md
                class="heightAndScroll pa-3" >

      <v-row v-if="showPlaceholder"
                   >
        <v-col v-for="n in 2"
                  :key="n"
                  cols="12" sm="6" >
          <resource-card-placeholder :two-column-layout="twoColumnLayout" />
        </v-col>
      </v-row>

      <v-row v-if="!showPlaceholder"
                 >

        <v-col v-for="res in resources"
                :key="res.id"
                cols="12" sm="6" >
          <resource-card v-bind="res"
                          :doiIcon="doiIcon"
                          :linkIcon="linkIcon"
                          :downloadIcon="downloadIcon"
                          :fileSizeIcon="fileSizeIcon"
                          :dateCreatedIcon="dateCreatedIcon"
                          :lastModifiedIcon="lastModifiedIcon"
                          :twoColumnLayout="twoColumnLayout"
                          @clicked="resClicked(res)" />
        </v-col>
      </v-row>
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

import BaseIconCountView from '@/components/BaseElements/BaseIconCountView';
import ResourceCard from '../ResourceCard';
import ResourceCardPlaceholder from '../ResourceCardPlaceholder';

export default {
  name: 'MetadataResources',
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
    scrollbar-width: thin;
  }

</style>
