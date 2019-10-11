<template>
  <v-card raised
          :height="totalHeight"
          >
    <!-- :width="totalWidth"  -->

    <div v-if="errorLoadingLeaflet"
          v-bind="mapViewHeight" >
      Error loading leaflet
    </div>

    <div v-if="!errorLoadingLeaflet" >

      <v-layout row>

        <v-flex py-0 pr-0>
          <div id="map"
                ref="map"
                v-bind="mapViewHeight" />
        </v-flex>

        <v-flex xs2 py-0 pl-0>

          <filter-map-widget style="height: 100%"
                              :pinnedIds="pinnedIds"
                              :hasPins="hasPins"
                              :pinEnabled="pinEnabled"
                              :pinNumber="hasPins ? pinLayerGroup.length : 0"
                              :hasMultiPins="hasMultiPins"
                              :multiPinEnabled="multiPinEnabled"
                              :multiPinNumber="hasMultiPins ? multiPinLayerGroup.length : 0"
                              :hasPolygons="hasPolygons"
                              :polygonEnabled="polygonEnabled"
                              :polygonNumber="hasPolygons ? polygonLayerGroup.length : 0"
                              @clickedFocus="focusOnLayers"
                              @clickedPin="catchPinClicked"
                              @clickedMultipin="catchMultipinClicked"
                              @clickedPolygon="catchPolygonClicked"
                              @clickedClear="catchClearClicked" />

        </v-flex>

      </v-layout>

    </div>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import metaDataFactory from '@/factories/metaDataFactory';
import FilterMapWidget from '@/components/Filtering/FilterMapWidget';

// HACK start
/* eslint-disable import/first */
// Solution to loading in the imgs correctly via webpack
// see more https://github.com/PaulLeCam/react-leaflet/issues/255
// stupid hack so that leaflet's images work after going through webpack
import marker from '@/assets/map/marker-icon.png';
import marker2x from '@/assets/map/marker-icon-2x.png';
import selectedMarker from '@/assets/map/selected-marker-icon.png';
import selectedMarker2x from '@/assets/map/selected-marker-icon-2x.png';
import markerShadow from '@/assets/map/marker-shadow.png';
// HACK end


export default {
  props: {
    content: Array,
    totalHeight: Number,
    totalWidth: Number,
    pinnedIds: Array,
  },
  beforeMount: function beforeMount() {
    this.pinIcon = this.mixinMethods_getIcon('marker');
    this.multiPinIcon = this.mixinMethods_getIcon('markerMulti');
    this.polygonIcon = this.mixinMethods_getIcon('polygons');
    this.eyeIcon = this.mixinMethods_getIcon('eye');
  },
  mounted: function mounted() {
    this.setupMap();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  computed: {
    ...mapGetters({
      metadataIds: 'metadata/metadataIds',
      metadatasContent: 'metadata/metadatasContent',
      searchedMetadatasContent: 'metadata/searchedMetadatasContent',
      searchingMetadatasContent: 'metadata/searchingMetadatasContent',
      loadingMetadataIds: 'metadata/loadingMetadataIds',
      loadingMetadatasContent: 'metadata/loadingMetadatasContent',
    }),
    loading() {
      return this.loadingMetadataIds || this.loadingMetadatasContent;
    },
    mapViewHeight() {
      return {
        style: `height: ${this.totalHeight}px;`,
      };
    },
    widgetWidth() {
      return this.$vuetify.breakpoint.smAndDown ? 100 : 350;
    },
    mapHeight() {
      return this.totalHeight - this.buttonHeight;
    },
    hasPins() {
      return this.pinLayerGroup && this.pinLayerGroup.length > 0;
    },
    hasMultiPins() {
      return this.multiPinLayerGroup && this.multiPinLayerGroup.length > 0;
    },
    hasPolygons() {
      return this.polygonLayerGroup && this.polygonLayerGroup.length > 0;
    },
  },
  methods: {
    checkError: function checkError() {
    // checkError: function checkError(e) {
      // console.log(`got leaflet error ${e}`);
      this.errorLoadingLeaflet = true;
    },
    catchPointClick: function catchPointClick(e) {
      this.$emit('pointClicked', e.target.id);
    },
    catchPointHover: function catchPointHover(e) {
      e.target.bindPopup(`<p>${e.target.title}</p>`).openPopup();
      this.$emit('pointHover', e.target.id);
    },
    catchPointHoverLeave: function catchPointHoverLeave(e) {
      e.target.closePopup();
      this.$emit('pointHoverLeave', e.target.id);
    },
    catchClearButtonClicked: function catchClearButtonClicked() {
      this.$emit('clearButtonClicked');
    },
    catchPinClicked() {
      this.pinEnabled = !this.pinEnabled;
      this.updatePins();
    },
    catchMultipinClicked() {
      this.multiPinEnabled = !this.multiPinEnabled;
      this.updateMultiPins();
    },
    catchPolygonClicked() {
      this.polygonEnabled = !this.polygonEnabled;
      this.updatePolygons();
    },
    catchClearClicked() {
      this.$emit('clearButtonClicked');
    },
    toggleMapExpand: function toggleMapExpand() {
      return this.$emit('toggleMapFilterExpand');
    },
    setupMap() {
      if (this.mapIsSetup) {
        return;
      }

      this.map = this.initLeaflet(this.$refs.map, this.pointArray);
      this.markerCount = 0;

      if (this.map) {
        this.map.on('locationerror', () => {
          this.checkError();
        });

        this.addOpenStreetMapLayer(this.map);

        this.updateMap();

        this.map.on('zoomend', () => {
          this.updatePolygons();
        });

        this.map.on('moveend', () => {
          this.updatePolygons();
        });

        this.mapIsSetup = true;
      }
    },
    initLeaflet: function initLeaflet(mapElement) {
      const map = L.map(mapElement, {
        // scrollWheelZoom: false,
        center: this.setupCenterCoords,
        zoom: 7,
        zoomSnap: 0.5,
      });

      this.initialBounds = map.getBounds();

      return map;
    },
    parseGeoJSON(geoJsonString) {
      try {
        return L.geoJSON(geoJsonString);
      } catch (error) {
        // console.log(`Tried to parse GeoJSON ${geoJsonString} failed with ${error}`);
        return undefined;
      }
    },
    addOpenStreetMapLayer: function addOpenStreetMapLayer(map) {
      const baseMap = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
      ).addTo(map);
      this.mapLayerGroup = L.layerGroup([baseMap]);
      this.mapLayerGroup.addTo(map);
    },
    getPoint(coords, id, title, selected) {
      const iconOptions = L.Icon.Default.prototype.options;
      // use the defaultoptions to ensure that all untouched defaults stay in place

      iconOptions.iconUrl = selected ? this.selectedMarker : this.marker;
      iconOptions.iconRetinaUrl = selected ? this.selectedMarker2x : this.marker2x;
      iconOptions.shadowUrl = this.markerShadow;

      const icon = L.icon(iconOptions);

      const point = L.marker(coords, {
        icon,
        opacity: selected ? 0.8 : 0.65,
        riseOnHover: true,
      });

      point.id = id;
      point.title = title;
      point.on({ click: this.catchPointClick });
      point.on({ mouseover: this.catchPointHover });
      point.on({ mouseout: this.catchPointHoverLeave });


      return point;
    },
    getPolygon(coords, id, title, selected) {
      // create a polygon from an array of LatLng points
      // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
      const polygon = L.polygon(coords, {
        color: selected ? this.$vuetify.theme.primary : this.$vuetify.theme.accent,
        opacity: 0.45,
        fillOpacity: 0,
      });

      polygon.on({ click: this.catchPointClick });
      polygon.id = id;
      polygon.title = title;

      return polygon;
    },
    getMultiPoint(coords, id, title, selected) {
      const points = [];
      for (let i = 0; i < coords.length; i++) {
        const pointCoord = coords[i];
        const point = this.getPoint(pointCoord, id, title, selected);
        points.push(point);
      }

      return points;
    },
    createMapElements(locationDataSet) {
      const pins = [];
      const multiPins = [];
      const polys = [];

      for (let i = 0; i < locationDataSet.length; i++) {
        const dataset = locationDataSet[i];

        const location = metaDataFactory.createLocation(dataset);
        const selected = this.pinnedIds.includes(location.id);

        if (location.isPoint) {
          const pin = this.getPoint(location.pointArray, location.id, location.title, selected);
          if (pin) {
            pins.push(pin);
          }
        }

        if (location.isMultiPoint) {
          const multiPin = this.getMultiPoint(location.pointArray, location.id, location.title, selected);
          if (multiPin) {
            multiPins.push(multiPin);
          }
        }

        if (location.isPolygon) {
          const polygon = this.getPolygon(location.pointArray, location.id, location.title, selected);
          if (polygon) {
            polys.push(polygon);
          }
        }
      }

      this.polygonLayerGroup = polys;
      this.pinLayerGroup = pins;

      if (multiPins.length > 0) {
        const flatMultiPins = [];
        multiPins.forEach((pinCollection) => {
          if (pinCollection) {
            pinCollection.forEach((pin) => {
              if (pin) {
                flatMultiPins.push(pin);
              }
            });
          }
        });

        this.multiPinLayerGroup = flatMultiPins;
      } else {
        this.multiPinLayerGroup = [];
      }
    },
    addElementsToMap: function addElementsToMap(elements, enabled, checkBounds) {
      if (!enabled || !elements || elements.length <= 0) {
        return;
      }

      this.showMapElements(elements, true, checkBounds);
    },
    focusOnLayers: function focusOnLayers() {
      const allLayers = [];

      if (this.pinEnabled) {
        this.pinLayerGroup.forEach((l) => {
          allLayers.push(l);
        });
      }

      if (this.multiPinEnabled) {
        this.multiPinLayerGroup.forEach((l) => {
          allLayers.push(l);
        });
      }

      if (this.polygonEnabled) {
        this.polygonLayerGroup.forEach((l) => {
          allLayers.push(l);
        });
      }

      if (allLayers.length > 0) {
        const feat = L.featureGroup(allLayers);
        const featBounds = feat.getBounds();

        // if (featBounds.contains(this.initialBounds)) {
        //   this.map.fitBounds(this.initialBounds);
        // } else {
        this.map.fitBounds(featBounds, { maxZoom: 8 });
        // }
      }
    },
    clearLayers: function clearLayers(map, specificClear) {
      if (!map) {
        return;
      }

      if (this.polygonLayerGroup) {
        if ((specificClear && specificClear === 'polygons') || !specificClear) {
          this.showMapElements(this.polygonLayerGroup, false);
        }
      }

      if (this.pinLayerGroup) {
        if ((specificClear && specificClear === 'pins') || !specificClear) {
          this.showMapElements(this.pinLayerGroup, false);
        }
      }

      if (this.multiPinLayerGroup) {
        if ((specificClear && specificClear === 'multiPins') || !specificClear) {
          this.showMapElements(this.multiPinLayerGroup, false);
        }
      }
    },
    showMapElements(elements, show, checkBounds) {
      const currentBounds = this.map.getBounds();

      elements.forEach((el) => {
        if ((show && !checkBounds) || (show && checkBounds && !el.getBounds().contains(currentBounds))) {
          try {
            el.addTo(this.map);
          } catch (error) {
            // console.log(`showMapElements error: ${error} on element ${el.title}`);
          }
        } else {
          try {
            this.map.removeLayer(el);
          } catch (error) {
            // console.log(`showMapElements error: ${error} on element ${el.title}`);
          }
        }
      });
    },
    addControls() {
      const baseLayers = {
        Map: this.mapLayerGroup,
      };

      const overlays = {
        Pins: this.pinLayerGroup,
        MultiPins: this.multiPinLayerGroup,
        Polygons: this.polygonLayerGroup,
      };

      L.control.layers(baseLayers, overlays).addTo(this.map);
    },
    updateMap() {
      this.clearLayers(this.map);

      // fills this.pinLayerGroup, this.multiPinLayerGroup, this.polygonLayerGroup
      this.createMapElements(this.content);

      this.addElementsToMap(this.pinLayerGroup, this.pinEnabled);
      this.addElementsToMap(this.multiPinLayerGroup, this.multiPinEnabled);
      this.addElementsToMap(this.polygonLayerGroup, this.polygonEnabled, true);

      // this.addGeoJSONToMap();
    },
    updatePins: function updatePins() {
      this.clearLayers(this.map, 'pins');

      this.addElementsToMap(this.pinLayerGroup, this.pinEnabled);
    },
    updateMultiPins: function updateMultiPins() {
      this.clearLayers(this.map, 'multiPins');

      this.addElementsToMap(this.multiPinLayerGroup, this.multiPinEnabled);
    },
    updatePolygons: function updatePolygons() {
      this.clearLayers(this.map, 'polygons');

      this.addElementsToMap(this.polygonLayerGroup, this.polygonEnabled, true);
    },
  },
  watch: {
    content() {
      this.updateMap();
    },
    // pinnedIds: function updateMapPinnedIds() {
    //   this.updateMap();
    // },
    // filteredContent: function updateMetadatasContent() {
    //   this.updateMap();
    // },
  },
  data: () => ({
    map: null,
    mapIsSetup: false,
    setupCenterCoords: [46.943961, 8.199240],
    initialBounds: null,
    buttonHeight: 135,
    updatingMap: true,
    addedObjectsKeys: [],
    mapFilteringActive: false,
    markerCount: 0,
    hoverBadge: false,
    errorLoadingLeaflet: false,
    mapLayerGroup: null,
    polygonEnabled: false,
    polygonLayerGroup: null,
    pinEnabled: true,
    pinLayerGroup: null,
    multiPinEnabled: true,
    multiPinLayerGroup: null,
    pinIcon: null,
    multiPinIcon: null,
    polygonIcon: null,
    eyeIcon: null,
    filterText: 'Pinned: ',
    marker,
    marker2x,
    selectedMarker,
    selectedMarker2x,
    markerShadow,
  }),
  components: {
    FilterMapWidget,
  },
};
</script>

<style>

.rotating {
  animation: rotateturn 1s steps(8, end) infinite;
}

@keyframes rotateturn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
</style>
