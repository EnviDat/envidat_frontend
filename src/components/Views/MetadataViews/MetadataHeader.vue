<template>
    <v-flex >

      <v-card elevation-5 class="px-4" dark color="primary">

        <!--h1 class="py-3" >{{ metadataTitle }} id: {{ $route.params.id }}</h1-->
        <div class="display-2 metadata_title py-3">{{ metadataTitle }}</div>  

        <v-card-media></v-card-media>

      </v-card>

      <v-card class="px-4 py-2" dark color="primary">

        <v-layout row wrap>
          <v-flex xs6 class="envidat_subheading">
              <v-icon>person</v-icon> {{ contactName }} 
          </v-flex>

          <v-flex xs6 class="envidat_subheading">
            <div class="my-1">
              <v-icon>call_received</v-icon> {{ doi }} 
            </div>
          </v-flex>

          <v-flex xs6 class="envidat_subheading">
            <v-icon>email</v-icon> {{ contactEmail }}
          </v-flex>

          <v-flex xs6 class="envidat_subheading">
            <div class="my-1">
              <v-icon>format_quote</v-icon> {{ citation }} 
            </div>          
          </v-flex>
        </v-layout>

        <v-divider dark class="my-2" ></v-divider>

        <v-layout row wrap>

          <tag-chip v-if="tags" v-for="tag in tags" :key="tag.id"
                    :id="tag.id"
                    :name="tag.name"
                    :closeable="tag.closeable"
                    class="header_tag" />

          <!--v-flex xs2 v-if="maxTagsReached">
            <tag-chip class="card_tag" :name="'...'" />
          </v-flex-->
        </v-layout>
          
      </v-card>


    </v-flex>
    
</template>

<script>
import TagChip from '../Cards/TagChip';

export default {
  props: {
    metadataTitle: String,
    contactName: String,
    contactEmail: String,
    doi: String,
    citation: String,
    tags: Array,
  },
  // mounted: function mounted() {
  //   console.log("mounted header " + this.metadataTitle);
  // },
  components: {
    TagChip,
  },
};
</script>

<style scoped>

  .envidat_subheading {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

  .header_tag {
    opacity: 0.7;
  }

</style>



