<template>
  <v-card color="primary"
          class="metadataResourceCard white--text"
          style="height: 100%;" >

    <v-card-title>
      <div class="headline">
        {{ name }}
      </div>
    </v-card-title>

    <v-card-text class="pt-0"
                :class="{ 'pb-3': $vuetify.breakpoint.mdAndUp,
                          'pb-5': $vuetify.breakpoint.smAndDown, }" >
      <v-container class="pa-0" >
        <v-row :class="{ 'pb-5': $vuetify.breakpoint.mdAndUp }" >

          <v-col :class="{ 'cols-xs-6': !this.twoColumnLayout && !showFullDescription,
                           'cols-xs-12': this.twoColumnLayout || showFullDescription }"
                  order="1"
                  order-sm="3" >
            <v-row >
              <v-col v-if="showFullDescription"
                      class="white_text readableText resourceCardText heightAndScroll"
                      v-html="markdownText" >
              </v-col>

              <v-col v-if="!showFullDescription"
                      class="white_text readableText resourceCardText" >
                {{ markdownTextTruncated }}
              </v-col>
            </v-row>
          </v-col>

          <v-col v-if="!showFullDescription"
                  class="hidden-sm-and-up"
                  order="2" >
            <v-divider :dark="dark"
                        class="my-1" />
          </v-col>

          <v-col v-if="!showFullDescription"
                  :class="{ [`cols-xs-6`]: !this.twoColumnLayout ,
                            [`cols-xs-12`]: this.twoColumnLayout,
                            [`pt-3`]: this.twoColumnLayout }"
                  order="3"
                  order-sm="1"
                  class="resourceInfo" >
            <v-row v-if="doi"
                    no-gutters>
              <v-col class="px-0 py-1 white_text" >
                <base-icon-label-view :text="doi"
                                      :icon="doiIcon"
                                      icon-tooltip="Data Object Identifier"
                                      :align-left="twoColumnLayout" />
              </v-col>
            </v-row >

            <v-row v-if="format" 
                    no-gutters>
              <v-col class="px-0 py-1 white_text" >
                <base-icon-label-view :text="format"
                                      :icon="extensionIcon()"
                                      icon-tooltip="Format of the file"
                                      :align-left="twoColumnLayout" />
              </v-col>
            </v-row >

            <v-row v-if="size"
                    no-gutters>
              <v-col class="px-0 py-1 white_text" >
                <base-icon-label-view :text="formatedBytes"
                                      :icon="fileSizeIcon"
                                      icon-tooltip="Filesize"
                                      :align-left="twoColumnLayout" />
              </v-col>
            </v-row >

            <v-row v-if="created"
                    no-gutters >
              <v-col class="px-0 py-1 white_text" >
                <base-icon-label-view :text="created"
                                      :icon="dateCreatedIcon"
                                      icon-tooltip="Date of file creation"
                                      :align-left="twoColumnLayout" />
              </v-col>
            </v-row >

            <v-row v-if="lastModified"
                    no-gutters>
              <v-col class="px-0 py-1 white_text" >
                <base-icon-label-view :text="lastModified"
                                      :icon="lastModifiedIcon"
                                      icon-tooltip="Date of last modification"
                                      :align-left="twoColumnLayout" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0px; right: 50px;" >

      <base-icon-button v-if="maxDescriptionLengthReached"
                        class="mr-2"
                        material-icon-name="expand_more"
                        :iconColor="showFullDescription ? 'primary' : 'accent'"
                        color="accent"
                        :outlined="true"
                        :isToggled="showFullDescription"
                        :rotateOnClick="true"
                        :rotateToggle="showFullDescription"
                        :tooltipText="showFullDescription ? 'Hide full description' : 'Show full description'"
                        @clicked="showFullDescription = !showFullDescription" />
    </v-card-actions>

    <div class="ma-0 py-3"
          style="position: absolute; bottom: 0px; right: 0px;" >

      <div v-if="isProtected"
            class="fabMenu fabPosition elevation-2 ma-2 pl-2 pt-2" >

        <v-icon class="pl-1 pt-1">shield</v-icon>
        <p class="pt-2 lockedText black--text resourceCardText"
            v-html="protectedText">
        </p>
      </div>

      <base-icon-button v-if="!isProtected"
                        class="fabPosition ma-2"
                        style="height: 40px; width: 40px;"
                        :customIcon="isFile ? downloadIcon : linkIcon"
                        color="accent"
                        :isElevated="true"
                        :tooltipText="isFile ? 'Download file' : 'Open link'"
                        :url="url" />
    </div>
  </v-card>
</template>


<script>
/**
 * ResourceCard.vue create a card with a download link to a specific resource of a dataset.
 *
 * @summary card with download link of file or link to another downlaod
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-29 14:39:55
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import remark from 'remark';
import html from 'remark-html';
import strip from 'strip-markdown';

import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';

export default {
  components: {
    BaseIconLabelView,
    BaseIconButton,
  },
  props: {
    id: String,
    doi: String,
    name: String,
    description: String,
    url: String,
    created: String,
    lastModified: String,
    size: Number,
    format: String,
    twoColumnLayout: Boolean,
    height: String,
    dark: Boolean,
    downloadIcon: String,
    linkIcon: String,
    doiIcon: String,
    fileSizeIcon: String,
    dateCreatedIcon: String,
    lastModifiedIcon: String,
    isProtected: Boolean,
    fileExtensionIcon: Map,
    metadataContact: String,
  },
  data: () => ({
    maxDescriptionLength: 175,
    showFullDescription: false,
    audioFormats: ['mp3', 'wav', 'wma', 'ogg'],
  }),
  computed: {
    markdownText() {
      return remark().use(html).processSync(this.description.trim());
    },
    markdownTextTruncated() {
      if (this.maxDescriptionLengthReached) {
        const strippedFile = remark().use(strip).processSync(this.description.trim());
        const strippedMarkdown = strippedFile.contents;

        if (strippedMarkdown) {
          return `${strippedMarkdown.substring(0, this.maxDescriptionLength)}...`;
        }

        return '';
      }

      return this.description.trim();      
    },
    formatedBytes() {
      if (!this.size) return '';

      let sizeNumber = this.size;

      if (typeof this.size === 'number') {
        sizeNumber = Number.parseInt(this.size, 10);
      }

      return this.mixinMethods_formatBytes(sizeNumber);
    },
    isLink() {
      return this.format && (this.format.toLowerCase() === 'link' || this.format.toLowerCase() === 'url');
    },
    isFile() {
      let isFile = (!this.format || !(this.format.toLowerCase() === 'link' || this.format.toLowerCase() === 'url'));

      if (isFile && this.url) {
        const splits = this.url.split('/');
        const lastPart = splits[splits.length - 1];
        isFile = lastPart.includes('.');
      }

      return isFile;
    },
    maxDescriptionLengthReached() {
      return this.description && this.description.length > this.maxDescriptionLength;
    },
    protectedText() {
      if (this.url && this.url.length > 0) {
        return `This resource is protected <a href="${this.url}" target="_blank" >login via the ckan UI to get access</a>.`;
      }

      return `Could not load the resource, please contact ${this.metadataContact} for getting access or envidat@wsl.ch for support.`;
    },
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
    extensionIcon() {
      if (typeof this.mixinMethods_getIconFileExtension === 'undefined'
          || typeof this.$store === 'undefined') {

        const lookUp = `file${this.format.toLowerCase()}`;
        let icon = this.fileExtensionIcon.get(lookUp);

        if (!icon && this.audioFormats.includes(this.format)) {
          icon = this.fileExtensionIcon.get('fileAudio');
        }

        if (!icon) {
          icon = this.fileExtensionIcon.get('file');
        }

        // alert('icon ' + icon);
        return icon;
      }

      if (this.audioFormats.includes(this.format)) {
        return this.mixinMethods_getIcon('Audio');
      }

      let extIcon = this.mixinMethods_getIconFileExtension(this.format);

      if (!extIcon && this.format.toLowerCase() === 'url') {
        extIcon = this.linkIcon;
      }

      if (extIcon) {
        return extIcon;
      }

      return this.mixinMethods_getIcon('file');
    },
  },
};
</script>

<style scoped>

  .black_title {
    color: rgba(0,0,0,.87) !important;
  }

  .white_text {
    color: rgba(255, 255, 255, 1) !important;
  }

  .white_title {
    color: rgba(255,255,255,.9) !important;
  }

  .heightAndScroll {
    max-height: 400px;
    overflow-y: auto !important;
    scrollbar-width: thin;
  }

  .fabPosition {
    position: absolute; bottom: 0px; right: 0px;
  }

  .fabMenu {
    width: 48px;
    height: 48px;
    background-color: #FFD740;
    border-radius: 50%;
    transition: .3s;
  }

  .fabMenu:hover {
    background: #FFF;
    min-width: 160px;
    width: 100%;
    height: 100%;
    min-height: 160px;
    border-radius: 3px 3px;
    visibility: visible;
  }

  .lockedText {
    visibility: hidden;
    opacity: 0;
    transition: 0.1s;
  }

  .fabMenu:hover .lockedText {
    visibility: visible;
    transition: 0.5s;
    opacity: 1;
  }

  .resourceInfo {
    font-size: 10px !important;
    opacity: 0.9;
  }
</style>
