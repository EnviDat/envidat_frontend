<template>
  <v-toolbar app
              clipped-left
              color="white"
              height="36"
              :extended="mode && $vuetify.breakpoint.xsOnly"
              :extension-height="50">

    <template v-slot:extension
              v-if="mode && $vuetify.breakpoint.xsOnly" >
      <mode-view :mode="mode"
                  :compact="true"
                  :closeCallback="modeCloseCallback" />
    </template>

    <v-layout row
              align-center >

      <v-flex md4>

        <v-btn v-if="$vuetify.breakpoint.mdAndUp"
                icon
                @click.native="menuClick">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-flex>

      <v-flex md4 >
        <mode-view v-if="mode && $vuetify.breakpoint.smAndUp"
                    :mode="mode"
                    :closeCallback="modeCloseCallback" />
      </v-flex>

      <v-flex md4>
        <small-search-bar-view v-if="showSearch"
                                :compactLayout="$vuetify.breakpoint.smAndDown"
                                class="elevation-0"
                                :searchTerm="searchTerm"
                                :showSearchCount="showSearchCount"
                                :searchCount="searchCount"
                                isFlat
                                :fixedHeight="36"
                                :labelText="searchBarPlaceholder"
                                :loading="loading"
                                style="align-items: center;"
                                @clicked="catchSearchClicked"
                                @searchCleared="catchSearchCleared" />
      </v-flex>
    </v-layout>

    <v-progress-linear v-show="loading"
                        indeterminate
                        style="position: absolute; left: 0; bottom: -14px;"
                        height="2"
                        color="primary" />


  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  METADATA_NAMESPACE,
} from '@/store/metadataMutationsConsts';
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import SmallSearchBarView from '@/components/Filtering/SmallSearchBarView';
import ModeView from '@/components/Layouts/ModeView';

export default {
  components: {
    SmallSearchBarView,
    ModeView,
  },
  props: {
    searchTerm: String,
    allTags: Array,
    selectedTags: Array,
    showSearchCount: Boolean,
    searchCount: Number,
    showSearch: Boolean,
    loading: Boolean,
    mode: String,
    modeCloseCallback: Function,
  },
  computed: {
    ...mapGetters({
      searchPlaceholderText: `${METADATA_NAMESPACE}/searchPlaceholderText`,
      searchPlaceholderTextSmall: `${METADATA_NAMESPACE}/searchPlaceholderTextSmall`,
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
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    searchFocused: false,
    expanded: false,
    modeLogo: null,
  }),
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
