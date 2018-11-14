<template>
  
    <v-layout column >

      <v-flex xs12 v-if="showFiltering">

        <v-container fluid grid-list-md pa-0>

          <v-layout 
            v-bind="{
              ['row']: this.$vuetify.breakpoint.smAndUp,
              ['column']: this.$vuetify.breakpoint.xsOnly,
            }" >

            <v-flex xs12 sm3>

              <v-layout column>

                <v-flex pt-0 fill-height>
                  <control-panel-view v-on:controlsChanged="catchControlsChanged"
                  />

                </v-flex>

                <v-flex py-1>
                  <small-search-bar-view
                                  :searchTerm="searchTerm"
                                  :searchCount="searchCount"
                                  :labelText="searchViewLabelText"
                                  :hasButton="searchViewHasButton"
                                  v-on:clicked="catchSearchClicked"
                                  v-on:searchCleared="catchSearchCleared">
                  </small-search-bar-view>
                </v-flex>


              </v-layout>
            </v-flex>

            <v-flex xs10 sm9 
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
                            :selectedTagNames="selectedTagNames"
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
                            v-on:clickedClear="catchTagCleared"
                >
              </filter-view>

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
  import FilterView from './FilterView';
  import FilterMapView from './FilterMapView';
  import SmallSearchBarView from './SmallSearchBarView';
  import ControlPanelView from './ControlPanelView';
  import FilterExpandedView from './FilterExpandedView';
  import FilterViewButtons from './FilterViewButtons';
  import Logo from '../../../assets/logo/EnviDat_logo_32.png';

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
      showFiltering: Boolean,
      showPlaceholder: Boolean,
      showMapFilter: Boolean,
      mapFilteringEnabled: Boolean,
      mapFilterHeight: Number,
      controlsActive: Array,
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
      catchControlsChanged: function catchControlsChanged(controlsActive) {
        this.$emit('controlsChanged', controlsActive);
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
      ControlPanelView,
      FilterExpandedView,
      FilterViewButtons,
      FilterMapView,
    },
  };
</script>

<style>

  .envidatLogoText {
    display: inline;
    vertical-align: middle;
    position: relative;
    bottom: -2px;
  }

  .envidatNavbarLinksSmall {
    font-size: 10px !important;
  }

  .envidatNavbarTitleSmall {
    font-size: 18px !important;
  }

</style>