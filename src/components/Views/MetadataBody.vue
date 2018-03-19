<template>
  <v-layout column align-center my-1>

    <v-flex xs12 >
      <v-card class="my-1">
        <v-card-title>Metadata Info</v-card-title>
        <v-card-text>desc</v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 >
      <v-card class="my-3">
        <p>Metadata Detail Page with id: {{ $route.params.id }}</p>
      </v-card>
    </v-flex>



  </v-layout>
</template>

<script>  

  export default {
    props: [ 
        "metadataTitle", "doi", "description"
    ],
/*    
    data: () => ({
      contactName: 'Dr. Muster Mann',
      contactEmail: 'mustermann@wsl.ch',
      doi: 'envidat.2192318293',
      citation: 'somecitation',
    }),
*/
    components: {
    },
  }
</script>


