<template>
  <v-container>
  
    <v-layout column>
  
      <v-flex xs12 sm8 offset-sm2>
        <h1>EnviDat</h1>
        <h2>Envidat slogan / description </h2>
      </v-flex>
  
      <v-flex xs12 sm8 offset-sm2>
  
        <v-card hover raised class="my-3 px-3">
          <v-text-field v-model="searchText" clearable prepend-icon="search" :prepend-icon-cb="searchClicked" label="Type ex. 'Snow'"></v-text-field>
  
        </v-card>
      </v-flex>
  
    </v-layout>

  
    <v-flex style="margin-top: 50%" xs12 sm8 offset-sm2>
  
      <v-container fluid grid-list-xs>
        <v-layout row wrap>
  
          <v-flex px-2 py-2 v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
  
            <category-card v-bind:title="card.title" v-bind:src="card.src" v-on:clicked="categoryClicked"></category-card>
  
          </v-flex>
        </v-layout>
      </v-container>
  
    </v-flex>
  
  </v-container>
</template>

<script>
  import CategoryCard from '../Views/Cards/CategoryCard';
  
  export default {
    components: {
      CategoryCard,
    },
    methods: {
      categoryClicked: function categoryClicked(cardTitle) {  
        // sleep(500);
        // setTimeout(this.$router.push({ name: 'BrowsePage', params: { cardTitle }}), 1000);
        this.$router.push({
          name: 'BrowsePage',
          params: {
            category: cardTitle,
          }
        });
      },
      searchClicked: function searchClicked() {

        this.$router.push({
          name: 'BrowsePage',
          query: {
            search: this.searchText,
          }
        });
      },
    },
    data: () => ({
      searchText : '',
      cards: [{
        title: 'Wald',
        src: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
        flex: 6,
        },
        {
        title: 'Schnee',
        src: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
        flex: 6,
        },
        {
        title: 'Landschaft',
        src: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
        flex: 6,
        },
        {
        title: 'Naturgefahren',
        src: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
        flex: 6,
        },
        {
        title: 'Artenvielfalt',
        src: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
        flex: 6,
        }
      ]
    })
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
