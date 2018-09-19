<template>
  <v-card color="primary"
          class="metadataResourceCard white--text"
          style="height: 100%;"
  >

    <v-card-title>
      <div class="headline">{{ name }}</div>
    </v-card-title>

    <v-card-text class="pt-0 pb-3">

      <v-container grid-list-xs pa-0>
        <v-layout row wrap>

          <v-flex v-bind="{ [`xs8`]: !this.twoColumnLayout , 
                            [`xs12`]: this.twoColumnLayout  }"
          >

            <v-layout column>
              <v-flex xs11 v-if="showFullDescription"
                            class="resourceCardText">
                {{ description }}
              </v-flex>

              <v-flex xs11 v-if="!showFullDescription"
                            class="resourceCardText">
                {{ description | truncate(maxDescriptionLength) }}
              </v-flex>

            </v-layout>
          </v-flex>
    
          <v-flex v-bind="{ [`xs4`]: !this.twoColumnLayout , 
                            [`xs12`]: this.twoColumnLayout,
                            [`pt-3`]: this.twoColumnLayout  }"
          >
            <v-layout column>
              <v-flex px-0 v-if="doi">
                <icon-label-view :text="doi" :icon="getIcon('doi')"
                                  iconTooltip="Data Object Identifier" 
                                  :alignLeft="twoColumnLayout"/>
              </v-flex>
              <v-flex px-0 v-if="format">
                <icon-label-view :label="fileFormatLabel" :text="format"
                                  :icon="fileExtensionIcon" iconTooltip="Format of the file"
                                  :alignLeft="twoColumnLayout" />
              </v-flex>
              <v-flex px-0 v-if="size">
                <icon-label-view :text="formatedBytes" :icon="getIcon('fileSize')"
                                  iconTooltip="Filesize"
                                  :alignLeft="twoColumnLayout" />
              </v-flex>
              <v-flex px-0 v-if="created">
                <icon-label-view :text="formatedDate(created)" :icon="getIcon('dateCreated')" 
                                  iconTooltip="Date of file creation" 
                                  :alignLeft="twoColumnLayout"/>
              </v-flex>
              <v-flex px-0 v-if="lastModified">
                <icon-label-view :text="formatedDate(lastModified)" :icon="getIcon('dateModified')"
                                  iconTooltip="Date of last modification" 
                                  :alignLeft="twoColumnLayout"/>
              </v-flex>
            </v-layout>
          </v-flex>
    
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;">
      <v-spacer></v-spacer>

        <v-btn v-if="maxDescriptionLengthReached"
                icon class="mr-2"
                @click.native=" showFullDescription = !showFullDescription">
          <v-icon color="accent" 
                  :style="this.showFullDescription ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
          >expand_more</v-icon>

        </v-btn>


      <v-tooltip bottom >
        <v-btn fab small
                color="accent" slot="activator" :href="url" 
                v-bind="{['target'] : isLink ? '_blank' : '' }">

          <div v-if="isFile"
                class="iconCentering">
            <img class="envidatIcon" :src="getIcon('download')" />          
          </div>
          <div v-if="isLink"
                class="iconCentering">
            <img class="envidatIcon" :src="getIcon('link')" />          
          </div>
        </v-btn>

        <span v-if="isFile">Download file</span>
        <span v-if="isLink">Open link</span>
      </v-tooltip>
    </v-card-actions>

  </v-card>
</template>


<script>
import defaultTexture from '../../../assets/cards/c_b_forest_texture_bark2_small.jpg';
import IconLabelView from '../IconLabelView';

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
      const bytesString = this.formatBytes(this.size);
      return bytesString;
    },
    formatedCreated: function formatedCreated() {
      return this.formatDate(this.created);
    },
    formatedLastModified: function formatedLastModified() {
      return this.formatDate(this.lastModified);
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
      return this.getIconFileExtension(this.format);
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
      return this.formatDate(value);
    },
  },
  components: {
    IconLabelView,
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

  .card_tag {
    /* opacity: 0.7; */
  }

</style>
