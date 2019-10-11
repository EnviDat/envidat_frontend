<template>
  <v-card :class="{ ['pt-2']: this.isOnTop }">
    <v-card-title class="metadata_title title">Description</v-card-title>

    <v-card-text v-if="fullDescription"
                  ref="description"
                  class="heightAndScroll pb-4" >
      <m-markdown-preview :markdown="fullDescription"
                          :options="{ html: true,
                                      xhtmlOut: true,
                                      linkify: true,
                                      breaks: true }" />
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !fullDescription" >      
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !fullDescription"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

    <v-card-actions v-if="maxDescriptionLengthReached"
                    class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 0px;" >

      <base-icon-button class="mr-2"
                        material-icon-name="expand_more"
                        icon-color="accent"
                        color="accent"
                        outlined
                        :rotateOnClick="true"
                        :rotateToggle="showFullDescription"
                        :toolTipText="showFullDescription ? 'Hide full description' : 'Show full description'"
                        @clicked="showFullDescription = !showFullDescription" />

    </v-card-actions>

    <!-- <v-card-actions
      v-show="maxDescriptionLengthReached"
      :style="`position: absolute; bottom: 0; right: 0px;`"
    >
      <v-spacer />

      <v-btn icon
        @click.native="readMore()"
      >
        <v-icon color="accent"
          :style="this.showFullDescription ? 'transform: rotate(-180deg); font-size: 30px !important;' : 'transform: rotate(0deg); font-size: 30px !important;'"
        >
          expand_more
        </v-icon>
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import MMarkdownPreview from 'm-markdown-preview';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    MMarkdownPreview,
    BaseIconButton,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  // updated: function updated() {
  //   if (this.genericProps && !this.checkedGenericProps) {
  //     Object.assign(this, 'props', this.genericProps);

  //     this.checkedGenericProps = true;
  //   }
  // },
  data: () => ({
    isOnTop: false,
    showFullDescription: false,
    checkedGenericProps: false,
    maxTextLength: 1000,
    emptyText: 'No description found for this dataset.',
  }),
  computed: {
    description() {
      return this.mixinMethods_getGenericProp('description');
    },
    fullDescription() {
      if (this.description) {
        if (this.maxDescriptionLengthReached) {
          return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
        }

        return this.description.trim();
      }

      return '';
    },
    maxDescriptionLengthReached() {
      return this.description && this.description.length > this.maxTextLength;
    },
  },
  mounted() {
  },
  methods: {
    readMore() {
      this.showFullDescription = !this.showFullDescription;
    },
    rightPos() {
      return this.$refs.description && this.$refs.description.clientHeight >= 500 ? '10px' : '0';
    },
  },
};
</script>

<style scoped>

.heightAndScroll {
  max-height: 500px;
  overflow-y: auto !important;
}
</style>
