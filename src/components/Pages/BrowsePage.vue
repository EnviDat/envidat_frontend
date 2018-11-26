<template>
  <v-container grid-list-xs fluid pa-0
  >
                <!-- v-bind="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
                @scroll="updateScroll" -->

    <v-layout row wrap>

      <v-flex xs12
              :class="{ 'stickyFilterBar': this.$vuetify.breakpoint.smAndUp }"
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
                      :mapFilteringEnabled="mapFilteringEnabled"
                      :mapFilterHeight="mapFilterHeight"
                      v-on:clickedMapExpand="toggleMapExpand"
                      v-on:mapFilterChanged="catchMapFilterChanged"
                      v-on:pointClicked="catchPointClicked"
                      :showPlaceholder="updatingTags"
                      v-on:controlsChanged="controlsChanged"
                      />

      </v-flex>

      <v-flex py-2
              style="z-index: 1;"
              v-bind="{ [`mx-1`]: this.$vuetify.breakpoint.smAndDown,
                        [`mx-0`]: this.$vuetify.breakpoint.mdAndUp,
                        metadataListStyling }"
       >

       <metadata-list-view :listView="listViewActive"
                            :compactLayout="showMapFilter"
                            :hoverId="hoverId"
                            :mapFilteringEnabled="mapFilteringEnabled"
                            :placeHolderAmount="placeHolderAmount"
                            v-on:clickedTag="catchTagClicked"
       />

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
  } from '../../store/metadataMutationsConsts';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("browse beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_CURRENT_PAGE, 'browsePage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    mounted: function mounted() {
      // handle initial loading of this Page

      // window.addEventListener('scroll', this.updateScroll);

      this.loadRouteTags();
      this.loadRouteSearch();
    },
    destroy: function destroy() {
      // window.removeEventListener('scroll', this.updateScroll);
    },
    methods: {
      loadRouteTags: function loadRouteTags() {
        const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
        let decodedTags = [];

        if (tagsEncoded.length > 0) {
          decodedTags = this.decodeTagsFromUrl(tagsEncoded);
        }

        if (this.selectedTagNames !== decodedTags) {
          // console.log("loadRouteTags " + this.selectedTagNames + " " + decodedTags);
          this.selectedTagNames = decodedTags;
        }
      },
      loadRouteSearch: function loadRouteSearch() {
        const search = this.$route.query.search ? this.$route.query.search : '';

        if (this.searchTerm === search) {
          return;
        }

        // console.log("loadRouteSearch " + search);

        if (search.length > 0) {
          this.catchSearchClicked(search);
        } else {
          this.catchSearchCleared();
        }
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
          this.selectedTagNames.push(tagName);

          const tagsEncoded = this.encodeTagForUrl(this.selectedTagNames);
          this.additiveChangeRoute(undefined, tagsEncoded);
          this.filterContent();
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagNames === undefined) {
          return;
        }

        const index = this.selectedTagNames.indexOf(tagId);

        if (index >= 0) {
          this.selectedTagNames.splice(index, 1);

          const tagsEncoded = this.encodeTagForUrl(this.selectedTagNames);
          this.additiveChangeRoute(undefined, tagsEncoded);
          this.filterContent();
        }
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagNames = [];
        this.filterContent();
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        /* eslint-disable no-param-reassign */
        searchTerm = searchTerm ? searchTerm.trim() : '';

        if (this.searchTerm !== searchTerm) {
          this.searchTerm = searchTerm;

          if (this.searchTerm && this.searchTerm.length > 0) {
            this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm, this.selectedTagNames);

            this.additiveChangeRoute(this.searchTerm, undefined);
          }

          // this.filterContent();
        }
      },
      catchSearchCleared: function catchSearchCleared() {
        this.searchTerm = '';

        // const queryLength = Object.keys(this.$route.query).length;

        // if (queryLength > 0 && this.$route.query.search) {
        this.additiveChangeRoute(this.searchTerm, undefined);
        // }

        this.$store.commit(`metadata/${CLEAR_SEARCH_METADATA}`);
      },
      catchMapFilterChanged: function catchMapFilterChanged(visibleIds) {
        this.mapFilterVisibleIds = visibleIds;
      },
      catchPointClicked: function catchPointClicked(id) {
        // bring to top
        // highlight entry
      },
      catchPointHovered: function catchPointHovered(id) {
        // bring to top
        // highlight entry
        const domElement = this.$refs[id];
        if (domElement && domElement.length > 0) {
          this.hoverId = id;
        }
      },
      catchPointHoverLeave: function catchPointHoverLeave(id) {
        // bring to top
        // highlight entry
        this.hoverId = '';
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
        // tag Object structure: { tag: tagName, count: tagCount }
        allTags: 'metadata/allTags',
        currentMetadata: 'metadata/currentMetadata',
        updatingTags: 'metadata/updatingTags',
      }),
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
          height = sHeight - 110;
        }

        return height;
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
          xs8: this.mapFilteringEnabled && this.showMapFilter,
          xs12: this.mapFilteringEnabled && !this.showMapFilter,
          'mt-2': !this.showMapFilter,
          // style: this.showMapFilter ? `margin-top: -${this.mapFilterHeight}px;` : '',
        };

        return json;
      },
      mapFilteringEnabled: function mapFilteringEnabled() {
        return this.$vuetify.breakpoint.lgAndUp;
      },
      searchCount: function searchCount() {
        return this.filteredContent !== undefined ? this.filteredContent.length : 0;
      },
    },
    watch: {
      /* eslint-disable no-unused-vars */
      $route: function watchRouteChanges(to, from) {
        // react on changes of the route (browser back / forward click)

        this.loadRouteTags();
        this.loadRouteSearch();

        window.scrollTo(0, this.scrollPosition);
        // console.log('watch $route ', this.$route.query.toString() + " to " + to.query + " from " + from.query);
      },
      metadatasContent: function watchFilterContent() {
        this.filterContent();
      },
      searchingMetadatasContentOK: function watchSearchFilterContent() {
        this.filterContent();
      },
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      searchTerm: '',
      searchLabelText: 'Search',
      placeHolderAmount: 6,
      noResultText: 'Nothing found for these Search criterias',
      suggestionText: 'Try one of these categories',
      selectedTagNames: [],
      popularTagAmount: 10,
      scrollPosition: 0,
      showMapFilter: false,
      maxMapFilterHeight: 750,
      mapFilterVisibleIds: [],
      hoverId: '',
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
