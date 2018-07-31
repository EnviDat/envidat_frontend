<template>

  <v-card :class="{ ['pt-2']: this.isOnTop }">
    
    <v-card-title class="metadata_title title" >Description</v-card-title>

    <v-card-text >
      <m-markdown-preview :markdown="fullDescription" :options="{html: true}" />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon 
              @click.native="readMore()">
        <v-icon color="accent" 
                :style="this.showFullDescription ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
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
    },
    mounted: function mounted() {
    },
    computed: {
      fullDescription: function fullDescription() {
        if (this.description !== undefined) {
          console.log("desc: " + this.description);
          return this.showFullDescription ? this.description.trim() : `${this.description.trim().substring(0, this.maxTextLength)}...`;
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
      MMarkdownPreview,
    },
  };
</script>


