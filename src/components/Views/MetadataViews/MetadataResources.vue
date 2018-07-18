<template>
  <v-card >
    
    <v-card-title class="title metadata_title" >Data and resources</v-card-title>

    <v-container fluid grid-list-xs>
      <v-layout row wrap>

        <v-flex xs6 px-2 py-2 v-for="res in resources" :key="res.id">

          <resource-card v-bind="res" v-on:clicked="resClicked(res)"></resource-card>

        </v-flex>

      </v-layout>
    </v-container>


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

  export default {
    props: {
      metadataId: String,
      metadataTitle: String,
      doi: String,
      resources: Array,
    },
    updated: function updated() {
    },
    data: () => ({
      showAllResources: false,
    }),
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
    },
  };
</script>


