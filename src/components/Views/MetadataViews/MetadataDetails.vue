<template>
  <v-card >
    <v-card-title class="title metadata_title" >Further Information</v-card-title>

    <v-card-text >

    <v-form>

      <v-text-field
        label="Metadata Title"
        v-bind:name="metadataTitle"
        :value="metadataTitle"
        :id="key"
        disabled
      ></v-text-field>


      <v-text-field
        v-for="val in $props" :key="val"
        v-bind:label="val"
        v-bind:name="val"
        :value="val"
        :id="key"
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
</template>

<script>
  /* eslint-disable no-alert */
  /* eslint-disable no-console */
  export default {
    props: {
      metadataTitle: String,
      doi: String,
      created: String,
    },
    mounted: function mounted(){
      console.log(`title of MetadataDetails ${this.metadataTitle}`);
    },
    updated: function updated() {
      console.log(`title of MetadataDetails ${this.metadataTitle}`);
    },
    beforeUpdate: function beforeUpdate() {
    },
    data: () => ({
    }),
    methods: {
      clicking: function clicking() {
        alert(this.props);
      },
    },
    components: {
    },
  };
  
</script>


