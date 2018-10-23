<template>
  <v-card hover
          raised >

    <v-layout row 
              align-center >

      <v-flex xs8 sm9 pl-2>
        <v-text-field
          hide-details
          full-width  
          solo
          flat
          prepend-icon="search"
          @click:prepend="clicked"
          v-on:keyup.enter="clicked"
          v-model="searchText"
          :label="labelText">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-card-actions v-if="hasButton"
                    class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;">

      <v-btn  color="primary"
              small
              @click.native="clicked"> {{ buttonText }}</v-btn>
    </v-card-actions>
    
  </v-card>
</template>

<script>
  export default {
    props: {
      labelText: String,
      buttonText: String,
      hasButton: Boolean,
    },
    data: () => ({
      searchText: '',
    }),
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.searchText);
      },
    },
    updated: function updated() {
      if (!this.searchText) {
        this.$emit('searchEmpty');
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>