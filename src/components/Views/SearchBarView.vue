<template>
  <v-card hover raised>
    <v-layout row align-center>

      <v-flex xs10 ml-3>
        <v-text-field 
          flat
          prepend-icon="search"
          :prepend-icon-cb="clicked"
          v-model="searchText"
          :label="labelText">
        </v-text-field>
      </v-flex>

      <v-spacer></v-spacer>

      <v-flex xs2 mr-3 >
        <v-btn color="primary"
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-flex>

    </v-layout>
  </v-card>
</template>

<script>
  export default {
    props: {
      labelText: String,
      buttonText: String,
    },
    data: () => ({
      searchText: '',
    }),
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.searchText);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>