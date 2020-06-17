<template>
  <v-container fluid
                :class="$vuetify.breakpoint.smAndDown ? 'pa-1' : 'py-0'" >
    <v-row >
      <the-title-screen-layout :title="envidatTitle"
                                :slogan="envidatSlogan"
                                :subSlogan="envidatSubSlogan"
                                :buttonText="sloganButtonText"
                                :buttonCallback="catchBrowseClicked"
                                :moreButtonText="sloganMoreButtonText"
                                :moreButtonCallback="catchMoreClicked" />

      <v-col class="hidden-xs-only px-0 mt-5" offset-md="6" >
        <search-bar-view :labelText="labelText"
                          :buttonText="buttonText"
                          :hasButton="true"
                          @clicked="catchSearchClicked" />
      </v-col>

      <v-col class="hidden-sm-and-up px-0 mt-5" >
        <small-search-bar-view :labelText="labelText"
                          :buttonText="buttonText"
                          :hasButton="$vuetify.breakpoint.smAndUp"
                          @clicked="catchSearchClicked" />
      </v-col>

      <v-col class="mt-5 px-0" offset-md="6" >
        <v-container class="pa-0"
                      fluid >
          <v-row >

            <v-col v-for="card in categoryCards"
                    :key="card.title"
                    cols="6" >

              <base-click-card :title="card.title"
                                :img="card.img"
                                :color="card.darkColor"
                                :contain="card.contain"
                                @click="catchCategoryClicked(card.type)" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * The landing page of EnviDat is the root page ("./") first page shown
 * It consists of:
 * - TheTitleScreenLayout
 * - SearchBarView
 * - and show a list of category cards (baseClickCard)
 *
 * @summary landing page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-29 14:15:57
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import {
  LANDING_PAGENAME,
  BROWSE_PATH,
  ABOUT_PATH,
} from '@/router/routeConsts';
import BaseClickCard from '@/components/BaseElements/BaseClickCard';
import SmallSearchBarView from '@/components/Filtering/SmallSearchBarView';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import TheTitleScreenLayout from './TheTitleScreenLayout';
import SearchBarView from './SearchBarView';


// Login & Register form and animation
// https://codepen.io/yusufbkr/pen/RPBQqg

// This animation is a bit smoother
// https://codepen.io/andytran/pen/RPBdgM

// Here is one with a progress button/bar
// https://codepen.io/suez/pen/dPqxoM

export default {
  name: 'LandingPage',
  beforeRouteEnter(to, from, next) {
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
    catchCategoryClicked(cardType) {
      if (cardType.includes('login')) {
        this.catchLoginclick();
        return;
      }

      if (cardType.includes('mode')) {
        const splits = cardType.split('_');
        const modeName = splits[1];
        this.catchModeClicked(modeName);
        return;
      }

      const tagsEncoded = this.mixinMethods_encodeTagForUrl([cardType.toUpperCase()]);
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, '', tagsEncoded);
    },
    catchModeClicked(mode) {
      this.$router.push({
        path: BROWSE_PATH,
        query: { mode },
      });
    },
    catchSearchClicked(search) {
      this.$router.push({
        path: BROWSE_PATH,
        query: { search },
      });
    },
    catchBrowseClicked() {
      this.$router.push({ path: BROWSE_PATH });
    },
    catchMoreClicked() {
      this.$router.push({ path: ABOUT_PATH });
    },
    catchEnterclick: function catchEnterclick() {
      this.redirectToDashboard();
    },
    catchSingupclick() {
      this.redirectToDashboard();
    },
    catchLoginclick() {
      this.redirectToDashboard();
    },
    redirectToDashboard() {
      window.open('https://www.envidat.ch/user/reset', '_blank');
    },
  },
  components: {
    TheTitleScreenLayout,
    SearchBarView,
    SmallSearchBarView,
    BaseClickCard,
  },
  data: () => ({
    PageBGImage: './app_b_landingpage.jpg',
    MobileBGImage: './app_b_browsepage.jpg',
    labelText: "Search for research data topics ex. 'Avalanche'",
    buttonText: 'SEARCH',
    envidatTitle: 'EnviDat',
    // envidatSlogan: 'Browse a comprehensive collection of environmental data from Switzerland',
    envidatSlogan: 'Environmental Research Data at your Fingertips',
    // envidatSlogan: 'Environmental Research Data at your Fingertips. Provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
    envidatSubSlogan: 'The data is being provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
    sloganButtonText: 'EXPLORE DATA',
    sloganMoreButtonText: 'READ MORE',
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
