<template>
    <v-card :class="{
              'pa-4': $vuetify.breakpoint.smAndUp,
              'pa-3': $vuetify.breakpoint.xsOnly,
            }"
            :dark="dark"
            :color="(showPlaceholder || (!showPlaceholder && !metadataTitle)) ? 'primary' : 'white'" >

      <div v-bind="{['style'] : dynamicCardBackground }" >
        <!-- this loads the background image -->
      </div>

      <base-icon-button style="position: absolute; top: 0px; right: 0px; z-index: 2;"
                        material-icon-name="close"
                        icon-color="primary"
                        :color="(showPlaceholder || (!showPlaceholder && !metadataTitle)) ? 'white' : 'primary'"
                        :outlined="(!showPlaceholder && metadataTitle)"
                        tool-tip-text="Close Metadata"
                        :tool-tip-bottom="true"
                        @clicked="catchBackClicked" />

      <v-layout row wrap
                :style="`position: relative; z-index: 1;`">

        <v-flex v-if="metadataTitle"
                xs12 >
          <div class="headerTitle py-3"
                :class="{ 'display-2': $vuetify.breakpoint.lgAndUp,
                          'display-1': $vuetify.breakpoint.mdAndDown,
                          'headline': $vuetify.breakpoint.smAndDown,
                }" >
            {{ metadataTitle }}
          </div>
        </v-flex>

        <v-flex v-if="!metadataTitle && showPlaceholder"
                xs12 >
          <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer" >
            <div class="bone bone-type-multiline bone-style-steps" />
          </div>
        </v-flex>

        <v-flex xs12 >
          <v-divider :dark="dark"
                    :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                              'my-2': $vuetify.breakpoint.smAndUp }" />
        </v-flex>

        <v-flex v-if="authors"
                xs12 >
          <v-layout row wrap >
            <tag-chip-author
              v-for="author in authors"
              :key="author.name"
              :name="author.name.trim()"
              :tool-tip-text="authorToolTipText"
              @clicked="catchAuthorClicked($event, author.name.trim())" />
          </v-layout>
        </v-flex>


        <v-flex v-if="!authors && showPlaceholder"
                xs12 >
          <v-layout row wrap >
            <tag-chip-placeholder v-for="n in 5"
                                  :key="n"
                                  class="headerTag" />
          </v-layout>
        </v-flex>

        <v-flex xs12 >
          <v-divider :dark="dark"
                    :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                              'my-2': $vuetify.breakpoint.smAndUp }" />
        </v-flex>

        <v-flex xs12 >
          <v-layout row wrap >
            <v-flex xs12 sm6 md6 lg3
                    py-0
                    class="headerInfo" >
              <base-icon-label-view :text="contactName"
                                    :icon="contactIcon"
                                    icon-tooltip="Main contact"
                                    :align-left="true" />
            </v-flex>

            <v-flex xs12 sm6 md6 lg3
                    py-0
                    class="headerInfo" >
              <base-icon-label-view :text="contactEmail"
                                    :icon="mailIcon"
                                    icon-tooltip="Email adress of the main contact"
                                    :align-left="true"
                                    :word-break="true" />
            </v-flex>

            <v-flex xs12 sm6 md6 lg3
                    py-0
                    class="headerInfo" >
              <base-icon-label-view :text="doi"
                                    :icon="doiIcon"
                                    icon-tooltip="Data Object Identifier"
                                    :align-left="true"
                                    :word-break="true" />
            </v-flex>

            <v-flex xs12 sm6 md6 lg3
                    py-0
                    class="headerInfo" >
              <base-icon-label-view :text="license"
                                    :icon="licenseIcon"
                                    icon-tooltip="License for Datafiles"
                                    :align-left="true" />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12 >
          <v-divider :dark="dark"
                    :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                              'my-2': $vuetify.breakpoint.smAndUp }" />
        </v-flex>

        <v-flex v-if="tags"
                xs12 >
          <v-layout row wrap >
            <tag-chip v-for="tag in slicedTags"
                      :key="tag.name"
                      :name="tag.name"
                      :selectable="true"
                      class="headerTag"
                      @clicked="catchTagClicked($event, tag.name)" />

            <v-flex v-if="tags && maxTagsReached && !showTagsExpanded"
                    xs2 >
              <tag-chip class="headerTag"
                        :name="'...'"
                        @click.native="showTagsExpanded = !showTagsExpanded" />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex v-if="!tags && showPlaceholder"
                xs12 >
          <v-layout row wrap >
            <tag-chip-placeholder v-for="n in 5"
                                  :key="n"
                                  class="headerTag" />
          </v-layout>
        </v-flex>

      </v-layout>

      <v-card-actions v-if="maxTagsReached"
                      style="position: absolute; bottom: 0px; right: 0px;" >
        <base-icon-button material-icon-name="expand_more"
                          :outlined="true"
                          color="primary"
                          icon-color="accent"
                          :is-toggled="showTagsExpanded"
                          :rotate-on-click="true"
                          :rotate-toggle="showTagsExpanded"
                          :tool-tip-text="showTagsExpanded ? 'Hide all tags' : 'Show all tags'"
                          :tool-tip-bottom="true"
                          @clicked="showTagsExpanded = !showTagsExpanded" />
      </v-card-actions>
    </v-card>
</template>

<script>
import TagChip from '@/components/Cards/TagChip';
import TagChipAuthor from '@/components/Cards/TagChipAuthor';
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    TagChip,
    TagChipAuthor,
    TagChipPlaceholder,
    BaseIconLabelView,
    BaseIconButton,
  },
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

      let style = `position: absolute; top: 0px; right: 0px;
                    height: 100%; width: 100%;
                    background-image: linear-gradient(0deg, ${gradient});
                    background-position: center, center; background-size: cover;
                    background-repeat: initial;
                    z-index: 0;`;

      if (this.titleImg) {
        style += `background-image: linear-gradient(0deg, ${gradient}), url(${this.titleImg});
        filter: blur(2px);`;
      }

      return style;
    },
  },
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
