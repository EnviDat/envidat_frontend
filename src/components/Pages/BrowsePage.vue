<template>
  <v-container grid-list-xs fluid py-1
                v-bind="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
                @scroll="updateScroll"
  >

    <v-layout row wrap>

      <v-flex xs12 px-3 
              class="envidatNavbar" >

        <nav-bar-view :showFiltering="true"
                      :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      :allTags="allTags" 
                      :selectedTagNames.sync="selectedTagNames"
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
                      :showPlaceholder="loadingAllTags"
                      v-on:controlsChanged="controlsChanged"
                      />

      </v-flex>

      <v-flex px-3 py-2 style="z-index: 1;"
              v-bind="metadataListStyling"
       >

       <metadata-list-view :filteredMetadataContent="filteredMetadataContent"
                            :listView="listViewActive"
                            :compactLayout="showMapFilter"
                            :hoverId="hoverId"
                            :mapFilteringEnabled="mapFilteringEnabled"
                            :palceHolderAmount="palceHolderAmount"
                            v-on:clickedTag="catchTagClicked"
       />

      </v-flex>

      <v-flex xs4 py-3 pr-3
              v-if="mapFilteringEnabled && showMapFilter" >

        <filter-map-view style="position: -webkit-sticky; position: sticky; top: 151px;"
                          :totalHeight="mapFilterHeight"
                          :expanded="showMapFilter"
                          v-on:clickedMapExpand="toggleMapExpand"
                          v-on:viewChanged="catchMapFilterChanged"
                          v-on:pointClicked="catchPointClicked"
                          v-on:pointHover="catchPointHovered"
                          v-on:pointHoverLeave="catchPointHoverLeave"
                           />

      </v-flex>

    </v-layout>

  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import NavBarView from '../Views/NavbarView';
  import FilterMapView from '../Views/Filtering/FilterMapView';
  import MetadataListView from '../Views/MetadataViews/MetadataListView';
  import {
    SEARCH_METADATA,
    ENABLE_TAG,
  } from '../../store/metadataMutationsConsts';
  import { SET_APP_BACKGROUND } from '../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
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
        // console.log("loadRouteTags " + tagsEncoded);

        if (tagsEncoded.length > 0) {
          this.selectedTagNames = this.decodeTagsFromUrl(tagsEncoded);
        } else {
          const category = this.$route.params.category ? this.$route.params.category : null;
          this.selectedTagNames = this.decodeCategoryFromUrl(category);
        }
      },
      loadRouteSearch: function loadRouteSearch() {
        const search = this.$route.query.search ? this.$route.query.search : '';
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
        }
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagNames = [];
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        /* eslint-disable no-param-reassign */
        searchTerm = searchTerm ? searchTerm.trim() : '';

        if (this.searchTerm !== searchTerm) {
          this.searchTerm = searchTerm;

          if (this.searchTerm && this.searchTerm.length > 0) {
            this.isSearchResultContent = true;
            this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm);

            this.additiveChangeRoute(this.searchTerm, undefined);
          }
        }
      },
      catchSearchCleared: function catchSearchCleared() {
        this.searchTerm = '';
        this.isSearchResultContent = false;

        // const queryLength = Object.keys(this.$route.query).length;

        // if (queryLength > 0 && this.$route.query.search) {
        this.additiveChangeRoute(this.searchTerm, undefined);
        // }
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
      tagsIncludedInSelectedTags: function tagsIncludedInSelectedTags(tags) {

        let selectedTagFound = 0;

        for (let j = 0; j < this.selectedTagNames.length; j++) {
          const el = this.selectedTagNames[j];

          for (let k = 0; k < tags.length; k++) {
            const tag = tags[k];

            if (tag.name.includes(el)) {
              selectedTagFound++;
              break;
            }
          }
        }

        return selectedTagFound === this.selectedTagNames.length;

        /*
        for (let j = 0; j < this.selectedTagNames.length; j++) {
          const selectedTagName = this.selectedTagNames[j];

          if (!tagNames.includes(selectedTagName)) {
            return false;
          }
        }

        return true;
        */
      },
      contentFilterAccessibility: function contentFilterAccessibility(contentList) {
        const accessibleContent = [];

        for (let i = 0; i < contentList.length; i++) {
          const value = contentList[i];

          if (value.capacity && value.capacity === 'public') {
            // unpublished entries have 'private'
            accessibleContent.push(value);
          } else if (value.private && value.private === false) {
            accessibleContent.push(value);
          } else {
            accessibleContent.push(value);
          }
        }

        return accessibleContent;
      },
      contentFilteredByTags: function contentFilteredByTags(contentList) {
        const filteredContent = [];

        if (contentList.length > 0) {
          const metaDataKeys = Object.keys(contentList);

          for (let i = 0; i < metaDataKeys.length; i++) {
            const key = metaDataKeys[i];
            const value = contentList[key];

            if (value.tags && this.tagsIncludedInSelectedTags(value.tags)) {
              filteredContent.push(value);
            }
          }
        }

        return filteredContent;
      },
      enhanceSearchWithTags: function enhanceSearchWithTags(searchResult) {
        if (searchResult === undefined || searchResult.length <= 0 || this.allTags === undefined) {
          return undefined;
        }

        for (let i = 0; i < searchResult.length; i++) {
          const el = searchResult[i];

          for (let j = 0; j < el.tags.length; j++) {
            const element = el.tags[j];

            const index = this.allTags.findIndex(obj => obj.name === element);
            const tag = this.allTags[index];

            if (tag) {
              /* eslint-disable no-param-reassign */
              el.tags[j] = tag;
            }
          }
        }

        return searchResult;
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
      updateSearchCount: function updateSearchCount(searchResult) {
        this.searchCount = searchResult !== undefined ? searchResult.length : 0;
      },
      updateFilterViewTags: function updateFilterViewTags(filteredContent) {
        // console.log("");

        for (let i = 0; i < this.allTags.length; i++) {
          let found = false;
          const tag = this.allTags[i];

          for (let j = 0; j < filteredContent.length; j++) {
            const el = filteredContent[j];

            if (el.tags && el.tags.length > 0) {
              const index = el.tags.findIndex(obj => obj.name.includes(tag.name));

              if (index >= 0) {
                found = true;
                break;
              }
            }
          }

          this.$store.commit(`metadata/${ENABLE_TAG}`, { tagName: tag.name, enabled: found });
        }
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
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        searchedMetadatasContent: 'metadata/searchedMetadatasContent',
        searchingMetadatasContent: 'metadata/searchingMetadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        // tag Object structure: { tag: tagName, count: tagCount }
        allTags: 'metadata/allTags',
        loadingAllTags: 'metadata/loadingAllTags',
        currentMetadata: 'metadata/currentMetadata',
        cardBGImages: 'cardBGImages',
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
      filteredMetadataContent: function filteredMetadataContent() {
        let contentToFilter;

        if (this.isSearchResultContent) {
          // console.log("search content " + this.searchMetadatasContentSize);

          if (this.searchTerm && this.searchTerm.length > 0
          && this.searchMetadatasContentSize > 0) {
            contentToFilter = Object.values(this.searchedMetadatasContent);
            contentToFilter = this.enhanceSearchWithTags(contentToFilter);
            // console.log("use search content " + contentToFilter.length);
          }
        } else {
          contentToFilter = Object.values(this.metadatasContent);
          // console.log("use local content " + contentToFilter.length);
        }

        if (contentToFilter && contentToFilter.length > 0) {
          contentToFilter = this.contentFilterAccessibility(contentToFilter);

          contentToFilter = this.enhanceMetadata(contentToFilter, this.cardBGImages);

          if (this.selectedTagNames !== undefined
          && this.selectedTagNames.length > 0) {
            contentToFilter = this.contentFilteredByTags(contentToFilter);
          }
        }

        if (this.mapFilterVisibleIds.length > 0) {
          contentToFilter = this.contentFilterMapIds(contentToFilter);
        }

        this.updateFilterViewTags(contentToFilter);
        this.updateSearchCount(contentToFilter);

        return contentToFilter;
      },
      popularTags: function popularTags() {
        const popTags = [];

        if (this.allTags) {
          for (let i = 0; i < this.allTags.length; i++) {
            const tag = this.allTags[i];

            popTags.push(tag);
            /*
            const words = tag.name.split(' ').length;
            // const dashs = tag.name.split('-').length;

            if (words < 2) {
              // only use single word tags
              popTags.push(tag);
            }

            if (popTags.length >= this.popularTagAmount) {
              break;
            }
            */
          }

          // return this.allTags.slice(0, this.popularTagAmount);
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
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      searchTerm: '',
      searchLabelText: 'Search',
      searchCount: 0,
      palceHolderAmount: 6,
      isSearchResultContent: false,
      noResultText: 'Nothing found for these Search criterias',
      suggestionText: 'Try one of these categories',
      selectedTagNames: [],
      popularTagAmount: 10,
      scrollPosition: 0,
      showMapFilter: false,
      maxMapFilterHeight: 730,
      mapFilterVisibleIds: [],
      hoverId: '',
      listViewActive: false,
    }),
    components: {
      NavBarView,
      FilterMapView,
      MetadataListView,
    },
};
</script>


<style scoped>

</style>
