<template>
  <div style="height: 100%; width: 100%; z-index: 100; max-width: 100%;">
    <v-layout class="top-slot justify-center">
      <slot name="top"></slot>
    </v-layout>
    <div class="default-slot">
      <slot></slot>
    </div>

    <div v-if="!hasGeom" style="color: red;">{{ 'No data to show' }}</div>
    <map-leaflet2 v-if="!show3d" :layer="selectedLayer" :map-div-id="mapDivId">
      <template v-slot:layerControl>
        <map-layer-control :layers="config.layers" :selected="selectedLayerName" @select="select"></map-layer-control>
      </template>
      <v-btn fab small @click="show3d = true">3D</v-btn>
    </map-leaflet2>
    <map-cesium2 v-if="show3d" :layer="selectedLayer" :map-div-id="mapDivId">
      <template v-slot:layerControl>
        <map-layer-control :layers="config.layers" :selected="selectedLayerName" @select="select"></map-layer-control>
      </template>
      <v-btn fab small @click="show3d = false">2D</v-btn>
    </map-cesium2>

  </div>
</template>

<script>
    import MapLeaflet2 from './MapLeaflet2';
    import MapCesium2 from './MapCesium2';
    import MapLayerControl from './MapLayerControl';

    export default {
      name: 'Map2',
      components: { MapLayerControl, MapCesium2, MapLeaflet2 },
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
  .default-slot {
    position: absolute;
    bottom: 140px;
    right: 30px;
    z-index: 100000;
  }
  /* TODO: Hack: width of slot is 50%, should be 100% */
  .top-slot {
    width: 50%;
    position: absolute;
    z-index: 9999;
    cursor: pointer;
    top: 15px;
  }
</style>
