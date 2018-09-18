<template>

  <v-card :class="{ ['pt-2']: this.isOnTop }">
    
    <v-card-title class="metadata_title title" >Description</v-card-title>

<!--
    <v-card-text v-if="fullDescription" >{{ fullDescription }}</v-card-text>

    <v-card-text v-if="!fullDescription && showPlaceholder" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

 {{ title | truncate(maxTitleLength) }} -->
    <v-card-text >
      <m-markdown-preview :markdown="fullDescription" :options="{html: true}" />
    </v-card-text>

    <v-card-actions>
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
      id: String,
      title: String,
      doi: String,
      description: String,
      isOnTop: Boolean,
      showPlaceholder: Boolean,
    },
    mounted: function mounted() {
    },
    computed: {
      fullDescription: function fullDescription() {
        if (this.description !== undefined) {
          return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
        }

        return '';
      },
    },
    data: () => ({
      showFullDescription: false,
      maxTextLength: 1000,
    }),
    methods: {
      readMore: function readMore() {
        this.showFullDescription = !this.showFullDescription;
      },
    },
    components: {
      MMarkdownPreview,
    },
  };
</script>


