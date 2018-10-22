<template>
    <v-flex >

      <v-card elevation-5
              class="px-4 py-2"
              :dark="dark"
              color="primary"
              v-bind="{['style'] : dynamicCardBackground }"
      >

        <v-tooltip bottom style="position: absolute; top 0; right: 0;">

          <v-btn icon flat
                  color="primary"
                  style="font-size: 30px !important;"
                  @click.native="$router.go(-1)" slot="activator">
            <v-icon>close</v-icon>
          </v-btn>        
          <span>Close Metadata</span>

        </v-tooltip>

        <!--h1 class="py-3" >{{ metadataTitle }} id: {{ $route.params.id }}</h1-->
        <div v-if="metadataTitle"
            class="headerTitle py-3"
            :class="{ 'display-2': $vuetify.breakpoint.lgAndUp,
                      'display-1': $vuetify.breakpoint.mdAndDown, 
                      'headline': $vuetify.breakpoint.smAndDown, 
                      }">
          {{ metadataTitle }}
        </div>
        
        <div v-if="!metadataTitle && showPlaceholder"
          class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-pulse" >
          <div class='bone bone-type-multiline bone-style-steps' ></div>
        </div>

        <!-- <v-card-media></v-card-media> -->


        <v-divider :dark="dark" class="my-2" ></v-divider>

        <v-layout row wrap>
          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="contactName"
                              :icon="getIcon(this.iconFlip('contact2'))"
                              iconTooltip="Main contact"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="doi"
                              :icon="getIcon(iconFlip('doi'))"
                              iconTooltip="Data Object Identifier"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view  :text="contactEmail"
                              :icon="getIcon(iconFlip('mail'))"
                              iconTooltip="Email adress of the main contact"
                              :alignLeft="true" />
          </v-flex>

          <v-flex xs6 py-1 class="headerInfo">
            <icon-label-view :text="license"
                              :icon="getIcon(iconFlip('license'))"
                              iconTooltip="License for Datafiles"
                              :alignLeft="true"
                               />
          </v-flex>
        </v-layout>

        <v-divider :dark="dark" class="my-2" ></v-divider>

        <v-layout row wrap>

          <tag-chip v-if="tags"
                    v-for="tag in slicedTags" :key="tag.name"
                    :name="tag.name"
                    :selectable="true"
                    v-on:clicked="catchTagClicked($event, tag.name)"
                    class="headerTag" />

          <v-flex xs2 v-if="tags && maxTagsReached && !showTagsExpanded">
            <tag-chip class="headerTag" :name="'...'" />
          </v-flex>


          <tag-chip-placeholder v-if="!tags && showPlaceholder"
                    v-for="n in 5" :key="n" 
                    class="headerTag" />

        </v-layout>
          
        <v-card-actions v-if="maxTagsReached"
                        class="ma-0 pa-2"
                        style="position: absolute; bottom: 5px; right: 5px;" >
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <v-btn fab outline small color="primary"
                    @click.native="showTagsExpanded = !showTagsExpanded" slot="activator">
              <v-icon  color="accent"
                      :style="this.showTagsExpanded ? 'transform: rotate(-180deg); font-size: 30px !important;' : 'transform: rotate(0deg); font-size: 30px !important;'"
              >expand_more</v-icon>
            </v-btn>        
            <span>{{ this.showTagsExpanded ? 'Hide all tags' : 'Show all tags' }}</span>
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
    titleImg: String,
    contactName: String,
    contactEmail: String,
    doi: String,
    license: String,
    tags: Array,
    maxTags: Number,
    showPlaceholder: Boolean,
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
  }),
  methods: {
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    iconFlip: function iconFlip(icon) {
      const iconflip = this.dark ? `${icon}_w` : icon;
      return iconflip;
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
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.titleImg) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.titleImg});
        background-position: center, center; background-size: cover;
        background-repeat: initial;`;
      }

      return '';
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
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 400;
    opacity: 1;
  }

  .headerInfo {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 400;
    opacity: 0.85;
  }

  .headerInfo img,
  .headerInfo > .envidatIcon {
    opacity: 0.85;
  }

  .headerTag {
    opacity: 0.85;
  }

</style>



