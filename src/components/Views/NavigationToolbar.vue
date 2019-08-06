<template>
  <v-toolbar color="white" height="36">
    <v-toolbar-side-icon @click.native="menuClick"></v-toolbar-side-icon>

    <!-- <v-toolbar-title>
      <v-btn icon href="./" class="ma-0">
        <img :src="Logo" alt="envidat_logo" />
      </v-btn>

      <div class="headline envidatLogoText envidatNavbarTitleSmall">{{ logoText }}</div>
    </v-toolbar-title>-->

    <v-spacer></v-spacer>

    <v-text-field></v-text-field>

    <v-btn icon @click.native="searchClick">
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon @click.native="loginClick">
      <v-icon>login</v-icon>
    </v-btn>

    <!-- <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>-->
  </v-toolbar>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';

export default {
  components: {},
  props: {},
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    searchFocused: false,
  }),
  computed: {},
  methods: {
    menuClick() {
      this.$emit('menuClick');
    },
    searchClick() {
      this.$emit('searchClick');
    },
    loginClick() {
      this.$emit('loginClick');
    },
    // navigateToAboutPage: function navigateToAboutPage() {
    //   if (this.$route.fullPath.includes(BROWSE_PATH)) {
    //     // when the about click is done on the browse page,
    //     // clear the detail back url to prevent the resetup of the wrong url
    //     this.$store.commit(`metadata/${SET_DETAIL_PAGE_BACK_URL}`, null);
    //   }
    //   this.$store.commit(`metadata/${SET_ABOUT_PAGE_BACK_URL}`, this.$route);
    //   this.$router.push({
    //     path: ABOUT_PATH,
    //   });
    // },
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
