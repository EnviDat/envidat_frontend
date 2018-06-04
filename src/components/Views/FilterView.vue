<template>
  <v-layout row >

    <v-flex xs3>
        <search-bar-view
                        :labelText="searchViewLabelText"
                        :hasButton="serachViewHasButton"
                        v-on:clicked="catchSearchClicked">
        </search-bar-view>
    </v-flex>

    <v-flex xs9>

      <v-card hover class="px-4 py-2">

        <v-layout row>

          <!-- TODO: dynamicaly change the width xs1 - 12 -->
          <v-flex xs2 v-if="tags" v-for="tag in allTags" :key="tag.id" >
            <tag-chip :id="tag.id"
                      :name="tag.name"
                      :closeable="tag.closeable"
                      class="header_tag" />
          </v-flex>

          <!--v-flex xs2 v-if="maxTagsReached">
            <tag-chip class="card_tag" :name="'...'" />
          </v-flex-->
        </v-layout>
          
        <v-spacer></v-spacer>
        
        <v-btn v-if="favourit" icon>
            <v-icon color="accent">star</v-icon>
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
    selectedTags: Array,
    popularTags: Array,
    allTags: Array,
    searchViewLabelText: String,
    serachViewHasButton: Boolean,
  },
  methods: {
    catchSearchClicked: function catchSearchClicked(search) {
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



