<template>
  <v-card hover raised class="my-3 px-3">
    <v-text-field v-model="searchText"
    clearable
    prepend-icon="search"
    :prepend-icon-cb="clicked"
    :label="labelText">
    </v-text-field>
  </v-card>
</template>

<script>
  export default {
    props: {
      labelText: String,
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