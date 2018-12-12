<template>
  <v-card  >
    <v-card-title class="title metadata_title" >Location</v-card-title>

    <v-card-text v-if="isEmpty"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

    <v-card-text>
      <div id="mapcontainer"
            ref="mapcontainer">

        <div id="map"
              ref="map" 
              v-bind="mapSize"
        >
        </div>

      </div>
    </v-card-text>
    
  </v-card>

</template>

<script>
  import L from 'leaflet';
  // import gL from 'leaflet.gridlayer.googlemutant';
  /* eslint-disable no-unused-vars */
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
      title: String,
      isPolygon: Boolean,
      isPoint: Boolean,
      isMultiPoint: Boolean,
      pointArray: Array,
      geoJSON: String,
    },
    mounted: function mounted() {
      // this.map = L.map('map').setView([51.505, -0.09], 13);

      this.setupMap();
    },
    beforeDestroy: function beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
    updated: function updated() {
    },
    computed: {
      isEmpty: function isEmpty() {
        return !this.pointArray && !this.geoJSON;
      },
      mapSize: function mapSize() {
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
          height = this.mediumSize;
        }

        return {
          style: `width: ${width}px !important;
                  max-width: 100%;
                  height: ${height}px !important;`,
        };
      },
    },
    methods: {
      setupMap: function setupMap() {
        if (this.mapIsSetup) {
          return;
        }

        if (this.isEmpty) {
          return;
        }

        // console.log("pointArray " + this.pointArray + " " + this.geoJSON);

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
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
        ).addTo(map);
      },
      addPoint: function addPoint(map, coords) {
        const point = L.marker(coords).addTo(map);

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
    watch: {
      geoJSON: function updateGeoJSON() {
        if (this.geoJSON) {
          this.setupMap();
        }
      },
      pointArray: function updatePointArray() {
        if (this.pointArray) {
          this.setupMap();
        }
      },
    },
    data: () => ({
      smallSize: 300,
      mediumSize: 500,
      largeSize: 725,
      fullWidthSize: 875,
      map: null,
      mapIsSetup: false,
      emptyText: 'No location found for this dataset',
    }),
    components: {
    },
  };
</script>




