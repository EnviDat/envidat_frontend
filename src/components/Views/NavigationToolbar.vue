<template>
  <v-toolbar app
              clipped-left
              color="white"
              height="36"
              :extended="expanded"
              :extension-height="80">

    <v-btn v-if="$vuetify.breakpoint.mdAndUp"
            icon @click.native="menuClick">
      <v-icon>menu</v-icon>
    </v-btn>


    <v-spacer></v-spacer>

    <small-search-bar-view :compactLayout="$vuetify.breakpoint.smAndDown"
                            class="elevation-0 flex xs12 sm6"
                            :searchTerm="searchTerm"
                            :showSearchCount="showSearchCount"
                            :searchCount="searchCount"
                            isFlat
                            :fixedHeight="36"
                            :labelText="searchBarPlaceholder"
                            style="align-items: center;"
                            @clicked="catchSearchClicked"
                            @searchCleared="catchSearchCleared" />


  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import SmallSearchBarView from '@/components/Filtering/SmallSearchBarView';

export default {
  components: {
    SmallSearchBarView,
  },
  props: {
    searchTerm: String,
    allTags: Array,
    selectedTags: Array,
    showSearchCount: Boolean,
    searchCount: Number,
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
    filterIconColor() {
      return !this.selectedTags || this.selectedTags.length <= 0 ? 'grey' : 'primary';
    },
  },
  methods: {
    menuClick() {
      this.$emit('menuClick');
    },
    catchSearchClicked(search) {
      this.$emit('searchClick', search);
    },
    catchSearchCleared() {
      this.$emit('searchCleared');
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
