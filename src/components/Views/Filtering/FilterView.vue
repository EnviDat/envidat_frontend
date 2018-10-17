<template>
  <v-card raised
  >
    <v-layout style="min-height: 48px;"
              row
              v-bind="{
                ['align-center']: this.$vuetify.breakpoint.smAndUp,
                ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
              }"
      >

      <v-flex pl-2 py-2 class="metadataInfoIcon"
              >

        <!-- <img :src="getIcon('filter2')" /> -->

        <icon-label-view :icon="getIcon('filter2')"
                          iconTooltip="Keyword filtering"
                          />
      </v-flex>

      <v-flex xs12 px-2 py-2 >

        <tag-chip v-if="selectedTags.length > 0"
                  v-for="tag in selectedTags" :key="tag.name" 
                  :name="tag.name"
                  :selectable="true"
                  :highlighted="true"
                  :closeable="true"
                  v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                  v-on:clicked="catchTagCloseClicked($event, tag.name)"
                  class="filterTag" />

        <tag-chip v-if="showPopularTags && tag.enabled"
                  v-for="tag in showPopularTags"
                  :key="tag.name" 
                  :name="tag.name"
                  :selectable="tag.enabled"
                  :highlighted="false"
                  :closeable="false"
                  v-on:clicked="catchTagClicked($event, tag.name)"
                  class="filterTag" />


        <!-- <tag-chip v-if="showPopularTags.length >= maxPopularTagNumber"
          class="filterTag" :name="'...'"
          @click.native="catchExpandClicked"
        /> -->

      </v-flex>

      <v-flex v-if="showPlaceholder && selectedTags.length <= 0"
              xs9 px-2 py-2 >

        <tag-chip-placeholder
                  v-for="n in 5" :key="n" 
                  :selectable="false"
                  :highlighted="false"
                  :closeable="false"
                  class="filterTag" />

      </v-flex>

      <!-- <v-flex xs3
        v-bind="{
          ['py-2']: this.$vuetify.breakpoint.xsOnly,
        }"
      >
        <v-btn small
                flat
                color="primary"
                @click.stop="toggleExpand">
            {{ expanded ? expandedButtonText : expandButtonText }}
            <v-icon color="accent">{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>

      </v-flex> -->

      <!-- <v-flex xs3>
        <filter-view-buttons
                              :expanded="expanded"
                              :expandButtonText="expandButtonText"
                              :expandedButtonText="expandedButtonText"
                              v-on:clickedExpand="catchExpandClicked"
                              :mapExpanded="mapExpanded"
                              :mapExpandButtonText="mapExpandButtonText"
                              :mapExpandedButtonText="mapExpandedButtonText"
                              v-on:clickedMapExpand="catchMapExpandClicked" >
        </filter-view-buttons>
      </v-flex> -->

      
    </v-layout>
  </v-card>
</template>

<script>
import IconLabelView from '../IconLabelView';
import TagChip from '../Cards/TagChip';
import TagChipPlaceholder from '../Cards/TagChipPlaceholder';
import FilterViewButtons from './FilterViewButtons';

export default {
  props: {
    selectedTagNames: Array,
    popularTags: Array,
    allTags: Array,
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    showPlaceholder: Boolean,
    mapExpanded: Boolean,
    mapExpandButtonText: String,
    mapExpandedButtonText: String,
    isHighlighted: Boolean,
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

      this.popularTags.forEach((element) => {
        if (element.enabled && !this.isTagSelected(element.name)) {
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
      } else if (this.$vuetify.breakpoint.lgAndDown) {
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
    catchExpandClicked: function catchExpandClicked() {
      this.$emit('clickedExpand');
    },
    catchMapExpandClicked: function catchMapExpandClicked() {
      this.$emit('clickedMapExpand');
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
    maxSelectedTagsTextLength: 25,
    maxPopularTagsTextLength: 250,
    xsTextLength: 25,
    smTextLength: 50,
    mdTextLength: 65,
  }),
  components: {
    IconLabelView,
    TagChip,
    TagChipPlaceholder,
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

</style>



