<template>
  <v-container fluid>

    <v-layout column align-center>

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

            <v-flex px-2 py-2 v-bind="{ [`xs6`]: true, [`md3`]: true }" v-for="metadata in metadatasContent" :key="metadata.id">
    
              <metadata-card
                            v-bind:title="metadata.title"
                            v-bind:subtitle="metadata.notes"
                            v-bind:tags="metadata.tags"
                            v-on:clickedEvent="metaDataClicked">
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
  import { GET_METADATAS_CONTENT, SET_CURRENT_METADATA } from '../../store/mutation_consts';
  
  export default {
    components: {
      MetadataCard,
    },
    beforeMount: function beforeMount() {
      // alert('beforeMount');
    },
    mounted: function mounted() {
      // alert('mounted');
      this.getMetadataContent();
    },
    beforeUpdate: function beforeUpdate() {
      // alert(`beforeUpdate metadataIds.length ${this.metadataIds.length}`);
      /*
      if (this.metadataIds && this.metadataIds.length > 0) {
        this.$store.dispatch(`metadata/${SET_CURRENT_METADATA}`, this.metadataIds[0]);
      } else {
        // alert(`no metadata overview loaded ${this.metadataIds}`);
      }
      */
      this.getMetadataContent();
    },
    methods: {
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$store.dispatch(`metadata/${SET_CURRENT_METADATA}`, datasetname);

        this.$router.push({
          name: 'MetadataDetailPage',
          params: {
            urlId: datasetname,
          },
        });
      },
      getMetadataContent: function getMetadataContent() {
        if (!this.loadingMetadatasContent && this.metadataIds.length > 0
            && this.metadatasContentSize <= 0) {
          // call the actions which makes to CKAN-API call
          this.$store.dispatch(`metadata/${GET_METADATAS_CONTENT}`, this.metadataIds);
        }
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
