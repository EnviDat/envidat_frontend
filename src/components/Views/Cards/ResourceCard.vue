<template>
  <v-card
  hover
  color="primary"
  class="white--text">
    
    <v-card-media>
      <v-container>
        <v-layout row>

          <v-flex xs8>
            <v-layout column>
              <v-flex xs11 mb-3>
                <div class="headline">{{ name }}</div>
              </v-flex>

              <v-flex xs11 v-if="!maxDescriptionLengthReached">
                {{ description }}
              </v-flex>

              <v-flex xs11 v-if="maxDescriptionLengthReached">
                <v-tooltip bottom>
                  <div slot="activator">
                    {{ description | truncate(maxDescriptionLength) }}
                  </div>
                  <span>{{ description }}</span>
                </v-tooltip>
              </v-flex>

            </v-layout>
          </v-flex>
    
          <v-flex xs4>
            <v-container grid-list-xs>
              <v-layout column>
                <icon-label-view label="Format:" :text="format" icon="cloud_download" iconTooltip="Format of the file" />
                <icon-label-view :text="formatedBytes" icon="cloud_download" iconTooltip="Filesize" />
                <icon-label-view :text="formatedDate(created)" icon="cloud_download" iconTooltip="Date of file creation" />
                <icon-label-view :text="formatedDate(lastModified)" icon="cloud_download" iconTooltip="Date of last modification" />
              </v-layout>
            </v-container>
          </v-flex>
    
        </v-layout>
      </v-container>
    </v-card-media>

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
    maxDescriptionLength: 300,
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
      return this.format && this.format.toLowerCase() === 'link';
    },
    isFile: function isFile() {
      return this.format && this.format.toLowerCase() !== 'link';
    },
    maxDescriptionLengthReached: function maxDescriptionLengthReached() {
      return this.description && this.description.length > this.maxDescriptionLength;
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
