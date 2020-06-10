<template>
  <div id="map" ref="map">
    <div style="position: absolute; z-index: 9999; bottom: 20px;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  // HACK starts
  // Solution to loading in the imgs correctly via webpack
  // see more https://github.com/PaulLeCam/react-leaflet/issues/255
  // stupid hack so that leaflet's images work after going through webpack
  import marker from '@/assets/map/marker-icon.png';
  import marker2x from '@/assets/map/marker-icon-2x.png';
  import markerShadow from '@/assets/map/marker-shadow.png';

  // HACK end

  export default {
    props: {
      geom: Object,
      genericProps: Object,
      showPlaceholder: Boolean,
      zoomExtent: Object,
      color: String,
      fillAlpha: Number,
      outlineWidth: Number,
    },
    data: () => ({
      marker,
      marker2x,
      markerShadow,
      map: null,
    }),
    mounted() {
      // Create map with basemap
      this.map = L.map(this.$refs.map, { scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Set marker icon
      const iconOptions = L.Icon.Default.prototype.options;
      iconOptions.iconUrl = this.marker;
      iconOptions.iconRetinaUrl = this.marker2x;
      iconOptions.shadowUrl = this.markerShadow;
      const icon = L.icon(iconOptions);

      // Add geodata to map
      L.geoJSON(this.geom, {
        pointToLayer(feature, latlng) {
          return L.marker(latlng, {
            icon,
            opacity: 0.65,
            riseOnHover: true,
          });
        },
        style: {
          color: this.color,
          fillOpacity: this.fillAlpha,
          opacity: 1,
          weight: this.outlineWidth,
        },


      }).addTo(this.map);

      // Zoom to extent of geodata
      this.map.fitBounds([
        [this.zoomExtent.minY, this.zoomExtent.minX],
        [this.zoomExtent.maxY, this.zoomExtent.maxX],
      ]);
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
  };
</script>

<style>

</style>
