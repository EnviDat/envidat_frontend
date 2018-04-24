<template>
  <v-card hover raised class="my-3 px-3">
    <v-text-field v-model="searchText" clearable prepend-icon="search" :prepend-icon-cb="searchClicked" :label="labelText">
    </v-text-field>
  </v-card>
</template>

<script>
  export default {
    props: {
      searchText: String,
      labelText: String,
    },
    methods: {
      searchClicked: function searchClicked() {
        this.$emit('searchClicked');
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>