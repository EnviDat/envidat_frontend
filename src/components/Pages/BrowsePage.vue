<template>
  <v-container grid-list-xs
              fluid
              tag="article"
              pa-0 >
    <v-layout row wrap >

      <v-flex style="z-index: 1;"
              v-bind="{ ['mx-0']: $vuetify.breakpoint.mdAndUp,
                        ['xs8']: showMapFilter & $vuetify.breakpoint.mdAndUp,
                        ['xs6']: showMapFilter & $vuetify.breakpoint.sm,
                        ['pr-3']: showMapFilter & $vuetify.breakpoint.sm,
                        ['xs12']: !showMapFilter,
                        metadataListStyling }" >

        <metadata-list-layout :listContent="filteredContent"
                            :listView="listViewActive"
                            :showMapFilter="showMapFilter"
                            :mapFilteringPossible="mapFilteringPossible"
                            :placeHolderAmount="placeHolderAmount"
                            @clickedTag="catchTagClicked"
                            :allTags="allTags"
                            :selectedTagNames="selectedTagNames"
                            :showPlaceholder="keywordsPlaceholder"
                            @clickedExpand="catchFilterExpandClicked"
                            @clickedTagClose="catchTagCloseClicked"
                            @clickedClear="catchTagCleared"
                            :mapHeight="$vuetify.breakpoint.smAndDown ? smallMapHeight : largeMapHeight"
                            :mapWidth="mapFilterWidth"
                            :defaultListControls="controls"
                            :enabledControls="enabledControls"
                            useDynamicHeight  />
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
 * The browse page of EnviDat. It consists of metadataListLayout
 * but only all the logic for the interaction with the list.
 *
 * @summary browse page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-10-30 13:58:03
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import {
  BROWSE_PAGENAME,
  BROWSE_PATH,
} from '@/router/routeConsts';
import MetadataListLayout from '@/components/Layouts/MetadataListLayout';
import {
  SEARCH_METADATA,
  CLEAR_SEARCH_METADATA,
  FILTER_METADATA,
  SWISSFL_MODE,
  FILTER_SWISSFL,
  METADATA_NAMESPACE,
} from '@/store/metadataMutationsConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
  SET_BROWSE_SCROLL_POSITION,
} from '@/store/mainMutationsConsts';


export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, BROWSE_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  mounted() {
    const that = this;
    window.onscroll = () => {
      that.storeScroll(window.scrollY);
    };

    this.checkRouteChanges(null);
  },
  beforeDestroy() {
    // destory the scrolling hook that it won't use the scroll of another page
    window.onscroll = null;
  },
  methods: {
    loadRouteTags() {
      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
      let decodedTags = [];

      if (tagsEncoded.length > 0) {
        decodedTags = this.mixinMethods_decodeTagsFromUrl(tagsEncoded);
      }

      if (!this.mixinMethods_areArraysIdentical(this.selectedTagNames, decodedTags)) {
        this.selectedTagNames = decodedTags;
        return true;
      }

      return false;
    },
    storeScroll(scrollY) {
      this.$store.commit(SET_BROWSE_SCROLL_POSITION, scrollY);
    },
    resetScrollPosition() {
      this.storeScroll(0);
      this.mixinMethods_setScrollPosition(0);
    },
    catchTagClicked(tagName) {
      if (!this.mixinMethods_isTagSelected(tagName)) {
        const newTags = [...this.selectedTagNames, tagName];

        const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
        this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
      }
    },
    catchTagCloseClicked(tagId) {
      if (this.selectedTagNames === undefined) {
        return;
      }

      const newTags = this.selectedTagNames.filter(tag => tag !== tagId);

      const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
    },
    catchTagCleared() {
      this.selectedTagNames = [];
      this.filterContent();
    },
    catchMapFilterChanged(visibleIds) {
      this.mapFilterVisibleIds = visibleIds;
    },
    catchFilterExpandClicked() {
      this.filterExpanded = !this.filterExpanded;
    },
    toggleMapExpand() {
      this.showMapFilter = !this.showMapFilter;
    },
    contentFilterMapIds(contentList) {
      const visibleContent = [];

      for (let i = 0; i < contentList.length; i++) {
        const el = contentList[i];

        if (this.mapFilterVisibleIds.includes(el.id)) {
          visibleContent.push(el);
        }
      }

      return visibleContent;
    },
    dynamicCardBackground() {
      const max = Object.keys(this.imagesImports).length;
      const randomIndex = this.mixinMethods_randomInt(0, max);
      const cardImg = Object.values(this.imagesImports)[randomIndex];

      if (cardImg) {
        return `background-image: linear-gradient(to bottom, rgba(1,1,1,0.5), rgba(255,255,255,0)), url(${cardImg}); background-position: center, center;`;
      }

      return '';
    },
    hasRestrictedResources(metadata) {
      if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
        return false;
      }

      /* eslint-disable consistent-return  */
      metadata.resources.forEach((res) => {
        if (res.restricted !== undefined
            && (res.restricted.allowed_users !== undefined
            || (res.restricted.level !== undefined && res.restricted.level !== 'public'))) {
          return true;
        }
      });

      return false;
    },
    filterContent() {
      const mode = this.$route.query.mode ? this.$route.query.mode.toLowerCase() : null;
      this.$store.dispatch(`${METADATA_NAMESPACE}/${FILTER_METADATA}`, { selectedTagNames: this.selectedTagNames, mode });
    },
    checkRouteChanges(fromRoute) {
      if (!fromRoute) {
        if (this.detailPageBackRoute) {
          fromRoute = this.detailPageBackRoute;
        } else if (this.aboutPageBackRoute) {
          fromRoute = this.aboutPageBackRoute;
        }
      }

      // const isBackNavigation = false;
      const isBackNavigation = this.$router.options.isSameRoute(this.$route, fromRoute);
      const tagsChanged = this.loadRouteTags();
      const searchParameter = this.$route.query.search ? this.$route.query.search : '';
      const checkSearchTriggering = searchParameter !== this.searchTerm;

      if (checkSearchTriggering) {
        // use the search parameter from the url in any case
        // if it's a back navigation it has to be set that is will appear in the searchBar component
        this.searchTerm = searchParameter;
      }

      if (isBackNavigation) {
        // use a delayed scroll position setup because the list as to be loaded first
        setTimeout(() => {
          this.mixinMethods_setScrollPosition(this.browseScrollPosition);
        }, this.scrollPositionDelay);
      } else {
        if (checkSearchTriggering) {
          if (this.searchTerm && this.searchTerm.length > 0) {
            this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);
            this.resetScrollPosition();

            // prevent immediately filtering, the search results
            // will be filtered via searchingMetadatasContentOK watch
            return;
          }

          // the searchTerm was changed to empty -> clear the search results
          this.$store.commit(`metadata/${CLEAR_SEARCH_METADATA}`);
          // and manually reset the scrolling
          this.resetScrollPosition();
        }

        if (tagsChanged) {
          // in case the tags have changed the scroll needs to be reset
          this.resetScrollPosition();
        }

        // always filter changes of the url except a change of the search term
        // because due to navigation the inital filter might be needed
        this.filterContent();
      }
    },
  },
  computed: {
    ...mapGetters({
      metadatasContent: 'metadata/metadatasContent',
      searchedMetadatasContent: 'metadata/searchedMetadatasContent',
      searchingMetadatasContent: 'metadata/searchingMetadatasContent',
      searchingMetadatasContentOK: 'metadata/searchingMetadatasContentOK',
      loadingMetadataIds: 'metadata/loadingMetadataIds',
      loadingMetadatasContent: 'metadata/loadingMetadatasContent',
      filteredContent: 'metadata/filteredContent',
      isFilteringContent: 'metadata/isFilteringContent',
      // tag Object structure: { tag: tagName, count: tagCount }
      allTags: 'metadata/allTags',
      detailPageBackRoute: 'metadata/detailPageBackRoute',
      aboutPageBackRoute: 'metadata/aboutPageBackRoute',
      updatingTags: 'metadata/updatingTags',
      scrollPositionDelay: 'metadata/scrollPositionDelay',
      browseScrollPosition: 'browseScrollPosition',
      controls: 'controls',
    }),
    keywordsPlaceholder() {
      return this.searchingMetadatasContent || this.updatingTags;
    },
    metadatasContentSize() {
      return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
    },
    searchMetadatasContentSize() {
      return this.searchedMetadatasContent !== undefined ? Object.keys(this.searchedMetadatasContent).length : 0;
    },
    mapFilterHeight() {
      const sHeight = document.documentElement.clientHeight;

      let height = this.maxMapFilterHeight;

      if (sHeight < this.maxMapFilterHeight) {
        height = sHeight - 165;
      }

      return height;
    },
    mapFilterWidth() {
      const sWidth = document.documentElement.clientWidth;

      if (this.$vuetify.breakpoint.mdAndUp) {
        return sWidth * 0.31;
      }

      if (this.$vuetify.breakpoint.sm) {
        return sWidth * 0.5;
      }

      return sWidth;
    },
    metadataListStyling() {
      const json = {
        xs8: this.mapFilteringPossible && this.showMapFilter,
        xs12: this.mapFilteringPossible && !this.showMapFilter,
        'mt-2': !this.showMapFilter,
        // style: this.showMapFilter ? `margin-top: -${this.mapFilterHeight}px;` : '',
      };

      return json;
    },
    mapFilteringPossible() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    searchCount() {
      return this.filteredContent !== undefined ? this.filteredContent.length : 0;
    },
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route: function watchRouteChanges(to, from) {
      // react on changes of the route (browser back / forward click)
      this.checkRouteChanges(from);
    },
    isFilteringContent() {
      if (!this.isFilteringContent) {
        this.mixinMethods_setScrollPosition(this.browseScrollPosition);
      }
    },
    metadatasContent() {
      this.filterContent();
    },
    searchingMetadatasContentOK() {
      if (this.searchingMetadatasContentOK) {
        this.filterContent();
      }
    },
  },
  components: {
    MetadataListLayout,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    searchTerm: '',
    placeHolderAmount: 6,
    suggestionText: 'Try one of these categories',
    selectedTagNames: [],
    popularTagAmount: 10,
    showMapFilter: false,
    smallMapHeight: 250,
    largeMapHeight: 325,
    mapFilterVisibleIds: [],
    listViewActive: false,
    enabledControls: [0, 1, 2],
  }),
};
</script>


<style scoped>

  .stickyFilterBar {
    position: -webkit-sticky;
    position: sticky;
    top: 50px;
    z-index: 1000;
  }

</style>
