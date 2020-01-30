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
      <v-container grid-list-xs
                    pa-0 >
        <v-layout v-bind="{ ['row']: $vuetify.breakpoint.smAndUp,
                            ['wrap']: $vuetify.breakpoint.smAndUp,
                            ['column']: $vuetify.breakpoint.xsOnly, }" >
          <v-flex v-bind="{ [`xs6`]: !this.twoColumnLayout && !showFullDescription,
                            [`xs12`]: this.twoColumnLayout || showFullDescription }"
                  order-xs1
                  order-sm3 >
            <v-layout column>
              <v-flex v-if="showFullDescription"
                      xs11
                      pb-4
                      class="resourceCardText heightAndScroll" >
                {{ description }}
              </v-flex>

              <v-flex v-if="!showFullDescription"
                      xs11
                      class="resourceCardText" >
                {{ description | truncate(maxDescriptionLength) }}
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex v-if="!showFullDescription"
                  order-xs2
                  hidden-sm-and-up >
            <v-divider :dark="dark"
                        class="my-1" />
          </v-flex>

          <v-flex v-if="!showFullDescription"
                  v-bind="{ [`xs6`]: !this.twoColumnLayout ,
                            [`xs12`]: this.twoColumnLayout,
                            [`pt-3`]: this.twoColumnLayout }"
                  order-xs3
                  order-sm1 >
            <v-layout column>
              <v-flex v-if="doi"
                      px-0 py-1 >
                <base-icon-label-view :text="doi"
                                      :icon="doiIcon"
                                      icon-tooltip="Data Object Identifier"
                                      :align-left="twoColumnLayout" />
              </v-flex>

              <v-flex v-if="format"
                      px-0 py-1 >
                <base-icon-label-view :text="format"
                                      :icon="extensionIcon()"
                                      icon-tooltip="Format of the file"
                                      :align-left="twoColumnLayout" />
              </v-flex>

              <v-flex v-if="size"
                      px-0 py-1 >
                <base-icon-label-view :text="formatedBytes"
                                      :icon="fileSizeIcon"
                                      icon-tooltip="Filesize"
                                      :align-left="twoColumnLayout" />
              </v-flex>

              <v-flex v-if="created"
                      px-0 py-1 >
                <base-icon-label-view :text="created"
                                      :icon="dateCreatedIcon"
                                      icon-tooltip="Date of file creation"
                                      :align-left="twoColumnLayout" />
              </v-flex>

              <v-flex v-if="lastModified"
                      px-0 py-1 >
                <base-icon-label-view :text="lastModified"
                                      :icon="lastModifiedIcon"
                                      icon-tooltip="Date of last modification"
                                      :align-left="twoColumnLayout" />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 50px;" >

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
                        class="fabPosition ma-3"
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
    formatedBytes() {
      if (!this.size) return '';
      const bytesString = this.mixinMethods_formatBytes(this.size);
      return bytesString;
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
    maxDescriptionLengthReached: function maxDescriptionLengthReached() {
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
    clicked: function clicked() {
      this.$emit('clicked');
    },
    extensionIcon: function extensionIcon() {
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

  .black_title{
    color: rgba(0,0,0,.87) !important;
  }

  .white_title{
    color: rgba(255,255,255,.9) !important;
  }

  .heightAndScroll {
    max-height: 400px;
    overflow-y: auto !important;
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
</style>
