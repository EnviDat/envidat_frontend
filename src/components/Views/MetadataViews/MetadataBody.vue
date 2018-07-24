<template>

  <v-card :class="{ ['pt-2']: this.isOnTop }">
    
    <v-card-title class="metadata_title title" >Description</v-card-title>

    <v-card-text v-if="fullDescription" >{{ fullDescription }}</v-card-text>

    <v-card-text v-if="!fullDescription && showPlaceholder" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

<!-- {{ title | truncate(maxTitleLength) }} -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="readMore()">
        <v-icon color="accent" 
                :style="this.showFullDescription ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
        >expand_more</v-icon>
      </v-btn>        
    </v-card-actions>
  </v-card>
  
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      doi: String,
      description: String,
      isOnTop: Boolean,
      showPlaceholder: Boolean
    },
    mounted: function mounted() {
    },
    computed: {
      fullDescription: function fullDescription() {
        if (this.description !== undefined) {
          return this.showFullDescription ? this.description : `${this.description.substring(0, this.maxTextLength)}...`;
        }

        return '';
      },
    },
    data: () => ({
      showFullDescription: false,
      maxTextLength: 750,
    }),
    methods: {
      readMore: function readMore() {
        this.showFullDescription = !this.showFullDescription;
      },
    },
    components: {
    },
  };
</script>


