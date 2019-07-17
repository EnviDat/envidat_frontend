<template>

  <v-card :class="{ ['pt-2']: this.isOnTop }">
    
    <v-card-title class="metadata_title title" >Description</v-card-title>

    <v-card-text v-if="fullDescription"
                 class="heightAndScroll pb-4"
                 ref="description" >
      <m-markdown-preview :markdown="fullDescription" :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }" />
    </v-card-text>

    <div v-if="showPlaceholder && !fullDescription">
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </div>

    <v-card-text v-if="!showPlaceholder && !fullDescription"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

    <v-card-actions v-show="maxDescriptionLengthReached"
                    :style="`position: absolute; bottom: 0; right: 0px;`" >

      <v-spacer></v-spacer>

      <v-btn icon
              @click.native="readMore()">
        <v-icon color="accent" 
                :style="this.showFullDescription ? 'transform: rotate(-180deg); font-size: 30px !important;' : 'transform: rotate(0deg); font-size: 30px !important;'"
        >expand_more</v-icon>
      </v-btn>        
    </v-card-actions>
  </v-card>
  
</template>

<script>
  import MMarkdownPreview from 'm-markdown-preview';

  export default {
    props: {
      genericProps: Object,
    },
    mounted: function mounted() {
    },
    computed: {
      doi() {
        return this.mixinMethods_getGenericProp('doi');
      },
      title() {
        return this.mixinMethods_getGenericProp('title');
      },
      id() {
        return this.mixinMethods_getGenericProp('id');
      },
      description() {
        return this.mixinMethods_getGenericProp('description');
      },
      fullDescription: function fullDescription() {
        if (this.description !== undefined) {
          if (this.maxDescriptionLengthReached) {
            return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
          }

          return this.description.trim();
        }

        return '';
      },
      maxDescriptionLengthReached: function maxDescriptionLengthReached() {
        return this.description && this.description.length > this.maxTextLength;
      },
    },
    // updated: function updated() {
    //   if (this.genericProps && !this.checkedGenericProps) {
    //     Object.assign(this, 'props', this.genericProps);

    //     this.checkedGenericProps = true;
    //   }
    // },
    data: () => ({
      isOnTop: false,
      showPlaceholder: false,
      showFullDescription: false,
      checkedGenericProps: false,
      maxTextLength: 1000,
      emptyText: 'No description found for this dataset',
    }),
    methods: {
      readMore: function readMore() {
        this.showFullDescription = !this.showFullDescription;
      },
      rightPos() {
        return this.$refs.description && this.$refs.description.clientHeight >= 500 ? '10px' : '0';
      },
    },
    components: {
      MMarkdownPreview,
    },
  };
</script>

<style scoped>

.heightAndScroll {
  max-height: 500px;
  overflow-y: auto !important;
}
</style>
