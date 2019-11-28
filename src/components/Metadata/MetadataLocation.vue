<template>
  <v-card>
    <v-card-title class="title metadata_title">Location</v-card-title>

    <v-card-text v-if="isEmpty && !showPlaceholder" style="color: red;">{{ emptyText }}</v-card-text>

    <v-card-text v-if="showPlaceholder" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div v-bind="mapSize"
              class='bone bone-type-image' />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !isEmpty">
      <!-- can't get it to work with the v-show for now
            because leaflet needs the ref
      to the mapcontainer to correctly initialize-->
      <div id="mapcontainer" ref="mapcontainer">
        <div id="map" ref="map" v-bind="mapSize" />
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import L from 'leaflet';
// import gL from 'leaflet.gridlayer.googlemutant';
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';

// HACK starts
// Solution to loading in the imgs correctly via webpack
// see more https://github.com/PaulLeCam/react-leaflet/issues/255
// stupid hack so that leaflet's images work after going through webpack
import marker from '@/assets/map/marker-icon.png';
import marker2x from '@/assets/map/marker-icon-2x.png';
import markerShadow from '@/assets/map/marker-shadow.png';

/* eslint-disable no-underscore-dangle */
// delete L.Icon.Default.prototype.mixinMethods_getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: marker2x,
//   iconUrl: marker,
//   shadowUrl: markerShadow,
// });

// HACK end

export default {
  components: {},
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    smallSize: 300,
    mediumSize: 500,
    largeSize: 725,
    fullWidthSize: 875,
    marker,
    marker2x,
    markerShadow,
    map: null,
    mapIsSetup: false,
    emptyText: 'No location found for this dataset',
  }),
  computed: {
    title() {
      return this.mixinMethods_getGenericProp('title');
    },
    isPolygon() {
      return this.mixinMethods_getGenericProp('isPolygon');
    },
    isPoint() {
      return this.mixinMethods_getGenericProp('isPoint');
    },
    isMultiPoint() {
      return this.mixinMethods_getGenericProp('isMultiPoint');
    },
    pointArray() {
      return this.mixinMethods_getGenericProp('pointArray');
    },
    geoJSON() {
      return this.mixinMethods_getGenericProp('geoJSON');
    },
    isEmpty() {
      return !this.pointArray && !this.geoJSON;
    },
    mapSize() {
      let width = this.largeSize;
      let height = this.mediumSize;

      if (this.$vuetify.breakpoint.xsOnly) {
        width = this.mediumSize;
        height = this.smallSize;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        width = this.fullWidthSize;
        height = this.smallSize;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        width = this.fullWidthSize;
      }

      return {
        style: `width: ${width}px !important;
                  max-width: 100%;
                  height: ${height}px !important;`,
      };
    },
  },
  updated() {
    this.setupMap();
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    setupMap() {
      if (this.mapIsSetup || this.isEmpty) return;

      this.map = this.initLeaflet(this.$refs.map, this.pointArray);
      this.addOpenStreetMapLayer(this.map);

      const validGeoJSON = this.parseGeoJSON(this.geoJSON);

      if (validGeoJSON) {
        L.geoJSON(this.geoJSON).addTo(this.map);
      } else if (this.pointArray) {
        if (this.isPoint) {
          this.addPoint(this.map, this.pointArray);
        }

        if (this.isPolygon) {
          this.addPolygon(this.map, this.pointArray);
        }

        if (this.isMultiPoint) {
          this.addMultiPoint(this.map, this.pointArray);
        }
      }

      this.map.on({ click: this.onMapClick });

      this.mapIsSetup = true;
    },
    initLeaflet: function initLeaflet(mapElement, coords) {
      const map = L.map(mapElement, {
        scrollWheelZoom: false,
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
      if (!geoJsonString) {
        return undefined;
      }

      try {
        return L.geoJSON(geoJsonString);
      } catch (error) {
        // console.log(`Tried to parse GeoJSON ${geoJsonString} failed with ${error}`);
        return undefined;
      }
    },
    addOpenStreetMapLayer: function addOpenStreetMapLayer(map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    },
    addPoint(map, coords) {
      const iconOptions = L.Icon.Default.prototype.options;
      // delete iconOptions.mixinMethods_getIconUrl;
      // use the defaultoptions to ensure that all untouched defaults stay in place

      iconOptions.iconUrl = this.marker;
      iconOptions.iconRetinaUrl = this.marker2x;
      iconOptions.shadowUrl = this.markerShadow;

      const icon = L.icon(iconOptions);

      const point = L.marker(coords, {
        icon,
        opacity: 0.65,
        riseOnHover: true,
      }).addTo(map);

      point.id = this.title;
      point.on({ mouseover: this.catchHover });
      point.on({ mouseout: this.catchHoverLeave });

      return point;
    },
    addPolygon: function addPolygon(map, coords) {
      // create a red polygon from an array of LatLng points
      // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
      const polygon = L.polygon(coords, { color: 'red' }).addTo(map);

      polygon.id = this.title;
      polygon.on({ mouseover: this.catchHover });
      polygon.on({ mouseout: this.catchHoverLeave });

      // zoom the map to the polygon
      map.fitBounds(polygon.getBounds());

      return polygon;
    },
    addMultiPoint: function addMultiPoint(map, coords) {
      for (let i = 0; i < coords.length; i++) {
        const pointCoord = coords[i];
        this.addPoint(map, pointCoord);
      }

      map.fitBounds(coords);
    },
    catchHover: function catchHover(e) {
      e.target.bindPopup(`<p>${e.target.id}</p>`).openPopup();
    },
    catchHoverLeave: function catchHoverLeave(e) {
      e.target.closePopup();
    },
  },
};
</script>
