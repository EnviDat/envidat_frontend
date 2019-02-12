<template>

  <v-card raised
          :height="totalHeight"
          :width="totalWidth"
  >

    <v-card-title>
      <div class="headline mb-0">Cartographic Filtering</div>
    </v-card-title>

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

      <rectangle-button 
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
      // metadatasContent: 'metadata/metadatasContent',
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

      const viewCoords = [46.943961, 8.199240];

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
        center: viewCoords,
        zoom: 8,
      });


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

      const icon = L.icon({
        iconRetinaUrl: selected ? this.selectedMarker2x : this.marker2x,
        iconUrl: selected ? this.selectedMarker : this.marker,
        shadowUrl: this.markerShadow,
      });

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
    getPolygon: function getPolygon(coords, id, title) {
      // create a polygon from an array of LatLng points
      // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
      const polygon = L.polygon(coords, {
        color: this.$vuetify.theme.secondary,
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

      for (let i = 0; i < this.filteredContent.length; i++) {
        const dataset = this.filteredContent[i];

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

        // if (location.isPolygon) {
        //   const polygon = this.getPolygon(location.pointArray, location.id, location.title);
        //   if (polygon) {
        //     polys.push(polygon);
        //   }
        // }
      }

      if (polys.length > 0) {
        this.polygonLayerGroup = L.layerGroup(polys);
        // this.polygonLayerGroup.addTo(this.map);
      }

      if (pins.length > 0) {
        this.pinLayerGroup = L.layerGroup(pins);
        this.pinLayerGroup.addTo(this.map);
      }

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
        this.multiPinLayerGroup = L.layerGroup(flatMultiPins);
        this.multiPinLayerGroup.addTo(this.map);
      }
    },
    clearLayers: function clearLayers(map) {
      if (!map) {
        return;
      }

      if (this.polygonLayerGroup) {
        map.removeLayer(this.polygonLayerGroup);
        this.polygonLayerGroup = null;
      }

      if (this.pinLayerGroup) {
        map.removeLayer(this.pinLayerGroup);
        this.pinLayerGroup = null;
      }

      if (this.multiPinLayerGroup) {
        map.removeLayer(this.multiPinLayerGroup);
        this.multiPinLayerGroup = null;
      }

      // map.eachLayer((layer) => {
      //   map.removeLayer(layer);
      // });
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
  },
  watch: {
    pinnedIds: function updateMap() {
      this.clearLayers(this.map);
      this.addGeoJSONToMap();
    },
    filteredContent: function updateMetadatasContent() {
      this.clearLayers(this.map);
      this.addGeoJSONToMap();
    },
  },
  data: () => ({
    map: null,
    mapIsSetup: false,
    buttonHeight: 100,
    updatingMap: true,
    addedObjectsKeys: [],
    mapFilteringActive: false,
    markerCount: 0,
    hoverBadge: false,
    errorLoadingLeaflet: false,
    mapLayerGroup: null,
    polygonLayerGroup: null,
    pinLayerGroup: null,
    multiPinLayerGroup: null,
    clearButtonText: 'Clear filtered Pins',
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



