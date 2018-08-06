<template>
  <v-card >
    <v-card-title class="title metadata_title" >Location</v-card-title>

    <v-card-text id="mapcontainer" ref="mapcontainer">
      <div id="map" ref="map" style="width: 725px; height: 500px;"></div>
    </v-card-text>
    

    <!--v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="resize()">
        <v-icon color="accent" >{{ fullSize ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>        
    </v-card-actions-->
    
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
          console.log(`Tried to parse GeoJSON ${geoJsonString} failed with ${error}`);
          return undefined;
        }
      },
      addOpenStreetMapLayer: function addOpenStreetMapLayer(map) {
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
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
      onMapClick: function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
      },
      // resize: function resize() {
      //   let height = this.fullSize ? 500 : 300;
      //   console.log("resize " + height);
      //   this.fullSize = !this.fullSize;
      //   this.$refs.map.setAttribute('style', `height: ${height}px;`);
      //   height += 32;
      //   this.$refs.mapcontainer.setAttribute('style', `height: ${height}px;`);
      //   this.map.invalidateSize();
      // },
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
      fullSize: false,
      map: null,
      mapIsSetup: false,
    }),
    components: {
    },
  };
</script>




