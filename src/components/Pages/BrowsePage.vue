<template>
  <v-container fluid>

    <v-layout column align-center>

        <p v-if="metadataOverview" >metadataOverview length: {{ metadataOverview.length }}</p>

        <p v-if="metadatas" >metadatas length: {{ metadatas.length }}</p>

        <metadata-card v-bind:title="currentMetadata.name" v-on:clickedEvent="metaDataClicked"></metadata-card>
        
        <p v-if="currentMetadata" >currentMetadata name: {{ currentMetadata.name }}</p>
        <p v-else>currentMetadata length: 0</p>

        <v-container fluid grid-list-xs>
          <v-layout row wrap>

            <v-flex v-if="metadatas" px-2 py-2 v-bind="{ [`xs3`]: true }" v-for="metadata in metadatas" :key="metadata.id">
    
              <metadata-card v-bind:title="metadata.title" v-on:clickedEvent="metaDataClicked"></metadata-card>
    
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
  import { LOAD_METADATAS, GET_METADATA_BY_ID } from '../../store/mutations';
  
  export default {
    components: {
      MetadataCard,
    },
    mounted: function mounted() {
      this.$store.dispatch(`metadata/${LOAD_METADATAS}`, this.metadataOverview);
    },
    beforeUpdate: function beforeUpdate() {
      // alert('beforeUpdate');
    },
    updated: function updated() {
      // alert(`updated currentMetadata ${this.currentMetadata}`);

      if (this.metadataOverview && this.metadataOverview.length > 0) {
        this.$store.dispatch(`metadata/${GET_METADATA_BY_ID}`, this.metadataOverview[0]);
      } else {
        alert(`no metadata overview loaded ${this.metadataOverview}`);
      }
    },
    methods: {
      metaDataClicked: function metaDataClicked(cardTitle) {
        alert(`Hello, ${cardTitle}`);
        /*
        this.$router.push({
          name: 'BrowsePage',
          params: {
            category: cardTitle,
          }
        });
        */
      },
    },
    computed: mapGetters({
      allOk: 'metadata/allOk',
      metadataOverview: 'metadata/metadataOverview',
      metadatas: 'metadata/metadatas',
      currentMetadata: 'metadata/currentMetadata',
    }),
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
  /*
      h1,
      h2 {
        font-weight: normal;
      }
      
      ul {
        list-style-type: none;
        padding: 0;
      }
      
      li {
        display: inline-block;
        margin: 0 10px;
      }
      
      a {
        color: #42b983;
      }
      */
</style>
