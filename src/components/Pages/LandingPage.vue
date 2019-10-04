<template>
  <v-container
    fluid
    :class="$vuetify.breakpoint.smAndDown ? 'pa-1' : 'pa-2'"
  >
    <v-layout column>
      <title-view :title="envidatTitle"
                  :slogan="envidatSlogan"
                  :sub-slogan="envidatSubSlogan"
                  :button-text="sloganButtonText"
                  :button-callback="catchBrowseClicked" />

      <v-flex mt-5 offset-md6 >
        <search-bar-view :labelText="labelText"
                          :buttonText="buttonlText"
                          :hasButton="true"
                          @clicked="catchSearchClicked"
                        />
      </v-flex>

      <v-flex mt-5 offset-md6 >
        <v-container fluid
                      grid-list-md
                      pa-0 >
          <v-layout row wrap >

            <v-flex v-for="card in categoryCards"
                    :key="card.title"
                    my-1 xs6 >
              <base-click-card :title="card.title"
                                :img="card.img"
                                :color="card.color"
                                @clicked="catchCategoryClicked" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { LANDING_PAGENAME, BROWSE_PATH } from '@/router/routeConsts';
import BaseClickCard from '@/components/BaseElements/BaseClickCard';
import TitleView from '@/components/Views/TitleView';
import SearchBarView from '@/components/Filtering/SearchBarView';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mutationsConsts';


// Login & Register form and animation
// https://codepen.io/yusufbkr/pen/RPBQqg

// This animation is a bit smoother
// https://codepen.io/andytran/pen/RPBdgM

// Here is one with a progress button/bar
// https://codepen.io/suez/pen/dPqxoM

export default {
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next((vm) => {
      // console.log("landing beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
      vm.$store.commit(SET_CURRENT_PAGE, LANDING_PAGENAME);
      const bgimg = vm.$vuetify.breakpoint.smAndDown ? vm.MobileBGImage : vm.PageBGImage;
      vm.$store.commit(SET_APP_BACKGROUND, bgimg);
    });
  },
  computed: {
    ...mapGetters({
      categoryCards: 'metadata/categoryCards',
    }),
  },
  methods: {
    catchCategoryClicked: function catchCategoryClicked(cardTitle) {
      // sleep(500);
      // setTimeout(this.$router.push({ name: 'BrowsePage', params: { cardTitle }}), 1000);

      if (cardTitle.includes('login')) {
        this.catchLoginclick();
        return;
      }

      this.$router.push({
        path: BROWSE_PATH,
        query: {
          search: cardTitle,
        },
      });
    },
    catchSearchClicked: function catchSearchClicked(search) {
      this.$router.push({
        path: BROWSE_PATH,
        query: { search },
      });
    },
    catchBrowseClicked: function catchBrowseClicked() {
      this.$router.push({
        path: BROWSE_PATH,
        // query: { '' },
      });
    },
    catchEnterclick: function catchEnterclick() {
      this.redirectToDashboard();
    },
    catchSingupclick: function catchSingupclick() {
      this.redirectToDashboard();
    },
    catchLoginclick: function catchLoginclick() {
      this.redirectToDashboard();
    },
    redirectToDashboard: function redirectToDashboard() {
      window.open('https://www.envidat.ch/user/reset', '_blank');
      // window.location.href = 'https://www.envidat.ch/user/reset';
      // this.$router.push('https://www.envidat.ch/user/reset');
    },
  },
  components: {
    TitleView,
    SearchBarView,
    BaseClickCard,
  },
  data: () => ({
    PageBGImage: './app_b_landingpage.jpg',
    // TODO: using the browsepage background for the mobile is just an initial fix
    // TODO: create images for 1024px (ipad pro), 768px (ipad) and 420px (phone) height
    MobileBGImage: './app_b_browsepage.jpg',
    labelText: "Search for research data topics ex. 'Avalanche'",
    buttonlText: 'SEARCH DATA',
    envidatTitle: 'EnviDat',
    // envidatSlogan: 'Browse a comprehensive collection of environmental data from Switzerland',
    envidatSlogan: 'Environmental Research Data<br/>at your Fingertips',
    // envidatSlogan: 'Environmental Research Data at your Fingertips. Provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
    envidatSubSlogan: 'The data is being provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
    sloganButtonText: 'EXPLORE DATA',
    loginInfos: {
      titleText: 'Do you create data?',
      loginText: 'Creator Login',
      signupText: 'SIGN UP',
      loggedIn: false,
      loggedinText: 'ENTER DASHBOARD',
    },
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
