<template>

  <v-card raised>

    <v-layout column px-2 pt-2>
      <v-flex xs12 >
        <v-layout row>

          <v-flex xs1 py-2 class="metadataInfoIcon" >
            
            <icon-label-view :icon="mixinMethods_getIcon('tag')" 
                              iconTooltip="Filtered Tags" 
                              />
          </v-flex>

          <v-flex xs9 >

            <tag-chip v-if="selectedTags"
                      v-for="tag in selectedTags" :key="tag.name"
                      :name="tag.name"
                      :selectable="false"
                      :highlighted="true"
                      :closeable="true"
                      v-on:clicked="catchTagClicked($event, tag.name)"
                      v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                      class="filterTag" />

          </v-flex>

          <v-flex xs1 >
            <v-btn v-if="selectedTags.length > 0"
                    small
                    flat 
                    @click.native="catchClearTags">
                {{ clearButtonText }}
                <v-icon color="red" style="font-size: 20px !important">close</v-icon>
            </v-btn>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex >
        <v-layout row>

          <v-flex xs1 py-2 class="metadataInfoIcon" >

            <icon-label-view :icon="mixinMethods_getIcon('tags')" 
                              iconTooltip="All Tags" 
                              />
          </v-flex>

          <v-flex xs11>

            <tag-chip v-if="unselectedTags"
                      v-for="tag in unselectedTags" :key="tag.name" 
                      :name="tag.name"
                      :selectable="false"
                      :highlighted="false"
                      :closeable="false"
                      v-on:clicked="catchTagClicked($event, tag.name)"
                      v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                      class="filterTag" />

          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>

    <v-card-actions>
      <v-spacer />

      <filter-view-buttons :expanded.sync="expanded"
                            :expandButtonText="expandButtonText"
                            :expandedButtonText="expandedButtonText"
                            :showClearTags="true"
                            :clearButtonText="clearButtonText"
                            v-on:clickedExpand="catchExpandClicked"
                            v-on:clickedClearTags="catchClearTags"
                            :mapExpanded="mapExpanded"
                            :mapExpandButtonText="mapExpandButtonText"
                            :mapExpandedButtonText="mapExpandedButtonText"
                            v-on:clickedMapExpand="catchMapExpandClicked" >
                            
      </filter-view-buttons>

    </v-card-actions>
            
  </v-card>

</template>

<script>
import TagChip from '../Cards/TagChip';
import IconLabelView from '../IconLabelView';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    allTags: Array,
    selectedTagNames: Array,
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    mapExpanded: Boolean,
    mapExpandButtonText: String,
    mapExpandedButtonText: String,
    clearButtonText: String,
    minTagCountToBeVisible: Number,
  },
  computed: {
    selectedTags: function selectedTags() {
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
    unselectedTags: function unselectedTags() {
      const unselecteds = [];

      for (let i = 0; i < this.allTags.length; i++) {
        const element = this.allTags[i];

        // if (element.count > this.minTagCountToBeVisible) {
        if (!this.isTagSelected(element.name)) {
          unselecteds.push(element);
        }
        // }
      }

      return unselecteds;
    },
  },
  methods: {
    isTagSelected: function isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    catchExpandClicked: function catchExpandClicked() {
      this.$emit('clickedExpand');
    },
    catchMapExpandClicked: function catchMapExpandClicked() {
      this.$emit('clickedMapExpand');
    },
    catchTagClicked: function catchTagClicked(tagName) {
      this.$emit('clickedTag', tagName);
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagName) {
      this.$emit('clickedTagClose', tagName);
    },
    catchClearTags: function catchClearTags() {
      this.$emit('clickedClear');
    },
  },
  components: {
    TagChip,
    IconLabelView,
    FilterViewButtons,
  },
};
</script>




