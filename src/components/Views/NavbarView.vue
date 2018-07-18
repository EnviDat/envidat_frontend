<template>
  
    <v-layout column
              style="position: sticky; top: -1px; z-index: 2;">

      <v-flex xs12>
        <v-container fluid px-2 py-1>
        <v-card raised
                hover >

          <v-card-actions>      
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-btn icon color="accent" slot="activator" :href="url" 
                      v-bind="{['target'] : isLink ? '_blank' : '' }">
                <v-icon v-if="isFile">cloud_download</v-icon>
                <v-icon v-if="isLink">link</v-icon>
              </v-btn>
              <span v-if="isFile">Download file</span>
              <span v-if="isLink">Open link</span>
            </v-tooltip>
          </v-card-actions>

        </v-card>
        </v-container>
      </v-flex>


      <v-flex xs12>
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
    components: {
      FilterView,
    },
  };
</script>

<style>
  
</style>