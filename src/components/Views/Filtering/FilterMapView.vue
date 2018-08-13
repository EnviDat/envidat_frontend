<template>

  <v-card raised
          :height="totalHeight"
  >
    <div v-if="expanded"
          id="map"
          ref="map"
          v-bind="mapViewHeight" />
      
    <v-card-actions class="pr-2">

        <v-btn v-if="expanded"
                class="px-0"
                color="accent"
                style="min-width: 40px !important;"
                @click.native="toggleActive"
                :outline="!mapFilteringActive"
        >
          <img class="envidatIcon" :src="getIcon('mapMarker')" />                
        </v-btn>

      <v-spacer />

      <div class="pr-2">
        <img v-if="loading"
              class="envidatIcon rotating" :src="getIcon('spinner')" />                
      </div>

      <!-- <v-btn small flat
              @click.native="toggleMapExpand">
        {{ expanded ? expandedButtonText : expandButtonText  }}
        <v-icon color="accent" 
                :style="expanded ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
        >expand_more</v-icon>
      </v-btn> -->

      <!-- 

      <v-btn color="red"
              small
              outline >Reset</v-btn>

      <v-btn color="primary"
              @click.native=""
              small >Apply</v-btn> -->

    </v-card-actions>

  </v-card>

</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// HACK start
// Solution to loading in the imgs correctly via webpack
// see more https://github.com/PaulLeCam/react-leaflet/issues/255
// stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

/* eslint-disable no-underscore-dangle */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

// HACK end

export default {
  props: {
    locations: Array,
    totalHeight: Number,
    expanded: Boolean,
  },
  mounted: function mounted() {
    this.setupMap();
  },
  beforeDestroy: function beforeDestroy() {
    this.mapFilteringActive = false;
    this.reFilter();
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
    // cardHeight: function cardHeight() {
    //   if (this.expanded) {
    //     return this.totalHeight + this.buttonHeight;
    //   }

    //   return this.buttonHeight;
    // },
  },
  methods: {
    // expandClicked: function expandClicked(expand) {
    //   this.expanded = expand;
    // },
    catchPointClick: function catchPointClick(e) {
      this.$emit('pointClicked', e.target.id);
    },
    toggleMapExpand: function toggleMapExpand() {
      this.toggleActive();

      return this.$emit('toggleMapFilterExpand');
    },
    toggleActive: function toggleActive() {
      this.mapFilteringActive = !this.mapFilteringActive;

      this.reFilter();
    },
    setupMap: function setupMap() {
      // if (this.mapIsSetup) {
      //   return;
      // }

      // console.log("pointArray " + this.pointArray + " " + this.geoJSON);

      this.map = this.initLeaflet(this.$refs.map, this.pointArray);
      this.addOpenStreetMapLayer(this.map);

      this.addGeoJSONToMap();

      this.map.on('moveend', this.reFilter);

      this.mapIsSetup = true;
    },
    initLeaflet: function initLeaflet(mapElement, coords) {
      const map = L.map(mapElement, {
        scrollWheelZoom: false,
        center: [46.943961, 8.199240],
        zoom: 8,
      });

      if (coords) {
        let viewCoords = coords;

        if (this.isPolygon) {
          viewCoords = coords[0][0];
        } else if (this.isMultiPoint) {
          viewCoords = coords[0];
        }

        map.setView(viewCoords, 9);
      }

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
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
      ).addTo(map);
    },
    addGoogleMapsLayer: function addGoogleMapsLayer(map) {
      // const styled = L.gridLayer.googleMutant({
      //   type: 'roadmap',
      //   styles: [
      //     { elementType: 'labels', stylers: [{ visibility: 'off' }] },
      //     { featureType: 'water', stylers: [{ color: '#444444' }] },
      //   ],
      // }).addTo(map);

      const roads = L.gridLayer.googleMutant({
        type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      }).addTo(map);
    },
    addGeoData: function addGeoData(location) {
      const validGeoJSON = this.parseGeoJSON(location.geoJSON);

      if (validGeoJSON) {
        L.geoJSON(location.geoJSON).addTo(this.map);
      } else if (location.pointArray) {
        if (location.isPoint) {
          this.addPoint(this.map, location.pointArray, location.id);
        }

        // if (location.isPolygon) {
        //   this.addPolygon(this.map, location.pointArray, location.id);
        // }

        // if (location.isMultiPoint) {
        //   this.addMultiPoint(this.map, location.pointArray, location.id);
        // }
      }
    },
    addPoint: function addPoint(map, coords, id) {
      const point = L.marker(coords, {
        color: this.$vuetify.theme.primary,
        opacity: 0.65,
        riseOnHover: true,
      }).addTo(map);

      point.id = id;
      point.on('click', this.catchPointClick);

      return point;
    },
    addPolygon: function addPolygon(map, coords, id) {
      // create a red polygon from an array of LatLng points
      // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
      const polygon = L.polygon(coords, {
        color: this.$vuetify.theme.secondary,
        opacity: 0.1,
        fillOpacity: 0.1,
      }).addTo(map);

      // zoom the map to the polygon
      // map.fitBounds(polygon.getBounds());
      polygon.id = id;

      return polygon;
    },
    addMultiPoint: function addMultiPoint(map, coords, id) {

      for (let i = 0; i < coords.length; i++) {
        const pointCoord = coords[i];
        this.addPoint(map, pointCoord, id);
      }

      // map.fitBounds(coords);
    },
    reFilter: function reFilter() {
      const visibleMetadataIds = [];

      if (this.mapFilteringActive) {
        const currentBounds = this.map.getBounds();
        const keys = Object.keys(this.map._layers);

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const layer = this.map._layers[key];

          if (layer instanceof L.Marker) {
            const markerPos = layer.getLatLng();

            // console.log(key + " marker " + markerPos + " in " + currentBounds + " " + contains);
            if (currentBounds.contains(markerPos) && layer.id) {
              visibleMetadataIds.push(layer.id);
            }
          }
        }

        // console.log("visible ids " + visibleMetadataIds.length);
      }

      this.$emit('viewChanged', visibleMetadataIds);
    },
    addGeoJSONToMap: function addGeoJSONToMap() {
      const keys = Object.keys(this.metadatasContent);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!this.addedObjectsKeys.includes(key)) {
          const dataset = this.metadatasContent[key];

          const location = this.createLocation(dataset);

          // console.log("adding " + key + " " + JSON.stringify(location.spatial));
          this.addGeoData(location);

          this.addedObjectsKeys.push(key);
        }
      }
    },
  },
  watch: {
    metadatasContent: function updateMetadatasContent() {
      this.addGeoJSONToMap();
    },
  },
  data: () => ({
    map: null,
    mapIsSetup: false,
    buttonHeight: 50,
    updatingMap: true,
    addedObjectsKeys: [],
    mapFilteringActive: false,
  }),
  components: {
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



