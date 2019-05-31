<template>
  <v-container grid-list-xs
                fluid
                tag="article"
                pa-0
  >
    <v-layout row wrap>

      <v-flex xs12
              :class="{ 'stickyFilterBar': $vuetify.breakpoint.smAndUp }"
              :style="$vuetify.breakpoint.sm ? 'top: 42px !important;' : ''"
      >

        <filter-bar-view :showFiltering="true"
                      :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      :allTags="allTags" 
                      :selectedTagNames="selectedTagNames"
                      :popularTags="popularTags"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
                      :showMapFilter="showMapFilter"
                      :mapFilteringPossible="mapFilteringPossible"
                      :mapFilterHeight="mapFilterHeight"
                      v-on:clickedMapExpand="toggleMapExpand"
                      v-on:mapFilterChanged="catchMapFilterChanged"
                      :showPlaceholder="keywordsPlaceholder"
                      v-on:controlsChanged="controlsChanged"
                      />

      </v-flex>

      <v-flex py-2
              style="z-index: 1;"
              v-bind="{ ['mx-0']: $vuetify.breakpoint.mdAndUp,
                        ['xs8']: showMapFilter & $vuetify.breakpoint.mdAndUp,
                        ['xs6']: showMapFilter & $vuetify.breakpoint.sm,
                        ['pr-3']: showMapFilter & $vuetify.breakpoint.sm,
                        ['xs12']: !showMapFilter,
                        metadataListStyling }"
       >

       <metadata-list-view :listView="listViewActive"
                            :showMapFilter="showMapFilter"
                            :mapFilteringPossible="mapFilteringPossible"
                            :placeHolderAmount="placeHolderAmount"
                            v-on:clickedTag="catchTagClicked"
       />

      </v-flex>

      <v-flex v-if="mapFilteringPossible && showMapFilter"
              py-3
              v-bind="{ ['pr-3']: showMapFilter & $vuetify.breakpoint.mdAndUp,
                        ['xs4']: showMapFilter & $vuetify.breakpoint.mdAndUp,
                        ['xs6']: showMapFilter & $vuetify.breakpoint.sm,
                        ['pl-2']: showMapFilter & $vuetify.breakpoint.sm,
                      }"
              style="position: fixed; top: 135px; right: 10px;"
      >

        <filter-map-view :totalHeight="mapFilterHeight"
                          :totalWidth="mapFilterWidth"
                          :expanded="showMapFilter"
                          v-on:pointClicked="catchPointClicked"
                          v-on:clearButtonClicked="catchClearButtonClick"  />

      </v-flex>

    </v-layout>

  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import { BROWSE_PATH } from '@/router/routeConsts';
  import FilterBarView from '@/components/Filtering/FilterBarView';
  import FilterMapView from '@/components/Filtering/FilterMapView';
  import MetadataListView from '@/components/Views/MetadataListView';
  import {
    SEARCH_METADATA,
    CLEAR_SEARCH_METADATA,
    FILTER_METADATA,
    PIN_METADATA,
    CLEAR_PINNED_METADATA,
  } from '@/store/metadataMutationsConsts';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
    SET_CONTROLS,
    SET_BROWSE_SCROLL_POSITION,
  } from '@/store/mutationsConsts';


  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, 'browsePage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    mounted: function mounted() {
      const that = this;
      window.onscroll = () => {
        that.storeScroll(window.scrollY);
      };

      this.checkRouteChanges(null);
    },
    beforeDestroy: function beforeDestroy() {
      // destory the scrolling hook that it won't use the scroll of another page
      window.onscroll = null;
    },
    methods: {
      loadRouteTags: function loadRouteTags() {
        const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
        let decodedTags = [];

        if (tagsEncoded.length > 0) {
          decodedTags = this.mixinMethods_decodeTagsFromUrl(tagsEncoded);
        }

        if (!this.areArrayIdentical(this.selectedTagNames, decodedTags)) {
          this.selectedTagNames = decodedTags;
          return true;
        }

        return false;
      },
      triggerSearch: function triggerSearch(search) {
        if (search === this.searchTerm) {
          return false;
        }

        this.searchTerm = search;

        if (this.searchTerm && this.searchTerm.length > 0) {
          this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);
          return true;
        }

        return false;
      },
      areArrayIdentical: function areArrayIdentical(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;

        for (let i = arr1.length; i--;) {
          if (arr1[i] !== arr2[i]) return false;
        }

        return true;
      },
      setScrollPositionOnList: function setScrollPositionOnList(pos) {
        window.scrollTo(0, pos);
      },
      storeScroll: function storeScroll(scrollY) {
        this.$store.commit(SET_BROWSE_SCROLL_POSITION, scrollY);
      },
      resetScrollPosition: function resetScrollPosition() {
        this.storeScroll(0);
        this.setScrollPositionOnList(0);
      },
      catchTagClicked: function catchTagClicked(tagName) {
        if (!this.isTagSelected(tagName)) {
          const newTags = [...this.selectedTagNames, tagName];

          const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
          this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagNames === undefined) {
          return;
        }

        const newTags = this.selectedTagNames.filter(tag => tag !== tagId);

        const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
        this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagNames = [];
        this.filterContent();
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        /* eslint-disable no-param-reassign */
        searchTerm = searchTerm ? searchTerm.trim() : '';
        this.mixinMethods_additiveChangeRoute(BROWSE_PATH, searchTerm, undefined);
      },
      catchSearchCleared: function catchSearchCleared() {
        this.mixinMethods_additiveChangeRoute(BROWSE_PATH, '', undefined);
      },
      catchMapFilterChanged: function catchMapFilterChanged(visibleIds) {
        this.mapFilterVisibleIds = visibleIds;
      },
      catchPointClicked: function catchPointClicked(id) {
        // bring to top
        // highlight entry

        this.$store.commit(`metadata/${PIN_METADATA}`, id);
      },
      catchClearButtonClick: function catchClearButtonClick() {
        this.$store.commit(`metadata/${CLEAR_PINNED_METADATA}`);
      },
      controlsChanged: function controlsChanged(controlsActive) {
        // 0-entry: listView, 1-entry: mapActive

        let listActive = false;
        let mapToggled = false;

        for (let index = 0; index < controlsActive.length; index++) {
          const el = controlsActive[index];

          if (el === 0) {
            listActive = true;
          }
          if (el === 1) {
            mapToggled = true;
          }
        }

        this.listViewActive = listActive;
        this.showMapFilter = mapToggled;

        this.$store.commit(SET_CONTROLS, controlsActive);
      },
      toggleMapExpand: function toggleMapExpand() {
        this.showMapFilter = !this.showMapFilter;
      },
      isTagSelected: function isTagSelected(tagName) {
        if (!tagName || this.selectedTagNames === undefined) {
          return false;
        }

        return this.selectedTagNames.indexOf(tagName) >= 0;
      },
      contentFilterMapIds: function contentFilterMapIds(contentList) {
        const visibleContent = [];

        for (let i = 0; i < contentList.length; i++) {
          const el = contentList[i];

          if (this.mapFilterVisibleIds.includes(el.id)) {
            visibleContent.push(el);
          }
        }

        return visibleContent;
      },
      dynamicCardBackground: function dynamicCardBackground() {
        const max = Object.keys(this.imagesImports).length;
        const randomIndex = this.mixinMethods_randomInt(0, max);
        const cardImg = Object.values(this.imagesImports)[randomIndex];

        if (cardImg) {
          return `background-image: linear-gradient(to bottom, rgba(1,1,1,0.5), rgba(255,255,255,0)), url(${cardImg}); background-position: center, center;`;
        }

        return '';
      },
      hasRestrictedResources: function hasRestrictedResources(metadata) {
        if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
          return false;
        }

        /* eslint-disable consistent-return  */
        metadata.resources.forEach((res) => {
          if (res.restricted !== undefined
            && (res.restricted.allowed_users !== undefined ||
            (res.restricted.level !== undefined && res.restricted.level !== 'public'))) {
            return true;
          }
        });

        return false;
      },
      filterContent: function filterContent() {
        this.$store.dispatch(`metadata/${FILTER_METADATA}`, this.selectedTagNames);
      },
      checkRouteChanges: function checkRouteChanges(fromRoute) {
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
            this.setScrollPositionOnList(this.browseScrollPosition);
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

          // filter changes of the url except a change of the search term
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
        pinnedIds: 'metadata/pinnedIds',
        // tag Object structure: { tag: tagName, count: tagCount }
        allTags: 'metadata/allTags',
        currentMetadataContent: 'metadata/currentMetadataContent',
        detailPageBackRoute: 'metadata/detailPageBackRoute',
        aboutPageBackRoute: 'metadata/aboutPageBackRoute',
        updatingTags: 'metadata/updatingTags',
        scrollPositionDelay: 'metadata/scrollPositionDelay',
        browseScrollPosition: 'browseScrollPosition',
        controls: 'controls',
        cardBGImages: 'cardBGImages',
      }),
      keywordsPlaceholder: function keywordsPlaceholder() {
        return this.searchingMetadatasContent || this.updatingTags;
      },
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      searchMetadatasContentSize: function searchMetadatasContentSize() {
        return this.searchedMetadatasContent !== undefined ? Object.keys(this.searchedMetadatasContent).length : 0;
      },
      mapFilterHeight: function mapFilterHeight() {
        const sHeight = document.documentElement.clientHeight;

        let height = this.maxMapFilterHeight;

        if (sHeight < this.maxMapFilterHeight) {
          height = sHeight - 165;
        }

        return height;
      },
      mapFilterWidth: function mapFilterWidth() {
        const sWidth = document.documentElement.clientWidth;

        if (this.$vuetify.breakpoint.mdAndUp) {
          return sWidth * 0.31;
        }

        if (this.$vuetify.breakpoint.sm) {
          return sWidth * 0.5;
        }

        return sWidth;
      },
      popularTags: function popularTags() {
        const popTags = [];

        if (this.allTags) {
          for (let i = 0; i < this.allTags.length; i++) {
            const tag = this.allTags[i];

            popTags.push(tag);
          }
        }

        return popTags;
      },
      metadataListStyling: function metadataListStyling() {
        const json = {
          xs8: this.mapFilteringPossible && this.showMapFilter,
          xs12: this.mapFilteringPossible && !this.showMapFilter,
          'mt-2': !this.showMapFilter,
          // style: this.showMapFilter ? `margin-top: -${this.mapFilterHeight}px;` : '',
        };

        return json;
      },
      mapFilteringPossible: function mapFilteringPossible() {
        return this.$vuetify.breakpoint.smAndUp;
      },
      searchCount: function searchCount() {
        return this.filteredContent !== undefined ? this.filteredContent.length : 0;
      },
    },
    watch: {
      /* eslint-disable no-unused-vars */
      $route: function watchRouteChanges(to, from) {
        // react on changes of the route (browser back / forward click)
        this.checkRouteChanges(from);
      },
      isFilteringContent: function watchFiltering() {
        if (!this.isFilteringContent) {
          this.setScrollPositionOnList(this.browseScrollPosition);
        }
      },
      metadatasContent: function watchFilterContent() {
        this.filterContent();
      },
      searchingMetadatasContentOK: function watchSearchFilterContent() {
        if (this.searchingMetadatasContentOK) {
          this.filterContent();
        }
      },
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      searchTerm: '',
      searchLabelText: 'Search',
      placeHolderAmount: 6,
      suggestionText: 'Try one of these categories',
      selectedTagNames: [],
      popularTagAmount: 10,
      showMapFilter: false,
      maxMapFilterHeight: 725,
      mapFilterVisibleIds: [],
      listViewActive: false,
    }),
    components: {
      FilterBarView,
      FilterMapView,
      MetadataListView,
    },
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
