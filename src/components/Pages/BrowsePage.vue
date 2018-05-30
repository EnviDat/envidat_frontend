<template>
  <v-container fluid>

    <v-layout column align-center>

        <input v-model="searchTerm"/>
        
        <p >search: {{ searchTerm }}</p>

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
  // import FilterView from '../Views/FilterView.vue';
  import MetadataCard from '../Views/Cards/MetadataCard';
  

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    components: {
      MetadataCard,
    },
    data: () => ({
      searchTerm: '',
    }),
    mounted: function mounted() {
      this.searchTerm = this.$route.query.search ? this.$route.query.search : '';
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
    /*
    computed: {
      metadatas() {
        return this.$store.state.metadata.metadatas;
      },
    },
    */
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
