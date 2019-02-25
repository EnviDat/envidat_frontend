<template>
  <v-container grid-list-xs
                fluid
                tag="article"
                pa-0
  >
                <!-- v-bind="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
                @scroll="updateScroll" -->

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
                          v-on:pointHover="catchPointHovered"
                          v-on:pointHoverLeave="catchPointHoverLeave"
                          v-on:clearButtonClicked="catchClearButtonClick"  />

      </v-flex>

    </v-layout>

  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import FilterBarView from '../Views/Filtering/FilterBarView';
  import FilterMapView from '../Views/Filtering/FilterMapView';
  import MetadataListView from '../Views/MetadataViews/MetadataListView';
  import {
    SEARCH_METADATA,
    CLEAR_SEARCH_METADATA,
    FILTER_METADATA,
    FILTER_METADATA_SUCCESS,
    PIN_METADATA,
    CLEAR_PINNED_METADATA,
  } from '../../store/metadataMutationsConsts';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
    SET_CONTROLS,
  } from '../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      // console.log('beforeRouteEnter ' + new Date());
      next((vm) => {
        // console.log('beforeRouteEnter next' + new Date());
        // console.log("browse beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_CURRENT_PAGE, 'browsePage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    // created: function created() {
      // this.loadRouteTags();

    // },
    mounted: function mounted() {
      this.checkRouteChanges();
      // console.log('created ' + new Date());

      // this.loadRouteSearch();
      // this.filterContent();
    },
    methods: {
      loadRouteTags: function loadRouteTags() {
        const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
        let decodedTags = [];

        if (tagsEncoded.length > 0) {
          decodedTags = this.decodeTagsFromUrl(tagsEncoded);
        }

        if (!this.areArrayIdentical(this.selectedTagNames, decodedTags)) {
          this.selectedTagNames = decodedTags;
          return true;
        }

        return false;
      },
      loadRouteSearch: function loadRouteSearch() {
        const search = this.$route.query.search ? this.$route.query.search : '';

        if (search === this.searchTerm) {
          return false;
        }

        this.searchTerm = search;

        if (this.searchTerm && this.searchTerm.length > 0) {
          this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);
          // don't immediately filter the content, it's trigged via the searchingMetadatasContentOK watch
          return false;
        }

        this.$store.commit(`metadata/${CLEAR_SEARCH_METADATA}`);
        return true;
      },
      areArrayIdentical: function areArrayIdentical(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;

        for (let i = arr1.length; i--;) {
          if (arr1[i] !== arr2[i]) return false;
        }

        return true;
      },
      updateScroll: function updateScroll() {
        this.scrollPosition = window.scrollY;
      },
      decodeCategoryFromUrl: function decodeCategoryFromUrl(urlquery) {
        if (urlquery) {
          // TODO: figure out which tags should be auto selected
          // console.log("got category via url: " + urlquery);
        }

        // return an empty array for the selectedTagNames
        return [];
      },
      catchTagClicked: function catchTagClicked(tagName) {
        if (!this.isTagSelected(tagName)) {
          const newTags = [...this.selectedTagNames, tagName];
          // this.selectedTagNames.push(tagName);

          const tagsEncoded = this.encodeTagForUrl(newTags);
          this.additiveChangeRoute(undefined, tagsEncoded);
          // this.filterContent();
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagNames === undefined) {
          return;
        }

        // this.selectedTagNames.splice(index, 1);
        const newTags = this.selectedTagNames.filter(tag => tag !== tagId);

        const tagsEncoded = this.encodeTagForUrl(newTags);
        this.additiveChangeRoute(undefined, tagsEncoded);
        // this.filterContent();
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagNames = [];
        this.filterContent();
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        /* eslint-disable no-param-reassign */
        searchTerm = searchTerm ? searchTerm.trim() : '';
        this.additiveChangeRoute(searchTerm, undefined);

        // if (this.searchTerm !== searchTerm) {
        //   // this.searchTerm = searchTerm;

        //   if (searchTerm && searchTerm.length > 0) {
        //     // this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);

        //     this.additiveChangeRoute(searchTerm, undefined);
        //     return true;
        //   }
        // }

        // return false;
      },
      catchSearchCleared: function catchSearchCleared() {
        // const queryLength = Object.keys(this.$route.query).length;

        // if (queryLength > 0 && this.$route.query.search) {
        this.additiveChangeRoute('', undefined);
        // }

      },
      catchMapFilterChanged: function catchMapFilterChanged(visibleIds) {
        this.mapFilterVisibleIds = visibleIds;
      },
      catchPointClicked: function catchPointClicked(id) {
        // bring to top
        // highlight entry

        this.$store.commit(`metadata/${PIN_METADATA}`, id);
      },
      catchPointHovered: function catchPointHovered(id) {
        // bring to top
        // highlight entry
        const domElement = this.metadatasContent[id];
        if (domElement) {
        }
      },
      catchPointHoverLeave: function catchPointHoverLeave(id) {
        // bring to top
        // highlight entry
      },
      catchClearButtonClick: function catchClearButtonClick() {
        this.$store.commit(`metadata/${CLEAR_PINNED_METADATA}`);
      },
      controlsChanged: function controlsChanged(controlsActive) {
        // 0-entry: listView, 1-entry: mapActive
        // console.log('controlsActive ' + controlsActive + ' ' + JSON.stringify(controlsActive));
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
        const randomIndex = this.randomInt(0, max);
        const cardImg = Object.values(this.imagesImports)[randomIndex];
        // console.log(this.imageIndex + " cardImg " + cardImg);

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
      checkRouteChanges: function checkRouteChanges() {
        const tagsChanges = this.loadRouteTags();
        const searchTriggerd = this.loadRouteSearch();
        if (tagsChanges || (!tagsChanges && searchTriggerd)) {
          this.filterContent();
        }
      },
      enhanceContent: function enhanceContent() {
        if (this.filteredContent && this.filteredContent.length > 0) {
          const enhancedContent = this.enhanceMetadata(this.filteredContent, this.cardBGImages);

          if (enhancedContent && enhancedContent.length > 0) {
            this.$store.commit(`metadata/${FILTER_METADATA_SUCCESS}`, enhancedContent);
          }
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
        currentMetadata: 'metadata/currentMetadata',
        updatingTags: 'metadata/updatingTags',
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

        // console.log('sHeight ' + sHeight + ' height ' + height + ' ' + this.maxMapFilterHeight);

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
        this.checkRouteChanges();

        window.scrollTo(0, this.scrollPosition);
        // console.log('watch $route ', this.$route.query.toString() + " to " + to.query + " from " + from.query);
      },
      metadatasContent: function watchFilterContent() {
        this.filterContent();
      },
      searchingMetadatasContentOK: function watchSearchFilterContent() {
        if (this.searchingMetadatasContentOK) {
          this.filterContent();
        }
      },
      isFilteringContent: function watchisFilteringContent() {
        if (!this.isFilteringContent) {
          this.enhanceContent();
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
      scrollPosition: 0,
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
