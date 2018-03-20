<template>
  <!-- 
  
  -->
  
  <v-card tile ripple v-on:click.native="clicked">
  
    <v-card-media :src="src" height="200px">
  
      <v-container text-xs-center fluid>
        <v-layout>
          <v-flex>
  
            <span class="headline hidden-xs-only black--text" v-text="title" />
  
            <span class="title hidden-sm-and-up black--text" v-text="title" />
  
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
  
  
  
  </v-card>
</template>


<script>
  export default {  
    props: [  
      "title", "src"  
    ],
    methods: {
      clicked: function clicked() {
        this.$emit("clicked", this.title);
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*
  
    h1,
  
    h2 {
  
      font-weight: normal;
  
    }
  
    
  
    ul {
  
      list-style-type: none;
  
      padding: 0;
  
    }
  
    
  
    li {
  
      display: inline-block;
  
      margin: 0 10px;
  
    }
  
    
  
    a {
  
      color: #42b983;
  
    }
  
    */
</style>
