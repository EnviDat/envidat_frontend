<template>
  <v-card >
    <v-card-title class="title metadata_title" >Further Information</v-card-title>

    <v-card-text >

    <v-form>

      <v-text-field
        v-for="val in details" :key="val.label"
        v-bind:label="val.label"
        v-bind:name="val.label"
        :value="val.text"
        :id="val.label"
        readonly
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
      details: Array,
    },
    data: () => ({ }),
    methods: {
      clicking: function clicking() {
        alert(this.props);
      },
    },
    components: {
    },
  };
  
</script>


