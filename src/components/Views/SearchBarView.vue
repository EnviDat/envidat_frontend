<template>
  <v-card hover raised >
    <v-container 
                v-bind="{ [`pa-2`]: this.$vuetify.breakpoint.smAndUp,
                          [`pa-1`]: this.$vuetify.breakpoint.xsOnly}"
    >

    <!-- long slim search bar  -->

    <v-layout row
              align-center
              hidden-xs-only
              justify-space-between>

      <v-flex sm8 md8 xl9>
        <v-text-field
          flat
          hide-details
          prepend-icon="search"
          :prepend-icon-cb="clicked"
          v-model="searchText"
          :label="labelText">          
        </v-text-field>
      </v-flex>

      <v-flex sm4 lg3 xl2>
        <v-btn color="primary"
                v-bind="{ [`small`]: this.$vuetify.breakpoint.smAndDown,
                          [`large`]: this.$vuetify.breakpoint.mdAndUp}"
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-flex>

    </v-layout>

    <!-- small thick search bar  -->

    <v-layout column
              hidden-sm-and-up>

      <v-flex xs12 mx-1>
        <v-text-field
          flat
          hide-details
          prepend-icon="search"
          :prepend-icon-cb="clicked"
          v-model="searchText"
          :label="labelText">          
        </v-text-field>
      </v-flex>

    <v-card-actions class="mt-2">
      <v-spacer></v-spacer>

        <v-btn color="primary"
                large
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-card-actions>

    </v-layout>
    
    </v-container>
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