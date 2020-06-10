<template>
  <div style="height: 100%; width: 100%;" v-if="configFile">
    <base-icon-button class="ma-2"
                      style="position: absolute; top: 0; right: 50px; z-index: 200;"
                      material-icon-name="close"
                      icon-color="primary"
                      color="primary"
                      outlined
                      tool-tip-text="Close Metadata"
                      :tool-tip-bottom="true"
                      @clicked="close"/>
    <v-layout v-if="splitScreen" style="height: 100%;" pa-0 ma-0 :key="'split'">
      <div style="width: 50%; left: 0; height: 100%;">
        <Map :config-file="configFile" :default-layer="layer" :map-div-id="'map1'" @changeLayer="setLayer" :key="'map1'">
          <v-btn icon color="red" @click="quitSplitFrom(1)">
            <v-icon>close</v-icon>
          </v-btn>
        </Map>
      </div>
      <div style=" border: 1px solid gray;"></div>
      <div style="width: 50%; right: 0;">
        <Map :config-file="configFile" :default-layer="layerSplit" :map-div-id="'map2'" @changeLayer="setLayerSplit" :key="'map2'">
          <v-btn icon color="red" @click="quitSplitFrom(2)">
            <v-icon>close</v-icon>
          </v-btn>
        </Map>
      </div>
    </v-layout>
    <v-layout v-else style="height: 100%;" pa-0 ma-0 :key="'single'">
    <div style="width: 100%;">
          <Map :config-file="configFile" :default-layer="layer" :map-div-id="'map0'" @changeLayer="setLayer">
            <v-btn icon color="primary" @click="splitScreen = true">
              <v-icon>vertical_split</v-icon>
            </v-btn>
          </Map>
      </div>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable new-cap */
  import { mapGetters } from 'vuex';
  /* eslint-disable no-unused-vars */
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-bing-layer';
  import { METADATADETAIL_PAGENAME } from '@/router/routeConsts';
  import { SET_APP_BACKGROUND, SET_CURRENT_PAGE } from '@/store/mainMutationsConsts';
  import {
    CLEAN_CURRENT_METADATA,
    LOAD_METADATA_CONTENT_BY_ID,
    METADATA_NAMESPACE,
  } from '@/store/metadataMutationsConsts';
  import axios from 'axios';
  import BaseIconButton from '../BaseElements/BaseIconButton';
  import Map from '../Metadata/Map';

  export default {
    name: 'MetadataMapPage',
    components: {
      Map,
      BaseIconButton,
    },
    data: () => ({
      layer: null,
      layerSplit: null,
      splitScreen: false,
      geoConfig: null,
      PageBGImage: './app_b_browsepage.jpg',
      configFile: null,
      map: null,
    }),
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, METADATADETAIL_PAGENAME);
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    mounted() {
      this.loadMetaDataContent();
    },
    beforeDestroy() {
      // clean current metadata to make be empty for the next to load up
      this.$store.commit(`${METADATA_NAMESPACE}/${CLEAN_CURRENT_METADATA}`);
    },
    computed: {
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
      loading() {
        return this.loadingMetadatasContent || this.loadingCurrentMetadataContent;
      },
    },
    methods: {
      setLayer(name) {
        console.log(name);
        this.layer = name;
      },
      setLayerSplit(name) {
        this.layerSplit = name;
      },
      quitSplitFrom(mapId) {
        if (mapId === 1) {
          this.layer = this.layerSplit;
        }
        this.splitScreen = false;
      },
      loadConfig() {
        const url = this.geoConfig.url;
        axios.get(url)
          .then((res) => {
            this.configFile = res.data;
            return 'Success';
          });
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
      close() {
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
      geoConfig() {
        if (this.geoConfig) {
          this.loadConfig();
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

</style>
