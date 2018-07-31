<template>
  
    <v-layout column
              style="position: sticky; top: -1px; z-index: 2;">

      <v-flex xs12 px-3 py-1>

        <v-card raised >

            <v-layout row align-center >

              <v-flex xs2 sm1 >
                <v-btn icon href="./">
                  <img :src="Logo" alt="envidat_logo" >
                </v-btn>
              </v-flex>

              <v-flex xs6 sm9>
                <!-- spacer -->
              </v-flex>

              <v-flex xs2 sm1>
                <v-btn flat
                       :href="aboutUrl"
                       target="_blank" >
                  {{ aboutText }}
                </v-btn>
              </v-flex>

              <v-flex xs2 sm1 >
                <v-btn flat
                        color="primary"
                        :href="loginUrl"
                         target="_blank" >
                  {{ loginText }}
                </v-btn>
              </v-flex>

              <!-- <v-flex xs1 justify-end>
                <v-tooltip bottom>
                  <v-btn icon color="accent" slot="activator" :href="url" 
                          v-bind="{['target'] : isLink ? '_blank' : '' }">
                    <v-icon >right</v-icon>
                  </v-btn>
                  <span >Login</span>
                </v-tooltip>
              </v-flex> -->
            
            </v-layout>

        </v-card>

      </v-flex>


      <v-flex xs12 px-3 >
        <filter-view :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagNames.sync="selectedTagNames"
                      :popularTags="popularTags"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
                      >
        </filter-view>

      </v-flex>

    </v-layout>

</template>

<script>
  import FilterView from './FilterView';
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
    },
  };
</script>

<style>
  
</style>