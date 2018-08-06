<template>

  <v-card raised :height="totalHeight"
  >
      <div id="map" ref="map" v-bind="mapViewHeight" />
    </v-card-text>
      
    <v-card-actions class="pr-2">

      <v-btn icon @click.native="">
        <img class="envidatIcon" :src="getIcon('map')" />                
      </v-btn>

      <img v-if="loading"
            class="envidatIcon rotating" :src="getIcon('spinner')" />                

    </v-card-actions>

  </v-card>

</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

export default {
  props: {
    locations: Array,
    totalHeight: Number,
  },
  mounted: function mounted() {
    this.setupMap();
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
      return this.loadingMetadatasContent;
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
    expandClicked: function expandClicked(expand) {
      this.expanded = expand;
    },
    catchPointClick: function catchPointClick(e) {
      this.$emit('pointClicked', e.target.id);
    },
    setupMap: function setupMap() {
      if (this.mapIsSetup) {
        return;
      }

      // console.log("pointArray " + this.pointArray + " " + this.geoJSON);

      this.map = this.initLeaflet(this.$refs.map, this.pointArray);
      this.addOpenStreetMapLayer(this.map);

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

        if (location.isMultiPoint) {
          this.addMultiPoint(this.map, location.pointArray, location.id);
        }
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
      console.log("reFilter");

      const visibleMetadataIds = [];

      const currentBounds = this.map.getBounds();
      this.map._layers.forEach((layer) => {
        if (layer instanceof L.Marker) {
          if (currentBounds.contains(layer.getLatLng()) && layer.id) {
            visibleMetadataIds.push(layer.id);
          }
        }
      });

      // 		this._layer.eachLayer(function(layer) {
      // 			if(layer instanceof L.Marker)
      // 				if( that._map.getBounds().contains(layer.getLatLng()) )
      // 					if(++n < that.options.maxItems)
      // 						that._list.appendChild( that._createItem(layer) );
      // });      

      console.log("visible ids " + visibleMetadataIds);

      this.$emit('viewChanged', visibleMetadataIds);
    },
  },
  watch: {
    metadatasContent: function addGeoJSONToMap() {
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
  data: () => ({
    expanded: false,
    expandButtonText: 'Show all tags',
    expandedButtonText: 'Hide all tags',
    map: null,
    mapIsSetup: false,
    buttonHeight: 50,
    updatingMap: true,
    addedObjectsKeys: [],
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



