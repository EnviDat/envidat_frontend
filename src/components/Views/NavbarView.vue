<template>
  
    <v-layout column >

      <v-flex xs12 py-1>

        <v-card raised >

            <v-layout row align-center >

              <v-flex xs5 sm3 md2 lg2 pl-1>
                <v-btn icon
                        href="./" class="ma-0"
                        >
                  <img :src="Logo" alt="envidat_logo" >
                </v-btn>

                <div class="headline envidatLogoText"
                    :class="{
                      ['envidatNavbarTitleSmall']: this.$vuetify.breakpoint.xsOnly,
                    }" 
                >
                  {{ logoText }} 
                </div>


              </v-flex>

              <v-flex sm5 md8 lg8>
                <!-- spacer -->
              </v-flex>

              <v-flex xs3 sm2 md1 >
                <v-btn class="ma-0"
                        flat
                        small
                        :href="aboutUrl"
                        :class="{
                          ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                        }" 
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
                        :class="{
                          ['envidatNavbarLinksSmall']: this.$vuetify.breakpoint.xsOnly,
                        }" 
                        target="_blank" >
                  {{ loginText }}
                </v-btn>
              </v-flex>
            
            </v-layout>

        </v-card>

      </v-flex>


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
              
              <!-- <filter-expanded-view v-if="expanded"
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
              </filter-expanded-view> -->

              <small-filter-view 
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
      <div style="position: absolute; right: -10px; top: 2px; font-size: 8px !important;" >
        {{ appVersion }}
      </div>

    </v-layout>

</template>

<script>
  import FilterView from './Filtering/FilterView';
  import SmallFilterView from './Filtering/SmallFilterView';
  import FilterMapView from './Filtering/FilterMapView';
  import SmallSearchBarView from './Filtering/SmallSearchBarView';
  import ControlPanelView from './Filtering/ControlPanelView';
  import FilterExpandedView from './Filtering/FilterExpandedView';
  import FilterViewButtons from './Filtering/FilterViewButtons';
  import Logo from '../../assets/logo/EnviDat_logo_32.png';

  export default {
    props: {
    },
    computed: {
    },
    methods: {
    },
    data: () => ({
      Logo,
      logoText: 'EnviDat',
      aboutText: 'About',
      aboutUrl: 'https://www.envidat.ch/about',
      loginText: 'Creator Login',
      loginUrl: 'https://www.envidat.ch/user/reset',
      appVersion: process.env.VERSION,
    }),
    components: {
      FilterView,
      SmallFilterView,
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