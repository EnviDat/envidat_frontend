<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title class="metadata_title title" >Description</v-card-title>

        <v-card-text >{{ fullDescription }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="readMore()">
            <v-icon color="accent" >{{ showFullDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>        
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
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
      this.fullDescription = this.shortDesciption;
    },
    computed: {
      shortDesciption: function shortDesciption() {
        return this.description !== undefined ? `${this.description.substring(0, 1000)}...` : '';
      },
    },
    data: () => ({
      showFullDescription: false,
      fullDescription: this.shortDesciption,
    }),
    methods: {
      readMore: function readMore() {
        this.showFullDescription = !this.showFullDescription;
        this.fullDescription = this.showFullDescription ? this.description : this.shortDesciption;
      },
    },
    components: {
    },
  };
</script>


