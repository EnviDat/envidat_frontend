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
                    v-for="metadata in metadatasContent" :key="metadata.id">
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
      searchTags: Array,
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
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd15',
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
          display_name: 'LANDSCAPE AND STUFF',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd18',
          name: 'LANDSCAPE AND STUFF',
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
        '5d5d3a6d-1047-4c33-bee7-d1bb119bbe32',
        'ba9c8c16-f908-4173-affa-f813f7f8cd20',
        'ba9c8c16-f908-4173-affa-f813f7f8cd17',
        'ba9c8c16-f908-4173-affa-f813f7f8cd16',
        '4a3b1721-1050-434e-8573-9c36284bb53c',
        '4a3b1721-1050-434e-8573-9c36284bb51c',
      ],
      scrollPosition: null,
    }),
    mounted: function mounted() {
      // window.addEventListener('scroll', this.updateScroll);

      this.searchTerm = this.$route.query.search ? this.$route.query.search : '';
      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';

      this.searchTags = this.decodeTagsFromUrl(tagsEncoded);
      // console.log('this.$route.params ' + this.$route.params.length + ' query ' + this.$route.query.length);
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
      catchTagClicked: function catchTagClicked(tagId) {

        const index = this.allTags.findIndex(obj => obj.id === tagId);
        const tag = this.allTags[index];

        if (!tag || tag.colseable) {
          return;
        }

        if (!this.isTagSelected(tagId)) {
          this.selectedTagids.push(tagId);
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagids === undefined) {
          return;
        }

        const index = this.selectedTagids.indexOf(tagId);

        if (index >= 0) {
          this.selectedTagids.splice(index, 1);
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
