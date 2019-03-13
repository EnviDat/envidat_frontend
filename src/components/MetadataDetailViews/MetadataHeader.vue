<template>
    <v-flex >

      <v-card elevation-5
              :class="{
                  'pa-4': $vuetify.breakpoint.smAndUp,
                  'pa-3': $vuetify.breakpoint.xsOnly,
                }"
              :dark="dark"
              color="primary"
              v-bind="{['style'] : dynamicCardBackground }"
      >

        <base-icon-button style="position: absolute; top: 0px; right: 0px;"
                          materialIconName="close"
                          :iconColor=" (showPlaceholder || !metadataTitle) ? 'white' : 'primary'"
                          :outlined="true"
                          toolTipText ="Close Metadata"
                          :toolTipBottom="true"
                          v-on:clicked="catchBackClicked" />


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
          class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer" >
          <div class='bone bone-type-multiline bone-style-steps' ></div>
        </div>

        <!-- <v-card-media></v-card-media> -->

        <v-divider :dark="dark" class="my-2" ></v-divider>

        <v-layout row wrap
                  v-if="authors"
                    >

          <tag-chip-author v-for="author in authors" :key="author.name"
                    :name="author.name.trim()"
                    :toolTipText="authorToolTipText"
                    v-on:clicked="catchAuthorClicked($event, author.name.trim())"
          />
        </v-layout>

        <v-layout row wrap 
                  v-if="!authors && showPlaceholder"
                  >

          <tag-chip-placeholder v-for="n in 5" :key="n" 
                    class="headerTag" />

        </v-layout>

        <v-divider :dark="dark" class="my-2" ></v-divider>

        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg3
                  py-1 class="headerInfo">
            <base-icon-label-view :text="contactName"
                                  :icon="contactIcon"
                                  iconTooltip="Main contact"
                                  :alignLeft="true"
                                  />
          </v-flex>

          <v-flex xs12 sm6 md6 lg3
                  py-1 class="headerInfo">
            <base-icon-label-view :text="contactEmail"
                                  :icon="mailIcon"
                                  iconTooltip="Email adress of the main contact"
                                  :alignLeft="true"
                                  :wordBreak="true"
                                  />
          </v-flex>

          <v-flex xs12 sm6 md6 lg3
                  py-1 class="headerInfo">
            <base-icon-label-view :text="doi"
                                  :icon="doiIcon"
                                  iconTooltip="Data Object Identifier"
                                  :alignLeft="true"
                                  :wordBreak="true"
                                  />
          </v-flex>

          <v-flex xs12 sm6 md6 lg3
                  py-1 class="headerInfo">
            <base-icon-label-view :text="license"
                                  :icon="licenseIcon"
                                  iconTooltip="License for Datafiles"
                                  :alignLeft="true"
                                  />
          </v-flex>
        </v-layout>

        <v-divider :dark="dark" class="my-2" ></v-divider>

        <v-layout row wrap 
                  v-if="tags"
                  >

          <tag-chip v-for="tag in slicedTags" :key="tag.name"
                    :name="tag.name"
                    :selectable="true"
                    v-on:clicked="catchTagClicked($event, tag.name)"
                    class="headerTag" />

          <v-flex xs2 v-if="tags && maxTagsReached && !showTagsExpanded">
            <tag-chip class="headerTag" :name="'...'" />
          </v-flex>
        </v-layout>

        <v-layout row wrap
                   v-if="!tags && showPlaceholder"
                  >

          <tag-chip-placeholder
                    v-for="n in 5" :key="n" 
                    class="headerTag" />

        </v-layout>
          
        <v-card-actions v-if="maxTagsReached"
                        style="position: absolute; bottom: 0px; right: 0px;" >

          <base-icon-button materialIconName="expand_more"
                            :outlined="true"
                            color="primary"
                            iconColor="accent"
                            :isToggled="showTagsExpanded"
                            :rotateOnClick="true"
                            :toolTipText="showTagsExpanded ? 'Hide all tags' : 'Show all tags'"
                            :toolTipBottom="true"
                            v-on:clicked="showTagsExpanded = !showTagsExpanded" />

        </v-card-actions>

      </v-card>


    </v-flex>
    
</template>

<script>
import TagChip from '@/components/Cards/TagChip';
import TagChipAuthor from '@/components/Cards/TagChipAuthor';
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
    metadataTitle: String,
    titleImg: String,
    contactName: String,
    contactEmail: String,
    doi: String,
    license: String,
    tags: Array,
    authors: Array,
    maxTags: Number,
    showPlaceholder: Boolean,
    doiIcon: String,
    contactIcon: String,
    mailIcon: String,
    licenseIcon: String,
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    authorToolTipText: 'Search for more data of this Author',
  }),
  methods: {
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchAuthorClicked: function catchAuthorClicked(authorName) {
      this.$emit('clickedAuthor', authorName);
    },
    catchBackClicked: function catchBackClicked() {
      this.$emit('clickedBack');
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
    TagChipAuthor,
    TagChipPlaceholder,
    BaseIconLabelView,
    BaseIconButton,
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



