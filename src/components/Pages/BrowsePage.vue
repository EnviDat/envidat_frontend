<template>
  <v-container grid-list-xs>

    <v-layout>
      <v-flex my-2>
        <filter-view :searchViewLabelText="'search'"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagids="selectedTagids">
        </filter-view>

      </v-flex>
    </v-layout>

    <v-layout column>

        <div v-if="loadingMetadatasContent">
          <img style="width: 200px;" src="@/assets/loadingspinner.gif" alt="Loading">
        </div>
        <div v-else>
          <p v-if="metadataIds" >metadataIds length: {{ metadataIds.length }}</p>

          <p v-if="metadatasContent" >metadatasContent length: {{ this.metadatasContentSize }}</p>
        </div>
        <!--metadata-card v-bind:title="currentMetadata.name" v-on:clickedEvent="metaDataClicked"></metadata-card-->
        
        <p v-if="currentMetadata" >currentMetadata name: {{ currentMetadata.name }}</p>
        <p v-else>currentMetadata length: 0</p>

        <v-container fluid grid-list-xs>
          <v-layout row wrap>

            <!-- v-flex px-2 py-2 v-bind="{ [`xs6`]: true, [`md3`]: true }"
                    v-for="metadata in filterBy(metadatasContent.slice(0,3), searchTerm, 'title')" :key="metadata.id">
              <metadata-card
                            v-bind:title="metadata.title"
                            v-bind:id="metadata.id"
                            v-bind:subtitle="metadata.notes"
                            v-bind:tags="metadata.tags"
                            v-on:clickedEvent="metaDataClicked($event, metadataid)">
              </metadata-card>
    
            </v-flex -->

            <v-flex px-2 py-2 v-bind="{ [`xs6`]: true, [`md3`]: true }"
                    v-for="metadata in metadatasContent" :key="metadata.id">
              <metadata-card
                            v-bind:title="metadata.title"
                            v-bind:id="metadata.id"
                            v-bind:subtitle="metadata.notes"
                            v-bind:tags="metadata.tags"
                            v-on:clickedEvent="metaDataClicked($event, metadataid)">
              </metadata-card>
    
            </v-flex>

            <!--v-flex px-2 py-2 v-bind="{ [`xs${metadata.flex}`]: true }" v-for="metadata in metadatas" :key="metadata">
    
              <metadata-card v-bind:title="metadata.name + metadata.title" v-bind:type="metadata.type" v-on:clickedEvent="metaDataClicked"></metadata-card>
    
            </v-flex-->

          </v-layout>
        </v-container>

      <v-card class="my-3">
        <p>Browse Page {{ $route.params.category }}</p>
        <p>Search query: {{ $route.query.search }} </p>
      </v-card>
    
    </v-layout>
  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import FilterView from '../Views/FilterView';
  import MetadataCard from '../Views/Cards/MetadataCard';
  

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    components: {
      FilterView,
      MetadataCard,
    },
    data: () => ({
      searchTerm: String,
      searchTags: Array,
      allTags: [
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'AIR TEMPERATURE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd13',
          name: 'AIR TEMPERATURE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'HUMIDITY',
          id: '5d5d3a6d-1047-4c33-bee7-d1bb119bbe32',
          name: 'HUMIDITY',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONGWAVE RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb50c',
          name: 'LONGWAVE RADIATION',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONGWAVE RADI',
          id: '4a3b1721-1050-434e-8573-9c36284bb51c',
          name: 'LONGWAVE RADI',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONG RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb52c',
          name: 'LONG RADIATION',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb53c',
          name: 'RADIATION',
        },
      ],
      selectedTagids: [
        'ba9c8c16-f908-4173-affa-f813f7f8cd13',
        '5d5d3a6d-1047-4c33-bee7-d1bb119bbe32',
        '4a3b1721-1050-434e-8573-9c36284bb50c',
      ],
    }),
    mounted: function mounted() {
      this.searchTerm = this.$route.query.search ? this.$route.query.search : '';
      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';

      this.searchTags = this.decodeTagsFromUrl(tagsEncoded);
      // console.log('this.$route.params ' + this.$route.params.length + ' query ' + this.$route.query.length);
    },
    methods: {
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$router.push({
          name: 'MetadataDetailPage',
          params: {
            metadataid: datasetname,
          },
        });
      },
      filterViewTagClicked: function filterViewTagClicked(tag) {
        this.searchTags.push(tag);

        const tagsEncoded = this.encodeTagForUrl(this.searchTags);

        this.$router.push({
          name: 'BrowsePage',
          params: {
            query: tagsEncoded,
          },
        });
      },
      encodeTagForUrl: function encodeTagForUrl(jsonTags) {
        const stringTags = JSON.parse(jsonTags);

        let urlConformString = stringTags.replace('+', '.');
        urlConformString = urlConformString.replace('/', '_');
        urlConformString = urlConformString.replace('=', '-');

        const urlquery = btoa(urlConformString);

        return urlquery;
      },
      decodeTagsFromUrl: function decodeTagsFromUrl(urlquery) {
        const urlQueryString = atob(urlquery);

        let jsonConformString = urlQueryString.replace('.', '+');
        jsonConformString = jsonConformString.replace('_', '/');
        jsonConformString = jsonConformString.replace('-', '=');

        const jsonTags = JSON.stringify(jsonConformString);

        return jsonTags;
      },
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        currentMetadata: 'metadata/currentMetadata',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      /*
      allTags: function allTags() {
        const tags = [];
        for (let i = 0; i < this.metadatasContent.length; i++) {
          const element = array[i];
          tags.push(element.tags);
        }

        return tags;
      },
      */
    },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .application {
    background-image: url('../../assets/landingpage/noisy_pattern.png') !important;
    background-position: center top !important;
    /* background-size: cover !important; */
    background-repeat: repeat !important;
    /* background-attachment: fixed !important; */
  }
</style>
