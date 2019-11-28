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

      <base-icon-button class="ma-2"
                        style="position: absolute; top: 0px; right: 0px; z-index: 2;"
                        material-icon-name="close"
                        icon-color="primary"
                        color="primary"
                        outlined
                        tool-tip-text="Close Metadata"
                        :tool-tip-bottom="true"
                        @clicked="catchBackClicked" />

      <v-layout row wrap
                :style="`position: relative; z-index: 1;`">

        <v-flex v-if="metadataTitle"
                xs12 >
          <div class="headerTitle"
                :style="$vuetify.breakpoint.xsOnly ? 'line-height: 1.2em;' : ''"
                :class="{ 'py-2': $vuetify.breakpoint.mdAndUp,
                          'py-0': $vuetify.breakpoint.smAndDown,
                          'display-2': $vuetify.breakpoint.xlAndUp,
                          'display-1': $vuetify.breakpoint.mdAndUp,
                          'headline': $vuetify.breakpoint.smOnly,
                          'subheading': $vuetify.breakpoint.xsOnly,
                        }" >
            {{ metadataTitle }}
          </div>
        </v-flex>

        <v-flex v-if="!metadataTitle && !showPlaceholder"
                xs12 >
          <div class="headerTitle py-3"
                :style="`color: ${$vuetify.theme.error}`"
                :class="{ 'display-2': $vuetify.breakpoint.lgAndUp,
                          'display-1': $vuetify.breakpoint.mdAndDown,
                          'headline': $vuetify.breakpoint.smAndDown,
                        }" >
            {{ `${NotFoundTitle} '${metadataId}'` }}
          </div>
        </v-flex>

        <v-flex v-if="!metadataTitle && showPlaceholder"
                xs12 >
          <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer" >
            <div class="bone bone-type-multiline bone-style-steps" />
          </div>
        </v-flex>

        <!-- <v-expand-transition @transitionend="expandFinished" @animationend="expandFinished" > -->
          <v-flex v-show="expanded"
                  xs12 >

            <v-flex v-if="authors"
                    xs12
                    key="authors_divier" >
              <v-divider :dark="dark"
                        :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                                  'my-2': $vuetify.breakpoint.smAndUp }" />
            </v-flex>

            <v-flex v-if="authors"
                    xs12
                    key="authors" >
              <v-layout row wrap >
                <tag-chip-author v-for="author in authors"
                                  :key="author.name"
                                  :name="authorName(author)"
                                  :tooltipText="authorToolTipText"
                                  @clicked="catchAuthorClicked($event, authorName(author))" />
              </v-layout>
            </v-flex>

            <v-flex v-if="!authors && showPlaceholder"
                    xs12
                    key="authors_placeholder" >
              <v-layout row wrap >
                <tag-chip-placeholder v-for="n in 5"
                                      :key="n"
                                      class="headerTag" />
              </v-layout>
            </v-flex>

            <v-flex xs12
                    key="headerinfo_divier" >
              <v-divider :dark="dark"
                        :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                                  'my-2': $vuetify.breakpoint.smAndUp }" />
            </v-flex>

            <v-flex xs12
                    key="headerinfo" >
              <v-layout row wrap >
                <v-flex xs12 sm6 md6 lg3
                        py-0
                        class="headerInfo" >
                  <base-icon-label-view :text="contactName"
                                        :icon="contactIcon"
                                        icon-tooltip="Main contact"
                                        :compactLayout="$vuetify.breakpoint.xs"
                                        :align-left="true" />
                </v-flex>

                <v-flex xs12 sm6 md6 lg3
                        py-0
                        class="headerInfo" >
                  <base-icon-label-view :text="contactEmail"
                                        :icon="mailIcon"
                                        icon-tooltip="Email adress of the main contact"
                                        :align-left="true"
                                        :compactLayout="$vuetify.breakpoint.xs"
                                        :word-break="true" />
                </v-flex>

                <v-flex xs12 sm6 md6 lg3
                        py-0
                        class="headerInfo" >
                  <base-icon-label-view :text="doi"
                                        :url="doiUrl"
                                        :icon="doiIcon"
                                        icon-tooltip="Data Object Identifier"
                                        :align-left="true"
                                        :compactLayout="$vuetify.breakpoint.xs"
                                        :word-break="true" />
                </v-flex>

                <v-flex xs12 sm6 md6 lg3
                        py-0
                        class="headerInfo" >
                  <base-icon-label-view :text="license"
                                        :icon="licenseIcon"
                                        icon-tooltip="License for the data files"
                                        :compactLayout="$vuetify.breakpoint.xs"
                                        :align-left="true" />
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex v-if="!showPlaceholder && tags"
                    xs12
                    key="tags_divier" >
              <v-divider :dark="dark"
                        :class="{ 'my-1': $vuetify.breakpoint.xsOnly,
                                  'my-2': $vuetify.breakpoint.smAndUp }" />
            </v-flex>

            <v-flex v-if="tags"
                    xs12
                    key="tags" >
              <v-layout row wrap >
                <tag-chip v-for="tag in slicedTags"
                          :key="tag.name"
                          :name="tag.name"
                          :selectable="true"
                          class="headerTag"
                          :color="tag.color"
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
                    xs12
                    key="tags_placeholder" >
              <v-layout row wrap >
                <tag-chip-placeholder v-for="n in 5"
                                      :key="n"
                                      class="headerTag" />
              </v-layout>
            </v-flex>
          </v-flex>
        <!-- </v-expand-transition> -->

      </v-layout>

      <v-card-actions v-if="maxTagsReached"
                      style="position: absolute; bottom: 0px; right: 0px;">
        <base-icon-button v-show="expanded"
                          materialIconName="expand_more"
                          :outlined="true"
                          color="primary"
                          iconColor="accent"
                          :isToggled="showTagsExpanded"
                          :rotateOnClick="true"
                          :rotateToggle="showTagsExpanded"
                          :tooltipText="showTagsExpanded ? 'Hide all tags' : 'Show all tags'"
                          :tooltipBottom="true"
                          @clicked="showTagsExpanded = !showTagsExpanded" />
      </v-card-actions>
    </v-card>
</template>

<script>
/**
 * MetadataHeader.vue shows the title, authors, keywords,
 * main contact, doi and license of a metadata entry.
 *
 * @summary shows the main infos the a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-14 17:39:28
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import TagChip from '@/components/Cards/TagChip';
import TagChipAuthor from '@/components/Cards/TagChipAuthor';
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

import metaDataFactory from '@/factories/metaDataFactory';

export default {
  components: {
    TagChip,
    TagChipAuthor,
    TagChipPlaceholder,
    BaseIconLabelView,
    BaseIconButton,
  },
  props: {
    metadataId: String,
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
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    authorToolTipText: 'Search for more data of this Author',
    NotFoundTitle: 'No metadata found for',
  }),
  computed: {
    maxTagsReached() {
      return this.tags ? this.tags.length >= this.maxTags : false;
    },
    slicedTags() {
      if (!this.tags) {
        return false;
      }

      if (this.showTagsExpanded) {
        return this.tags;
      }

      return this.tags.slice(0, this.maxTags);
    },
    dynamicCardBackground() {
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
    doiUrl() {
      return this.doi ? `https://www.datacite.org/doi/${this.doi}` : '';
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$emit('checkSize');
    });
  },
  methods: {
    // expandFinished() {
    //   console.log('finished');
    // },
    catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchAuthorClicked(authorName) {
      this.$emit('clickedAuthor', authorName);
    },
    catchBackClicked() {
      this.$emit('clickedBack');
    },
    iconFlip(icon) {
      const iconflip = this.dark ? `${icon}_w` : icon;
      return iconflip;
    },
    authorName: metaDataFactory.getAuthorName,
  },
};
</script>

<style scoped>

  .headerTitle {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 400;
    opacity: 1;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
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
