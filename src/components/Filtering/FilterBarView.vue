<template>
  <v-layout column>
    <v-flex
      v-if="showFiltering"
      xs12
    >
      <v-container
        fluid
        grid-list-md
        pa-0
      >
        <v-layout
          v-bind="{
            ['row']: this.$vuetify.breakpoint.smAndUp,
            ['column']: this.$vuetify.breakpoint.xsOnly,
          }"
        >
          <v-flex
            xs12
            sm4
            md3
          >
            <v-layout column>
              <v-flex
                hidden-xs-only
                pt-0
                fill-height
              >
                <control-panel-view
                  :compact-layout="$vuetify.breakpoint.smAndDown"
                  @controlsChanged="catchControlsChanged"
                />
              </v-flex>

              <v-flex py-1>
                <small-search-bar-view
                  :compact-layout="$vuetify.breakpoint.smAndDown"
                  :search-term="searchTerm"
                  :search-count="searchCount"
                  :label-text="searchViewLabelText"
                  :has-button="searchViewHasButton"
                  style="align-items: center;"
                  @clicked="catchSearchClicked"
                  @searchCleared="catchSearchCleared"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex
            xs10
            sm8
            md9
            v-bind="{
              ['py-1']: this.$vuetify.breakpoint.xsOnly,
            }"
          >
            <filter-keywords-view
              :compact-layout="$vuetify.breakpoint.smAndDown"
              :all-tags="allTags"
              :selected-tag-names="selectedTagNames"
              :popular-tags="popularTags"
              :expanded="expanded"
              :expand-button-text="expandButtonText"
              :expanded-button-text="expandedButtonText"
              :map-expanded="showMapFilter"
              :map-expand-button-text="mapExpandButtonText"
              :map-expanded-button-text="mapExpandedButtonText"
              :show-placeholder="showPlaceholder"
              @clickedExpand="catchExpandClicked"
              @clickedTag="catchTagClicked"
              @clickedTagClose="catchTagCloseClicked"
              @clickedMapExpand="catchMapExpandClicked"
              @clickedClear="catchTagCleared"
            />
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
import FilterKeywordsView from '@/components/Filtering/FilterKeywordsView';
import FilterMapView from '@/components/Filtering/FilterMapView';
import SmallSearchBarView from '@/components/Filtering/SmallSearchBarView';
import ControlPanelView from '@/components/Filtering/ControlPanelView';
import Logo from '@/assets/logo/EnviDat_logo_32.png';

export default {
  components: {
    FilterKeywordsView,
    SmallSearchBarView,
    ControlPanelView,
    FilterMapView,
  },
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
};
</script>

<style>

</style>
