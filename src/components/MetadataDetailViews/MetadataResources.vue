<template>
  <v-card :class="{ ['pt-2']: this.isOnTop }">
    <v-card-title class="title metadata_title">
      Data and resources
    </v-card-title>

    <v-container v-if="resources && resources.length > 0"
                fluid grid-list-xs grid-list-md
                pa-3 >
      <v-layout row wrap >
        <v-flex v-for="n in 2"
                  v-if="showPlaceholder"
                  :key="n"
                  xs12 sm6 >
          <resource-card-placeholder :two-column-layout="twoColumnLayout" />
        </v-flex>

        <v-flex v-for="res in resources"
                v-if="!showPlaceholder"
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

export default {
  components: {
    ResourceCard,
    ResourceCardPlaceholder,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    showAllResources: false,
    checkedGenericProps: false,
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
