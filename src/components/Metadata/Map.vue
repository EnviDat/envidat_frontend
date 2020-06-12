<template>
  <div :id="mapDivId"
       style="height: 100%; width: 100%; z-index: 100;">
    <div class="my-slot">
      <slot></slot>
    </div>
    <div class="timeslider">
      <slot name="timeslider"></slot>
    </div>
    <v-card class="layers" v-if="configFile" style="z-index: 1000; cursor: default;">
      <div v-for="(layer, key) in configFile.layers" :key="key"
           @click.stop="selectLayer(layer.name)"
           :class="{selected: layer.name === selectedLayer }">
        {{layer.title}}
        <v-tooltip bottom max-width="300" v-if="layer.abstract">
          <template v-slot:activator="{ on }">
            <v-icon color="primary" dark v-on="on" small>info</v-icon>
          </template>
          {{layer.abstract}}
        </v-tooltip>
      </div>
    </v-card>
    <v-card ripple class="basemap-toggle">
      <img width="50" height="50" v-if="basemap==='streets'" src="./satellite-icon.png" @click="basemap='satellite'">
      <img width="50" height="50" v-if="basemap==='satellite'" src="./streets-icon.png" @click="basemap='streets'">
    </v-card>
  </div>
</template>

<script>
  /* eslint-disable new-cap */
  import L from 'leaflet';

  export default {
    name: 'Map',
    data: () => ({
        map: null,
        bingApiKey: process.env.VUE_APP_BING_API_KEY,
        selectedLayer: null,
        basemap: null, // 'streets', 'satellite'
        basemapLayer: null,
      }
    ),
    props: {
      defaultLayer: { type: String, default: null },
      mapDivId: { type: String, required: true },
      configFile: Object,
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
      toggleBasemap() {
        this.basemap = this.basemap === 'satellite' ? 'streets' : 'satellite';
      },
      selectLayer(name) {
        this.$emit('changeLayer', name);
        this.selectedLayer = name;
      },
      setupMap() {
        this.map = new L.Map(this.mapDivId, {});
        this.map.setView(L.latLng(46.57591, 7.84956), 8);
        this.basemap = 'streets';
        L.control.scale()
          .addTo(this.map);
      },
      addLayerToMap() {
        if (this.mapLayer) {
          this.map.removeLayer(this.mapLayer);
        }
        this.mapLayer = new L.tileLayer.wms(this.configFile.baseURL, {
          layers: this.selectedLayer,
          transparent: true,
          format: 'image/png',
        });
        this.map.addLayer(this.mapLayer);
        this.mapLayer.bringToFront();
      },
    },
    mounted() {
      this.setupMap();
      this.selectedLayer = this.defaultLayer
        ? this.defaultLayer
        : this.configFile.layers.find(layer => layer.visibility).name;
    },
    watch: {
      basemap() {
          if (this.basemapLayer) {
            this.map.removeLayer(this.basemapLayer);
          }
          this.basemapLayer = this.basemap === 'streets' ? this.streets : this.satellite;
          this.map.addLayer(this.basemapLayer);
          this.basemapLayer.bringToBack();
      },
      selectedLayer() {
        this.addLayerToMap();
      },
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

  .timeslider {
    position: absolute;
    z-index: 9999;
    cursor: pointer;
    bottom: 50px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }

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

  .my-slot {
    position: absolute;
    top: 70px;
    left: 0px;
    z-index: 100000;
  }
</style>
