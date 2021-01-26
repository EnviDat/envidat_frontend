<template>
  <v-container fluid
                class="fill-height pa-0" >

    <v-row no-gutters >

      <v-col v-for="station in stations"
              :key="`${station.id}_${station.alias}`"
              class="pa-2"
              cols="12"
              sm="6" >

        <MicroChart :station="station"
                      :image="stationImg(station.alias)"
                      :JSONUrl="station.envidatConfig.previewUrl"
                      :parameter="station.envidatConfig.previewParameter"
                      @detailClick="(stationID) => { changeCurrentStation(stationID); }" />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import MicroChart from '@/modules/metadata/components/GC-Net/MicroChart';
import axios from 'axios';
import homeInfos from './homeInfos';


export default {
  name: 'StationOverviewPage',
  props: {
  },
  components: {
    MicroChart,
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
    const imgs = require.context('@/assets/stations/small', false, /\.jpg$/);
    const imgCache = {};

    imgs.keys().forEach((key) => {
      imgCache[key] = imgs(key);
    });

    this.cardImgs = imgCache;
  },
  mounted() {
    this.loadJsonConfig();
  },
  methods: {
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
    cardImgs: {},
  }),
};
</script>

<style scoped>

</style>
