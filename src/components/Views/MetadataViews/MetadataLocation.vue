<template>
  <v-layout column my-2 mx-4>

    <v-flex xs12 md8 offset-md2 elevation-1>
      <v-card >
        <v-card-title class="title metadata_title" >Location</v-card-title>

        <v-card-text id="mapcontainer" ref="mapcontainer">
          <v-flex elevation-1>
            <div id="map" ref="map" style="height: 500px;"></div>
          </v-flex>
        </v-card-text>
        

        <!--v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="resize()">
            <v-icon color="accent" >{{ fullSize ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>        
        </v-card-actions-->
        
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    props: [
      'points',
      'isArea',
    ],
    mounted: function mounted() {
      this.map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
      ).addTo(this.map);

      L.marker([51.5, -0.09]).addTo(this.map)
        // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    data: () => ({
      fullSize: false,
      map: Object,
    }),
    methods: {
      resize: function resize() {
        let height = this.fullSize ? 500 : 300;
        this.fullSize = !this.fullSize;
        this.$refs.map.setAttribute('style', `height: ${height}px;`);
        height += 32;
        this.$refs.mapcontainer.setAttribute('style', `height: ${height}px;`);
        this.map.invalidateSize();
      },
    },
    components: {
    },
  };
</script>




