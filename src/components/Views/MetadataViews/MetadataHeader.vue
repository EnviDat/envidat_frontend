<template>
    <v-flex >

      <v-card elevation-5 class="px-4 py-2" dark color="primary">

        <!--h1 class="py-3" >{{ metadataTitle }} id: {{ $route.params.id }}</h1-->
        <div v-if="metadataTitle"
            class="display-2 headerTitle py-3">
          {{ metadataTitle }}
        </div>
        
        <div v-if="!metadataTitle && showPlaceholder"
          class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-pulse" >
          <div class='bone bone-type-multiline bone-style-steps' ></div>
        </div>

        <!-- <v-card-media></v-card-media> -->


        <v-divider dark class="my-2" ></v-divider>

        <v-layout row wrap>
          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="contactName"
                              :icon="getIcon('contact2_w')"
                              iconTooltip="Main contact"
                              :alignLeft="true" :usePlaceholder="showPlaceholder" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="doi"
                              :icon="getIcon('doi_w')"
                              iconTooltip="Data Object Identifier"
                              :alignLeft="true" :usePlaceholder="showPlaceholder" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="contactEmail"
                              :icon="getIcon('mail_w')"
                              iconTooltip="Email adress of the main contact"
                              :alignLeft="true" :usePlaceholder="showPlaceholder" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view :text="license"
                              :icon="getIcon('license_w')"
                              iconTooltip="License for Datafiles"
                              :alignLeft="true" :usePlaceholder="showPlaceholder" />
          </v-flex>
        </v-layout>

        <v-divider dark class="my-2" ></v-divider>

        <v-layout row wrap>

          <tag-chip v-if="tags"
                    v-for="tag in slicedTags" :key="tag.name"
                    :name="tag.name"
                    v-on:clicked="catchTagClicked($event, tag.name)"
                    class="headerTag" />

          <v-flex xs2 v-if="tags && maxTagsReached && !showTagsExpanded">
            <tag-chip class="headerTag" :name="'...'" />
          </v-flex>


          <tag-chip-placeholder v-if="!tags && showPlaceholder"
                    v-for="n in 5" :key="n" 
                    :selectable="false"
                    :highlighted="false"
                    :closeable="false"
                    class="headerTag" />

        </v-layout>
          
        <v-card-actions v-if="maxTagsReached">
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <v-btn icon @click.native="showTagsExpanded = !showTagsExpanded" slot="activator">
              <v-icon color="accent" 
                      :style="this.showTagsExpanded ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
              >expand_more</v-icon>
            </v-btn>        
            <span>Show all tags</span>
          </v-tooltip>
        </v-card-actions>

      </v-card>


    </v-flex>
    
</template>

<script>
import TagChip from '../Cards/TagChip';
import TagChipPlaceholder from '../Cards/TagChipPlaceholder';
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
    showPlaceholder: Boolean
  },
  data: () => ({
    showTagsExpanded: false,
  }),
  methods: {
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
  },
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
    TagChipPlaceholder,
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



