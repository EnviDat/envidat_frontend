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
                          :labelText="searchViewLabelText"
                          :hasButton="searchViewHasButton"
                          v-on:clicked="catchSearchClicked"
                          v-on:searchEmpty="catchSearchEmpty">
          </small-search-bar-view>
      </v-flex>

      <v-flex xs12 sm9 
        v-bind="{
          ['py-2']: this.$vuetify.breakpoint.xsOnly,
        }"
      >
        
        <v-card v-if="expanded"
                hover>

          <v-layout column px-2 pt-2>

            <v-flex xs12 >

              <tag-chip v-if="selectedTags"
                        v-for="tag in selectedTags" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="isSelected(tag.id)"
                        :closeable="isSelected(tag.id)"
                        v-on:clicked="catchTagClicked($event, tag)"
                        v-on:clickedClose="catchTagCloseClicked($event, tag)"
                        class="header_tag" />

            </v-flex>

            <v-flex xs12>

              <tag-chip v-if="unselectedTags"
                        v-for="tag in unselectedTags" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="isSelected(tag.id)"
                        :closeable="isSelected(tag.id)"
                        v-on:clicked="catchTagClicked($event, tag)"
                        v-on:clickedClose="catchTagCloseClicked($event, tag)"
                        class="header_tag" />

            </v-flex>

          </v-layout>
            
          <v-card-actions>
                        
            <filter-view-buttons :expanded.sync="expanded"
                                  :expandButtonText="expandButtonText"
                                  :expandedButtonText="expandedButtonText"
                                  v-on:clickedExpand="expandClicked" >
            </filter-view-buttons>
            
          </v-card-actions>
            
        </v-card>

        <v-card v-else
                hover>

          <v-layout row>

            <v-flex xs12 px-2 py-2 >

              <tag-chip v-if="selectedTags"
                        v-for="tag in selectedTags.slice (0, maxTagNumber)" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="isSelected(tag.id)"
                        :closeable="isSelected(tag.id)"
                        v-on:clicked="catchTagClicked($event, tag)"
                        v-on:clickedClose="catchTagCloseClicked($event, tag)"
                        class="header_tag" />

              <tag-chip v-if="unselectedTags"
                        v-for="tag in unselectedTags" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :selectable="false"
                        :highlighted="isSelected(tag.id)"
                        :closeable="isSelected(tag.id)"
                        v-on:clicked="catchTagClicked($event, tag)"
                        v-on:clickedClose="catchTagCloseClicked($event, tag)"
                        class="header_tag" />

            </v-flex>
            
            <filter-view-buttons :expanded.sync="expanded"
                                  :expandButtonText="expandButtonText"
                                  :expandedButtonText="expandedButtonText"
                                  v-on:clickedExpand="expandClicked" >
            </filter-view-buttons>
            
          </v-layout>
        </v-card>


      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import TagChip from './Cards/TagChip';
import SmallSearchBarView from './SmallSearchBarView';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    searchTerm: String,
    selectedTagids: Array,
    popularTags: Array,
    allTags: Array,
    searchViewLabelText: String,
    searchViewHasButton: Boolean,
  },
  computed: {
    selectedTags: function selectedTags() {
      const selecteds = [];

      this.allTags.forEach((element) => {
        if (this.tagIsSelected(element.id)) {
          selecteds.push(element);
        }
      });

      return selecteds;
    },
    unselectedTags: function unselectedTags() {
      const unselecteds = [];

      this.allTags.forEach((element) => {
        if (!this.tagIsSelected(element.id)) {
          unselecteds.push(element);
        }
      });

      return unselecteds;
    },
    maxTagNumber: function maxTagNumber() {
      let textLength = 0;
      let numberOfTags = 0;

      if (this.selectedTags !== undefined) {
        for (let i = 0; i < this.selectedTags.length; i++) {
          textLength += this.selectedTags[i].name.length + 1;

          if (textLength >= this.maxProposedTagsTextLength) {
            break;
          }

          numberOfTags++;
        }
      }

      // console.log("numberOfTags " + numberOfTags + " " + textLength);
      return numberOfTags;
    },
  },
  methods: {
    expandClicked: function expandClicked(expand) {
      this.expanded = expand;
    },
    catchSearchEmpty: function catchSearchEmpty() {
      console.log("Search is empty");
    },
    catchSearchClicked: function catchSearchClicked() {
    },
    tagIsSelected: function tagIsSelected(tagId) {
      if (!tagId || this.selectedTagids === undefined) {
        return false;
      }

      return this.selectedTagids.indexOf(tagId) >= 0;
    },
    catchTagClicked: function catchTagClicked(tagId) {
      const index = this.allTags.findIndex(obj => obj.id === tagId);
      const tag = this.allTags[index];

      if (!tag || tag.colseable) {
        return;
      }

      if (!this.tagIsSelected(tagId)) {
        this.selectedTagids.push(tagId);
      }
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagId) {
      if (this.selectedTagids === undefined) {
        return;
      }

      const index = this.selectedTagids.indexOf(tagId);

      if (index >= 0) {
        this.selectedTagids.splice(index, 1);
      }
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTagids.indexOf(tagId) >= 0;
    },
  },
  data: () => ({
    expanded: false,
    expandButtonText: 'Show all tags',
    expandedButtonText: 'Hide all tags',
    maxProposedTagsTextLength: 50,
  }),
  components: {
    TagChip,
    SmallSearchBarView,
    FilterViewButtons,
  },
};
</script>

<style scoped>

  .envidat_subheading {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

  .header_tag {
    opacity: 0.7;
  }

</style>



