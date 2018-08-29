<template>
  
    <v-layout column >

      <v-flex xs12 py-1>

        <v-card raised >

            <v-layout row align-center >

              <v-flex xs2 sm1 md1 pl-1>
                <v-btn icon href="./" class="ma-0">
                  <img :src="Logo" alt="envidat_logo" >
                </v-btn>

                <div class="headline envidatLogoText">
                    {{ logoText }}
                </div>
              </v-flex>

              <v-flex xs6 sm6 md8 lg9>
                <!-- spacer -->
              </v-flex>

              <v-flex xs4 sm2 md1 >
                <v-btn class="ma-0"
                        flat
                        small
                        :href="aboutUrl"
                        target="_blank" >
                  {{ aboutText }}
                </v-btn>
              </v-flex>

              <v-flex xs4 sm2 md2 lg1>
                <v-btn class="ma-0"
                        flat
                        color="primary"
                        small
                        :href="loginUrl"
                        target="_blank" >
                  {{ loginText }}
                </v-btn>
              </v-flex>
            
            </v-layout>

        </v-card>

      </v-flex>


      <v-flex xs12 >

        <v-container fluid grid-list-md pa-0>

          <v-layout 
            v-bind="{
              ['row']: this.$vuetify.breakpoint.smAndUp,
              ['column']: this.$vuetify.breakpoint.xsOnly,
            }" >

            <v-flex xs12 sm3>
                <small-search-bar-view
                                :searchTerm="searchTerm"
                                :searchCount="searchCount"
                                :labelText="searchViewLabelText"
                                :hasButton="searchViewHasButton"
                                v-on:clicked="catchSearchClicked"
                                v-on:searchCleared="catchSearchCleared">
                </small-search-bar-view>
            </v-flex>

            <v-flex xs10 sm7 
              v-bind="{
                ['py-2']: this.$vuetify.breakpoint.xsOnly,
              }"
            >
              
              <filter-expanded-view v-if="expanded"
                            :allTags="allTags" 
                            :selectedTagNames="selectedTagNames"
                            :popularTags="popularTags"
                            :expanded="expanded"
                            :expandButtonText="expandButtonText"
                            :expandedButtonText="expandedButtonText"
                            :mapExpanded="showMapFilter"
                            :mapExpandButtonText="mapExpandButtonText"
                            :mapExpandedButtonText="mapExpandedButtonText"
                            v-on:clickedMapExpand="catchMapExpandClicked"
                            :clearButtonText="clearButtonText"
                            :minTagCountToBeVisible="5"
                            v-on:clickedTag="catchTagClicked"
                            v-on:clickedTagClose="catchTagCloseClicked"
                            v-on:clickedExpand="catchExpandClicked"
                            v-on:clickedClear="catchTagCleared"
                            >
              </filter-expanded-view>

              <filter-view v-if="!expanded"
                            :allTags="allTags" 
                            :selectedTagNames.sync="selectedTagNames"
                            :popularTags="popularTags"
                            :expanded="expanded"
                            :expandButtonText="expandButtonText"
                            :expandedButtonText="expandedButtonText"
                            v-on:clickedExpand="catchExpandClicked"
                            v-on:clickedTag="catchTagClicked"
                            v-on:clickedTagClose="catchTagCloseClicked"
                            :mapExpanded="showMapFilter"
                            :mapExpandButtonText="mapExpandButtonText"
                            :mapExpandedButtonText="mapExpandedButtonText"
                            v-on:clickedMapExpand="catchMapExpandClicked"
                            :showPlaceholder="showPlaceholder"
                >
              </filter-view>

            </v-flex>

            <v-flex xs2
              v-bind="{
                ['py-2']: this.$vuetify.breakpoint.xsOnly,
              }"
            >

              <filter-view-buttons
                                    :expanded="expanded"
                                    :expandButtonText="expandButtonText"
                                    :expandedButtonText="expandedButtonText"
                                    v-on:clickedExpand="catchExpandClicked"
                                    :mapExpanded="showMapFilter"
                                    :mapExpandButtonText="mapExpandButtonText"
                                    :mapExpandedButtonText="mapExpandedButtonText"
                                    v-on:clickedMapExpand="catchMapExpandClicked" >
              </filter-view-buttons>

            </v-flex>

          </v-layout>

        </v-container>

      </v-flex>

      <!-- <v-flex xs4 offset-xs8 py-1 style="pointer-events: none;"
              v-if="mapFilteringEnabled && showMapFilter" >

        <filter-map-view :totalHeight="mapFilterHeight"
                          :expanded="showMapFilter"
                          v-on:toggleMapFilterExpand="catchMapExpandClicked"
                          v-on:viewChanged="catchViewChanged"
                          v-on:pointClicked="catchPointClicked" />

      </v-flex> -->

    </v-layout>

</template>

<script>
  import FilterView from './Filtering/FilterView';
  import FilterMapView from './Filtering/FilterMapView';
  import SmallSearchBarView from './Filtering/SmallSearchBarView';
  import FilterExpandedView from './Filtering/FilterExpandedView';
  import FilterViewButtons from './Filtering/FilterViewButtons';
  import Logo from '../../assets/logo/EnviDat_logo_32.png';

  export default {
    props: {
      searchTerm: String,
      searchLabelText: String,
      searchViewLabelText: String,
      searchViewHasButton: Boolean,
      searchCount: Number,
      isSearchResultContent: Boolean,
      allTags: Array,
      popularTags: Array,
      selectedTagNames: Array,
      showPlaceholder: Boolean,
      showMapFilter: Boolean,
      mapFilteringEnabled: Boolean,
      mapFilterHeight: Number,
    },
    computed: {
      mapFilterAlignment: function mapFilterAlignment() {
        return {
          xs4: this.showMapFilter,
          'offset-xs8': this.showMapFilter,
          xs1: !this.showMapFilter,
          'offset-xs11': !this.showMapFilter,
        };
      },
    },
    methods: {
      catchMapExpandClicked: function catchMapExpandClicked() {
        this.$emit('clickedMapExpand');
      },
      catchSearchCleared: function catchSearchCleared() {
        this.$emit('clearedSearch');
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        this.$emit('clickedSearch', searchTerm);
      },
      catchTagCleared: function catchTagCleared() {
        this.$emit('clickedClear');
      },
      catchTagClicked: function catchTagClicked(tagId) {
        this.$emit('clickedTag', tagId);
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        this.$emit('clickedTagClose', tagId);
      },
      catchViewChanged: function catchViewChanged(visibleIds) {
        this.$emit('mapFilterChanged', visibleIds);
      },
      catchPointClicked: function catchPointClicked(id) {
        this.$emit('pointClicked', id);
      },
      catchExpandClicked: function catchExpandClicked() {
        this.expanded = !this.expanded;
      },
    },
    data: () => ({
      Logo,
      logoText: 'EnviDat',
      aboutText: 'About',
      aboutUrl: 'https://www.envidat.ch/about',
      loginText: 'Creator Login',
      loginUrl: 'https://www.envidat.ch/user/reset',
      expanded: false,
      expandButtonText: 'Show all tags',
      expandedButtonText: 'Hide all tags',
      clearButtonText: 'Clear Tags',
      mapExpandButtonText: 'Show Map',
      mapExpandedButtonText: 'Hide Map',
    }),
    components: {
      FilterView,
      SmallSearchBarView,
      FilterExpandedView,
      FilterViewButtons,
      FilterMapView,
    },
  };
</script>

<style>

  .envidat_chip{
    height: 1.5rem;
    font-size: 0.75rem;
  }

  .envidat_chip span {
    cursor: pointer !important;
  }

  .filterTag {
    opacity: 0.7;
  }

  .chip__content span {
    cursor: pointer !important;
  }

  .envidatLogoText {
    display: inline;
    vertical-align: middle;
    position: relative;
    bottom: -2px;
  }

</style>