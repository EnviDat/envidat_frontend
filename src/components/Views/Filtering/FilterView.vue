<template>

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

      <v-flex xs12 sm9 
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
                      :mapExpanded="mapExpanded"
                      :mapExpandButtonText="mapExpandButtonText"
                      :mapExpandedButtonText="mapExpandedButtonText"
                      v-on:clickedMapExpand="catchMapExpandClicked"
                      :clearButtonText="clearButtonText"
                      :minTagCountToBeVisible="5"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedExpand="expandClicked"
                      v-on:clickedClear="catchTagCleared"
                      >
        </filter-expanded-view>

        <v-card v-else
                raised
                >

          <v-layout style="min-height: 48px;"
                    v-bind="{
                      ['row']: this.$vuetify.breakpoint.smAndUp,
                      ['align-center']: this.$vuetify.breakpoint.smAndUp,
                      ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
                      ['column']: this.$vuetify.breakpoint.xsOnly,
                    }"
            >

            <v-flex xs12 px-2 py-2 >

              <tag-chip v-if="selectedTags.length > 0"
                        v-for="tag in selectedTags" :key="tag.name" 
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="true"
                        :closeable="true"
                        v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                        class="filterTag" />

              <tag-chip v-if="showPopularTags"
                        v-for="tag in showPopularTags" :key="tag.name" 
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="false"
                        :closeable="false"
                        v-on:clicked="catchTagClicked($event, tag.name)"
                        class="filterTag" />


              <tag-chip v-if="maxPopularTagNumber >= showPopularTags.length"
                class="filterTag" :name="'...'" />

            </v-flex>

            <v-flex v-if="showPlaceholder && selectedTags.length <= 0"
                    xs12 px-2 py-2 >

              <tag-chip-placeholder
                        v-for="n in 5" :key="n" 
                        :selectable="false"
                        :highlighted="false"
                        :closeable="false"
                        class="filterTag" />

            </v-flex>

            <v-card-actions class="pr-2">
            
              <filter-view-buttons :expanded.sync="expanded"
                                    :expandButtonText="expandButtonText"
                                    :expandedButtonText="expandedButtonText"
                                    v-on:clickedExpand="expandClicked"
                                    :mapExpanded="mapExpanded"
                                    :mapExpandButtonText="mapExpandButtonText"
                                    :mapExpandedButtonText="mapExpandedButtonText"
                                    v-on:clickedMapExpand="catchMapExpandClicked" >
              </filter-view-buttons>

            </v-card-actions>
            
          </v-layout>
        </v-card>


      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import TagChip from '../Cards/TagChip';
import TagChipPlaceholder from '../Cards/TagChipPlaceholder';
import SmallSearchBarView from './SmallSearchBarView';
import FilterExpandedView from './FilterExpandedView';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    searchTerm: String,
    searchCount: Number,
    autoCompleteTags: Array,
    selectedTagNames: Array,
    popularTags: Array,
    allTags: Array,
    searchViewLabelText: String,
    searchViewHasButton: Boolean,
    showPlaceholder: Boolean,
    mapExpanded: Boolean,
  },
  computed: {
    selectedTags: function selectedTags() {
      // always get the selected as a subset of the allTags because they are the full
      // tag JSON object
      const selecteds = [];

      if (this.selectedTagNames !== undefined && this.selectedTagNames.length > 0) {
        for (let i = 0; i < this.allTags.length; i++) {
          const element = this.allTags[i];

          if (this.isTagSelected(element.name)) {
            selecteds.push(element);
          }

          if (selecteds.length >= this.selectedTagNames.length) {
            break;
          }
        }
      }

      return selecteds;
    },
    showPopularTags: function showPopularTags() {
      // use this computed property to make the diff between popular and selected
      const popTags = [];

      this.allTags.forEach((element) => {
        if (this.isPopluarTag(element.name)
         && !this.isTagSelected(element.name)
         && this.isCleanTag(element.name)) {
          popTags.push(element);
        }
      });

      return popTags;
    },
    maxTagNumber: function maxTagNumber() {
      return this.getTagMaxAmout(this.selectedTags, this.maxSelectedTagsTextLength);
    },
    maxPopularTagNumber: function maxPopularTagNumber() {
      let maxTextLength = this.maxPopularTagsTextLength;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxTextLength = this.xsTextLength;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxTextLength = this.smTextLength;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        maxTextLength = this.mdTextLength;
      }

      const maxNumber = this.getTagMaxAmout(this.popularTags, maxTextLength);
      const combinedMax = maxNumber - this.selectedTags.length;

      return combinedMax >= 0 ? combinedMax : 0;
    },
    dynamicLayout: function dynamicLayout() {

    },
  },
  methods: {
    isCleanTag: function isCleanTag(tagName) {
      let maxWordsPerTag = 3;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxWordsPerTag = 2;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxWordsPerTag = 20;
      }

      return tagName.split(' ').length <= maxWordsPerTag;
    },
    getTagMaxAmout: function getTagMaxAmout(list, maxTextLength) {
      let textLength = 0;
      let numberOfTags = 0;

      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          const tag = list[i];

          if (tag) {
            textLength += tag.name.length + 1;

            if (textLength >= maxTextLength) {
              break;
            }

            numberOfTags++;
          }
        }
      }

      // console.log("numberOfTags " + numberOfTags + " " + textLength);
      return numberOfTags;
    },
    expandClicked: function expandClicked(expand) {
      this.expanded = expand;
    },
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
    isTagSelected: function isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    isPopluarTag: function isPopluarTag(tagName) {
      if (!tagName || this.popularTags === undefined) {
        return false;
      }

      return this.popularTags.findIndex(obj => obj.name === tagName) >= 0;
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTags.indexOf(tagId) >= 0;
    },
    minTagCountToBeVisible: function minTagCountToBeVisible() {
      let minCount = 5;

      if (this.$vuetify.breakpoint.xsOnly) {
        minCount = 25;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        minCount = 20;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        minCount = 10;
      }

      return minCount;
    },
  },
  data: () => ({
    expanded: false,
    expandButtonText: 'Show all tags',
    expandedButtonText: 'Hide all tags',
    clearButtonText: 'Clear Tags',
    mapFilterExpanded: false,
    mapExpandButtonText: 'Show Map',
    mapExpandedButtonText: 'Hide Map',
    // selectedTags: [],
    maxSelectedTagsTextLength: 25,
    maxPopularTagsTextLength: 250,
    xsTextLength: 25,
    smTextLength: 50,
    mdTextLength: 100,
  }),
  components: {
    TagChip,
    TagChipPlaceholder,
    SmallSearchBarView,
    FilterExpandedView,
    FilterViewButtons,
  },
};
</script>

<style>

  .envidat_subheading {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

  .filterTag {
    opacity: 0.7;
  }

  .chip__content span {
    cursor: pointer !important;
  }

</style>



