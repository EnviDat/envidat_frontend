<template>

    <v-container fluid
                  :class="{ ['grid-list-sm'] : listView,
                            ['grid-list-lg'] : !listView }"
                  pa-0
                  id="metadataListView"
    >

      <transition-group
        name="itemfade"
        class="layout"
        :class="{ ['column'] : listView,
                  ['row'] : !listView,
                  ['wrap'] : !listView }"
      >

        <v-flex v-if="showPinnedElements" 
                v-for="(pinnedId, index) in pinnedIds" :key="'pinned_' + index"
                v-bind="cardGridClass" >

        <!-- Map hovering highlighted element -->

            <metadata-card
                        class="highlighted"
                        :title="metadatasContent[pinnedId].title"
                        :id="metadatasContent[pinnedId].id"
                        :name="metadatasContent[pinnedId].name"
                        :ref="metadatasContent[pinnedId].id"
                        :subtitle="metadatasContent[pinnedId].notes"
                        :tags="metadatasContent[pinnedId].tags"
                        :titleImg="metadatasContent[pinnedId].titleImg"
                        :restricted="hasRestrictedResources(metadatasContent[pinnedId])"
                        :resourceCount="metadatasContent[pinnedId].num_resources"
                        :resources="metadatasContent[pinnedId].resources"
                        :dark="false"
                        :flatLayout="listView"
                        :fileIconString="fileIconString"
                        :lockedIconString="lockedIconString"
                        :unlockedIconString="unlockedIconString"
                        v-on:clickedEvent="metaDataClicked"
                        v-on:clickedTag="catchTagClicked"
            />

        </v-flex>

        <v-flex v-if="loading"
                v-bind="cardGridClass"
                v-for="(n, index) in placeHolderAmount" :key="'filtered_' + index">

          <metadata-card-placeholder :dark="false" />

        </v-flex>

        <v-flex v-if="!loading && !isPinned(metadata.id)"
                v-bind="cardGridClass"
                v-for="(metadata, index) in virtualListContent"
                :key="'filtered_' + index"
                >

            <metadata-card 
                        :title="metadata.title"
                        :id="metadata.id"
                        :name="metadata.name"
                        :ref="metadata.id"
                        :subtitle="metadata.notes"
                        :tags="metadata.tags"
                        :titleImg="metadata.titleImg"
                        :restricted="hasRestrictedResources(metadata)"
                        :resourceCount="metadata.num_resources"
                        :resources="metadata.resources"
                        :dark="false"
                        :flatLayout="listView"
                        :fileIconString="fileIconString"
                        :lockedIconString="lockedIconString"
                        :unlockedIconString="unlockedIconString"
                        v-on:clickedEvent="metaDataClicked"
                        v-on:clickedTag="catchTagClicked"
            />

        </v-flex>

        <v-flex xs12 mx-2 key="infiniteLoader" >
          <infinite-loading @infinite="infiniteHandler"
                            spinner="waveDots"
                            :identifier="infiniteId"
                            :distance="preloadingDistance"
                            >
            <div slot="no-results">
              <!-- for the case of a back Navigation -->
              <BaseRectangleButton v-if="vIndex > 0 && vIndex > vReloadAmount"
                                    @clicked="mixinMethods_setScrollPosition(0);"
                                    :buttonText="scrollTopButtonText"
                                    :isSmall="true"
                                    :isFlat="true"
                                    />
            </div>
            <div slot="no-more">
              <BaseRectangleButton @clicked="mixinMethods_setScrollPosition(0);"
                                    :buttonText="scrollTopButtonText"
                                    :isSmall="true"
                                    :isFlat="true"
                                    />
            </div>
          </infinite-loading>
        </v-flex>

        <v-flex xs12 mx-2 
                v-if="!loading && filteredContentSize <= 0"
                key="noSearchResultsView"
                >
            <no-search-results-view v-on:clicked="catchCategoryClicked"
                                    :noResultText="noResultText"
                                    :suggestionText="suggestionText" />  
        </v-flex>

      </transition-group>


    </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import {
    BROWSE_PATH,
    METADATADETAIL_NAME,
  } from '@/router/routeConsts';
  import MetadataCard from '@/components/Cards/MetadataCard';
  import MetadataCardPlaceholder from '@/components/Cards/MetadataCardPlaceholder';
  import NoSearchResultsView from '@/components/Filtering/NoSearchResultsView';
  import {
    SET_DETAIL_PAGE_BACK_URL,
    SET_VIRTUAL_LIST_INDEX,
  } from '@/store/metadataMutationsConsts';
  import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
  // check filtering in detail https://www.npmjs.com/package/vue2-filters

export default {
    props: {
      listView: Boolean,
      showMapFilter: Boolean,
      mapFilteringPossible: Boolean,
      placeHolderAmount: Number,
    },
    data: () => ({
      noResultText: 'Nothing found for these search criterias.',
      suggestionText: 'Change the criterias or try one of these categories',
      fileIconString: null,
      lockedIconString: null,
      unlockedIconString: null,
      virtualListContent: [],
      vLoading: false,
      infiniteId: +new Date(),
      preloadingDistance: 200,
      scrollTopButtonText: 'Scroll to the top',
    }),
    beforeMount: function beforeMount() {
      this.fileIconString = this.mixinMethods_getIcon('file');
      this.lockedIconString = this.mixinMethods_getIcon('lock2Closed');
      this.unlockedIconString = this.mixinMethods_getIcon('lock2Open');
    },
    mounted: function mounted() {
      this.infiniteHandler();
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        searchedMetadatasContent: 'metadata/searchedMetadatasContent',
        searchingMetadatasContent: 'metadata/searchingMetadatasContent',
        searchingMetadatasContentOK: 'metadata/searchingMetadatasContentOK',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        filteredContent: 'metadata/filteredContent',
        vIndex: 'metadata/vIndex',
        vReloadAmount: 'metadata/vReloadAmount',
        vReloadDelay: 'metadata/vReloadDelay',
        isFilteringContent: 'metadata/isFilteringContent',
        pinnedIds: 'metadata/pinnedIds',
      }),
      showPinnedElements: function showPinnedElements() {
        return !this.loading && this.showMapFilter && this.pinnedIds.length > 0;
      },
      loading: function loading() {
        return this.loadingMetadatasContent || this.isFilteringContent || this.searchingMetadatasContent;
      },
      filteredContentSize: function filteredContentSize() {
        return this.contentSize(this.filteredContent);
      },
      cardGridClass: function cardGridClass() {
        if (this.mapFilteringPossible && this.showMapFilter) {
          const twoThridsSize = {
            xs12: true,
            sm12: true,
            md6: true,
            lg4: true,
            xl4: true,
          };

          return twoThridsSize;
        }

        const fullSize = {
          xs12: true,
          sm6: true,
          md4: true,
          lg3: true,
          xl3: true,
        };

        return fullSize;
      },

    },
    methods: {
      infiniteHandler($state) {
        const that = this;
        that.vLoading = true;
        // console.log("loading list from " + that.vIndex + " to " + (that.vIndex + that.vReloadAmount) );

        if (that.filteredContentSize <= 0 && $state) {
          $state.complete();
          return;
        }


        // use a small timeout to show the loading?
        setTimeout(() => {
          let i = 0;

          if (that.virtualListContent.length > 0) {
            // use the current index only if the virutalList has already elements
            i = that.vIndex;
          }

          for (; (i < that.vIndex + that.vReloadAmount) && (i < that.filteredContentSize); i++) {
            that.virtualListContent.push(that.filteredContent[i]);
          }

          if ($state) {
            if (that.virtualListContent.length >= that.filteredContentSize) {
              $state.complete();
            } else {
              $state.loaded();
            }
          }

          that.$store.commit(`metadata/${SET_VIRTUAL_LIST_INDEX}`, i);

          that.vLoading = false;
          // console.log("loaded to " + that.vIndex );
        }, this.vReloadDelay);
      },
      contentSize: function contentSize(content) {
        return content !== undefined ? Object.keys(content).length : 0;
      },
      catchTagClicked: function catchTagClicked(tagName) {
        this.$emit('clickedTag', tagName);
      },
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        this.$router.push({
          path: BROWSE_PATH,
          query: {
            search: cardTitle,
          },
        });
      },
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$store.commit(`metadata/${SET_DETAIL_PAGE_BACK_URL}`, this.$route);

        this.$router.push({
          name: METADATADETAIL_NAME,
          params: {
            metadataid: datasetname,
          },
        });
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
      isPinned: function isPinned(id) {
        return this.pinnedIds.includes(id);
      },
    },
    watch: {
      filteredContentSize: function resetVirtualContent() {
        this.$store.commit(`metadata/${SET_VIRTUAL_LIST_INDEX}`, 0);
        this.virtualListContent = [];
        this.infiniteId += 1;
        this.infiniteHandler();
      },
    },
    components: {
      NoSearchResultsView,
      MetadataCard,
      MetadataCardPlaceholder,
      BaseRectangleButton,
    },

};
</script>


<style scoped>

  .itemfade-enter-active,
  .itemfade-leave-active {
    transition-duration: 0.1s;
    transition-timing-function: ease;
  }

  .itemfade-enter,
  .itemfade-leave-active {
    opacity: 0
  }  

  .highlighted {
    box-shadow: #4DB6AC 0px 0px 5px 5px;
  }

</style>
