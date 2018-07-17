<template>
  <v-card
  hover
  color="primary"
  class="white--text">
    
    <v-container fluid grid-list-md>
      <v-layout row>
  
        <v-flex xs8>
          <v-layout column>
            <v-flex class="headline">{{ name | capitalize }}</v-flex>
            <v-flex>{{ description }}</v-flex>
          </v-layout>
        </v-flex>
  
        <v-flex xs4>
          <v-layout column>
            <icon-label-view label="Format:" :text="format" icon="cloud_download" iconTooltip="Format of the file" />
            <icon-label-view :text="converToBytes" icon="cloud_download" iconTooltip="Filesize" />
            <icon-label-view :text="created" icon="cloud_download" iconTooltip="Date of file creation" />
            <icon-label-view :text="lastModified" icon="cloud_download" iconTooltip="Date of last modification" />
          </v-layout>
        </v-flex>
  
      </v-layout>


    </v-container>

    <v-card-actions>      
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn icon color="accent" slot="activator" :href="url" 
        v-bind="{['target'] : isLink ? '_blank' : '' }">
          <v-icon dark v-if="isFile">cloud_download</v-icon>
          <v-icon dark v-if="isLink">link</v-icon>
        </v-btn>
        <span v-if="isFile">Download file</span>
        <span v-if="isLink">Open link</span>
      </v-tooltip>
    </v-card-actions>


  </v-card>
</template>


<script>
import defaultTexture from '../../../assets/cards/forest/c_b_forest_texture_bark2_small.jpg';
import IconLabelView from '../IconLabelView';

export default {
  props: {
    id: String,
    metadataId: String,
    name: String,
    description: String,
    url: String,
    created: String,
    lastModified: String,
    size: Number,
    format: String,
  },
  data: () => ({
    defaultTexture,
  }),
  computed: {
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.defaultTexture) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.defaultTexture}); background-position: center, center;`;
      }

      return '';
    },
    converToBytes: function converToBytes() {
      if (!this.size) return '';
      const bytesString = this.formatBytes(this.size);
      return bytesString;
    },
    isLink: function isLink() {
      return this.format && this.format.toLowerCase() === 'link';
    },
    isFile: function isFile() {
      return this.format && this.format.toLowerCase() !== 'link';
    },
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked');
    },
  },
  filters: {
    capitalize: function capitalize(value) {
      /* eslint-disable no-param-reassign */
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  components: {
    IconLabelView,
  },
};
</script>

