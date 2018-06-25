<template>

  <v-card hover raised>

    <v-layout column px-2 pt-2>
      <v-flex >
        <v-layout row>

          <v-flex xs1 py-2>
            <div>
              <!-- <v-icon>assignment</v-icon> -->
               Filtered Tags</div>
          </v-flex>

          <v-flex xs11 >

            <tag-chip v-if="selectedTags"
                      v-for="tag in selectedTags" :key="tag.id" 
                      :id="tag.id"
                      :name="tag.name"
                      :selectable="false"
                      :highlighted="isSelected(tag.id)"
                      :closeable="isSelected(tag.id)"
                      v-on:clicked="catchTagClicked($event, tag.id)"
                      v-on:clickedClose="catchTagCloseClicked($event, tag.id)"
                      class="header_tag" />

          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex >
        <v-layout row>

          <v-flex xs1 py-2>
            <div>All Tags</div>
          </v-flex>

          <v-flex xs11>

            <tag-chip v-if="unselectedTags"
                      v-for="tag in unselectedTags" :key="tag.id" 
                      :id="tag.id"
                      :name="tag.name"
                      :selectable="false"
                      :highlighted="isSelected(tag.id)"
                      :closeable="isSelected(tag.id)"
                      v-on:clicked="catchTagClicked($event, tag.id)"
                      v-on:clickedClose="catchTagCloseClicked($event, tag.id)"
                      class="header_tag" />

          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
      
    <v-card-actions>
                  
      <filter-view-buttons :expanded.sync="expanded"
                            :expandButtonText="expandButtonText"
                            :expandedButtonText="expandedButtonText"
                            :showClearTags="true"
                            :clearButtonText="clearButtonText"
                            v-on:clickedExpand="expandClicked"
                            v-on:clickedClearTags="catchClearClicked"
                             >
      </filter-view-buttons>
      
    </v-card-actions>
      
  </v-card>

</template>

<script>
import TagChip from './Cards/TagChip';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    allTags: Array,
    selectedTagids: Array,
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    clearButtonText: String,
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
    unselectedTags: function unselectedTags() {
      const unselecteds = [];

      for (let i = 0; i < this.allTags.length; i++) {
        const element = this.allTags[i];

        if (!this.isTagSelected(element.id)) {
          unselecteds.push(element);
        }
      }

      return unselecteds;
    },
  },
  methods: {
    isTagSelected: function isTagSelected(tagId) {
      if (!tagId || this.selectedTagids === undefined) {
        return false;
      }

      return this.selectedTagids.indexOf(tagId) >= 0;
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTagids.indexOf(tagId) >= 0;
    },
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagId) {
      this.$emit('clickedTagClose', tagId);
    },
    expandClicked: function expandClicked(tagId) {
      this.$emit('clickedExpand', tagId);
    },
    catchClearClicked: function catchClearClicked(tagId) {
      this.$emit('clickedClear', tagId);
    },
  },
  components: {
    TagChip,
    FilterViewButtons,
  },
};
</script>




