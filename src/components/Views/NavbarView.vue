<template>
  
    <v-layout column >

      <v-flex xs12 py-1>

        <v-card raised >

            <v-layout row align-center >

              <v-flex xs2 sm1 md1 pl-1>
                <v-btn icon href="./" class="ma-0">
                  <img :src="Logo" alt="envidat_logo" >
                </v-btn>
              </v-flex>

              <v-flex xs6 sm6 md9>
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

              <v-flex xs4 sm2 md1 >
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
        <filter-view :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagNames.sync="selectedTagNames"
                      :popularTags="popularTags"
                      :showPlaceholder="showPlaceholder"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
          >
        </filter-view>

      </v-flex>

      <v-flex xs4 offset-xs8 py-1
              v-if="showMapFilter" >
        <filter-map-view :totalHeight="mapFilterHeight"
                          v-on:viewChanged="catchViewChanged"
                          v-on:pointClicked="catchPointClicked" />
      </v-flex>

    </v-layout>

</template>

<script>
  import FilterView from './Filtering/FilterView';
  import FilterMapView from './Filtering/FilterMapView';
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
      mapFilterHeight: Number,
    },
    computed: {
      alignClass: function alignClass() {
        return {
          flex: !this.alignLeft,
          xs2: !this.alignLeft,
          'pr-3': this.alignLeft,
        };
      },
    },
    methods: {
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
    },
    data: () => ({
      Logo,
      aboutText: 'About',
      aboutUrl: 'https://www.envidat.ch/about',
      loginText: 'Login',
      loginUrl: 'https://www.envidat.ch/user/reset',
    }),
    components: {
      FilterView,
      FilterMapView,
    },
  };
</script>

<style>
  
</style>