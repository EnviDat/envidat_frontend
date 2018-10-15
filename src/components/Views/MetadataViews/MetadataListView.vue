<template>

    <v-container fluid grid-list-lg pa-0
                    >

        <v-layout row wrap>

        <v-flex v-if="loading || loadingContent"
                v-bind="cardGridClass"
                v-for="(n, index) in palceHolderAmount" :key="index">

            <metadata-card-placeholder :dark="false" />

        </v-flex>

        <v-flex v-if="!loading"
                v-bind="cardGridClass"
                v-for="(metadata, index) in filteredMetadataContent" :key="index">

            <transition name="fadeIn">                    
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
                        :compactLayout="compactLayout"
                        :class="{ ['elevation-10'] : hoverId === metadata.id }"
                        v-on:clickedEvent="metaDataClicked"
                        v-on:clickedTag="catchTagClicked">
            </metadata-card>
            </transition>

        </v-flex>

        <v-flex xs12 v-if="!loading && !filteredMetadataContent">
            <no-search-results-view v-on:clicked="catchCategoryClicked"
                                    :noResultText="noResultText"
                                    :suggestionText="suggestionText" />  
        </v-flex>


        </v-layout>

    </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import MetadataCard from '../Cards/MetadataCard';
  import MetadataCardPlaceholder from '../Cards/MetadataCardPlaceholder';
  import NoSearchResultsView from '../NoSearchResultsView';
  import { SEARCH_METADATA } from '../../../store/metadataMutationsConsts';
  import { CHANGE_APP_BG } from '../../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

export default {
    props: {
      filteredMetadataContent: Array,
      listView: Boolean,
      compactLayout: Boolean,
      mapFilteringEnabled: Boolean,
      hoverId: String,
      palceHolderAmount: Number,
    },
    data: () => ({
      noResultText: 'Nothing found for these Search criterias',
      suggestionText: 'Try one of these categories',
      maxMapFilterHeight: 750,
      mapFilterVisibleIds: [],
    }),
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        searchedMetadatasContent: 'metadata/searchedMetadatasContent',
        searchingMetadatasContent: 'metadata/searchingMetadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        currentMetadata: 'metadata/currentMetadata',
      }),
      loading: function loading() {
        return this.loadingMetadataIds || this.searchingMetadatasContent;
      },
      loadingContent: function loadingContent() {
        return (this.loadingMetadatasContent && this.metadatasContentSize < this.palceHolderAmount);
      },
      cardGridClass: function cardGridClass() {
        if (this.mapFilteringEnabled && this.compactLayout) {
          const twoThridsSize = {
            xs12: true,
            sm8: true,
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
    },
    components: {
      NoSearchResultsView,
      MetadataCard,
      MetadataCardPlaceholder,
    },

};
</script>


<style scoped>

</style>
