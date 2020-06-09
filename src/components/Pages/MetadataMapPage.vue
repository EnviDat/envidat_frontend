<template>
  <v-container fluid
               pa-0>
    <base-icon-button class="ma-2"
                      style="position: absolute; top: 0; right: 50px; z-index: 200;"
                      material-icon-name="close"
                      icon-color="primary"
                      color="primary"
                      outlined
                      tool-tip-text="Close Metadata"
                      :tool-tip-bottom="true"
                      @clicked="close" />
    <v-layout>
      <div id="my_map_geo"
           style="top: 0; bottom: 0; left: 0; right: 0; z-index: 100; position: absolute;">
        <v-card class="layers" v-if="configFile">
          <div v-for="(layer, key) in configFile.layers" :key="key" @click.stop="selectLayer(layer.name)"
               :class="{selected: layer.name === selectedLayer }">
            {{layer.title}}
          </div>
        </v-card>
      </div>

    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable new-cap */
  import { mapGetters } from 'vuex';
  /* eslint-disable no-unused-vars */
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-bing-layer';
  import { BROWSE_PATH, METADATADETAIL_PAGENAME } from '@/router/routeConsts';
  import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mainMutationsConsts';
  import {
    CLEAN_CURRENT_METADATA,
    LOAD_METADATA_CONTENT_BY_ID,
    METADATA_NAMESPACE,
  } from '@/store/metadataMutationsConsts';
  import axios from 'axios';
  import L from 'leaflet';
  import BaseIconButton from '../BaseElements/BaseIconButton';

  export default {
    name: 'MetadataMapPage',
    components: { BaseIconButton },
    data: () => ({
      geoConfig: null,
      PageBGImage: './app_b_browsepage.jpg',
      configFile: null,
      map: null,
      mapLayer: null,
      selectedLayer: null,
      bingApiKey: process.env.VUE_APP_BING_API_KEY,
    }),
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, METADATADETAIL_PAGENAME);
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    mounted() {
      this.loadMetaDataContent();
      this.setupMap();
    },
    beforeDestroy() {
      // clean current metadata to make be empty for the next to load up
      this.$store.commit(`${METADATA_NAMESPACE}/${CLEAN_CURRENT_METADATA}`);
    },
    computed: {
      ready() {
        if (this.geoConfig) { return true; }
        return false;
      },
      ...mapGetters({
        metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
        metadatasContentSize: `${METADATA_NAMESPACE}/metadatasContentSize`,
        loadingMetadatasContent: `${METADATA_NAMESPACE}/loadingMetadatasContent`,
        loadingCurrentMetadataContent: `${METADATA_NAMESPACE}/loadingCurrentMetadataContent`,
        currentMetadataContent: `${METADATA_NAMESPACE}/currentMetadataContent`,
        detailPageBackRoute: `${METADATA_NAMESPACE}/detailPageBackRoute`,
        idRemapping: `${METADATA_NAMESPACE}/idRemapping`,
      }),
      /**
       * @returns {String} the metadataId from the route
       */
      metadataId() {
        let id = this.$route.params.metadataid;

        if (this.idRemapping.has(id)) {
          id = this.idRemapping.get(id);
        }

        return id;
      },
      /**
       * @returns {Boolean} if the placeHolders should be shown be somethings are still loading
       */
      showPlaceholder() {
        return this.loadingMetadatasContent || this.loadingCurrentMetadataContent;
      },
    },
    methods: {
      selectLayer(name) {
        this.selectedLayer = name;
      },
      loadConfig() {
        const url = this.geoConfig.url;
        axios.get(url)
          .then((res) => {
            this.configFile = res.data;
            this.selectedLayer = this.configFile.layers.find(layer => layer.visibility).name;
            const bbox = this.configFile.bbox;
            const corner1 = L.latLng(bbox.miny, bbox.minx);
            const corner2 = L.latLng(bbox.maxy, bbox.maxx);
            const bounds = L.latLngBounds(corner1, corner2);
            this.map.fitBounds(bounds);

            const mapLayers = this.configFile.layers.map(layer => new L.tileLayer.wms(this.configFile.baseURL, {
                layers: layer,
                transparent: true,
                format: 'image/png',
              }));
            const mapLayerGroup = L.layerGroup(mapLayers);
            L.control.layers(mapLayerGroup)
              .addTo(this.map);

            return 'Success';
          });
      },
      setupMap() {
        if (this.mapIsSetup) return;
        this.map = new L.Map('my_map_geo', {});
        this.map.setView(L.latLng(46.57591, 7.84956), 8);
        this.addOpenStreetMapLayer();
        L.control.scale().addTo(this.map);
        this.mapIsSetup = true;
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

        L.control.layers(baseMaps)
          .addTo(this.map);
      },
      rerender() {
        this.$forceUpdate();
      },
      /**
       * @description
       */
      createMetadataContent() {
        const res = this.currentMetadataContent && this.currentMetadataContent.resources ? this.currentMetadataContent.resources : null;
        this.geoConfig = res ? res.find(src => src.name === 'geoservices_config.json') : null;

        this.rerender();
      },
      /**
       * @description
       * @param {any} idOrName
       * @returns {any}
       */
      isCurrentIdOrName(idOrName) {
        return this.currentMetadataContent.id === idOrName || this.currentMetadataContent.name === idOrName;
      },
      /**
       * @description
       */
      close() {
        console.log(this.$route);
        this.$router.push({
          name: this.$route.matched[this.$route.matched.length - 1].name,
        });
      },
      /**
       * @description loads the content of this metadata entry (metadataid) from the URL.
       * Either loads it from the backend via action or creates it from the localStorage.
       */
      loadMetaDataContent() {
        if (!this.loadingMetadatasContent
          && (this.currentMetadataContent.title === undefined
            || !this.isCurrentIdOrName(this.metadataId))) {
          // in case of directly entring the page load the content directly via Id
          this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
        } else {
          this.createMetadataContent();
        }
      },
    },
    watch: {
      ready() {
        this.loadConfig();
        if (this.ready) {
          this.setupMap();
        }
      },
      selectedLayer() {
        this.addLayerToMap();
      },
      /* eslint-disable no-unused-vars */
      $route: function watchRouteChanges(to, from) {
        // react on changes of the route (browser back / forward click)

        this.loadMetaDataContent();
      },
      currentMetadataContent() {
        this.createMetadataContent();
      },
      metadatasContent() {
        // in case all the metadataContents are already loaded take it from there
        // if EnviDat is called via MetadataDetailPage URL directly

        if (!this.loadingCurrentMetadataContent) {
          this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
        }
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
