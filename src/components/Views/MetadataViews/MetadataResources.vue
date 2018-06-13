<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
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
    </v-flex>

  </v-layout>
</template>

<script>
  import ResourceCard from '../Cards/ResourceCard';

  export default {
    props: {
      id: String,
      title: String,
      doi: String,
      resources: Array,
    },
    updated: function updated(){
      console.log("resources -> " + this.id + " " + this.title);
    },
    data: () => ({
      showAllResources: false,
      // resources: [
      //   {
      //     id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     resourceTitle: 'Wald',
      //     resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     downloadLink: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
      //     version: '1',
      //   },
      //   {
      //     id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     resourceTitle: 'Wald Stadt',
      //     resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     download_link: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
      //     version: '1',
      //   },
      //   {
      //     id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     resourceTitle: 'Und Landschaft',
      //     resourceLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
      //     downloadLink: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
      //     version: '1',
      //   },
      // ],
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


