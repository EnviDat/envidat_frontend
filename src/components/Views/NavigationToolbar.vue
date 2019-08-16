<template>
  <v-toolbar app
              color="white"
              height="36"
              :extended="expanded">
    <!-- <v-toolbar-side-icon @click.native="menuClick"></v-toolbar-side-icon> -->
    <v-btn v-if="$vuetify.breakpoint.mdAndUp"
            icon @click.native="menuClick">
      <v-icon>menu</v-icon>
    </v-btn>

    <!-- <v-toolbar-title>
      <v-btn icon href="./" class="ma-0">
        <img :src="Logo" alt="envidat_logo" />
      </v-btn>

      <div class="headline envidatLogoText envidatNavbarTitleSmall">{{ logoText }}</div>
    </v-toolbar-title>-->

    <v-spacer></v-spacer>

    <small-search-bar-view :compactLayout="$vuetify.breakpoint.smAndDown"
                            :searchTerm="searchTerm"
                            searchCount="0"
                            :labelText="searchBarPlaceholder"
                            style="align-items: center;"
                            @clicked="catchSearchClicked"
                            @searchCleared="catchSearchCleared" />

    <v-btn icon @click.native="searchClick">
      <v-icon>search</v-icon>
    </v-btn>

    <!-- <v-btn icon @click.native="loginClick">
      <v-icon>login</v-icon>
    </v-btn> -->

    <!-- <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn> -->

    <!-- <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn> -->
    <base-icon-button materialIconName="more_vert"
                      marginClass="ma-0"
                      iconColor="accent"
                      color="transparent"
                      :isToggled="expanded"
                      :rotateOnClick="true"
                      :rotateToggle="expanded"
                      @clicked="expanded = !expanded"
      >

    </base-icon-button>

    <template v-if="expanded"
              v-slot:extension>
      <div style="background-color: red; width: 100%; height: 30px;"></div>
    </template>

  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import baseIconButton from '@/components/BaseElements/BaseIconButton';
import SmallSearchBarView from '@/components/Filtering/SmallSearchBarView';

export default {
  components: {
    baseIconButton,
    SmallSearchBarView,
  },
  props: {
    searchTerm: String,
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    searchFocused: false,
    expanded: false,
  }),
  computed: {
    ...mapGetters({
      searchPlaceholderText: 'metadata/searchPlaceholderText',
      searchPlaceholderTextSmall: 'metadata/searchPlaceholderTextSmall',
    }),
    searchBarPlaceholder() {
      return this.$vuetify.breakpoint.mdAndUp ? this.searchPlaceholderText : this.searchPlaceholderTextSmall;
    },
  },
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
