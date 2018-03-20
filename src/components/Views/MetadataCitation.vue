<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title class="title" >Citation</v-card-title>

        <v-card-text >{{ citationText }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>          
          <v-btn color="primary" v-bind:href="$props.citationXmlLink" >Get DataCite XML <v-icon right>assignment</v-icon></v-btn>
          <v-btn color="primary" v-bind:href="$props.ciationIsoXmlLink" >Download ISO 19139 XML <v-icon right>assignment</v-icon></v-btn>          
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>  

  export default {
    props: { 
        metaid: String,
        citationText: String,
        citationXmlLink: String,
        ciationIsoXmlLink: String,
    },
    mounted: function () {
    },    
    data: () => ({
    }),
    methods: {
    },
    components: {
    },
  }
</script>


