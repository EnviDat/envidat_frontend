<template>
  <v-card>
    <v-card-title class="metadata_title title pa-4">
      {{ projectDatasetsTitle }}
    </v-card-title>

    <v-card-text v-if="hasMetadatas"
                  class="pa-4 pt-0">

      <MetadataList ref="metadataList"
                      class="px-3"
                      :listContent="listContent"
                      :showMapFilter="showMapFilter"
                      :mapFilteringPossible="mapFilteringPossible"
                      :placeHolderAmount="placeHolderAmount"
                      @clickedTag="$emit('clickedTag')"
                      :allTags="allTags"
                      :selectedTagNames="selectedTagNames"
                      @clickedTagClose="$emit('clickedTagClose')"
                      @clickedClear="$emit('clickedClear')"
                      :defaultListControls="defaultListControls"
                      :enabledControls="enabledControls"
                      :minMapHeight="mapFilterHeight"
                      :topFilteringLayout="topFilteringLayout"
                      :showSearch="showSearch"
                      :searchCount="listContent.length"
                      @setScroll="$emit('setScroll')" />
    </v-card-text>

    <v-card-text v-if="!hasMetadatas"
                  style="color: red;"
                  class="pa-4 pt-0" >
      {{ projectDatasetsEmptyText }}
    </v-card-text>

  </v-card>
</template>

<script>
/**
 * ProjectBody.vue renders markdown showing the description of the project.
 *
 * @summary shows the description of a project entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-28 14:10:13
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import MetadataList from '@/components/MetadataList';

export default {
  name: 'ProjectBody',
  components: {
    MetadataList,
  },
  props: {
    hasMetadatas: Boolean,
    listContent: Array,
    showMapFilter: Boolean,
    mapFilteringPossible: Boolean,
    placeHolderAmount: Number,
    allTags: Array,
    selectedTagNames: Array,
    defaultListControls: Array,
    enabledControls: Array,
    topFilteringLayout: Boolean,
    showSearch: Boolean,
  },
  computed: {
  },
  methods: {
  },
  data: () => ({
    projectDatasetsTitle: 'Related Datasets',
    projectDatasetsEmptyText: 'There are no datasets connected with this project.',
    mapFilterHeight: 400,
  }),
};
</script>
