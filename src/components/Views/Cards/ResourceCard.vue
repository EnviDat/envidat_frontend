<template>
  <v-card
  hover
  ripple
  v-on:click.native="clicked"
  color="primary"
  class="white--text">
    
    <v-container fluid grid-list-md>
      <v-layout row>
  
        <v-flex xs8>
          <div>  
            <div class="headline">{{ resourceTitle }}</div>  
            <div>version: {{ version }}</div>  
          </div>
        </v-flex>
  
        <v-flex xs4>
          <v-card-media height="25px" contain>
            <img src="@/assets/logo.png" />
          </v-card-media>
        </v-flex>
  
      </v-layout>  
    </v-container>
  
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon color="accent" @click.stop="download()">
        <v-icon>file_download</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>


<script>  

  export default {
    props: {
        id: String,
        resourceTitle: String,
        resourceLink: String,
        downloadLink: String,
        version: String,
    },        
    beforeUpdate: function () {
    },    
    data: () => ({

    }),
    methods: {
      download: function (){
        alert('clicked on download');
      },
      clicked: function (){
        this.$emit("clicked");
      },        
    },
    components: {
    },
  }
</script>

