<template>

  <v-card >
    <v-card-title class="metadata_title title" >Description</v-card-title>

    <v-card-text >{{ fullDescription }}</v-card-text>
<!-- {{ title | truncate(maxTitleLength) }} -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="readMore()">
        <v-icon color="accent" >{{ showFullDescription ? 'expand_less' : 'expand_more' }}</v-icon>
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


