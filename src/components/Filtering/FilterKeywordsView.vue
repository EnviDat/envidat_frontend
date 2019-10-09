<template>
  <v-card raised
          class="pa-2" >

    <v-layout column >

      <v-flex v-if="!filterExpanded"
              hidden-sm-and-up
              xs12 px-2 py-2 >
        <div class="mx-3">
          Filter for Keywords
        </div>
      </v-flex>

      <v-flex v-if="filterExpanded || $vuetify.breakpoint.smAndUp"
              xs12 mt-1
                  :class="$vuetify.breakpoint.smAndDown ? 'px-0 pl-1' : 'px-2'" >
        <v-layout row
                  fill-height
                  v-bind="{ ['align-center']: $vuetify.breakpoint.smAndUp,
                            ['align-content-center']: $vuetify.breakpoint.smAndUp,
                          }" >

          <v-flex class="metadataInfoIcon"
                  :class="$vuetify.breakpoint.smAndDown ? '' : 'pl-2'" >
            <base-icon-label-view :icon="tagsIcon"
                                  :compact-layout="compactLayout"
                                  icon-tooltip="Possible Keywords" />
          </v-flex>

          <v-flex v-if="showPlaceholder"
                  xs12 py-0
                  :class="$vuetify.breakpoint.smAndDown ? 'px-0' : 'px-2'" >

            <tag-chip-placeholder v-for="n in 6"
                                  :key="n"
                                  py-0 class="card_tag_placeholder" />
          </v-flex>

          <v-flex v-if="!showPlaceholder"
                  xs12 py-0
                  :class="$vuetify.breakpoint.smAndDown ? 'px-0' : 'px-2'" >

            <tag-chip v-for="tag in unselectedTags"
                      :key="tag.name"
                      :name="tag.name"
                      :selectable="tag.enabled"
                      :highlighted="false"
                      :closeable="false"
                      class="filterTag"
                      :color="getTagColor(tag.name)"
                      @clicked="catchTagClicked($event, tag.name)" />
          </v-flex>
        </v-layout>
      </v-flex>


      <v-flex v-if="filterExpanded || $vuetify.breakpoint.smAndUp"
              xs12 mt-1
                  :class="$vuetify.breakpoint.smAndDown ? 'px-0 pl-1' : 'px-2'" >
        <v-layout row
                  fill-height
                  v-bind="{ ['align-center']: $vuetify.breakpoint.smAndUp,
                            ['align-content-center']: $vuetify.breakpoint.smAndUp,
                          }" >

          <v-flex pl-2 class="metadataInfoIcon" >
            <base-icon-label-view :icon="tagIcon"
                                  :compact-layout="compactLayout"
                                  icon-tooltip="Active Keyword filter" />
          </v-flex>

          <v-flex v-if="selectedTags.length > 0"
                  xs12 py-0
                  :class="$vuetify.breakpoint.smAndDown ? 'px-0' : 'px-2'" >

            <tag-chip v-for="tag in selectedTags"
                      :key="tag.name"
                      :name="tag.name"
                      :selectable="true"
                      :highlighted="true"
                      :closeable="true"
                      class="filterTag"
                      @clickedClose="catchTagCloseClicked($event, tag.name)"
                      @clicked="catchTagCloseClicked($event, tag.name)" />
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>

    <v-card-actions v-if="$vuetify.breakpoint.xsOnly"
                    class="ma-0 pa-1"
                    style="position: absolute; bottom: 0px; right: 0px;"
    >
      <base-icon-button :count="selectedTags.length"
                        material-icon-name="expand_more"
                        color="secondary"
                        icon-color="secondary"
                        :outlined="true"
                        :is-small="true"
                        :rotate-on-click="true"
                        :rotate-toggle="filterExpanded"
                        @clicked="catchExpandClicked"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { METADATA_NAMESPACE } from '@/store/metadataMutationsConsts';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import TagChip from '@/components/Cards/TagChip';
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';

export default {
  components: {
    BaseIconLabelView,
    BaseIconButton,
    TagChip,
    TagChipPlaceholder,
  },
  props: {
    selectedTagNames: Array,
    allTags: Array,
    // expanded: Boolean,
    // expandButtonText: String,
    // expandedButtonText: String,
    showPlaceholder: Boolean,
    compactLayout: Boolean,
  },
  data: () => ({
    maxSelectedTagsTextLength: 25,
    maxUnselectedTagsTextLength: 250,
    xsTextLength: 25,
    smTextLength: 50,
    mdTextLength: 65,
    tagIcon: null,
    tagsIcon: null,
    filterExpanded: false,
  }),
  computed: {
    ...mapGetters({
      categoryCards: `${METADATA_NAMESPACE}/categoryCards`,
    }),
    unselectedTags() {
      const unselectedTags = [];

      this.allTags.forEach((element) => {
        if (element.enabled && !this.isTagSelected(element.name)) {
          unselectedTags.push(element);
        }
      });

      return unselectedTags;
    },
    selectedTags() {
      // always get the selected as a subset of the allTags because they are the full
      // tag JSON object
      const selecteds = [];

      if (this.selectedTagNames !== undefined && this.selectedTagNames.length > 0) {
        for (let i = 0; i < this.selectedTagNames.length; i++) {
          const element = this.selectedTagNames[i];

          selecteds.push({ name: element, enabled: true });
        }
      }

      return selecteds;
    },
    maxTagNumber() {
      return this.getTagMaxAmout(this.selectedTags, this.maxSelectedTagsTextLength);
    },
    maxUnselectedTagNumber() {
      let maxTextLength = this.maxUnselectedTagsTextLength;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxTextLength = this.xsTextLength;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxTextLength = this.smTextLength;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        maxTextLength = this.mdTextLength;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        maxTextLength = this.mdTextLength;
      }

      const maxNumber = this.getTagMaxAmout(this.allTags, maxTextLength);
      const combinedMax = maxNumber - this.selectedTags.length;

      return combinedMax >= 0 ? combinedMax : 0;
    },
  },
  beforeMount: function beforeMount() {
    this.tagIcon = this.mixinMethods_getIcon('tag');
    this.tagsIcon = this.mixinMethods_getIcon('tags');
  },
  methods: {
    clearTags() {
      this.$emit('clickedClear');
    },
    isCleanTag(tagName) {
      let maxWordsPerTag = 3;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxWordsPerTag = 2;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxWordsPerTag = 20;
      }

      return tagName.split(' ').length <= maxWordsPerTag;
    },
    getTagMaxAmout(list, maxTextLength) {
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
    getTagColor(tagName) {
      return this.mixinMethods_getTagColor(this.categoryCards, tagName);
    },
    catchExpandClicked() {
      this.filterExpanded = !this.filterExpanded;
      // this.$emit('clickedExpand');
    },
    catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchTagCloseClicked(tagId) {
      this.$emit('clickedTagClose', tagId);
    },
    isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    isSelected(tagId) {
      return this.selectedTags.indexOf(tagId) >= 0;
    },
    minTagCountToBeVisible() {
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
};
</script>

<style>

  .envidat_subheading {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

</style>
