<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title>
          <h3>Metadata location</h3>
        </v-card-title>

        <v-card-text>
          
        </v-card-text>

        <!--v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="readMore()">
            <v-icon color="amber" >{{ showFullDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>        
        </v-card-actions-->
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>  

  export default {
    props: [ 
        "points", "isArea"
    ],
    mounted: function () {
    },    
    data: () => ({
    }),
    methods: {
      readMore: function (){
      },
    },
    components: {
    },
  }
</script>


