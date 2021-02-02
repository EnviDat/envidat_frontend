<template>
  <v-container class="pa-0 fill-height"
                fluid
                id="DetailChartList" >
    <v-row >
      <v-col cols="12" >

        <v-row v-if="fileObjects.length > 0">

          <v-col v-for="fileObject in fileObjects"
                  :key="fileObject.fileName"
                  :ref="fileObject.fileName"
                  cols="12"
                  >

              <DetailChart :url="fileObject.fileName"
                          :stationName="currentStation.name"
                          :fileObject="fileObject"
                          :chartId="chartId(fileObject.fileName)"
                          :valueFieldMapping="valueFieldMapping"
                          :preload="fileObject.preload"
                          :showDisclaimer="fileObject.showDisclaimer"
                          :convertLocalTime="convertLocalTime"
                          :key="fileObject.fileName + reRenderKey"
                          />
          </v-col>
        </v-row>

        <v-row v-if="fileObjects.length <= 0">
          <v-col>{{ `FileObject: ${fileObjects} valueFieldMapping: ${valueFieldMapping}` }}</v-col>
        </v-row>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>
import DetailChart from './DetailChart';

export default {
  name: 'Station',
  props: {
    currentStation: Object,
    fileObjects: Array,
    valueFieldMapping: Object,
  },
  components: {
    DetailChart,
  },
  created() {
    this.reRenderKey = new Date().toUTCString();
  },
  mounted() {
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
    stationRouteId() {
      return this.$route.params.id;
    },
    chartId(fileName) {
      return `${this.stationId}_${fileName}`;
    },
    catchParamClick(fileName) {
      let scrollToChart = null;

      for (let i = 0; i < this.fileObjects.length; i++) {
        const obj = this.fileObjects[i];

        if (obj.fileName.includes(fileName)) {
          scrollToChart = obj.fileName;
          break;
        }        
      }

      if (scrollToChart) {
        const scrollToKey = `${this.currentStation.id}${scrollToChart}`;

        if (this.$refs && this.$refs[scrollToKey] && this.$refs[scrollToKey].length >= 1) {
          const scrollToDOM = this.$refs[scrollToKey][0];
          const scrollY = scrollToDOM.offsetTop;
          window.scrollTo(0, scrollY);
        }
      }
    },
    catchLocalTimeClick(convertLocalTime) {
      this.convertLocalTime = convertLocalTime;
      this.reRenderKey = new Date().toUTCString();
    },
    backToTop() {
      window.scrollTo(0, 0);
    },
    getStation(stationToFind) {
      if (stationToFind) {
        const stations = this.$store.getters.stations;

        for (let i = 0; i < stations.length; i++) {
          const station = stations[i];

          if (station.id === stationToFind || station.alias === stationToFind || station.name === stationToFind) {
            return station;
          }
        }
      }

      return null;
    },
  },
  computed: {
    paramList() {
      // just pick the first param name of the each list
      const params = [];
      const keys = Object.keys(this.valueFieldMapping);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        params.push({ fileName: key, paramName: this.valueFieldMapping[key][0].titleString });
      }

      return params;
    },
    stationId() {
      return `${this.currentStation.id}_${this.currentStation.alias ? this.currentStation.alias : this.currentStation.name}`;
    },
  },
  data: () => ({
    loadingStation: false,
    stationImg: null,
    stationPreloadImage: null,
    expand: false,
    convertLocalTime: false,
    reRenderKey: null,
  }),
};
</script>

<style scoped>

</style>
