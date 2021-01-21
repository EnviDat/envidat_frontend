<template>
  <v-container class="fill-height pa-0" fluid
                >
    <v-row   >

      <!-- <v-col cols="12" sm="3">
        <stations-map @mapClick="mapStationClick" />
      </v-col> -->

      <v-col v-if="!visible"
              cols="12" sm="9">
        <v-row   justify="center">
          <v-col 
                  class="title shrink">
            Loading MicroCharts...
          </v-col>
        </v-row>
      </v-col>

      <v-col v-if="visible"
              cols="12" sm="9" >
        <v-row  >

          <!-- <v-flex xs12 md4 lg3>
            <micro-chart :station="stations[0]"
                          :JSONUrls="getJSONUrls(stations[0])"
                          :fileValueMapping="fileValueMapping"
                          @detailClick="(stationID) => { changeCurrentStation(stationID); }" />
          </v-flex> -->

          <v-col v-for="(station, index) in stations"
                  :key="`${station.id}_${station.alias}`"
                  cols="12" md="4" lg="3">
            <MicroChart :station="station"
                          :image="stationImg(station.alias)"
                          :JSONUrl="station.envidatConfig.previewUrl"
                          :parameter="station.envidatConfig.previewParameter"
                          :delay="index * 100"
                          @detailClick="(stationID) => { changeCurrentStation(stationID); }" />
          </v-col>

                          <!-- :JSONUrls="getJSONUrls(station)" -->

        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
// import StationsMap from '@/components/StationsMap';
import MicroChart from '@/modules/metadata/components/GC-Net/MicroChart';
import axios from 'axios';
import homeInfos from './homeInfos';


export default {
  name: 'StationOverviewPage',
  props: {
  },
  components: {
    MicroChart,
    // StationsMap,
  },
  computed: {
    stations() {
      const stations = [];

      if (this.stationsConfig) {
        for (let i = 0; i < this.stationsConfig.length; i++) {
          const station = this.stationsConfig[i];
          stations.push(station);
        }
      }

      return stations;
    },
  },
  beforeMount() {
    const imgs = require.context('@/assets/cards', false, /\.jpg$/);
    const imgCache = {};

    imgs.keys().forEach((key) => {
      imgCache[key] = imgs(key);
    });

    this.cardImgs = imgCache;
  },
  mounted() {
    this.loadJsonConfig();

    let that = this;

    setTimeout(() => {
      that.visible = true;
      that = null;
    }, this.initialDelay);
  },
  beforeDestroy() {
    // this.clearCharts();
  },
  methods: {
    clearCharts() {
      // am4core.unuseAllThemes();
      // console.log('disposeAllCharts via OverviewPage');
      // am4core.disposeAllCharts();
    },
    mapStationClick(stationUrl) {
      const splits = stationUrl.split('/');

      if (splits.length > 0) {
        const stationName = splits[splits.length - 1];
        this.changeCurrentStation(stationName);
      }
    },
    changeCurrentStation(newStation) {
      this.$router.push({ path: `/station/${newStation}` });
      this.$emit('detailClick', newStation);
    },
    getStationConfig(station) {
      const dataURLs = []; const 
      recentDataURLs = [];
      const keys = Object.keys(this.fileValueMapping);

      for (let i = 0; i < keys.length; i++) {
        const prefix = keys[i];
        const fileName = `${station.id}${prefix}.json`;
        const recentFileName = `${station.id}${prefix}_v.json`;
        const baseUrl = process.env.NODE_ENV === 'production' ? this.baseStationURL : this.baseStationURLTestdata;

        // add the timestamp to prevent server side caching
        // const url = `${baseUrl}${fileName}?t=${Date.now()}`;
        const url = `${baseUrl}${fileName}`;
        dataURLs.push({ fileType: prefix, url });

        // const recentUrl = `${baseUrl}${recentFileName}?t=${Date.now()}`;
        const recentUrl = `${baseUrl}${recentFileName}`;
        recentDataURLs.push({ fileType: prefix, url: recentUrl });
      }

      return {
        dataURLs,
        recentDataURLs,
      };
    },
    loadJsonConfig() {
      this.configIsLoading = true;
      this.configError = null;
      this.stationsConfig = null;

      const configUrl = process.env.NODE_ENV === 'production' ? this.baseStationURL : this.baseStationURLTestdata;

      axios
      .get(configUrl)
      .then((response) => {
        this.configIsLoading = false;
        this.stationsConfig = response.data;
      })
      .catch((error) => {
        this.configError = error;
      });
    },
    stationImg(alias) {
      return this.cardImgs[`./${alias}.jpg`];
    },
  },
  data: () => ({
    homeInfos,
    baseStationURL: 'https://www.wsl.ch/gcnet/data/',
    baseStationURLTestdata: './testdata/stationsConfig.json',
    configIsLoading: false,
    configError: null,
    stationsConfig: null,
    visible: false,
    initialDelay: 1500,
    fileValueMapping: {
      // only use one single file and parameter for the microCharts
      temp: ['AirTC1'],
    },
    cardImgs: {},
  }),
};
</script>

<style scoped>

</style>
