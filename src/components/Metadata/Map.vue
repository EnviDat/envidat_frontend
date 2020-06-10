<template>
  <div :id="mapDivId"
       style="height: 100%; width: 100%; z-index: 100;">
    <div class="my-slot">
        <slot></slot>
    </div>
            <v-card class="layers" v-if="configFile" style="z-index: 1000;">
              <div v-for="(layer, key) in configFile.layers" :key="key" @click.stop="selectLayer(layer.name)"
                   :class="{selected: layer.name === selectedLayer }">
                {{layer.title}}
              </div>
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
        }
      ),
      props: {
        defaultLayer: { type: String, default: null },
        mapDivId: { type: String, required: true },
        configFile: Object,
      },
      methods: {
        selectLayer(name) {
          this.$emit('changeLayer', name);
          this.selectedLayer = name;
        },
        setupMap() {
          console.log('setting up map', this.mapDivId);
          this.map = new L.Map(this.mapDivId, {});
          this.map.setView(L.latLng(46.57591, 7.84956), 8);
          this.addBasemaps();
          L.control.scale().addTo(this.map);
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
        addBasemaps() {
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

          L.control.layers(baseMaps)
            .addTo(this.map);
        },
      },
      mounted() {
        this.setupMap();
        this.selectedLayer = this.defaultLayer
            ? this.defaultLayer
            : this.configFile.layers.find(layer => layer.visibility).name;
      },
      watch: {
        selectedLayer() {
          this.addLayerToMap();
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
  .my-slot {
    position: absolute;
    top: 70px;
    left: 0px;
    z-index: 100000;
  }
</style>
