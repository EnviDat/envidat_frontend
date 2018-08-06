<template>
  <v-container grid-list-xs fluid py-1>

    <v-layout row wrap>

      <v-flex xs12 px-3 
              style="position: sticky; top: -1px; z-index: 2;" >

        <nav-bar-view :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagNames.sync="selectedTagNames"
                      :popularTags="popularTags"
                      :showPlaceholder="loading"
                      :showMapFilter="showMapFilter"
                      :mapFilterHeight="mapFilterHeightPx"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
                      v-on:mapFilterChanged="catchMapFilterChanged"
                      v-on:pointClicked="catchPointClicked"
                      />

      </v-flex>


      <v-flex px-3
              v-bind="metadataListStyling"
       >
        <v-layout column style="z-index: 1;">

          <v-container fluid grid-list-md pa-0
                        @scroll="updateScroll" >

            <v-layout row wrap>

              <v-flex v-if="loading"
                      v-bind="cardGridClass"
                      v-for="(n, index) in palceHolderAmount" :key="index">

                <metadata-card-placeholder :dark="false" />
      
              </v-flex>

              <v-flex v-if="!loading"
                      v-bind="cardGridClass"
                      v-for="(metadata, index) in filteredMetadataContent" :key="index">
                <metadata-card
                              :title="metadata.title"
                              :id="metadata.id"
                              :subtitle="metadata.notes"
                              :tags="metadata.tags"
                              :titleImg="metadata.titleImg"
                              :restricted="hasRestrictedResources(metadata)"
                              :resourceCount="metadata.num_resources"
                              :resources="metadata.resources"
                              :dark="false"
                              :compactLayout="showMapFilter"
                              v-on:clickedEvent="metaDataClicked"
                              v-on:clickedTag="catchTagClicked">
                </metadata-card>
      
              </v-flex>

                <v-flex xs12 >
                  <no-search-results-view v-on:clicked="catchCategoryClicked"
                                          :noResultText="noResultText"
                                          :suggestionText="suggestionText" />  
                </v-flex>


            </v-layout>
          </v-container>

        </v-layout>
      </v-flex>

      <!-- <v-flex px-3
              v-bind="{ ['xs4']: showMapFilter,
                        ['xs0']: !showMapFilter }"
       >

        <v-card height="300px">

        </v-card>
      </v-flex> -->
    </v-layout>

  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import NavBarView from '../Views/NavbarView';
  import MetadataCard from '../Views/Cards/MetadataCard';
  import MetadataCardPlaceholder from '../Views/Cards/MetadataCardPlaceholder';
  import NoSearchResultsView from '../Views/NoSearchResultsView';
  import { SEARCH_METADATA } from '../../store/metadataMutationsConsts';
  import { CHANGE_APP_BG } from '../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(CHANGE_APP_BG, vm.PageBGImage);
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
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$router.push({
          name: 'MetadataDetailPage',
          params: {
            metadataid: datasetname,
          },
        });
      },
      additiveChangeRoute: function additiveChangeRoute(search, tags) {
        const query = {};

        if (search !== undefined) {
          query.search = search;
        } else if (this.$route.query.search) {
          query.search = this.$route.query.search;
        }

        if (tags !== undefined) {
          query.tags = tags;
        } else if (this.$route.query.tags) {
          query.tags = this.$route.query.tags;
        }
        // console.log("additiveChangeRoute search: " + query.search + " tags: " + query.tags);

        this.$router.push({
          path: '/browse',
          query,
        });
      },
      decodeCategoryFromUrl: function decodeCategoryFromUrl(urlquery) {
        if (urlquery) {
          // TODO: figure out which tags should be auto selected
          console.log("got category via url: " + urlquery);
        }

        // return an empty array for the selectedTagNames
        return [];
      },
      catchTagClicked: function catchTagClicked(tagName) {
        const index = this.allTags.findIndex(obj => obj.name === tagName);
        const tag = this.allTags[index];

        if (!tag) {
          return;
        }

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
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        this.$router.push({
          path: '/browse',
          query: {
            search: cardTitle,
          },
        });
      },
      catchMapFilterChanged: function catchMapFilterChanged(visibleIds) {
        // add visibleIds contentfilter
        // retrigger filtering

        // console.log("catchMapFilterChanged " + visibleIds)
      },
      catchPointClicked: function catchPointClicked(id) {
        // bring to top
        // highlight entry
      },
      isTagSelected: function isTagSelected(tagName) {
        if (!tagName || this.selectedTagNames === undefined) {
          return false;
        }

        return this.selectedTagNames.indexOf(tagName) >= 0;
      },
      tagsIncludedInSelectedTags: function tagsIncludedInSelectedTags(tags) {
        const tagNames = [];

        for (let i = 0; i < tags.length; i++) {
          const tagName = tags[i].name;

          if (tagName) {
            tagNames.push(tagName);
          }
        }

        if (tagNames.length <= 0) {
          return false;
        }

        for (let j = 0; j < this.selectedTagNames.length; j++) {
          const selectedTagName = this.selectedTagNames[j];

          if (!tagNames.includes(selectedTagName)) {
            return false;
          }
        }

        return true;
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
      hasRestrictedResources: function hasRestrictedResources(metadata) {
        if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
          return false;
        }

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
        currentMetadata: 'metadata/currentMetadata',
        cardBGImages: 'cardBGImages',
      }),
      loading: function loading() {
        return this.loadingMetadataIds || this.searchingMetadatasContent ||
        (this.loadingMetadatasContent && this.metadatasContentSize < this.palceHolderAmount);
      },
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      searchMetadatasContentSize: function searchMetadatasContentSize() {
        return this.searchedMetadatasContent !== undefined ? Object.keys(this.searchedMetadatasContent).length : 0;
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

        if (contentToFilter) {
          contentToFilter = this.enhanceMetadata(contentToFilter, this.cardBGImages);

          if (this.selectedTagNames !== undefined
          && this.selectedTagNames.length > 0) {
            contentToFilter = this.contentFilteredByTags(contentToFilter);
          }
        }

        this.updateSearchCount(contentToFilter);

        return contentToFilter;
      },
      popularTags: function popularTags() {
        if (this.allTags) {
          return this.allTags.slice(0, this.popularTagAmount);
        }

        return [];
      },
      cardGridClass: function cardGridClass() {
        const fullSize = {
          xs12: true,
          sm6: true,
          md4: true,
          xl3: true,
        };

        const twoThridsSize = {
          xs12: true,
          sm8: true,
          md6: true,
          xl4: true,
        };

        if (this.showMapFilter) {
          return twoThridsSize;
        }

        return fullSize;
      },
      metadataListStyling: function metadataListStyling() {
        const json = {
          xs8: this.showMapFilter,
          xs12: !this.showMapFilter,
          'mt-2': !this.showMapFilter,
          style: this.showMapFilter ? `margin-top: -${this.mapFilterHeightPx}px;` : '',
        };

        return json;
      },

    },
    watch: {
      /* eslint-disable no-unused-vars */
      $route: function watchRouteChanges(to, from) {
        // react on changes of the route (browser back / forward click)

        this.loadRouteTags();
        this.loadRouteSearch();

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
      scrollPosition: null,
      showMapFilter: true,
      mapFilterHeightPx: 450,
    }),
    components: {
      NavBarView,
      NoSearchResultsView,
      MetadataCard,
      MetadataCardPlaceholder,
    },
};
</script>


<style scoped>

</style>
