<template>
  <v-container fluid>

    <v-layout column align-center>

        <v-container fluid grid-list-xs>
          <v-layout row wrap>

            <v-flex px-2 py-2 v-bind="{ [`xs${metadata.flex}`]: true }" v-for="metadata in metadatas" :key="metadata.title">
    
              <metadata-card v-bind:title="metadata.title" v-bind:type="metadata.type" v-on:clicked="metaDataClicked"></metadata-card>
    
            </v-flex>

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
  // import FilterView from '../Views/FilterView.vue';
  import MetadataCard from '../Views/Cards/MetadataCard.vue';
  
  export default {
    components: {
      MetadataCard,
    },
    methods: {
      metaDataClicked: function metaDataClicked(cardTitle) {
        alert(clicked + ' ' + cardTitle);
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
    
    data: () => ({
      metadatas: [
        { title: 'Wald', type: 0, restricted: 'true', favourit: 'true', dataCount: 5, flex: 6 },
        { title: 'Schnee', type: 1, restricted: 'true', favourit: 'true', dataCount: 5, flex: 6 },
        { title: 'Landschaft', type: 2, restricted: 'true', favourit: 'true', dataCount: 5, flex: 6 },
        { title: 'Naturgefahren', type: 0, restricted: 'true', favourit: 'true', dataCount: 5, flex: 6 },
        { title: 'Artenvielfalt', type: 2, restricted: 'true', favourit: 'true', dataCount: 5, flex: 6 },
      ],
    }),
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
