<template>
  
    <v-layout>

      <!-- md to xl -->
      <v-flex class="mt-md-pct"
              offset-sm6 hidden-sm-and-down>
        <div class="envidat_title display-4">{{ title }}</div>
        <div class="envidat_slogan display-1">{{ slogan }}</div>
      </v-flex>
  

      <!-- sm -->
      <v-flex class="mt-sm-pct"
              offset-sm6 hidden-xs-only hidden-md-and-up>
        <div class="envidat_title display-3">{{ title }}</div>
        <div class="envidat_slogan headline">{{ slogan }}</div>
      </v-flex>

      <!-- xs -->
      <v-flex class="mt-sm-pct"
            offset-sm6 hidden-sm-and-up>
        <div class="envidat_title display-3">{{ title }}</div>
        <div class="envidat_slogan headline">{{ slogan }}</div>
      </v-flex>
    
    </v-layout>

</template>

<script>
  export default {
    props: {
      title: String,
      slogan: String,
    },
/*
    computed: {
      title: function title() {
        return this.title;
      },
      solgan: String,
    },
*/
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .envidat_title {
    font-family: 'Karma', serif;
  }

  .envidat_slogan {
    font-family: 'Raleway', sans-serif;
  }
  
  .mt-md-pct{
    margin-top: 15%;
  }

  .mt-sm-pct{
    margin-top: 8%;
  }
  
</style>