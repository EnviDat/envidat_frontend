<template>
  <v-card color="primary"
          class="metadataResourceCard white--text"
          style="height: 100%;"
  >

    <v-card-title>
      <div class="headline">{{ name }}</div>
    </v-card-title>

    <v-card-text class="pt-0"
                :class="{
                    'pb-3': $vuetify.breakpoint.mdAndUp,
                    'pb-5': $vuetify.breakpoint.smAndDown,
                  }">

      <v-container grid-list-xs pa-0>
        <v-layout v-bind="{ ['row']: $vuetify.breakpoint.smAndUp,
                            ['wrap']: $vuetify.breakpoint.smAndUp,
                            ['column']: $vuetify.breakpoint.xsOnly,
                          }"
        >

          <v-flex v-bind="{ [`xs6`]: !this.twoColumnLayout && !showFullDescription, 
                            [`xs12`]: this.twoColumnLayout || showFullDescription }"
                            order-xs3 order-sm1
          >

            <v-layout column>
              <v-flex v-if="showFullDescription"
                      xs11 pb-4
                      class="resourceCardText heightAndScroll">
                {{ description }}
              </v-flex>

              <v-flex v-if="!showFullDescription"
                      xs11 
                      class="resourceCardText">
                {{ description | truncate(maxDescriptionLength) }}
              </v-flex>

            </v-layout>
          </v-flex>
    
          <v-flex v-if="!showFullDescription" 
                  order-xs2 hidden-sm-and-up>
            <v-divider :dark="dark" class="my-1" ></v-divider>
          </v-flex>

          <v-flex v-if="!showFullDescription"
                  v-bind="{ [`xs6`]: !this.twoColumnLayout , 
                            [`xs12`]: this.twoColumnLayout,
                            [`pt-3`]: this.twoColumnLayout  }"
                            order-xs1 order-sm3
          >
            <v-layout column>
              <v-flex px-0 v-if="doi">
                <base-icon-label-view :text="doi"
                                      :icon="doiIcon"
                                      iconTooltip="Data Object Identifier" 
                                      :alignLeft="twoColumnLayout"/>
              </v-flex>
              <v-flex px-0 v-if="format">
                <base-icon-label-view :label="fileFormatLabel"
                                      :text="format"
                                      :icon="fileExtensionIcon"
                                      iconTooltip="Format of the file"
                                      :alignLeft="twoColumnLayout" />
              </v-flex>
              <v-flex px-0 v-if="size">
                <base-icon-label-view :text="formatedBytes"
                                      :icon="fileSizeIcon"
                                      iconTooltip="Filesize"
                                      :alignLeft="twoColumnLayout" />
              </v-flex>
              <v-flex px-0 v-if="created">
                <base-icon-label-view :text="formatedCreated"
                                      :icon="dateCreatedIcon" 
                                      iconTooltip="Date of file creation" 
                                      :alignLeft="twoColumnLayout"/>
              </v-flex>
              <v-flex px-0 v-if="lastModified">
                <base-icon-label-view :text="formatedLastModified"
                                      :icon="lastModifiedIcon"
                                      iconTooltip="Date of last modification" 
                                      :alignLeft="twoColumnLayout"/>
              </v-flex>
            </v-layout>
          </v-flex>
    
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions class="ma-0 pa-2 "
                    style="position: absolute; bottom: 5px; right: 20px;">

      <v-spacer></v-spacer>


      <base-icon-button v-if="maxDescriptionLengthReached"
                        class="mr-2"
                        materialIconName="expand_more"
                        iconColor="accent"
                        color="transparent"
                        :isToggled="showFullDescription"
                        :rotateOnClick="true"
                        :rotateToggle="showFullDescription"
                        :toolTipText="showFullDescription ? 'Hide full description' : 'Show full description'"
                        v-on:clicked="showFullDescription = !showFullDescription"
                        />


      <base-icon-button :customIcon="isFile ? downloadIcon : linkIcon"
                        color="accent"
                        :isElevated="true"
                        :toolTipText="isFile ? 'Download file' : 'Open link'"
                        :url="url"
                        />


    </v-card-actions>

  </v-card>
</template>


<script>
import defaultTexture from '@/assets/cards/c_b_forest_texture_bark2_small.jpg';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';

export default {
  props: {
    id: String,
    metadataId: String,
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
  },
  data: () => ({
    defaultTexture,
    maxDescriptionLength: 175,
    showFullDescription: false,
  }),
  computed: {
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.defaultTexture) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.defaultTexture}); background-position: center, center;`;
      }

      return '';
    },
    formatedBytes: function formatedBytes() {
      if (!this.size) return '';
      const bytesString = this.mixinMethods_formatBytes(this.size);
      return bytesString;
    },
    formatedCreated: function formatedCreated() {
      return this.mixinMethods_formatDate(this.created);
    },
    formatedLastModified: function formatedLastModified() {
      return this.mixinMethods_formatDate(this.lastModified);
    },
    isLink: function isLink() {
      return this.format && (this.format.toLowerCase() === 'link' || this.format.toLowerCase() === 'url');
    },
    isFile: function isFile() {
      return !this.format || !(this.format.toLowerCase() === 'link' || this.format.toLowerCase() === 'url');
    },
    maxDescriptionLengthReached: function maxDescriptionLengthReached() {
      return this.description && this.description.length > this.maxDescriptionLength;
    },
    fileExtensionIcon: function fileExtensionIcon() {
      return this.mixinMethods_getIconFileExtension(this.format);
    },
    fileFormatLabel: function fileFormatLabel() {
      const label = this.fileExtensionIcon ? '' : 'Format:';
      return label;
    },
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked');
    },
    formatedDate: function formatedDate(value) {
      return this.mixinMethods_formatDate(value);
    },
  },
  components: {
    BaseIconLabelView,
    BaseIconButton,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

</style>
