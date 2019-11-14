<template>
  <article class="ma-0 pa-0 fill-height">

    <metadata-list ref="metadataList"
                    :listContent="filteredContent"
                    :mapFilteringPossible="mapFilteringPossible"
                    :placeHolderAmount="placeHolderAmount"
                    @clickedTag="catchTagClicked"
                    :selectedTagNames="selectedTagNames"
                    :allTags="allTags"
                    :showPlaceholder="keywordsPlaceholder"
                    @clickedExpand="catchFilterExpandClicked"
                    @clickedTagClose="catchTagCloseClicked"
                    @clickedClear="catchTagCleared"
                    :defaultListControls="controls"
                    :enabledControls="enabledControls"
                    :mapHeight="$vuetify.breakpoint.smAndDown ? 310 : undefined"
                    :useDynamicHeight="true"
                    :mapTopLayout="$vuetify.breakpoint.mdAndUp"
                    @onScroll="storeScroll" />

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
 * Last modified  : 2019-11-14 18:11:43
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import {
  BROWSE_PAGENAME,
  BROWSE_PATH,
} from '@/router/routeConsts';
import {
  SEARCH_METADATA,
  CLEAR_SEARCH_METADATA,
  FILTER_METADATA,
  LISTCONTROL_LIST_ACTIVE,
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
} from '@/store/metadataMutationsConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
  SET_BROWSE_SCROLL_POSITION,
} from '@/store/mainMutationsConsts';

import MetadataList from '@/components/Metadata/MetadataList';

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
      this.$store.dispatch(`metadata/${FILTER_METADATA}`, this.selectedTagNames);
    },
    checkRouteChanges(fromRoute) {
      if (!fromRoute) {
        if (this.detailPageBackRoute) {
          fromRoute = this.detailPageBackRoute;
        } else if (this.aboutPageBackRoute) {
          fromRoute = this.aboutPageBackRoute;
        }
      }

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
          this.setScrollPos(this.browseScrollPosition);
        }, this.scrollPositionDelay);
      } else {
        if (checkSearchTriggering) {
          if (this.searchTerm && this.searchTerm.length > 0) {
            this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);
            this.resetScrollPos();

            // prevent immediately filtering, the search results
            // will be filtered via searchingMetadatasContentOK watch
            return;
          }

          // the searchTerm was changed to empty -> clear the search results
          this.$store.commit(`metadata/${CLEAR_SEARCH_METADATA}`);
          // and manually reset the scrolling
          this.resetScrollPos();
        }

        if (tagsChanged) {
          // in case the tags have changed the scroll needs to be reset
          this.resetScrollPos();
        }

        // filter changes of the url except a change of the search term
        this.filterContent();
      }
    },
    setScrollPos(toPos) {
      if (this.$refs && this.$refs.metadataList) {
        this.$refs.metadataList.setScrollPos(toPos);
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
        this.setScrollPos(this.browseScrollPosition);
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
    MetadataList,
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    searchTerm: '',
    placeHolderAmount: 4,
    suggestionText: 'Try one of these categories',
    selectedTagNames: [],
    popularTagAmount: 10,
    showMapFilter: false,
    smallMapHeight: 250,
    largeMapHeight: 325,
    mapFilterVisibleIds: [],
    enabledControls: [
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
