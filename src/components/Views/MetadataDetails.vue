<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title>
          <h3>Metadata details</h3>
        </v-card-title>

        <v-card-text >

        <v-form>


          <v-text-field
            v-for="val in $props" :key="val"
            v-bind:label="val"
            v-bind:name="val"
            value="somevalue"
            id="1"
            disabled
          ></v-text-field>
        </v-form>

        </v-card-text>

        <!--v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="readMore()">
            <v-icon color="accent" >{{ showFullDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>        
        </v-card-actions-->
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>  

  export default {
    props: {
        metadataTitle: String,
        doi: String,
        subTitle: String,
    },
    mounted: function () {
      console.log("props " + this.props);
    },
    beforeUpdate: function () {
    },    
    data: () => ({
    }),
    methods: {
      clicking: function(){
        alert(this.props);
      },
    },
    components: {
    },
  }
</script>


