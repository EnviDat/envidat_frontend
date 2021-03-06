<template>
  <article class="ma-0 pa-0 fill-height"
            id="BrowsePage">

    <metadata-list ref="metadataList"
                    :listContent="filteredContent"
                    :mapFilteringPossible="mapFilteringPossible"
                    :placeHolderAmount="placeHolderAmount"
                    @clickedTag="catchTagClicked"
                    :selectedTagNames="selectedTagNames"
                    :allTags="allTags"
                    @clickedExpand="catchFilterExpandClicked"
                    @clickedTagClose="catchTagCloseClicked"
                    @clickedClear="catchTagCleared"
                    :mode="mode"
                    :defaultListControls="defaultControls"
                    :enabledControls="enabledControls"
                    :useDynamicHeight="true"
                    :minMapHeight="310"
                    :mapTopLayout="$vuetify.breakpoint.lgAndUp"
                    :topFilteringLayout="$vuetify.breakpoint.mdAndDown"
                    @onScroll="storeScroll"
                    :showSearch="true"
                    :searchTerm="searchTerm"
                    :searchCount="searchCount"
                    :searchBarPlaceholder="searchBarPlaceholder"
                    @searchClick="catchSearchClicked"
                    @searchCleared="catchSearchCleared" />

  </article>
</template>

<script>
/**
 * The browse page of EnviDat. It consists of metadataList
 * but only all the logic for the interaction with the list.
 *
 * @summary browse page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2020-11-04 11:33:31
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {
  mapState,
  mapGetters,
} from 'vuex';
import {
  BROWSE_PAGENAME,
  BROWSE_PATH,
} from '@/router/routeConsts';
import {
  SEARCH_METADATA,
  CLEAR_SEARCH_METADATA,
  FILTER_METADATA,
  METADATA_NAMESPACE,
  LISTCONTROL_LIST_ACTIVE,
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
} from '@/store/metadataMutationsConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
  SET_BROWSE_SCROLL_POSITION,
} from '@/store/mainMutationsConsts';

import MetadataList from '@/components/MetadataList';

export default {
  name: 'BrowsePage',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, BROWSE_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  mounted() {
    this.checkRouteChanges(null);
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
    resetScrollPos() {
      this.storeScroll(0);
      this.setScrollPos(0);
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
    filterContent() {
      const mode = this.$route.query.mode ? this.$route.query.mode.toLowerCase() : null;
      this.$store.dispatch(`${METADATA_NAMESPACE}/${FILTER_METADATA}`, { selectedTagNames: this.selectedTagNames, mode });
    },
    checkRouteChanges(fromRoute) {
      if (!fromRoute) {
        if (this.detailPageBackRoute) {
          fromRoute = this.detailPageBackRoute;
        } else if (this.currentSearchTerm) {
          this.$store.commit(`${METADATA_NAMESPACE}/${CLEAR_SEARCH_METADATA}`);
        }
      }

      // const isBackNavigation = false;
      const isBackNavigation = this.$router.options.isSameRoute(this.$route, fromRoute);
      const tagsChanged = this.loadRouteTags();
      const searchParameter = this.$route.query.search || '';
      const checkSearchTriggering = searchParameter !== this.searchTerm;

      if (checkSearchTriggering) {
        // use the search parameter from the url in any case
        // if it's a back navigation it has to be set that is will appear in the searchBar component
        this.searchTerm = searchParameter;
      // } else if (!tagsChanged && isBackNavigation) {
      //   // when having a back navigation with no changes, make sure
      //   // no possible prefiltered state is shown. So retrigger a search check
      //   // when the filtered size is equal not to the total available content size
      //   checkSearchTriggering = this.filteredContentSize !== this.metadatasContentSize;
      }

      if (isBackNavigation) {
      // if (isBackNavigation && !checkSearchTriggering) {
        // use a delayed scroll position setup because the list as to be loaded first
        setTimeout(() => {
          this.setScrollPos(this.browseScrollPosition);
        }, this.scrollPositionDelay);
      } else {
        if (checkSearchTriggering) {
          if (this.searchTerm && this.searchTerm.length > 0) {

            this.$store.dispatch(`${METADATA_NAMESPACE}/${SEARCH_METADATA}`, {
              searchTerm: this.searchTerm,
              metadataConfig: this.metadataConfig,
            });

            this.resetScrollPos();

            // prevent immediately filtering, the search results
            // will be filtered via searchingMetadatasContentOK watch
            return;
          }

          // the searchTerm was changed to empty -> clear the search results
          this.$store.commit(`${METADATA_NAMESPACE}/${CLEAR_SEARCH_METADATA}`);
          // and manually reset the scrolling
          this.resetScrollPos();
        }

        if (tagsChanged) {
          // in case the tags have changed the scroll needs to be reset
          this.resetScrollPos();
        }

        // always filter changes of the url except a change of the search term
        // because due to navigation the inital filter might be needed
        this.filterContent();
      }
    },
    setScrollPos(toPos) {
      if (this.$refs && this.$refs.metadataList) {
        this.$refs.metadataList.setScrollPos(toPos);
      }
    },
    catchSearchClicked(search) {
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, search);
    },
    catchSearchCleared() {
      // the search parameter needs to be '' to clear it
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, '');
    },
  },
  computed: {
    ...mapState([
      'config',
    ]),
    ...mapGetters({
      metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
      metadatasContentSize: `${METADATA_NAMESPACE}/metadatasContentSize`,
      filteredContentSize: `${METADATA_NAMESPACE}/filteredContentSize`,
      searchedMetadatasContent: `${METADATA_NAMESPACE}/searchedMetadatasContent`,
      searchingMetadatasContent: `${METADATA_NAMESPACE}/searchingMetadatasContent`,
      searchingMetadatasContentOK: `${METADATA_NAMESPACE}/searchingMetadatasContentOK`,
      loadingMetadataIds: `${METADATA_NAMESPACE}/loadingMetadataIds`,
      loadingMetadatasContent: `${METADATA_NAMESPACE}/loadingMetadatasContent`,
      filteredContent: `${METADATA_NAMESPACE}/filteredContent`,
      isFilteringContent: `${METADATA_NAMESPACE}/isFilteringContent`,
      // tag Object structure: { tag: tagName, count: tagCount }
      allTags: `${METADATA_NAMESPACE}/allTags`,
      detailPageBackRoute: `${METADATA_NAMESPACE}/detailPageBackRoute`,
      updatingTags: `${METADATA_NAMESPACE}/updatingTags`,
      scrollPositionDelay: `${METADATA_NAMESPACE}/scrollPositionDelay`,
      browseScrollPosition: 'browseScrollPosition',
      defaultControls: 'defaultControls',
      searchPlaceholderText: `${METADATA_NAMESPACE}/searchPlaceholderText`,
      searchPlaceholderTextSmall: `${METADATA_NAMESPACE}/searchPlaceholderTextSmall`,
      currentSearchTerm: `${METADATA_NAMESPACE}/currentSearchTerm`,
    }),
    metadataConfig() {
      return this.config?.metadataConfig || {};
    },
    enabledControls() {
      let enableds = this.preenabledControls;

      if (this.$vuetify.breakpoint.smAndDown) {
        enableds = enableds.filter(i => i !== LISTCONTROL_COMPACT_LAYOUT_ACTIVE);
      }

      return enableds;
    },
    searchBarPlaceholder() {
      return this.$vuetify.breakpoint.mdAndUp ? this.searchPlaceholderText : this.searchPlaceholderTextSmall;
    },
    // keywordsPlaceholder() {
    //   return this.searchingMetadatasContent || this.updatingTags;
    // },
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
      return this.filteredContent !== undefined ? Object.keys(this.filteredContent).length : 0;
    },
    mode() {
      return this.$route.query.mode ? this.$route.query.mode.toLowerCase() : null;
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
        this.setScrollPos(this.browseScrollPosition);
      }
    },
    metadatasContent() {
      this.filterContent();
    },
    searchedMetadatasContent() {
      if (!this.searchingMetadatasContent && this.searchingMetadatasContentOK) {
        this.filterContent();
      }
    },
  },
  components: {
    MetadataList,
  },
  data: () => ({
    PageBGImage: 'app_b_browsepage',
    searchTerm: '',
    placeHolderAmount: 4,
    suggestionText: 'Try one of these categories',
    selectedTagNames: [],
    popularTagAmount: 10,
    showMapFilter: false,
    smallMapHeight: 250,
    largeMapHeight: 325,
    mapFilterVisibleIds: [],
    preenabledControls: [
      LISTCONTROL_LIST_ACTIVE,
      LISTCONTROL_MAP_ACTIVE,
      LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
    ],
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
