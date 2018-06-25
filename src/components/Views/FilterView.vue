<template>

  <v-container grid-list-md>

    <v-layout 
      v-bind="{
        ['row']: this.$vuetify.breakpoint.smAndUp,
        ['column']: this.$vuetify.breakpoint.xsOnly,
       }"
    row>

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
                      :selectedTagids="selectedTagids"
                      :popularTagids="popularTagids"
                      :expanded="expanded"
                      :expandButtonText="expandButtonText"
                      :expandedButtonText = "expandedButtonText"
                      :clearButtonText="clearButtonText"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedExpand="expandClicked"
                      v-on:clickedClear="catchTagCleared"
                      >
        </filter-expanded-view>

        <v-card v-else
                hover>

          <v-layout row align-center align-content-center >

            <v-flex xs12 px-2 py-2 >
              <!-- <v-icon>assignment</v-icon> -->

              <tag-chip v-if="selectedTags.length > 0"
                        v-for="tag in selectedTags.slice(0, maxTagNumber)" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="true"
                        :closeable="true"
                        v-on:clickedClose="catchTagCloseClicked($event, tag.id)"
                        class="header_tag" />

              <tag-chip v-if="popularTags"
                        v-for="tag in popularTags" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="false"
                        :closeable="false"
                        v-on:clicked="catchTagClicked($event, tag.id)"
                        class="header_tag" />


              <tag-chip v-if="maxPopularTagNumber >= popularTags.length"
                class="header_tag" :name="'...'" />

            </v-flex>
            
            <v-card-actions class="pr-2">
            
              <filter-view-buttons :expanded.sync="expanded"
                                    :expandButtonText="expandButtonText"
                                    :expandedButtonText="expandedButtonText"
                                    v-on:clickedExpand="expandClicked" >
              </filter-view-buttons>

            </v-card-actions>
            
          </v-layout>
        </v-card>


      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import TagChip from './Cards/TagChip';
import SmallSearchBarView from './SmallSearchBarView';
import FilterExpandedView from './FilterExpandedView';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    searchTerm: String,
    searchCount: Number,
    autoCompleteTags: Array,
    selectedTagids: Array,
    popularTagids: Array,
    allTags: Array,
    searchViewLabelText: String,
    searchViewHasButton: Boolean,
  },
  computed: {
    selectedTags: function selectedTags() {
      const selecteds = [];

      if (this.selectedTagids !== undefined && this.selectedTagids.length > 0) {
        for (let i = 0; i < this.allTags.length; i++) {
          const element = this.allTags[i];

          if (this.isTagSelected(element.id)) {
            selecteds.push(element);
          }

          if (selecteds.length >= this.selectedTagids.length) {
            break;
          }
        }
      }

      return selecteds;
    },
    popularTags: function popularTags() {
      const popTags = [];

      this.allTags.forEach((element) => {
        if (!this.isPopluarTag(element.id)
         && !this.isTagSelected(element.id)) {
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

      const maxNumber = this.getTagMaxAmout(this.popularTagids, maxTextLength);
      const combinedMax = maxNumber - this.selectedTags.length;

      return combinedMax >= 0 ? combinedMax : 0;
    },
  },
  methods: {
    getTagMaxAmout: function getTagMaxAmout(list, maxTextLength) {
      let textLength = 0;
      let numberOfTags = 0;

      if (list !== undefined) {
        for (let i = 0; i < list.length; i++) {
          textLength += list[i].length + 1;

          if (textLength >= maxTextLength) {
            break;
          }

          numberOfTags++;
        }
      }

      // console.log("numberOfTags " + numberOfTags + " " + textLength);
      return numberOfTags;
    },
    expandClicked: function expandClicked(expand) {
      this.expanded = expand;
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
    isTagSelected: function isTagSelected(tagId) {
      if (!tagId || this.selectedTagids === undefined) {
        return false;
      }

      return this.selectedTagids.indexOf(tagId) >= 0;
    },
    isPopluarTag: function isPopluarTag(tagId) {
      if (!tagId || this.popularTagids === undefined) {
        return false;
      }

      return this.popularTagids.indexOf(tagId) >= 0;
    },
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagId) {
      this.$emit('clickedTagClose', tagId);
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTagids.indexOf(tagId) >= 0;
    },
  },
  data: () => ({
    expanded: false,
    expandButtonText: 'Show all tags',
    expandedButtonText: 'Hide all tags',
    clearButtonText: 'Clear Tags',
    // selectedTagids: [],
    maxSelectedTagsTextLength: 25,
    maxPopularTagsTextLength: 250,
    xsTextLength: 25,
    smTextLength: 50,
    mdTextLength: 100,
  }),
  components: {
    TagChip,
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

  .header_tag {
    opacity: 0.7;
  }

</style>



