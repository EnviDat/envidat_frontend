<template>
  <v-card v-bind="mapSize">
    <v-card-title class="title metadata_title">Location Geoservices</v-card-title>

    <v-card-text v-if="configFile" style="width: 100%; height: 100%; max-height: 100%;">
        <Map2 :config="configFile" :map-div-id="'map-small'">
      <v-btn fab small color="primary" @click.native.stop="openFullscreen">
        <v-icon medium style="height:auto;">fullscreen</v-icon>
      </v-btn>
        </Map2>
    </v-card-text>

  </v-card>
</template>

<script>
import axios from 'axios';
import Map2 from './Map2';

export default {
  name: 'MetadataGeo2',
  components: { Map2 },
  props: {
    genericProps: Object,
  },
  data: () => ({
    map: null,
    mapLayer: null,
    configFile: null,
    selectedLayer: null,
    smallSize: 300,
    mediumSize: 500,
    largeSize: 725,
    fullWidthSize: 875,
  }),
  computed: {
    ready() {
      if (this.genericProps.config) { return true; }
       return false;
    },
    title() {
      return this.mixinMethods_getGenericProp('title');
    },
    mapSize() {
      let width = this.largeSize;
      let height = this.mediumSize;

      if (this.$vuetify.breakpoint.xsOnly) {
        width = this.mediumSize;
        height = this.smallSize;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        width = this.fullWidthSize;
        height = this.smallSize;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        width = this.fullWidthSize;
      }

      return {
        style: `width: ${width}px !important;
                  max-width: 100%;
                  height: ${height}px !important;`,
      };
    },
  },
  watch: {
    ready() {
      this.loadConfig();
    },
  },
  methods: {
    openFullscreen() {
      this.$router.push({ path: '/metadata/dataset-for-testing-geoservices/map' });
    },
    loadConfig() {
      const url = this.genericProps.config.url;
      axios.get(url)
        .then((res) => {
          this.configFile = res.data;
          this.selectedLayer = this.configFile.layers.find(layer => layer.visibility).name;
          return 'Success';
        });
    },
  },
};
</script>
<style scoped>
  .layers {
    position: absolute;
    top: 70px;
    right: 5px;
    padding: 3px;
    z-index: 9999;
  }
  .selected {
    background-color: cadetblue;
  }
</style>
