<template>
  <v-layout column xs8 align-center>

    <v-flex xs8 fill-height>

      <v-card class="xs8">
        <v-card-title>Metadata title</v-card-title>
        <v-chip v-for="i in 5" :key="i">
          dude {{ i }}
        </v-chip>
        
      </v-card>

      <v-card class="xs8">
        <v-card-title>Metadata Info</v-card-title>
        <v-card-text>desc</v-card-text>
      </v-card>

    </v-flex>

    <v-card class="my-3">
      <p>Metadata Detail Page with id: {{ $route.params.id }}</p>
    </v-card>



  </v-layout>
</template>

<script>
  
  export default {
    components: {
    }
  }
</script>


