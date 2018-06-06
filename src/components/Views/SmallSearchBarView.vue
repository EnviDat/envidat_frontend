<template>
  <v-card hover raised >

    <!-- long slim search bar  -->

    <v-layout row
              align-center
              justify-space-between>

      <v-flex xs12 py-0>
        <v-text-field
          class="py-2 smallSearchBar"
          hide-details
          full-width
          single-line
          clearable
          prepend-icon="search"          
          :prepend-icon-cb="clicked"
          v-model="searchText"
          :label="labelText">
        </v-text-field>
      </v-flex>

      <v-flex sm4 lg3 xl2 
              v-if="hasButton">
        <v-btn color="primary"
                v-bind="{ [`large`]: this.$vuetify.breakpoint.mdAndUp}"
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-flex>

    </v-layout>

    <!-- small thick search bar  >

    <v-layout column hidden-sm-and-up>

      <v-flex xs12 mx-1>
        <v-text-field
          hide-details
          full-width  
          prepend-icon="search"
          :prepend-icon-cb="clicked"
          v-model="searchText"
          :label="labelText">          
        </v-text-field>
      </v-flex>

      <v-card-actions v-if="hasButton">

        <v-spacer></v-spacer>

        <v-btn  color="primary"
                large
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-card-actions>

    </v-layout-->
    
  </v-card>
</template>

<script>
  export default {
    props: {
      labelText: String,
      hasButton: Boolean,
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
    updated: function updated() {
      if (!this.searchText) {
        this.$emit('searchEmpty');
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
.smallSearchBar > label {
  top: inherit !important;
}

</style>