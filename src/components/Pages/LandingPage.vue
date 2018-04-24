<template>
  <v-container >  
    <v-layout column >
  
      <title-view :title="envidatTitle" :slogan="envidatSlogan"></title-view>

      <v-flex mt-5 offset-sm6>
        <search-bar-view :labelText="labelText"
                      :buttonText="buttonlText"
                      v-on:clicked="catchSearchClicked">
        </search-bar-view>
      </v-flex>

      <v-flex mt-5 offset-sm6>
    
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
    
            <v-flex px-2 py-2 v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
    
              <category-card v-bind:title="card.title"
                              v-bind:src="card.src"
                              v-on:clicked="catchCategoryClicked">
              </category-card>
    
            </v-flex>
          </v-layout>
        </v-container>
    
      </v-flex>

    </v-layout>  
  </v-container>
</template>

<script>
  import CategoryCard from '../Views/Cards/CategoryCard';
  import TitleView from '../Views/TitleView';
  import SearchBarView from '../Views/SearchBarView';

  // Login & Register form and animation
  // https://codepen.io/yusufbkr/pen/RPBQqg

  // This animation is a bit smoother
  // https://codepen.io/andytran/pen/RPBdgM

  // Here is one with a progress button/bar
  // https://codepen.io/suez/pen/dPqxoM

  export default {
    components: {
      TitleView,
      SearchBarView,
      CategoryCard,
    },
    methods: {
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        // sleep(500);
        // setTimeout(this.$router.push({ name: 'BrowsePage', params: { cardTitle }}), 1000);
        this.$router.push({
          name: 'BrowsePage',
          params: {
            category: cardTitle,
            search: 'none',
          },
        });
      },
      catchSearchClicked: function catchSearchClicked(search) {
        this.$router.push({
          name: 'BrowsePage',
          params: {
            category: 'none',
            search,
          },
        });
      },
    },
    data: () => ({
      labelText: "Type ex. 'Snow'",
      buttonlText: 'SEARCH',
      envidatTitle: 'EnviDat',
      envidatSlogan: 'Browse the most comprehensive environmental data collection of Switzerland',
      // envidatSlogan: 'Browse the most comprehensive</br>environmental data collection</br>of Switzerland',
      cards: [{
        title: 'Wald',
        src: 'https://i1.wp.com/www.phoenixfuels.ph/wp-content/uploads/2018/01/Placeholder.png?resize=300%2C300',
        flex: 6,
      },
      {
        title: 'Schnee',
        src: 'https://i1.wp.com/www.phoenixfuels.ph/wp-content/uploads/2018/01/Placeholder.png?resize=300%2C300',
        flex: 6,
      },
      {
        title: 'Landschaft',
        src: 'https://i1.wp.com/www.phoenixfuels.ph/wp-content/uploads/2018/01/Placeholder.png?resize=300%2C300',
        flex: 6,
      },
      {
        title: 'Naturgefahren',
        src: 'https://i1.wp.com/www.phoenixfuels.ph/wp-content/uploads/2018/01/Placeholder.png?resize=300%2C300',
        flex: 6,
      },
      {
        title: 'Artenvielfalt',
        src: 'https://i1.wp.com/www.phoenixfuels.ph/wp-content/uploads/2018/01/Placeholder.png?resize=300%2C300',
        flex: 6,
      },
      ],
    }),
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/* overrite the applications background https://css-tricks.com/use-cases-fixed-backgrounds-css/ */
  .application {
    background-image: url('../../assets/landingpage/landing_lowres.jpg') !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
  }
  
</style>
