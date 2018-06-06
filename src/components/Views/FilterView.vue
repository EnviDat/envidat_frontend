<template>

    <v-layout row >

      <v-flex xs3 ml-2 mr-2>
          <small-search-bar-view
                          :labelText="searchViewLabelText"
                          :hasButton="searchViewHasButton"
                          v-on:clicked="catchSearchClicked"
                          v-on:searchEmpty="catchSearchEmpty">
          </small-search-bar-view>
      </v-flex>

      <v-flex xs9 mr-2>
        
        <v-card hover>
          <v-layout row>

            <!-- TODO: dynamicaly change the width xs1 - 12 -->

            <v-flex xs11 px-2 py-2>

              <tag-chip v-if="allTags"
                        v-for="tag in allTags" :key="tag.id" 
                        :id="tag.id"
                        :name="tag.name"
                        :highlighted="isSelected(tag.id)"
                        :closeable="isSelected(tag.id)"
                        v-on:clicked="catchTagClicked($event, tag)"
                        v-on:clickedClose="catchTagCloseClicked($event, tag)"
                        class="header_tag" />

            <!--v-flex xs2 v-if="maxTagsReached">
              <tag-chip class="card_tag" :name="'...'" />
            </v-flex-->
            </v-flex>
            
            <v-spacer></v-spacer>
            
            <v-btn icon>
                <v-icon color="primary">expand_more</v-icon>
            </v-btn>
            
          </v-layout>
        </v-card>


      </v-flex>

    </v-layout>

</template>

<script>
import TagChip from './Cards/TagChip';
import SmallSearchBarView from './SmallSearchBarView';

export default {
  props: {
    searchTerm: String,
    selectedTagids: Array,
    popularTags: Array,
    allTags: Array,
    searchViewLabelText: String,
    searchViewHasButton: Boolean,
  },
  updated: function updated() {
    /*
    if (this.selectedTagids !== undefined) {
      this.selectedTagids.forEach(element => {
        const index = this.allTags.index(element);

        element.colseable = (element.id == this.allTags[index].id);
        console.log("element " + element.name + " " + element.colseable);
      });
    }
    */
  },
  methods: {
    catchSearchClicked: function catchSearchClicked() {
    },
    catchSearchEmpty: function catchSearchEmpty() {
      console.log("Search is empty");
    },
    catchTagClicked: function catchTagClicked(tagId) {
      const index = this.allTags.findIndex(obj => obj.id === tagId);
      const tag = this.allTags[index];

      console.log("add tag " + tag);

      if (tag === undefined || tag.colseable || this.selectedTagids === undefined) {
        return;
      }

      // tag.colseable = true;
      const exists = this.selectedTagids.indexOf(tagId) >= 0;

      console.log("exists " + exists);

      if (!exists) {
        this.selectedTagids.push(tagId);
        console.log("added " + tagId);
      }
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagId) {
      if (this.selectedTagids === undefined) {
        return;
      }

      const index = this.selectedTagids.indexOf(tagId);
      console.log("remove index " + index);
      if (index >= 0) {
        const removedTagId = this.selectedTagids.splice(index, 1);
        console.log("removed " + removedTagId);
      }
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTagids.indexOf(tagId) >= 0;
    },
  },
  data: () => ({
    lableText: 'search',
    contactEmail: 'mustermann@wsl.ch',
    doi: 'envidat.2192318293',
    citation: 'somecitation',
  }),
  components: {
    TagChip,
    SmallSearchBarView,
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



