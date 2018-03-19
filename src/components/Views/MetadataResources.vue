<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title>
          <h3>Data and resources</h3>
        </v-card-title>


        <v-container fluid grid-list-xs>
          <v-layout row wrap>

            <v-flex xs6 px-2 py-2 v-for="res in resources" :key="res.title">
    
              <metadata-resource-card v-bind="res" v-on:clicked="resClicked"></metadata-resource-card>
    
            </v-flex>

          </v-layout>
        </v-container>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="readMore()">
            <v-icon color="primary" >{{ showAllResources ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>        
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>  

  import MetadataResourceCard from "./Cards/MetadataResourceCard.vue";

  export default {
    props: [ 
        "id", "resourceTitle", "resourceLink", "downloadLink"
    ],
    data: () => ({
      showAllResources: false,
      resources: [
        {
          id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          resourceTitle: 'Wald',
          resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          downloadLink: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
          version: '1',
        },
        {
          id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          resourceTitle: 'Wald Stadt',
          resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          download_link: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
          version: '1',
        },
        {
          id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          resourceTitle: 'Und Landschaft',
          resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
          downloadLink: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
          version: '1',
        },
        
      ],
    }),
    methods: {
      readMore: function (){
        this.showAllResources = !this.showAllResources;
      },
      resClicked: function (){
        alert('clicked on a res');
      },
    },
    components: {
      MetadataResourceCard,
    },
  }
</script>


