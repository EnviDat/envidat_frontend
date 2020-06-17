<template>
  <div style="height: 100%; width: 100%; max-height: 100%; z-index: 100; max-width: 100%;">

    <div class="map-container">
      <v-layout class="top-slot">
        <slot name="top"></slot>
      </v-layout>

      <map-layer-control
        :layers="config.layers"
        :selected="selectedLayerName"
        @select="select"
        style="position: absolute; z-index: 9999999; margin: 20px; top: 100px; bottom: 150px;"
      ></map-layer-control>

      <div v-if="!hasGeom" style="color: red;">No data to show</div>
      <map-leaflet2 v-if="!show3d" :layer="selectedLayer" :map-div-id="mapDivId">
        <slot></slot><br>
        <v-btn fab small @click="show3d = true">3D</v-btn>
      </map-leaflet2>
      <map-cesium2 v-if="show3d" :layer="selectedLayer" :map-div-id="mapDivId">
        <slot></slot><br>
        <v-btn fab small @click="show3d = false">2D</v-btn>
      </map-cesium2>
    </div>
    <div class="timeslider-container">
      <timeslider
        style="height: 120px; z-index: 10000;"
        @select="select"
        :chart-data="config.layers"
        :div-id="`timeslider_${mapDivId}`"
        :selected="selectedLayerName"
      ></timeslider>
    </div>

  </div>
</template>

<script>
  import MapLeaflet2 from './MapLeaflet2';
  import MapCesium2 from './MapCesium2';
  import MapLayerControl from './MapLayerControl';
  import Timeslider from './Timeslider';

  export default {
    name: 'Map2',
    components: {
      Timeslider,
      MapLayerControl,
      MapCesium2,
      MapLeaflet2,
    },
    props: {
      config: { type: Object, required: true },
      mapDivId: { type: String, required: true },
      selected: { type: String },
    },
    data: () => ({
      show3d: false,
      selectedLayerName: null,
    }),
    computed: {
      // heightMap() {
      //   return this.config.timeseries ?
      // },
      selectedLayer() {
        if (!this.selectedLayerName) {
          return null;
        }
        const layer = this.config.layers.find(l => l.name === this.selectedLayerName);
        layer.baseURL = this.config.baseURL;
        layer.bbox = this.config.bbox;
        layer.type = 'wms'; // this.config.type || 'wms';
        return layer;
      },
      hasGeom() {
        return !!this.config;
      },
    },
    methods: {
      select(layerName) {
        this.selectedLayerName = layerName;
      },
    },
    watch: {
      selectedLayerName() {
        this.$emit('changeLayer', this.selectedLayerName);
      },
    },
    mounted() {
      console.log(this.config);
      if (this.selected) {
        this.select(this.selected);
      } else {
        const layer = this.config.layers.find(l => l.visibility);
        this.select(layer.name);
      }
    },
  };
</script>

<style scoped>

  .top-slot {
    left: 50%;
    position: absolute;
    z-index: 9999;
    cursor: pointer;
    top: 15px;
  }

  .map-container {
    height: calc(100% - 120px);
  }

  .timeslider-container {
    height: 120px;
  }


</style>
