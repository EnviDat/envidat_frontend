<template>
  <v-container class="pa-0 fill-height" fluid
                >

    <v-row >

      <!-- <v-col cols="12" md="3">
        <stations-map :height="'60vh'"
                      :currentStation="currentStation"
                      @mapClick="mapStationClick" />
      </v-col>

      <v-col cols="12" md="8" >
        <station-control :stationName="currentStation.name"
                          :stationImage="stationImg"
                          :stationPreloadImage="stationPreloadImage"
                          :paramList="paramList"
                          @paramClick="catchParamClick"
                          @localTimeClick="catchLocalTimeClick" />
      </v-col> -->

      <v-col cols="12" >
        <!-- <v-row column > -->
        <v-row v-if="generateFileList.length > 0">

          <v-col v-for="fileObject in generateFileList"
                  :key="fileObject.fileName"
                  :ref="fileObject.fileName"
                  >

              <DetailChart :url="baseUrl + fileObject.fileName"
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

        <v-row v-if="generateFileList.length <= 0">
          <v-col>{{ `FileObject: ${fileObjects} valueFieldMapping: ${valueFieldMapping}` }}</v-col>
        </v-row>

      </v-col>

    </v-row>

    <!-- <v-row v-if="!currentStation"
                >

      <v-col cols="12">
        <stations-list @listClick="catchListClick"/>
      </v-col>
    </v-row> -->

    <v-btn
      fab
      color="accent"
      bottom
      right
      fixed
      @click.native.stop="backToTop" >
      <v-icon style="margin-left: 22px !important;">arrow_upwards</v-icon>
    </v-btn>
  </v-container>

</template>

<script>
import axios from 'axios';

import DetailChart from './DetailChart';
// import StationControl from './StationControl';

// import StationsMap from '@/components/StationsMap';
// import StationsList from '@/components/Navigation/StationsList';
// import * as am4core from "@amcharts/amcharts4/core";
// am4core.options.queue = true;

export default {
  name: 'Station',
  props: {
  },
  components: {
    DetailChart,
    // StationControl,
    // StationsList,
    // StationsMap,
  },
  created() {
    this.reRenderKey = new Date().toUTCString();
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const stationToFind = this.stationRouteId();
    // this.currentStation = this.getStation(stationToFind);
    this.loadParameterJson();
  },
  beforeDestroy() {
    // am4core.unuseAllThemes();
    // console.log('disposeAllCharts via DetailPage');
    // am4core.disposeAllCharts();
  },
  watch: {
    $route(to) {
      // eslint-disable-next-line no-unused-vars
      const stationToFind = to.params.id;
      // this.currentStation = this.getStation(stationToFind);
    },    
    // currentStation() {
    //   if (this.currentStation) {
    //     let imgs = require.context('@/assets/stations/', false, /\.jpg$/);
    //     let imgCache = {};

    //     imgs.keys().forEach((key) => {
    //       imgCache[key] = imgs(key);
    //     });

    //     this.stationImg = imgCache[`./${this.currentStation.alias}.jpg`];

    //     imgs = require.context('@/assets/cards', false, /\.jpg$/);
    //     imgCache = {};

    //     imgs.keys().forEach((key) => {
    //       imgCache[key] = imgs(key);
    //     });

    //     this.stationPreloadImage = imgCache[`./${this.currentStation.alias}.jpg`];
    //   }

    //   window.scrollTo(0, 0);
    // },
  },
  methods: {
    loadParameterJson() {
      const url = `${this.baseStationURLTestdata}stationParameters.json`;

      axios
      .get(url)
      .then((response) => {
        
        this.fileObjects = response.data.fileObjects;
        this.valueFieldMapping = response.data.valueFieldMapping;
      })
      .catch((error) => {
        this.chartError(error);
      });
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
    // catchListClick(stationToFind) {
    //   const stationClicked = this.getStation(stationToFind);

    //   if (stationClicked) {
    //     this.$router.push({ path: `/station/${stationClicked.alias}` });
    //   }

    // },
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
    generateFileList() {
      const fileList = [];

      if (!this.currentStation || !this.fileObjects) {
        // handle empty case, just return the empty list
        return fileList;
      }

      for (let i = 0; i < this.fileObjects.length; i++) {
        const fileObj = this.fileObjects[i];

        const fileObjectTemplate = {
          fileName: this.currentStation.id + fileObj.fileName,
          chartTitle: fileObj.chartTitle,
          numberFormat: fileObj.numberFormat,
          dateFormatTime: fileObj.dateFormatTime,
          preload: fileObj.preload,
          showDisclaimer: fileObj.showDisclaimer,
          seriesNumberFormat: fileObj.seriesNumberFormat,
        };
        
        fileList.push(fileObjectTemplate);
      }

      return fileList;
    },
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
    baseUrl() {
      return process.env.NODE_ENV === 'production' ? this.baseStationURL : this.baseStationURLTestdata;
    },
    stationId() {
      return `${this.currentStation.id}_${this.currentStation.alias ? this.currentStation.alias : this.currentStation.name}`;
    },
  },
  data: () => ({
    baseStationURL: 'https://www.wsl.ch/gcnet/data/',
    baseStationURLTestdata: './testdata/',
    loadingStation: false,
    stationImg: null,
    stationPreloadImage: null,
    currentStation: {
      id: 1,
      name: 'Swiss Camp',
      latitude: '69.56833',
      longitude: '49.31582',
      elevation: 1176,
      startdate: '1990.30',
      active: true,
      alias: 'swisscamp',
      data: 1,
    },
    expand: false,
    convertLocalTime: false,
    reRenderKey: null,
    fileObjects: null,
    valueFieldMapping: null,
//    fileObjects:  [
//       {
//  fileName: 'temp_v.json', chartTitle: 'Air Temperatures Recent Days', numberFormat: '##  °C', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'temp.json', chartTitle: 'Air Temperatures Historical Data', numberFormat: '##  °C', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'ws_v.json', chartTitle: 'Wind Speed Recent Days', numberFormat: '###  m/s', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'ws.json', chartTitle: 'Wind Speed Historical Data', numberFormat: '###  m/s', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'wd_v.json', chartTitle: 'Wind Direction Recent Days', numberFormat: '###  °', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'wd.json', chartTitle: 'Wind Direction Historical Data', numberFormat: '###  °', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'rh_v.json', chartTitle: 'Relative Humidity Recent Days', numberFormat: '##  %', dateFormatTime: true, preload: true, showDisclaimer: false, seriesNumberFormat: '#.', 
// },
//       {
//  fileName: 'rh.json', chartTitle: 'Relative Humidity Historical Data', numberFormat: '##  %', dateFormatTime: false, preload: true, showDisclaimer: false, seriesNumberFormat: '#.', 
// },
//       {
//  fileName: 'rad_v.json', chartTitle: 'Radiation Recent Days', numberFormat: '###  W/m²', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'rad.json', chartTitle: 'Radiation Historical Data', numberFormat: '###  W/m²', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'sheight_v.json', chartTitle: 'Snow Heights Recent Days', numberFormat: '#.##  m', dateFormatTime: true, preload: true, showDisclaimer: false, seriesNumberFormat: '#.00', 
// },
//       {
//  fileName: 'sheight.json', chartTitle: 'Snow Heights Historical Data', numberFormat: '#.##  m', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'press_v.json', chartTitle: 'Air Pressure Recent Days', numberFormat: '###  mbar', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'press.json', chartTitle: 'Air Pressure Historical Data', numberFormat: '###  mbar', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'battvolt_v.json', chartTitle: 'Battery Voltage Recent Days', numberFormat: '## V', dateFormatTime: true, preload: true, showDisclaimer: false, 
// },
//       {
//  fileName: 'battvolt.json', chartTitle: 'Battery Voltage Historical Data', numberFormat: '## V', dateFormatTime: false, preload: true, showDisclaimer: false, 
// },
//    ],
  //   valueFieldMapping: {
  //     temp: [
  //       {
  //           parameter: 'AirTC1',
  //           color: '#D48E00',
  //           negativeColor: '#00CED4',
  //           titleString: 'Thermocouple 1',
  //           precision: 1,
  //       },
  //       {
  //           parameter: 'AirTC2',
  //           color: '#D26200',
  //           negativeColor: '#07AACD',
  //           titleString: 'Thermocouple 2',
  //           precision: 1,
  //       },
  //     ],
  //     ws: [
  //       {
  //  parameter: 'WS1',
  //           color: '#046401',
  //           titleString: 'Wind-speed 1',
  //           precision: 1,
  //       },
  //       {
  //           parameter: 'WS2',
  //           color: '#5ED352',
  //           titleString: 'Wind-speed 2',
  //           precision: 1,
  //       },
  //     ],
  //     wd: [
  //       {
  //         parameter: 'WD1',
  //         color: '#046401',
  //         titleString: 'Wind-direction 1',
  //         precision: 1,
  //       },
  //       {
  //         parameter: 'WD2',
  //         color: '#2FCE32',
  //         titleString: 'Wind-direction 2',
  //         precision: 1,
  //       },
  //     ],
  //     rh: [
  //       {
  //  parameter: 'RH1',
  //           color: '#1DAFD7',
  //           titleString: 'Relative humidity 1',
  //       },
  //       {
  //           parameter: 'RH2',
  //           color: '#393DA3',
  //           titleString: 'Relative humidity 2',
  //       },
  //     ],
  //     rad: [
  //       {
  //         parameter: 'SWin',
  //         color: '#E79F32',
  //         titleString: 'Short-wave incoming',
  //         precision: 1,
  //       },
  //       {
  //         parameter: 'SWout',
  //         color: '#9A6008',
  //         titleString: 'Short-wave outgoing',
  //         precision: 1,
  //       },
  //       {
  //         parameter: 'NetRad',
  //         color: '#1C5197',
  //         titleString: 'Net radiation',
  //         precision: 1,
  //       },
  //     ],
  //     sheight: [
  //       {
  //         parameter: 'Sheight1',
  //         color: '#679DE2',
  //         titleString: 'Snow height 1',
  //         precision: 2,
  //       },
  //       {
  //         parameter: 'Sheight2',
  //         color: '#3375CD',
  //         titleString: 'Snow height 2',
  //         precision: 2,
  //       },
  //     ],
  //     press: [
  //       {
  //         parameter: 'press',
  //         color: '#FF01FF',
  //         titleString: 'Atmospheric pressure',
  //         precision: 1,
  //       },
  //     ],
  //     battvolt: [
  //       {
  //         parameter: 'BattVolt',
  //         color: '#27AE61',
  //         titleString: 'Battery voltage',
  //         precision: 1,
  //       },
  //     ],
  //   },
  }),
};
</script>

<style scoped>

</style>
