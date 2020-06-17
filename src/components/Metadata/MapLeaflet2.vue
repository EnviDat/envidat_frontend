<template>
  <div :id="mapDivId" style="height: 100%; width: 100%; z-index: 100;">
    <v-card ripple class="basemap-toggle">
      <img width="50" height="50" v-if="basemap==='streets'" src="./satellite-icon.png" @click="basemap='satellite'">
      <img width="50" height="50" v-if="basemap==='satellite'" src="./streets-icon.png" @click="basemap='streets'">
    </v-card>
    <div style="position: absolute; bottom: 80px; right: 20px; z-index: 99999;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /* eslint-disable new-cap */
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-bing-layer';
  import { leafletLayer } from './layer-leaflet';

    export default {
        name: 'MapLeaflet2',
      data: () => ({
        bingApiKey: process.env.VUE_APP_BING_API_KEY,
        map: null,
        mapLayer: null,
        basemap: null, // 'streets', 'satellite'
        basemapLayer: null,
      }),
      props: {
        layer: Object,
        mapDivId: String,
      },
      computed: {
        streets() {
          return L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
          );
        },
        satellite() {
          return L.tileLayer.bing({
            bingMapsKey: this.bingApiKey,
            imagerySet: 'AerialWithLabels',
          });
        },
      },
      methods: {
        setupMap() {
          this.map = new L.Map(this.mapDivId, {});
          this.map.setView(L.latLng(46.57591, 7.84956), 8);
          this.basemap = 'streets';
          L.control.scale()
            .addTo(this.map);
          this.replaceLayer();
        },
        zoomToExtent(bbox) {
          this.map.fitBounds([
            [bbox.miny, bbox.minx],
            [bbox.maxy, bbox.maxx],
          ]);
        },
        replaceLayer() {
          if (this.mapLayer) {
            this.map.removeLayer(this.mapLayer);
            this.mapLayer = null;
          }
          if (this.layer) {
            this.mapLayer = leafletLayer(this.layer);
            this.map.addLayer(this.mapLayer);
            this.mapLayer.bringToFront();
            this.zoomToExtent(this.layer.bbox);
          }
        },
      },
      watch: {
          layer: {
            handler() {
              this.replaceLayer();
            },
            deep: true,
          },
        basemap() {
          if (this.basemapLayer) {
            this.map.removeLayer(this.basemapLayer);
          }
          this.basemapLayer = this.basemap === 'streets' ? this.streets : this.satellite;
          this.map.addLayer(this.basemapLayer);
          this.basemapLayer.bringToBack();
        },
      },
      mounted() {
        this.setupMap();
      },
      beforeDestroy() {
        if (this.map) {
          this.map.remove();
        }
      },
    };
</script>

<style scoped>
  .basemap-toggle {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    cursor: pointer;
    padding: 2px;
    width:54px;
    height: 54px;
  }
</style>
