<template>
  <v-card  >
    <v-card-title class="title metadata_title" >Location</v-card-title>

    <v-card-text >
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

  export default {
    props: {
      isPolygon: Boolean,
      isPoint: Boolean,
      isMultiPoint: Boolean,
      pointArray: Array,
      geoJSON: String,
    },
    mounted: function mounted() {
      // this.map = L.map('map').setView([51.505, -0.09], 13);

    },
    updated: function updated() {
    },
    computed: {
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

        this.map.on('click', this.onMapClick);

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
        return point;
      },
      addPolygon: function addPolygon(map, coords) {
        // create a red polygon from an array of LatLng points
        // var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
        const polygon = L.polygon(coords, { color: 'red' }).addTo(map);
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
    }),
    components: {
    },
  };
</script>




