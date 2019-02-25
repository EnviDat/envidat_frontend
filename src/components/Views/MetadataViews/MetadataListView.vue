<template>

    <v-container fluid
                  :class="{ ['grid-list-sm'] : listView,
                          ['grid-list-lg'] : !listView,
                        }"
                  pa-0
    >

      <transition-group
        name="itemfade"
        class="layout"
        :class="{ ['column'] : listView,
                      ['row'] : !listView,
                      ['wrap'] : !listView
                    }"
      >

        <v-flex v-if="loading || loadingContent"
                v-bind="cardGridClass"
                v-for="(n, index) in placeHolderAmount" :key="'filtered_' + index">

          <metadata-card-placeholder :dark="false" />

        </v-flex>

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

        <v-flex v-if="!loading && !loadingContent && !isPinned(metadata.id)"
                v-bind="cardGridClass"
                v-for="(metadata, index) in filteredContent" :key="'filtered_' + index"
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

        <v-flex xs12 v-if="!loading && !loadingContent && filteredContentSize <= 0"
        key="noSearchResultsView">
            <no-search-results-view v-on:clicked="catchCategoryClicked"
                                    :noResultText="noResultText"
                                    :suggestionText="suggestionText" />  
        </v-flex>

      </transition-group>

    </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import MetadataCard from '../Cards/MetadataCard';
  import MetadataCardPlaceholder from '../Cards/MetadataCardPlaceholder';
  import NoSearchResultsView from '../NoSearchResultsView';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

export default {
    props: {
      listView: Boolean,
      showMapFilter: Boolean,
      mapFilteringPossible: Boolean,
      placeHolderAmount: Number,
    },
    data: () => ({
      noResultText: 'Nothing found for these search criterias',
      suggestionText: 'Try one of these categories',
      fileIconString: null,
      lockedIconString: null,
      unlockedIconString: null,
    }),
    beforeMount: function beforeMount() {
      this.fileIconString = this.getIcon('file');
      this.lockedIconString = this.getIcon('lock2Closed');
      this.unlockedIconString = this.getIcon('lock2Open');
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
        isFilteringContent: 'metadata/isFilteringContent',
        pinnedIds: 'metadata/pinnedIds',
      }),
      showPinnedElements: function showPinnedElements() {
        return !this.loading && !this.loadingContent && this.showMapFilter && this.pinnedIds.length > 0;
      },
      loading: function loading() {
        // console.log("loading " + this.isFilteringContent + " " + this.searchingMetadatasContent);
        return this.isFilteringContent || this.searchingMetadatasContent;
        // return this.isFilteringContent || this.contentSize(this.filteredContent) <= 0;
      },
      loadingContent: function loadingContent() {
        // console.log("loadingContent " + this.loadingMetadatasContent + " " + this.contentSize(this.filteredContent));
        return (this.loadingMetadatasContent && this.contentSize(this.filteredContent) < this.placeHolderAmount);
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
            xl4: true,
          };

          return twoThridsSize;
        }

        const fullSize = {
          xs12: true,
          sm6: true,
          md4: true,
          xl3: true,
        };

        return fullSize;
      },

    },
    methods: {
      contentSize: function contentSize(content) {
        return content !== undefined ? Object.keys(content).length : 0;
      },
      catchTagClicked: function catchTagClicked(tagName) {
        this.$emit('clickedTag', tagName);
      },
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        this.$router.push({
          path: '/browse',
          query: {
            search: cardTitle,
          },
        });
      },
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$router.push({
          name: 'MetadataDetailPage',
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
    components: {
      NoSearchResultsView,
      MetadataCard,
      MetadataCardPlaceholder,
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
