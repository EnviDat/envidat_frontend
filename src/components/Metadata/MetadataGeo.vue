<template>
  <v-card>
    <v-card-title class="title metadata_title">Location Geoservices</v-card-title>

    <v-card-text>
      <div id="mapcontainer" ref="mapcontainer">
        <div id="map_geo" ref="map" v-bind="mapSize">
          <v-card class="layers" v-if="configFile">
            <div v-for="(layer, key) in configFile.layers" :key="key" @click="selectLayer(layer.name)" :class="{selected: layer.name === selectedLayer }">
              {{layer.title}}
            </div>
          </v-card>
            <v-btn icon dark small color="primary" class="fullscreen-btn elevation-5" @click.native.stop="openFullscreen">
              <v-icon dark>fullscreen</v-icon>
            </v-btn>
        </div>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import L from 'leaflet';
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import 'leaflet-bing-layer';
import axios from 'axios';

// HACK starts
// Solution to loading in the imgs correctly via webpack
// see more https://github.com/PaulLeCam/react-leaflet/issues/255
// stupid hack so that leaflet's images work after going through webpack
import marker from '@/assets/map/marker-icon.png';
import marker2x from '@/assets/map/marker-icon-2x.png';
import markerShadow from '@/assets/map/marker-shadow.png';

// HACK end

export default {
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
    marker,
    marker2x,
    markerShadow,
    mapIsSetup: false,
    emptyText: 'No location found for this dataset',
    bingApiKey: process.env.VUE_APP_BING_API_KEY,
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
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  watch: {
    ready() {
      this.loadConfig();
      if (this.ready) { this.setupMap(); }
    },
    selectedLayer() {
      this.addLayerToMap();
    },
  },
  methods: {
    openFullscreen() {
      this.$router.push({ path: '/metadata/dataset-for-testing-geoservices/map' });
    },
    selectLayer(name) {
      this.selectedLayer = name;
    },
    loadConfig() {
      const url = this.genericProps.config.url;
      axios.get(url)
        .then((res) => {
          this.configFile = res.data;
          this.selectedLayer = this.configFile.layers.find(layer => layer.visibility).name;
          const bbox = this.configFile.bbox;
          const corner1 = L.latLng(bbox.miny, bbox.minx);
          const corner2 = L.latLng(bbox.maxy, bbox.maxx);
          const bounds = L.latLngBounds(corner1, corner2);
          this.map.fitBounds(bounds);
          return 'Success';
        });
    },
    addLayerToMap() {
      if (this.mapLayer) {
        this.map.removeLayer(this.mapLayer);
      }
      /* eslint-disable new-cap */
      this.mapLayer = new L.tileLayer.wms(this.configFile.baseURL, {
        layers: this.selectedLayer,
        transparent: true,
        format: 'image/png',
      });
      this.map.addLayer(this.mapLayer);
      this.mapLayer.bringToFront();
    },
    setupMap() {
      if (this.mapIsSetup) return;
      this.map = new L.Map('map_geo', { scrollWheelZoom: false });
      this.map.setView(L.latLng(46.57591, 7.84956), 8);
      this.addOpenStreetMapLayer();
      this.mapIsSetup = true;
    },
    addOpenStreetMapLayer() {
      const streetTiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
      );

      const aerialTiles = L.tileLayer.bing({
        bingMapsKey: this.bingApiKey,
        imagerySet: 'AerialWithLabels',
      });

      this.mapLayerGroup = L.layerGroup([streetTiles, aerialTiles]);
      this.mapLayerGroup.addTo(this.map);

      const baseMaps = {
        'Satellit (Bingmaps)': aerialTiles,
        'Roads (OpenStreetMaps)': streetTiles,
      };

      L.control.layers(baseMaps).addTo(this.map);
    },
    catchHover: function catchHover(e) {
      e.target.bindPopup(`<p>${e.target.id}</p>`).openPopup();
    },
    catchHoverLeave: function catchHoverLeave(e) {
      e.target.closePopup();
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

  .fullscreen-btn {
    position: absolute;
    bottom: 30px;
    left: 5px;
    z-index: 999;
  }
</style>
