<template>
  <v-container fluid >  
    <v-layout column >
  
      <title-view :title="envidatTitle" :slogan="envidatSlogan"></title-view>

      <v-flex mt-5 offset-sm6>
        <search-bar-view
                      :labelText="labelText"
                      :buttonText="buttonlText"
                      :hasButton="true"
                      v-on:clicked="catchSearchClicked">
        </search-bar-view>
      </v-flex>

      <v-flex mt-5 offset-sm6>
        <data-producer-card 
                        :titleText="loginInfos.titleText"
                        :loginText="loginInfos.loginText"
                        :signupText="loginInfos.signupText"
                        :loggedIn="loginInfos.loggedIn"
                        :loggedinText="loginInfos.loggedinText"
                        v-on:enterclick="catchEnterclick"
                        v-on:singupclick="catchSingupclick"
                        v-on:loginclick="catchLoginclick">
        </data-producer-card>
      </v-flex>

      <v-flex mt-5 offset-sm6>
    
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
    
            <v-flex pr-2 py-2
              v-bind="{ [`xs${card.flex}`]: true }"
              v-for="card in cards" :key="card.title">
    
              <category-card :title="card.title"
                              :type="card.type"
                              :src="card.src"
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
  import DataProducerCard from '../Views/Cards/DataProducerCard';
  import TitleView from '../Views/TitleView';
  import SearchBarView from '../Views/SearchBarView';
  import { CHANGE_APP_BG } from '../../store/mutationsConsts';

  // Login & Register form and animation
  // https://codepen.io/yusufbkr/pen/RPBQqg

  // This animation is a bit smoother
  // https://codepen.io/andytran/pen/RPBdgM

  // Here is one with a progress button/bar
  // https://codepen.io/suez/pen/dPqxoM

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(CHANGE_APP_BG, vm.PageBGImage);
      });
    },
    methods: {
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        // sleep(500);
        // setTimeout(this.$router.push({ name: 'BrowsePage', params: { cardTitle }}), 1000);

        this.$router.push({
          path: '/browse',
          params: {
            category: cardTitle,
          },
        });
      },
      catchSearchClicked: function catchSearchClicked(search) {
        this.$router.push({
          path: '/browse',
          query: { search },
        });
      },
      catchEnterclick: function catchEnterclick(search) {
        alert(`clicked ${search}`);
        this.redirectToDashboard();
      },
      catchSingupclick: function catchSingupclick(search) {
        alert(`clicked ${search}`);
        this.redirectToDashboard();
      },
      catchLoginclick: function catchLoginclick(search) {
        alert(`clicked ${search}`);
        this.redirectToDashboard();
      },
      redirectToDashboard: function redirectToDashboard() {
        window.location.href = 'https://www.envidat.ch/user/reset';
        // this.$router.push('https://www.envidat.ch/user/reset');
      },
    },
    data: () => ({
      PageBGImage: './app_b_landingpage.jpg',
      labelText: "Type ex. 'Avalanche'",
      buttonlText: 'SEARCH',
      envidatTitle: 'EnviDat',
      envidatSlogan: 'Browse the most comprehensive collcetion of environmental data from Switzerland',
      loginInfos: {
        titleText: 'Do you create data?',
        loginText: 'LOGIN',
        signupText: 'SIGN UP',
        loggedIn: false,
        loggedinText: 'ENTER DASHBOARD',
      },
      cards: [{
        title: 'Forest',
        type: 'forest',
        flex: 6,
      },
      {
        title: 'Snow',
        type: 'snow',
        flex: 6,
      },
      {
        title: 'Landscape',
        type: 'landscape',
        flex: 6,
      },
      {
        title: 'Natural disasters',
        type: 'hazard',
        flex: 6,
      },
      {
        title: 'Biodiversity',
        type: 'diversity',
        flex: 6,
      },
      ],
    }),
    components: {
      TitleView,
      SearchBarView,
      CategoryCard,
      DataProducerCard,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  
</style>
