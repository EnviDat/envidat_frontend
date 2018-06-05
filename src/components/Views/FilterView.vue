<template>

    <v-layout row >

      <v-flex xs3>
          <search-bar-view
                          :labelText="searchViewLabelText"
                          :hasButton="serachViewHasButton"
                          v-on:clicked="catchSearchClicked">
          </search-bar-view>
      </v-flex>

      <v-flex xs9 px-3>

        <v-card hover>

          <v-layout row>

            <!-- TODO: dynamicaly change the width xs1 - 12 -->
            
            <tag-chip v-if="allTags" v-for="tag in allTags" :key="tag.id" 
                      :id="tag.id"
                      :name="tag.name"
                      :highlighted="tag.closeable"
                      :closeable="tag.closeable"
                      v-on:clicked="catchTagClicked($event, tag)"
                      v-on:closeClicked="catchTagCloseClicked($event, tag)"
                      class="header_tag" />

            <!--v-flex xs2 v-if="maxTagsReached">
              <tag-chip class="card_tag" :name="'...'" />
            </v-flex-->
          </v-layout>
            
          <v-spacer></v-spacer>
          
          <v-btn icon>
              <v-icon color="accent">key_down</v-icon>
          </v-btn>
            
        </v-card>


      </v-flex>

    </v-layout>

</template>

<script>
import TagChip from './Cards/TagChip';
import SearchBarView from './SearchBarView';

export default {
  props: {
    searchTerm: String,
    selectedTagids: Array,
    popularTags: Array,
    allTags: Array,
    searchViewLabelText: String,
    serachViewHasButton: Boolean,
  },
  updated: function updated() {
      if (this.selectedTagids !== undefined){
        this.selectedTagids.forEach(element => {
          const index = this.allTags.index(element);

          element.colseable = (element.id == this.allTags[index].id);
          console.log("element " + element.name + " " + element.colseable);
        });
      }      
  },
  methods: {
    catchSearchClicked: function catchSearchClicked(search) {
    },
    catchTagClicked: function catchTagClicked(tagId) {
      console.log("clicked " + tagId);

      const index = this.allTags.findIndex(obj => obj.id == tagId );      
      const tag = this.allTags[index];

      console.log("index " + index);
      
      if (tag == undefined || tag.colseable){
        return;
      }

      tag.colseable = true;

      if (this.selectedTagids !== undefined){
        this.selectedTagids.push(tagId);
      }
    },
    catchTagCloseClicked: function catchTagCloseClicked(tag) {
    },
    isSelected: function isSelected(tag){
      
    }
  },
  data: () => ({
    lableText: 'search',
    contactEmail: 'mustermann@wsl.ch',
    doi: 'envidat.2192318293',
    citation: 'somecitation',
  }),
  components: {
    TagChip,
    SearchBarView,
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



