<template>
<div>
  <v-container id="metadataListLayoutFiltering"
                fluid
                pa-0 pb-2
                grid-list-lg>

    <v-layout row wrap >

      <v-flex xs12 sm9
              key="filterKeywords" >

        <filter-keywords-view :compactLayout="$vuetify.breakpoint.smAndDown"
                              :allTags="allTags"
                              :selectedTagNames="selectedTagNames"
                              :showPlaceholder="loading"
                              @clickedTag="catchTagClicked"
                              @clickedTagClose="catchTagCloseClicked"
                              @clickedClear="catchTagCleared" />
      </v-flex>

      <v-flex xs12 sm3
              key="controlPanel" >
        <control-panel-view class="fill-height"
                            :controls="controlsActive"
                            :compactLayout="$vuetify.breakpoint.smAndDown"
                            :label="controlsLabel"
                            :flat="$route.name !== BROWSE_PAGENAME"
                            @controlsChanged="controlsChanged" />
      </v-flex>


      <v-flex v-if="showMapFilter"
              xs12
              key="filterMap" >
                  <!--
                    style="position: fixed; top: 135px; right: 10px;" 
                    ['pr-3']: showMapFilter & $vuetify.breakpoint.mdAndUp,
                  ['pl-2']: showMapFilter & $vuetify.breakpoint.sm, -->
        <filter-map-view :content="mergePinnedAndFiltered"
                          :totalHeight="mapHeight"
                          :totalWidth="mapWidth"
                          :pinnedIds="pinnedIds"
                          @pointClicked="catchPointClicked"
                          @clearButtonClicked="catchClearButtonClick" />

      </v-flex>
    </v-layout>
  </v-container>

  <v-container id="metadataListLayout"
                fluid
                :class="{ ['grid-list-sm'] : listView,
                          ['grid-list-lg'] : !listView }"
                pa-0 >

    <transition-group name="itemfade"
                      class="layout"
                      :class="{ ['column'] : listView,
                                ['row'] : !listView,
                                ['wrap'] : !listView }" >


      <v-flex v-for="(pinnedId, index) in pinnedIds"
              v-if="showPinnedElements"
              :key="'pinned_' + index"
              v-bind="cardGridClass" >
        <!-- Map hovering highlighted element -->

        <metadata-card :id="metadatasContent[pinnedId].id"
                        :ref="metadatasContent[pinnedId].id"
                        class="highlighted"
                        :title="metadatasContent[pinnedId].title"
                        :name="metadatasContent[pinnedId].name"
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
                        @clickedEvent="metaDataClicked"
                        @clickedTag="catchTagClicked" />
      </v-flex>

      <v-flex v-for="(n, index) in placeHolderAmount"
              v-if="loading"
              :key="'filtered_' + index"
              v-bind="cardGridClass" >

        <metadata-card-placeholder :dark="false" />
      </v-flex>

      <v-flex v-for="(metadata, index) in virtualListContent"
              v-if="!loading && !isPinned(metadata.id)"
              :key="'filtered_' + index"
              v-bind="cardGridClass" >

        <metadata-card :id="metadata.id"
                      :ref="metadata.id"
                      :title="metadata.title"
                      :name="metadata.name"
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
                      @clickedEvent="metaDataClicked"
                      @clickedTag="catchTagClicked" />
      </v-flex>

      <v-flex key="infiniteLoader"
              xs12 mx-2>
        <infinite-loading spinner="waveDots"
                          :identifier="infiniteId"
                          :distance="preloadingDistance"
                          @infinite="infiniteHandler" >
          <div slot="no-results">
            <!-- for the case of a back Navigation -->
            <BaseRectangleButton v-if="vIndex > 0 && vIndex > vReloadAmount"
                                  :buttonText="scrollTopButtonText"
                                  :isSmall="true"
                                  :isFlat="true"
                                  @clicked="mixinMethods_setScrollPosition(0);"
                                  />
          </div>
          <div slot="no-more">
            <BaseRectangleButton :buttonText="scrollTopButtonText"
                                :isSmall="true"
                                :isFlat="true"
                                @clicked="mixinMethods_setScrollPosition(0);"
                                />
          </div>
        </infinite-loading>
      </v-flex>

      <v-flex v-if="!loading && contentSize <= 0"
              key="noSearchResultsView"
              xs12 mx-2 >
        <no-search-results-view :no-result-text="noResultText"
                                :suggestion-text="suggestionText"
                                @clicked="catchCategoryClicked"
                                />
      </v-flex>

    </transition-group>
  </v-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { BROWSE_PATH, BROWSE_PAGENAME, METADATADETAIL_PAGENAME } from '@/router/routeConsts';
import FilterKeywordsView from '@/components/Filtering/FilterKeywordsView';
import FilterMapView from '@/components/Filtering/FilterMapView';
import ControlPanelView from '@/components/Filtering/ControlPanelView';
import MetadataCard from '@/components/Cards/MetadataCard';
import MetadataCardPlaceholder from '@/components/Cards/MetadataCardPlaceholder';
import NoSearchResultsView from '@/components/Filtering/NoSearchResultsView';
import {
  SET_DETAIL_PAGE_BACK_URL,
  SET_VIRTUAL_LIST_INDEX,
  METADATA_NAMESPACE,
} from '@/store/metadataMutationsConsts';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
// check filtering in detail https://www.npmjs.com/package/vue2-filters

export default {
  props: {
    listContent: Array,
    // listView: Boolean,
    // showMapFilter: Boolean,
    mapFilteringPossible: Boolean,
    placeHolderAmount: Number,
    selectedTagNames: Array,
    allTags: Array,
    mapWidth: Number,
    mapHeight: Number,
    defaultListControls: Array,
  },
  beforeMount() {
    this.fileIconString = this.mixinMethods_getIcon('file');
    this.lockedIconString = this.mixinMethods_getIcon('lock2Closed');
    this.unlockedIconString = this.mixinMethods_getIcon('lock2Open');
  },
  mounted() {
    if (this.defaultListControls && this.defaultListControls.length) {
      this.defaultListControls.forEach((n) => {
        this.controlsChanged(n);
      });
    }

    this.infiniteHandler();
  },
  computed: {
    ...mapGetters({
      metadataIds: `${METADATA_NAMESPACE}/metadataIds`,
      metadatasContent: 'metadata/metadatasContent',
      searchedMetadatasContent: 'metadata/searchedMetadatasContent',
      searchingMetadatasContent: 'metadata/searchingMetadatasContent',
      searchingMetadatasContentOK: 'metadata/searchingMetadatasContentOK',
      loadingMetadatasContent: 'metadata/loadingMetadatasContent',
      vIndex: 'metadata/vIndex',
      vReloadAmount: 'metadata/vReloadAmount',
      vReloadDelay: 'metadata/vReloadDelay',
      isFilteringContent: 'metadata/isFilteringContent',
      // pinnedIds: 'metadata/pinnedIds',
    }),
    showPinnedElements() {
      return !this.loading && this.showMapFilter && this.pinnedIds.length > 0;
    },
    mergePinnedAndFiltered() {
      const pinnedContent = [];

      this.pinnedIds.forEach((pinId) => {
        pinnedContent.push(this.metadatasContent[pinId]);
      });

      return [...pinnedContent, ...this.listContent];
    },
    loading() {
      return (this.loadingMetadatasContent
            || this.isFilteringContent
            || this.searchingMetadatasContent
      );
    },
    cardGridClass() {
      // if (this.mapFilteringPossible && this.showMapFilter) {
      //   const twoThridsSize = {
      //     xs12: true,
      //     sm12: true,
      //     md6: true,
      //     lg4: true,
      //     xl3: true,
      //   };

      //   return twoThridsSize;
      // }

      const fullSize = {
        xs12: true,
        sm6: true,
        md4: true,
        lg3: true,
        xl3: true,
      };

      return fullSize;
    },
    contentSize() {
      return this.listContent !== undefined ? Object.keys(this.listContent).length : 0;
    },
  },
  methods: {
    infiniteHandler($state) {
      const that = this;
      that.vLoading = true;
      // console.log('loading list from ' + that.vIndex + ' to ' + (that.vIndex + that.vReloadAmount) );

      if (that.contentSize <= 0 && $state) {
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

        for (;i < that.vIndex + that.vReloadAmount && i < that.contentSize; i++) {
          that.virtualListContent.push(that.listContent[i]);
        }

        if ($state) {
          if (that.virtualListContent.length >= that.contentSize) {
            $state.complete();
          } else {
            $state.loaded();
          }
        }

        that.$store.commit(`metadata/${SET_VIRTUAL_LIST_INDEX}`, i);

        that.vLoading = false;
        // console.log('loaded to ' + that.vIndex );
      }, this.vReloadDelay);
    },
    catchTagClicked(tagName) {
      this.$emit('clickedTag', tagName);
    },
    // catchExpandClicked() {
    //   this.filterExpanded = !this.filterExpanded;
    //   this.$emit('clickedExpand');
    // },
    catchTagCloseClicked(tagId) {
      this.$emit('clickedTagClose', tagId);
    },
    catchTagCleared() {
      this.$emit('clickedClear');
    },
    catchCategoryClicked(cardTitle) {
      this.$router.push({
        path: BROWSE_PATH,
        query: { search: cardTitle },
      });
    },
    metaDataClicked(datasetname) {
      this.$store.commit(`${METADATA_NAMESPACE}/${SET_DETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: METADATADETAIL_PAGENAME,
        params: {
          metadataid: datasetname,
        },
      });
    },
    catchPointClicked(id) {
      // bring to top
      // highlight entry
      let newPins = this.pinnedIds;

      if (this.pinnedIds.includes(id)) {
        newPins = this.pinnedIds.filter(i => i !== id);
      } else {
        newPins.push(id);
      }

      this.pinnedIds = newPins;

      // this.$store.commit(`${METADATA_NAMESPACE}/${PIN_METADATA}`, id);
    },
    catchClearButtonClick() {
      this.pinnedIds = [];
      // this.$store.commit(`${METADATA_NAMESPACE}/${CLEAR_PINNED_METADATA}`);
    },
    hasRestrictedResources(metadata) {
      if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
        return false;
      }

      /* eslint-disable consistent-return  */
      metadata.resources.forEach((res) => {
        if (
          res.restricted !== undefined
          && (res.restricted.allowed_users !== undefined
          || (res.restricted.level !== undefined
            && res.restricted.level !== 'public'))
        ) {
          return true;
        }
      });

      return false;
    },
    isPinned(id) {
      return this.pinnedIds.includes(id);
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
    isActiveControl(number) {
      return this.controlsActive.includes(number);
    },
    controlsChanged(number) {
      // 0-entry: listView, 1-entry: mapActive
      let controlsActive = this.controlsActive;

      if (this.isActiveControl(number)) {
        controlsActive = controlsActive.filter(n => n !== number);
      } else {
        controlsActive.push(number);
      }

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

      this.listView = listActive;
      this.showMapFilter = mapToggled;

      this.controlsActive = controlsActive;
    },
  },
  watch: {
    contentSize: function resetVirtualContent() {
      this.$store.commit(`${METADATA_NAMESPACE}/${SET_VIRTUAL_LIST_INDEX}`, 0);
      this.virtualListContent = [];
      this.infiniteId += 1;
      this.infiniteHandler();
    },
  },
  data: () => ({
    noResultText: 'Nothing found for these search criterias.',
    suggestionText: 'Change the criterias or try one of these categories',
    fileIconString: null,
    lockedIconString: null,
    unlockedIconString: null,
    localTags: [],
    virtualListContent: [],
    vLoading: false,
    infiniteId: +new Date(),
    preloadingDistance: 200,
    scrollTopButtonText: 'Scroll to the top',
    controlsLabel: 'List Controls',
    controlsActive: [],
    listView: false,
    showMapFilter: false,
    pinnedIds: [],
    BROWSE_PAGENAME,
  }),
  components: {
    FilterKeywordsView,
    FilterMapView,
    ControlPanelView,
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
  opacity: 0;
}

.highlighted {
  box-shadow: #4db6ac 0px 0px 5px 5px;
}
</style>
