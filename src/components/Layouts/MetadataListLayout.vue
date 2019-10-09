<template>
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
        <no-search-results-view @clickedCategory="clickedCategory" />
      </v-flex>

    </transition-group>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { BROWSE_PATH, METADATADETAIL_PAGENAME } from '@/router/routeConsts';
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
  name: 'MetadataListLayout',
  props: {
    listContent: Array,
    listView: Boolean,
    showMapFilter: Boolean,
    mapFilteringPossible: Boolean,
    placeHolderAmount: Number,
  },
  data: () => ({
    fileIconString: null,
    lockedIconString: null,
    unlockedIconString: null,
    virtualListContent: [],
    vLoading: false,
    infiniteId: +new Date(),
    preloadingDistance: 200,
    scrollTopButtonText: 'Scroll to the top',
  }),
  beforeMount() {
    this.fileIconString = this.mixinMethods_getIcon('file');
    this.lockedIconString = this.mixinMethods_getIcon('lock2Closed');
    this.unlockedIconString = this.mixinMethods_getIcon('lock2Open');
  },
  mounted() {
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
      vIndex: 'metadata/vIndex',
      vReloadAmount: 'metadata/vReloadAmount',
      vReloadDelay: 'metadata/vReloadDelay',
      isFilteringContent: 'metadata/isFilteringContent',
      pinnedIds: 'metadata/pinnedIds',
    }),
    showPinnedElements: function showPinnedElements() {
      return !this.loading && this.showMapFilter && this.pinnedIds.length > 0;
    },
    loading() {
      return (this.loadingMetadatasContent
            || this.isFilteringContent
            || this.searchingMetadatasContent
      );
    },
    cardGridClass() {
      if (this.mapFilteringPossible && this.showMapFilter) {
        const twoThridsSize = {
          xs12: true,
          sm12: true,
          md6: true,
          lg4: true,
          xl3: true,
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
    contentSize() {
      return this.listContent === undefined ? 0 : Object.keys(this.listContent).length;
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

        for (
          ;
          i < that.vIndex + that.vReloadAmount && i < that.contentSize;
          i++
        ) {
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
    clickedCategory(cardTitle) {
      this.$router.push({
        path: BROWSE_PATH,
        query: { search: cardTitle },
      });
    },
    metaDataClicked(datasetname) {
      this.$store.commit(`metadata/${SET_DETAIL_PAGE_BACK_URL}`, this.$route);

      this.$router.push({
        name: METADATADETAIL_PAGENAME,
        params: {
          metadataid: datasetname,
        },
      });
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
  },
  watch: {
    contentSize() {
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
  opacity: 0;
}

.highlighted {
  box-shadow: #4db6ac 0px 0px 5px 5px;
}
</style>
