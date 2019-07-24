<template>
  <v-layout column>
    <v-flex
      xs12
      hidden-md-and-up
    >
      <v-card raised>
        <v-layout column>
          <v-flex>
            <v-btn
              icon
              href="./"
              class="ma-0"
            >
              <img
                :src="Logo"
                alt="envidat_logo"
              >
            </v-btn>

            <div class="headline envidatLogoText envidatNavbarTitleSmall">
              {{ logoText }}
            </div>
          </v-flex>

          <v-flex>
            <base-rectangle-button
              margin-class="ma-0 envidatNavbarLinksSmall"
              :is-flat="true"
              :button-text="'Explore'"
              :tool-tip-text="'Find different research data'"
              :is-small="true"
              :url="'./browse'"
            />
          </v-flex>

          <v-flex>Guidelines</v-flex>
          <v-flex>Policies</v-flex>
          <v-flex>About</v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex
      xs12
      hidden-sm-and-down
    >
      <v-card raised>
        <v-layout
          row
          align-center
        >
          <v-flex
            xs5
            sm3
            md2
            lg2
            pl-1
          >
            <v-btn
              icon
              href="./"
              class="ma-0"
            >
              <img
                :src="Logo"
                alt="envidat_logo"
              >
            </v-btn>

            <div
              class="headline envidatLogoText"
              :class="{
                ['envidatNavbarTitleSmall']: this.$vuetify.breakpoint.xsOnly,
              }"
            >
              {{ logoText }}
            </div>
          </v-flex>

          <v-flex
            sm5
            md8
            lg8
          >
            <!-- spacer -->
          </v-flex>

          <v-flex
            xs4
            sm3
            md2
          >
            <base-rectangle-button
              margin-class="ma-0"
              :class="{ ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.smAndDown }"
              :is-flat="true"
              :button-text="loginText"
              :tool-tip-text="loginToolTip"
              :is-small="true"
              :url="loginUrl"
            />
          </v-flex>

          <v-flex
            xs3
            sm3
            md1
            lg1
          >
            <base-rectangle-button
              margin-class="ma-0"
              :class="{ ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.smAndDown }"
              :is-flat="true"
              :button-text="aboutText"
              :tool-tip-text="aboutToolTip"
              :is-small="true"
              @clicked="navigateToAboutPage"
            />
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { BROWSE_PATH, ABOUT_PATH } from '@/router/routeConsts';
import {
  SET_DETAIL_PAGE_BACK_URL,
  SET_ABOUT_PAGE_BACK_URL,
} from '@/store/metadataMutationsConsts';
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  components: {
    BaseRectangleButton,
  },
  props: {},
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    aboutText: 'About',
    aboutToolTip: 'What is the EnviDat Portal?',
    aboutUrl: './about',
    loginText: 'Creator Login',
    loginToolTip: 'Login to add and manage datasets',
    loginUrl: 'https://www.envidat.ch/user/reset',
  }),
  computed: {},
  methods: {
    navigateToAboutPage: function navigateToAboutPage() {
      if (this.$route.fullPath.includes(BROWSE_PATH)) {
        // when the about click is done on the browse page,
        // clear the detail back url to prevent the resetup of the wrong url
        this.$store.commit(`metadata/${SET_DETAIL_PAGE_BACK_URL}`, null);
      }

      this.$store.commit(`metadata/${SET_ABOUT_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        path: ABOUT_PATH,
      });
    },
  },
};
</script>

<style>
.envidatLogoText {
  display: inline;
  vertical-align: middle;
  position: relative;
  bottom: -2px;
}

.envidatNavbarLinksSmall > span > .v-btn--small {
  font-size: 10px !important;
}

.envidatNavbarTitleSmall {
  font-size: 18px !important;
}
</style>
