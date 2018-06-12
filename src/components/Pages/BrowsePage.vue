<template>
  <v-container grid-list-xs>

    <v-layout style="position: sticky; top: -1px; z-index: 2;">

      <v-flex xs12 my-2>
        <filter-view :searchViewLabelText="'search'"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagids.sync="selectedTagids"
                      :popularTagids="popularTagids"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
                      >
        </filter-view>

      <img v-if="loadingMetadatasContent" src="../../assets/loadingspinner.gif" alt="" height="50px;">

      </v-flex>

        <p>{{ scrollPosition }}</p>
      
    </v-layout>

    <v-layout column
                      style="margin-top: 50px; z-index: 1;">

        <!--div v-if="loadingMetadatasContent">
          <img style="width: 200px;" src="@/assets/loadingspinner.gif" alt="Loading">
        </div>
        <div v-else>
          <p v-if="metadataIds" >metadataIds length: {{ metadataIds.length }}</p>

          <p v-if="metadatasContent" >metadatasContent length: {{ this.metadatasContentSize }}</p>
        </div-->
        <!--metadata-card v-bind:title="currentMetadata.name" v-on:clickedEvent="metaDataClicked"></metadata-card-->
        
        <!--p v-if="currentMetadata" >currentMetadata name: {{ currentMetadata.name }}</p>
        <p v-else>currentMetadata length: 0</p -->

<!--
        v-bind:style="'opacity: ' + 1 - window.scrollTop() / 250"
-->  

        <v-container fluid grid-list-md @scroll="updateScroll" >
          <v-layout row wrap>

            <v-flex xs12 sm6 md4 xl3
                    v-for="metadata in filteredMetadataContent" :key="metadata.id">
              <metadata-card
                            v-bind:title="metadata.title"
                            v-bind:id="metadata.id"
                            v-bind:subtitle="metadata.notes"
                            v-bind:tags="metadata.tags"
                            v-on:clickedEvent="metaDataClicked($event, metadataid)">
              </metadata-card>
    
            </v-flex>

          </v-layout>
        </v-container>

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
      selectedTagids: [],
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
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'TEMPER',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd14',
          name: 'TEMPER',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'SNOW',
          id: 'c4e9ea3f-6149-45ce-8631-c872b96a9537',
          name: 'SNOW',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'ICE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd16',
          name: 'ICE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LANDSCAPE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd17',
          name: 'LANDSCAPE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'EARTH QUAKE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd20',
          name: 'EARTH QUAKE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'AVALANCHES',
          id: 'e9bbed2b-85d9-49a7-bdfb-2e5785e2202b',
          name: 'AVALANCHES',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'SOIL',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd21',
          name: 'SOIL',
        },
      ],
      popularTagids: [
        'ba9c8c16-f908-4173-affa-f813f7f8cd13',
        'c4e9ea3f-6149-45ce-8631-c872b96a9537',
        'ba9c8c16-f908-4173-affa-f813f7f8cd16',
        'e9bbed2b-85d9-49a7-bdfb-2e5785e2202b',
        '4a3b1721-1050-434e-8573-9c36284bb51c',
      ],
      scrollPosition: null,
    }),
    mounted: function mounted() {
      // window.addEventListener('scroll', this.updateScroll);

      this.searchTerm = this.$route.query.search ? this.$route.query.search : '';
      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';

      this.selectedTagids = this.decodeTagsFromUrl(tagsEncoded);
    },
    destroy: function destroy() {
      // window.removeEventListener('scroll', this.updateScroll);
    },
    methods: {
      updateScroll: function updateScroll() {
        this.scrollPosition = window.scrollY;
      },
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$router.push({
          name: 'MetadataDetailPage',
          params: {
            metadataid: datasetname,
          },
        });
      },
      replaceTagsInRouter: function replaceTagsInRouter() {
        const tagsEncoded = this.encodeTagForUrl(this.selectedTagids);

        this.$router.push({
          name: 'BrowsePage',
          query: { tags: tagsEncoded },
        });
      },
      encodeTagForUrl: function encodeTagForUrl(jsonTags) {
        if (jsonTags && jsonTags.length > 0) {
          const jsonString = JSON.stringify(jsonTags);

          const urlquery = btoa(jsonString);

          let urlConformString = urlquery.replace(/\+/g, '.');
          urlConformString = urlConformString.replace(/\//g, '_');
          urlConformString = urlConformString.replace(/=/g, '-');

          return urlConformString;
        }

        return '';
      },
      decodeTagsFromUrl: function decodeTagsFromUrl(urlquery) {
        if (urlquery) {
          let jsonConformString = urlquery.replace(/\./g, '+');
          jsonConformString = jsonConformString.replace(/_/g, '/');
          jsonConformString = jsonConformString.replace(/-/g, '=');

          const jsonString = atob(jsonConformString);

          const jsonTags = JSON.parse(jsonString);

          return jsonTags;
        }

        return '';
      },
      catchTagClicked: function catchTagClicked(tagId) {
        const index = this.allTags.findIndex(obj => obj.id === tagId);
        const tag = this.allTags[index];

        if (!tag || tag.colseable) {
          return;
        }

        if (!this.isTagSelected(tagId)) {
          this.selectedTagids.push(tagId);

          this.replaceTagsInRouter();
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagids === undefined) {
          return;
        }

        const index = this.selectedTagids.indexOf(tagId);

        if (index >= 0) {
          this.selectedTagids.splice(index, 1);

          this.replaceTagsInRouter();
        }
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagids = [];
      },
      isTagSelected: function isTagSelected(tagId) {
        if (!tagId || this.selectedTagids === undefined) {
          return false;
        }

        return this.selectedTagids.indexOf(tagId) >= 0;
      },
      tagsIncludeSelected: function tagsIncludeSelected(tags) {
        for (let i = 0; i < tags.length; i++) {
          const tagId = tags[i].id;

          // let tagsMatchSelection = false;

          for (let j = 0; j < this.selectedTagids.length; j++) {
            const selectedTagId = this.selectedTagids[j];
            if (tagId === selectedTagId) {
              return true;
            }
          }
        }

        return false;
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
      filteredMetadataContent: function filteredMetadataContent() {
        if (this.selectedTagids === undefined || this.selectedTagids.length <= 0) {
          return Object.values(this.metadatasContent);
        }

        const contentList = [];

        if (this.metadatasContentSize > 0) {
          const metaDataKeys = Object.keys(this.metadatasContent);

          for (let i = 0; i < metaDataKeys.length; i++) {
            const key = metaDataKeys[i];
            const value = this.metadatasContent[key];

            if (value.tags && this.tagsIncludeSelected(value.tags)) {
              contentList.push(value);
            }
          }
        }

        // filter out selectedTagsIds
        // filter out searchTag?

        // filter search via backend because of fulltext search via solr

        return contentList;
      },
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
