<template>
    <v-flex >

      <v-card elevation-5 class="px-4 py-2" dark color="primary">

        <!--h1 class="py-3" >{{ metadataTitle }} id: {{ $route.params.id }}</h1-->
        <div class="display-2 headerTitle py-3">{{ metadataTitle }}</div>  

        <v-card-media></v-card-media>

      <!-- </v-card>

      <v-card class="px-4 py-2" dark color="primary"> -->

        <v-divider dark class="my-2" ></v-divider>

        <v-layout py-1 row wrap>
          <v-flex xs6 class="headerInfo">
            <icon-label-view  :text="contactName"
                              :icon="getIcon('contact2_w')"
                              iconTooltip="Main contact"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="doi"
                              :icon="getIcon('doi_w')"
                              iconTooltip="Data Object Identifier"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="contactEmail"
                              :icon="getIcon('mail_w')"
                              iconTooltip="Email adress of the main contact"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view :text="license"
                              :icon="getIcon('license_w')"
                              iconTooltip="License for Datafiles"
                              :alignLeft="true"
                               />
          </v-flex>
        </v-layout>

        <v-divider dark class="my-2" ></v-divider>

        <v-layout row wrap>

          <tag-chip v-if="tags" v-for="tag in slicedTags" :key="tag.id"
                    :id="tag.id"
                    :name="tag.name"
                    :closeable="tag.closeable"
                    class="headerTag" />

          <v-flex xs2 v-if="maxTagsReached && !showTagsExpanded">
            <tag-chip class="headerTag" :name="'...'" />
          </v-flex>
        </v-layout>
          
        <v-card-actions v-if="maxTagsReached">
          <v-spacer></v-spacer>
          <v-btn icon @click.native="showTagsExpanded = !showTagsExpanded">
            <v-icon color="accent" >{{ showTagsExpanded ? 'expand_less' : 'expand_more' }}</v-icon>
          </v-btn>        
        </v-card-actions>

      </v-card>


    </v-flex>
    
</template>

<script>
import TagChip from '../Cards/TagChip';
import IconLabelView from '../IconLabelView';

export default {
  props: {
    metadataTitle: String,
    contactName: String,
    contactEmail: String,
    doi: String,
    license: String,
    tags: Array,
    maxTags: Number,
  },
  data: () => ({
    showTagsExpanded: false,
  }),
  computed: {
    maxTagsReached: function maxTagsReached() {
      return this.tags ? this.tags.length >= this.maxTags : false;
    },
    slicedTags: function slicedTags() {
      if (!this.tags) {
        return false;
      }

      if (this.showTagsExpanded) {
        return this.tags;
      }

      return this.tags.slice(0, this.maxTags);
    },
  },
  components: {
    TagChip,
    IconLabelView,
  },
};
</script>

<style scoped>

  .headerTitle {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 1;
  }

  .headerInfo {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

  .headerInfo img,
  .headerInfo > .envidatIcon {
    opacity: 0.85;
  }

  .headerTag {
    opacity: 0.75;
  }

</style>



