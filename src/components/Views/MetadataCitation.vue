<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title class="title" >Citation</v-card-title>

        <v-card-text ><quote>{{ citationText }}</quote></v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="downloadXML()" >Download Citation XML <v-icon right>assignment</v-icon></v-btn>
          <v-btn color="primary" @click="downloadISOXML()" >Download Citation ISO XML <v-icon right>assignment</v-icon></v-btn>          
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
      downloadXML: function (){
        alert('XML download ' + citationXmlLink);
      },
      downloadISOXML: function (){
        alert('ISO XML download ' + ciationIsoXmlLink);
      },
    },
    components: {
    },
  }
</script>


