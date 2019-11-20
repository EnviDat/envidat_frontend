<template>

  <metadata-list-layout ref="metadataListLayoutComponent"
              :topFilteringLayout="topFilteringLayout"
              :useDynamicHeight="useDynamicHeight"
              :showMapFilter="showMapFilter"
              :mapFilteringPossible="mapFilteringPossible"
              @onScroll="onScroll" >

    <template v-slot:filterKeywords>
      <filter-keywords-view :compactLayout="$vuetify.breakpoint.smAndDown"
                            :allTags="allTags"
                            :selectedTagNames="selectedTagNames"
                            :showPlaceholder="loading || updatingTags"
                            @clickedTag="catchTagClicked"
                            @clickedTagClose="catchTagCloseClicked"
                            @clickedClear="catchTagCleared" />
    </template>

    <template v-slot:controlPanel>
      <control-panel-view class="fill-height"
                          :controls="controlsActive"
                          :enabledControls="enabledControls"
                          :compactLayout="$vuetify.breakpoint.smAndDown"
                          :label="controlsLabel"
                          :flat="$route.name !== BROWSE_PAGENAME"
                          @controlsChanged="controlsChanged" />
    </template>

    <template v-slot:filterMap>
      <filter-map-view :class="!mapHeight ? 'fill-height' : ''"
                        :style="mapHeight ? `height: ${mapHeight}px;` : 'height: 100%;'"
                        :content="mergePinnedAndFiltered"
                        :pinnedIds="pinnedIds"
                        :topLayout="mapTopLayout"
                        @pointClicked="catchPointClicked"
                        @clearButtonClicked="catchClearButtonClick" />
    </template>

    <template v-slot:metadataListPlaceholder>
      <v-layout v-if="loading"
                ref="metadataListPlaceholder"
                :class="{ ['column'] : listView,
                          ['row'] : !listView,
                          ['wrap'] : !listView }" >

        <v-flex v-for="(n, index) in placeHolderAmount"
                :key="'placeHolder_' + index"
                v-bind="cardGridClass" >

          <metadata-card-placeholder :dark="false" />
        </v-flex>
      </v-layout>
    </template>

    <template v-slot:metadataListLayout >
      <transition-group v-if="!loading"
                        :name="$vuetify.breakpoint.mdAndUp ? 'itemfade' : ''"
                        ref="metadataListLayout"
                        class="layout"
                        :class="{ ['column'] : listView,
                                  ['row'] : !listView,
                                  ['wrap'] : !listView }" >

        <v-flex v-for="(pinnedId, index) in pinnedIds"
                v-if="showPinnedElements"
                :key="'pinned_' + index"
                v-bind="cardGridClass" >

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
                          :dark="false"
                          :flatLayout="listView"
                          :fileIconString="fileIconString"
                          :lockedIconString="lockedIconString"
                          :unlockedIconString="unlockedIconString"
                          :categoryColor="metadatasContent[pinnedId].categoryColor"
                          :categoryCards="categoryCards"
                          @clickedEvent="metaDataClicked"
                          @clickedTag="catchTagClicked" />
        </v-flex>

        <v-flex v-for="(metadata, index) in virtualListContent"
                v-if="!isPinned(metadata.id)"
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
                        :dark="false"
                        :flatLayout="listView"
                        :compactLayout="isActiveControl(LISTCONTROL_COMPACT_LAYOUT_ACTIVE)"
                        :fileIconString="fileIconString"
                        :lockedIconString="lockedIconString"
                        :unlockedIconString="unlockedIconString"
                        :categoryColor="metadata.categoryColor"
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
              <BaseRectangleButton v-if="vIndex > 0 && vIndex > vReloadAmount"
                                    :buttonText="scrollTopButtonText"
                                    :isSmall="true"
                                    :isFlat="true"
                                    @clicked="setScrollPos(0)" />
            </div>
            <div slot="no-more">
              <BaseRectangleButton :buttonText="scrollTopButtonText"
                                  :isSmall="true"
                                  :isFlat="true"
                                  @clicked="setScrollPos(0)" />
            </div>
          </infinite-loading>
        </v-flex>

        <v-flex v-if="!loading && contentSize <= 0"
                key="noSearchResultsView"
                xs12 mx-2 >
          <no-search-results-view :categoryCards="categoryCards"
                                  @clicked="catchCategoryClicked" />
        </v-flex>

      </transition-group>

    </template>

  </metadata-list-layout>

</template>

<script>
/**
 * MetadataList.vue uses the FilterKeywordView, FilterMapView and the ControlPanelView
 * to create a List of metadata cards which can be filtered via the mentioned
 * filtering components.
 *
 * @summary filterable list of metadata cards
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-14 18:03:58
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

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
  LISTCONTROL_LIST_ACTIVE,
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
} from '@/store/metadataMutationsConsts';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import MetadataListLayout from '@/components/Layouts/MetadataListLayout';
// check filtering in detail https://www.npmjs.com/package/vue2-filters

export default {
  name: 'MetadataList',
  props: {
    listContent: Array,
    mapFilteringPossible: Boolean,
    placeHolderAmount: Number,
    selectedTagNames: Array,
    allTags: Array,
    mapHeight: Number,
    mapTopLayout: {
      type: Boolean,
      default: false,
    },
    defaultListControls: Array,
    enabledControls: Array,
    useDynamicHeight: Boolean,
    topFilteringLayout: {
      type: Boolean,
      default: false,
    },
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
      metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
      searchedMetadatasContent: `${METADATA_NAMESPACE}/searchedMetadatasContent`,
      searchingMetadatasContent: `${METADATA_NAMESPACE}/searchingMetadatasContent`,
      searchingMetadatasContentOK: `${METADATA_NAMESPACE}/searchingMetadatasContentOK`,
      loadingMetadatasContent: `${METADATA_NAMESPACE}/loadingMetadatasContent`,
      updatingTags: `${METADATA_NAMESPACE}/updatingTags`,
      vIndex: `${METADATA_NAMESPACE}/vIndex`,
      vReloadAmount: `${METADATA_NAMESPACE}/vReloadAmount`,
      vReloadDelay: `${METADATA_NAMESPACE}/vReloadDelay`,
      isFilteringContent: `${METADATA_NAMESPACE}/isFilteringContent`,
      categoryCards: `${METADATA_NAMESPACE}/categoryCards`,
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
      const fullSize = {
        xs12: true,
        sm6: true,
        md4: true,
        lg3: true,
        xl2: !this.isActiveControl(LISTCONTROL_MAP_ACTIVE)
              && this.isActiveControl(LISTCONTROL_COMPACT_LAYOUT_ACTIVE),
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
    isActiveControl(number) {
      return this.controlsActive.includes(number);
    },
    controlsChanged(number) {
      // 0-entry: listView, 1-entry: mapActive, 2-entry compact metadata
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

        if (el === LISTCONTROL_LIST_ACTIVE) {
          listActive = true;
        }
        if (el === LISTCONTROL_MAP_ACTIVE) {
          mapToggled = true;
        }
      }

      this.listView = listActive;
      this.showMapFilter = mapToggled;

      this.controlsActive = controlsActive;
    },
    setScrollPos(toPos) {
      if (this.$refs && this.$refs.metadataListLayoutComponent) {
        this.$refs.metadataListLayoutComponent.setScrollPos(toPos);
      }
    },
    onScroll(pos) {
      this.$emit('onScroll', pos);
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
  // updated() {
  //   this.setFilteringComponentsHeight();
  // },
  data: () => ({
    noResultText: 'Nothing found for these search criterias.',
    suggestionText: 'Change the criterias or try one of these categories',
    fileIconString: null,
    lockedIconString: null,
    unlockedIconString: null,
    localTags: [],
    virtualListContent: [],
    // filteringComponentsHeight: 150,
    vLoading: false,
    infiniteId: +new Date(),
    preloadingDistance: 150,
    scrollTopButtonText: 'Scroll to the top',
    controlsLabel: 'List controls',
    controlsActive: [],
    listView: false,
    showMapFilter: false,
    pinnedIds: [],
    BROWSE_PAGENAME,
    LISTCONTROL_LIST_ACTIVE,
    LISTCONTROL_MAP_ACTIVE,
    LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
  }),
  components: {
    FilterKeywordsView,
    FilterMapView,
    ControlPanelView,
    NoSearchResultsView,
    MetadataCard,
    MetadataCardPlaceholder,
    BaseRectangleButton,
    MetadataListLayout,
  },
};
</script>

<style scoped>
  .itemfade-enter-active,
  .itemfade-leave-active {
    transition: opacity 0.2s;
    transition-timing-function: linear;
  }

  .itemfade-enter,
  .itemfade-leave-to {
    opacity: 0;
  }

  .highlighted {
    box-shadow: #4db6ac 0px 0px 5px 5px;
  }

</style>
