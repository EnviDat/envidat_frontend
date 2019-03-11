<template>
  <v-card :class="{ ['pt-2']: this.isOnTop }">
    
    <v-card-title class="title metadata_title" >Data and resources</v-card-title>

    <v-container v-if="resources && resources.length > 0"
                fluid grid-list-xs grid-list-md pa-3>
      <v-layout row wrap>

        <v-flex v-if="showPlaceholder"
                xs12 sm6
                v-for="n in 2" :key="n">

          <resource-card-placeholder :twoColumnLayout="twoColumnLayout" />

        </v-flex>

        <v-flex v-if="!showPlaceholder"
                xs12 sm6
                v-for="res in resources" :key="res.id">

          <resource-card v-bind="res"
                        :doiIcon="doiIcon"
                        :linkIcon="linkIcon"
                        :downloadIcon="downloadIcon"
                        :fileSizeIcon="fileSizeIcon"
                        :dateCreatedIcon="dateCreatedIcon"
                        :lastModifiedIcon="lastModifiedIcon"
                        :twoColumnLayout="twoColumnLayout"
                        v-on:clicked="resClicked(res)" />

        </v-flex>

      </v-layout>
    </v-container>

    <v-card-text v-if="!showPlaceholder && (!resources || resources.length <= 0)"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>


    <!--v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="readMore()">
        <v-icon color="primary" >{{ showAllResources ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>        
    </v-card-actions-->
  </v-card>
</template>

<script>
  import ResourceCard from '../Cards/ResourceCard';
  import ResourceCardPlaceholder from '../Cards/ResourceCardPlaceholder';

  export default {
    props: {
      metadataId: String,
      metadataTitle: String,
      doi: String,
      resources: Array,
      twoColumnLayout: Boolean,
      isOnTop: Boolean,
      showPlaceholder: Boolean,
      doiIcon: String,
      downloadIcon: String,
      linkIcon: String,
      fileSizeIcon: String,
      dateCreatedIcon: String,
      lastModifiedIcon: String,
    },
    updated: function updated() {
    },
    data: () => ({
      showAllResources: false,
      emptyText: 'No resources found for this dataset',
    }),
    computed: {
    },
    methods: {
      readMore: function readMore() {
        this.showAllResources = !this.showAllResources;
      },
      resClicked: function resClicked(res) {
        this.$router.push({
          name: 'ResourceDetailPage',
          params: {
            id: res.id,
          },
        });
      },
    },
    components: {
      ResourceCard,
      ResourceCardPlaceholder,
    },
  };
</script>


