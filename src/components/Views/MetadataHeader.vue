<template>
  <v-layout column >

    <v-flex xs12 md8 offset-md2 elevation-5>

      <v-card elevation-5 class="px-4" dark color="primary">

        <!--h1 class="py-3" >{{ metadataTitle }} id: {{ $route.params.id }}</h1-->
        <div class="display-2 py-3">{{ metadataTitle }}</div>  

        <v-card-media></v-card-media>

      </v-card>
    </v-flex>

    <v-flex xs12 md8 offset-md2 elevation-5>

      <v-card class="px-4 py-2">

        <v-layout row wrap>
          <v-flex xs6>
              <v-icon>person</v-icon> {{ contactName }} 
          </v-flex>

          <v-flex xs6>
            <div class="my-1">
              <v-icon>call_received</v-icon> {{ doi }} 
            </div>
          </v-flex>

          <v-flex xs6>
            <v-icon>email</v-icon> {{ contactEmail }}
          </v-flex>

          <v-flex xs6>
            <div class="my-1">
              <v-icon>format_quote</v-icon> {{ citation }} 
            </div>          
          </v-flex>
        </v-layout>

        <v-divider class="my-2" ></v-divider>

        <v-flex>
          <v-chip v-for="tag in tags" :key="tag"
          color="primary" text-color="white"
          class="envidat_chip" >
            {{ tag.toLowerCase() }}
          </v-chip>
        </v-flex>
          
      </v-card>


    </v-flex>

  </v-layout>
</template>

<script>
  
  export default {
    props: {
      metadataTitle: String,
      contactName: String,
      contactEmail: String,
      doi: String,
      citation: String,
      tags: Array,
    },
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
  };
</script>

<style scoped>
  .envidat_chip{
    height: 1.5rem;
    font-size: 0.75rem;
  }
</style>



