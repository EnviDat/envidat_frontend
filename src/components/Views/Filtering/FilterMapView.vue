<template>

  <v-card raised
          :height="totalHeight"
          :width="totalWidth"
  >

    <v-card-title>
      <div class="headline mb-0">Cartographic Filtering</div>
    </v-card-title>
    
    <div class="mb-2" :style="`background-color: ${this.$vuetify.theme.highlight};`">
      <p class="px-3 py-0 my-0 body-2" > {{ highlightedText }} </p>
    </div>

    <div v-if="expanded && !errorLoadingLeaflet"
          id="map"
          ref="map"
          v-bind="mapViewHeight" />

    <div v-if="expanded && errorLoadingLeaflet"
          v-bind="mapViewHeight" >
          Error loading leaflet
    </div>

    <v-card-actions class="pr-2">
      <div :style="`color:${this.pinnedIds.length > 0 ? this.$vuetify.theme.primary : 'rgba(0,0,0,.47)'};`" >{{ this.filterText + this.pinnedIds.length }}</div>

      <v-spacer />

          <icon-button class="px-1"
                        :customIcon="eyeIcon"
                        color="highlight"
                        :outlined="true"
                        toolTipText="Focus on all elements on the map"
                        v-on:clicked="focusOnLayers()" />

          <icon-button class="px-1"
                        :customIcon="pinIcon"
                        color="secondary"
                        :outlined="true"
                        :isToggled="pinEnabled"
                        :toolTipText="pinEnabled ? 'Hide single markers' : 'Show single markers'"
                        v-on:clicked="pinEnabled = !pinEnabled; updateMap()" />

          <icon-button class="px-1"
                        :customIcon="multiPinIcon"
                        color="secondary"
                        :outlined="true"
                        :isToggled="multiPinEnabled"
                        :toolTipText="multiPinEnabled ? 'Hide multi markers' : 'Show multi markers'"
                        v-on:clicked="multiPinEnabled = !multiPinEnabled; updateMap()" />

          <icon-button class="px-1"
                        :customIcon="polygonIcon"
                        :disabled="true"
                        toolTipText="Polygon filtering is in development"
                        />

                        <!-- 
                        color="grey"
                        :isToggled="polygonEnabled"
                        :outlined="true"
                        :toolTipText="polygonEnabled ? 'Hide polygons' : 'Show polygons'"
                        v-on:clicked="polygonEnabled = !polygonEnabled; updateMap()" -->

      <rectangle-button class="pl-2"
                        :buttonText="clearButtonText"
                        toolTipText="Clear all pinned Metadata"
                        :isSmall="true"
                        :isFlat="true"
                        iconColor="red"
                        :disabled="this.pinnedIds.length <= 0"
                        materialIconName="close"
                        v-on:clicked="catchClearButtonClicked"
      />


    </v-card-actions>

  </v-card>

</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import IconCountView from '../IconCountView';
import metaDataFactory from '../../metaDataFactory';
import RectangleButton from '../../Elements/RectangleButton';
import IconButton from '../../Elements/IconButton';

// HACK start
/* eslint-disable import/first */
// Solution to loading in the imgs correctly via webpack
// see more https://github.com/PaulLeCam/react-leaflet/issues/255
// stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import selectedMarker from 'leaflet/dist/images/selected-marker-icon.png';
import selectedMarker2x from 'leaflet/dist/images/selected-marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

/* eslint-disable no-underscore-dangle */
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   // iconRetinaUrl: marker2x,
//   // iconUrl: marker,
//   shadowUrl: markerShadow,
// });

// HACK end


export default {
  props: {
    locations: Array,
    totalHeight: Number,
    totalWidth: Number,
    expanded: Boolean,
  },
  beforeMount: function beforeMount() {
    this.pinIcon = this.getIcon('marker');
    this.multiPinIcon = this.getIcon('markerMulti');
    this.polygonIcon = this.getIcon('polygons');
    this.eyeIcon = this.getIcon('eye');
  },
  mounted: function mounted() {
    // if (L){
    //   L.on('error', this.checkError);
    // }
    this.setupMap();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  computed: {
    ...mapGetters({
      filteredContent: 'metadata/filteredContent',
      metadataIds: 'metadata/metadataIds',
      pinnedIds: 'metadata/pinnedIds',
      metadatasContent: 'metadata/metadatasContent',
      searchedMetadatasContent: 'metadata/searchedMetadatasContent',
      searchingMetadatasContent: 'metadata/searchingMetadatasContent',
      loadingMetadataIds: 'metadata/loadingMetadataIds',
      loadingMetadatasContent: 'metadata/loadingMetadatasContent',
    }),
    loading: function loading() {
      return this.loadingMetadataIds || this.loadingMetadatasContent;
    },
    mapViewHeight: function mapViewHeight() {
      return {
        style: `height: ${this.mapHeight}px;`,
      };
    },
    mapHeight: function mapHeight() {
      return this.totalHeight - this.buttonHeight;
    },
  },
  methods: {
    checkError: function checkError(e) {
      console.log(`got leaflet error ${e}`);
      this.errorLoadingLeaflet = true;
    },
    // expandClicked: function expandClicked(expand) {
    //   this.expanded = expand;
    // },
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
    toggleMapExpand: function toggleMapExpand() {
      return this.$emit('toggleMapFilterExpand');
    },
    setupMap: function setupMap() {
      if (this.mapIsSetup) {
        return;
      }

      // console.log("pointArray " + this.pointArray + " " + this.geoJSON);

      this.map = this.initLeaflet(this.$refs.map, this.pointArray);
      this.markerCount = 0;

      if (this.map) {
        this.map.on({ locationerror: this.checkError });

        this.addOpenStreetMapLayer(this.map);

        this.clearLayers();
        this.addGeoJSONToMap();

        // this.map.on({ click: console.log("clicked map") });

        this.mapIsSetup = true;
      }
    },
    initLeaflet: function initLeaflet(mapElement) {
      // if (!L){
      //   errorLoadingLeaflet = true;
      //   return undefined;
      // }

      // if (coords) {
      //   viewCoords = coords;

      //   if (this.isPolygon) {
      //     viewCoords = coords[0][0];
      //   } else if (this.isMultiPoint) {
      //     viewCoords = coords[0];
      //   }

      //   // map.setView(viewCoords, 9);
      // }

      const map = L.map(mapElement, {
        scrollWheelZoom: false,
        center: this.setupCenterCoords,
        zoom: 7,
        zoomSnap: 0.5,
      });

      this.initialBounds = map.getBounds();

      return map;
    },
    parseGeoJSON: function parseGeoJSON(geoJsonString) {
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
      // baseMap.addTo(map);
    },
    getPoint: function getPoint(coords, id, title, selected) {
      const iconOptions = L.Icon.Default.prototype.options;
      delete iconOptions._getIconUrl;
      // use the defaultoptions to ensure that all untouched defaults stay in place

      iconOptions.iconUrl = selected ? this.selectedMarker : this.marker;
      iconOptions.iconRetinaUrl = selected ? this.selectedMarker2x : this.marker2x;
      iconOptions.shadowUrl = this.markerShadow;

      // L.Icon.Default.mergeOptions({
      //   iconRetinaUrl: selected ? this.selectedMarker2x : this.marker2x,
      //   iconUrl: selected ? this.selectedMarker : this.marker,
      //   shadowUrl: this.markerShadow,
      // });

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
    getPolygon: function getPolygon(coords, id, title, selected) {
      // create a polygon from an array of LatLng points
      // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
      const polygon = L.polygon(coords, {
        color: selected ? this.$vuetify.theme.primary : this.$vuetify.theme.accent,
        opacity: 0.45,
        fillOpacity: 0,
      });

      // if (!map.getBounds().contains(polygon.getBounds())) {
      //   return null;
      // }

      polygon.on({ click: this.catchPointClick });
      // polygon.on({ mouseover: this.catchPointHover });
      // polygon.on({ mouseout: this.catchPointHoverLeave });

      // zoom the map to the polygon
      // map.fitBounds(polygon.getBounds());
      polygon.id = id;
      polygon.title = title;

      return polygon;
    },
    getMultiPoint: function getMultiPoint(coords, id, title, selected) {
      const points = [];
      for (let i = 0; i < coords.length; i++) {
        const pointCoord = coords[i];
        const point = this.getPoint(pointCoord, id, title, selected);
        points.push(point);
      }

      return points;
    },
    addGeoJSONToMap: function addGeoJSONToMap() {
      const pins = [];
      const multiPins = [];
      const polys = [];
      const pinnedContent = [];

      this.pinnedIds.forEach((pinId) => {
        pinnedContent.push(this.metadatasContent[pinId]);
      });

      const pinnedAndFilteredContent = [...pinnedContent, ...this.filteredContent];

      for (let i = 0; i < pinnedAndFilteredContent.length; i++) {
        const dataset = pinnedAndFilteredContent[i];

        const location = metaDataFactory.createLocation(dataset);
        const selected = this.pinnedIds.includes(location.id);

        if (this.pinEnabled && location.isPoint) {
          const pin = this.getPoint(location.pointArray, location.id, location.title, selected);
          if (pin) {
            // pin.addTo(this.map);
            pins.push(pin);
          }
        }

        if (this.multiPinEnabled && location.isMultiPoint) {
          const multiPin = this.getMultiPoint(location.pointArray, location.id, location.title, selected);
          if (multiPin) {
            multiPins.push(multiPin);
          }
        }

        if (this.polygonEnabled && location.isPolygon) {
          const polygon = this.getPolygon(location.pointArray, location.id, location.title, selected);
          if (polygon) {
            polys.push(polygon);
          }
        }
      }

      if (this.polygonEnabled && polys.length > 0) {
        this.polygonLayerGroup = polys;
        // this.polygonLayerGroup.addTo(this.map);
        this.polygonLayerGroup.forEach((p) => {
          p.addTo(this.map);
        });
      }

      if (this.pinEnabled && pins.length > 0) {
        this.pinLayerGroup = pins;
        // this.pinLayerGroup.addTo(this.map);
        this.pinLayerGroup.forEach((p) => {
          try {
            p.addTo(this.map);
          } catch (error) {
            console.log('point error: ' + error + ' on point ' + p.title);
          }
        });
      }

      if (this.multiPinEnabled && multiPins.length > 0) {
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
        // this.multiPinLayerGroup.addTo(this.map);

        this.multiPinLayerGroup.forEach((p) => {
          try {
            p.addTo(this.map);
          } catch (error) {
            console.log('multipoint error: ' + error + ' on point ' + p.title);
          }
        });
      }
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
    clearLayers: function clearLayers(map) {
      if (!map) {
        return;
      }

      if (this.polygonLayerGroup) {
        // this.polygonLayerGroup.clearLayers();
        this.showMapElements(this.polygonLayerGroup, false);
        // map.removeLayer(this.polygonLayerGroup);
        this.polygonLayerGroup = [];
      }

      if (this.pinLayerGroup) {
        // this.pinLayerGroup.clearLayers();
        this.showMapElements(this.pinLayerGroup, false);
        // map.removeLayer(this.pinLayerGroup);
        this.pinLayerGroup = [];
      }

      if (this.multiPinLayerGroup) {
        // this.multiPinLayerGroup.clearLayers();
        this.showMapElements(this.multiPinLayerGroup, false);
        // map.removeLayer(this.multiPinLayerGroup);
        this.multiPinLayerGroup = [];
      }

      // map.eachLayer((layer) => {
      //   map.removeLayer(layer);
      // });
    },
    showMapElements(elements, show) {
      elements.forEach((el) => {
        if (show) {
          el.addTo(this.map);
        } else {
          this.map.removeLayer(el);
        }
      });
    },
    addControls: function addControls() {
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
    updateMap: function updateMap() {
      this.clearLayers(this.map);
      this.addGeoJSONToMap();
      // this.focusOnLayers();
    },
  },
  watch: {
    pinnedIds: function updateMapPinnedIds() {
      this.updateMap();
    },
    filteredContent: function updateMetadatasContent() {
      this.updateMap();
    },
  },
  data: () => ({
    map: null,
    mapIsSetup: false,
    setupCenterCoords: [46.943961, 8.199240],
    initialBounds: null,
    //Todo: sometimes the height isn't loaded correctly... 
    buttonHeight: 130,
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
    highlightedText: 'Select markers to pin them to the top of the list',
    clearButtonText: 'Clear Pins',
    filterText: 'Pinned: ',
    marker,
    marker2x,
    selectedMarker,
    selectedMarker2x,
    markerShadow,
  }),
  components: {
    IconCountView,
    RectangleButton,
    IconButton,
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



