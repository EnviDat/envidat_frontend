<template>

  <v-card raised>

    <v-layout column
              fill-height
              py-1
    >

      <v-flex xs12 px-2 py-2
                v-if="!expanded">
        <div>Filter for Keywords</div>
      </v-flex>

      <v-flex xs12 px-2 py-2 
                v-if="expanded">
        <v-layout row
                  fill-height
                  v-bind="{
                    ['align-center']: this.$vuetify.breakpoint.smAndUp,
                    ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
                  }"
        >

            <v-flex pl-2
                    class="metadataInfoIcon" 
            >
              <icon-label-view :icon="getIcon('tags')"
                                iconTooltip="Possible Keywords"
              />
            </v-flex>

            <v-flex xs12
                    px-2 
            >

              <tag-chip v-if="showPopularTags && tag.enabled"
                        v-for="tag in showPopularTags"
                        :key="tag.name" 
                        :name="tag.name"
                        :selectable="tag.enabled"
                        :highlighted="false"
                        :closeable="false"
                        v-on:clicked="catchTagClicked($event, tag.name)"
                        class="filterTag" />

            </v-flex>


        </v-layout>

      </v-flex>


      <v-flex xs12 px-2 py-2
                v-if="expanded">

        <v-layout row
                  fill-height
                  v-bind="{
                    ['align-center']: this.$vuetify.breakpoint.smAndUp,
                    ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
                  }"
        >

            <v-flex pl-2
                    class="metadataInfoIcon" 
            >
              <icon-label-view :icon="getIcon('tag')"
                                iconTooltip="Active Keyword filter"
              />
            </v-flex>

            <v-flex xs12
                    px-2
            >

              <tag-chip v-if="selectedTags.length > 0"
                        v-for="tag in selectedTags" :key="tag.name" 
                        :name="tag.name"
                        :selectable="true"
                        :highlighted="true"
                        :closeable="true"
                        v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                        v-on:clicked="catchTagCloseClicked($event, tag.name)"
                        class="filterTag" />

            </v-flex>

            <!-- <v-flex  >

              <v-btn icon
                      @click="clearTags">
                <img class="envidatIcon" :src="getIcon('tagRemove')" />
              </v-btn>

            </v-flex> -->

        </v-layout>

      </v-flex>

    </v-layout>

    <v-card-actions style="position: absolute; top: 0; right: 0;">
      <v-spacer />

      <v-btn icon color="accent" 
              @click="catchExpandClicked"
              :style="expanded ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
        >expand_more
      </v-btn>
    </v-card-actions>
            
  </v-card>

</template>

<script>
import TagChip from '../Cards/TagChip';
import IconLabelView from '../IconLabelView';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    selectedTagNames: Array,
    popularTags: Array,
    allTags: Array,
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
    showPopularTags: function showPopularTags() {
      // use this computed property to make the diff between popular and selected
      const popTags = [];

      this.popularTags.forEach((element) => {
        if (element.enabled && !this.isTagSelected(element.name)) {
          popTags.push(element);
        }
      });

      return popTags;
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




