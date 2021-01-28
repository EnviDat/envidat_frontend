<template>

  <v-card >
    <v-container class="pa-3" fluid >
      <!-- <v-row column> -->
      <!-- <v-row >

        <v-col class="pb-3" > -->
          <v-row   justify="space-between">
            <v-col :class="$vuetify.breakpoint.xsOnly ? 'title' : 'display-1'">
              {{ this.fileObject.chartTitle }}
            </v-col>
            <v-col class="title text-right" >
              {{ stationName }}
            </v-col>
          </v-row>
          
        <!-- </v-col> -->

        <v-col v-if="chartIsLoading && preloading"
                class="py-0" 
                :style="`height: ${ $vuetify.breakpoint.xsOnly ? 300 : 350 }px;`" >
                
          <v-row class="fill-height"
                  justify="center"
                  align="center">
            <v-col class="shrink" >
              <v-progress-circular :size="50"
                                    color="primary"
                                    indeterminate />
              
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="!chartIsLoading && !hasData"
                class="title pt-2 pb-1"
                :style="`color: ${ $vuetify.theme.error };`" >
          {{ noDataText }}
        </v-col>

        <v-col v-if="dataError"
                class="title"
                :style="`color: ${ $vuetify.theme.error };`" >
          {{ dataError }}
        </v-col>

        <v-col v-if="!preloading"
                :style="`height: ${ $vuetify.breakpoint.xsOnly ? 300 : 350 }px;`" >
          <!-- <v-row class="fill-height" column
                    justify="center" align="center"> -->
          <v-row class="fill-height"
                  justify="center"
                  align="center">
            <v-col class="shrink" >
              Historical datasets can be very large and take a while to load, therefore aren't loaded by default.
            </v-col>
            <v-col class="shrink pt-3" 
                    >
              
              <BaseRectangleButton buttonText="Load historical data"
                                      materialIconName="refresh"
                                      @clicked="preloading = true; intersected = true; chartIsLoading = true; loadChart();"
                                      iconColor="white" />
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="showDisclaimer && showChart"
                class="title" style="color: red;">
          {{ disclaimerText }}
        </v-col>

        <v-col v-show="showChart"
                class="pt-0" >
          <div :id="chartId"
                :style="`height: ${ $vuetify.breakpoint.xsOnly ? 300 : 350 }px;`" >
          </div>            
        </v-col>

      <!-- </v-row> -->
    </v-container>

  </v-card>

</template>

<script>
import axios from 'axios';
// import { createLineChart, defaultSeriesSettings } from "../chartData/charts";
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import { createSerialChart, defaultSeriesSettings } from '@/factories/chartFactory';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as bullets from "@amcharts/amcharts4/plugins/bullets";

/* eslint-disable no-tabs */

export default {
  name: 'DetailChart',
  props: {
    url: {
      type: String,
      default: './testdata/1temp_v.json',
    },
    stationName: {
      type: String,
      default: 'SwissCamp default',
    },
    chartId: {
      type: String,
      default: '1temp_v.json',
    },
    fileObject: {
      type: Object,
      default: () => ({
        fileName: 'temp_v.json',
        chartTitle: 'Air Temperatures Recent Days',
        numberFormat: '##  °C',
        dateFormatTime: true,
        preload: true,
        showDisclaimer: false, 
      }),
    },
    delay: {
      type: Number,
      default: 0,
    },
    valueFieldMapping: {
      type: Object,
      default: () => ({
        temp: [
          {
              parameter: 'AirTC1',
              color: '#D48E00',
              negativeColor: '#00CED4',
              titleString: 'Thermocouple 1',
              precision: 1,
          },
        ],
      }),
    },
    preload: Boolean,
    showDisclaimer: Boolean,
    convertLocalTime: Boolean,
  },
  components: {
    BaseRectangleButton,
  },

  mounted() {
    this.preloading = this.preload;

    if (this.preloading) {
      this.registeryIntersectionObserver();
    }
  },
  beforeDestroy() {
    // console.log('DetailChart: beforeDestroy method ' + this.chartId);
    this.clearChart();
  },
  computed: {
    hasData() {
      return this.dataAvailable;
    },
    showChart() {
      return this.intersected && !this.chartIsLoading && this.hasData;
    },
  },
  watch: {
    records() {
      if (this.records && this.records.length > 0) {
        this.createChart();
      }
    },
  },
  methods: {
    buildGraphs() {
      const graphs = [];
      const keys = Object.keys(this.valueFieldMapping);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const splits = this.url.split('/');
        const fileName = splits[splits.length - 1];

        if (fileName.includes(key)) {
          const graphInfo = this.valueFieldMapping[key];

          for (let j = 0; j < graphInfo.length; j++) {
            const infoObj = graphInfo[j];
            graphs.push(this.buildGraph(infoObj));
          }

          break;
        }
      }

      this.graphs = graphs;
    },
    buildGraph(infoObj) {
      const splits = this.fileObject.numberFormat.split(' ');
      const unit = splits.length > 0 ? splits[splits.length - 1] : '';

      return {
        lineColor: infoObj.color,
        bulletRadius: this.seriesSettings.bulletsRadius,
        title: infoObj.titleString,
        valueField: infoObj.parameter,
        balloonText: `<b><span style='font-size:12px;'>${infoObj.titleString}: [[value]] ${unit}</span></b>`,
        hideBulletsCount: 200,
        bullet: 'round',
        bulletBorderAlpha: this.seriesSettings.bulletsStrokeOpacity,
				bulletAlpha: this.seriesSettings.bulletsfillOpacity,
				bulletSize: this.seriesSettings.bulletsRadius,
        bulletBorderThickness: this.seriesSettings.bulletsStrokeWidth,
				lineThickness: this.seriesSettings.lineStrokeWidth,        
        connect: false,
        gridAboveGraphs: true,
        negativeLineColor: infoObj.negativeColor ? infoObj.negativeColor : infoObj.color,
				negativeFillColors: infoObj.negativeColor ? infoObj.negativeColor : infoObj.color,
        precision: infoObj.precision ? infoObj.precision : 0,
      };
    },
    loadChart() {
      this.clearChart();
      this.chartIsLoading = true;
      this.dataAvailable = false;
      this.dataLength = 0;
      this.dataError = '';

      this.buildGraphs();

      // clear and then new loading on the next tick is needed for the disposing to finish
      this.$nextTick(() => {
        this.loadJsonFiles();
      });
    },
    loadJsonFiles() {
      axios
      .get(this.url)
      .then((response) => {
        // createChart() gets called due to the watch on the records
        this.records = response.data;
        this.dataAvailable = response.data && response.data.length > 0;
        this.chartIsLoading = this.dataAvailable;
      })
      .catch((error) => {
        this.chartIsLoading = false;
        this.dataError = `Error creating chart: ${error}`;
      });
    },
    createChart() {
      // const dateFormatingInfos = {
      //   dateFormat: this.dateFormat,
      //   dateFormatNoTime: this.dateFormatNoTime,
      //   inputFormat: 'x',
      // };

      // this.$vuetify.breakpoint.smAndDown ? this.seriesSettings.lineStrokeWidth = 4 : this.seriesSettings.lineStrokeWidth = 3;
      this.seriesSettings.showLegend = this.$vuetify.breakpoint.smAndUp;
      this.seriesSettings.numberFormat = this.fileObject.seriesNumberFormat ? this.fileObject.seriesNumberFormat : this.seriesSettings.numberFormat;
    
      const splits = this.fileObject.numberFormat.split(' ');
      const unit = splits.length > 0 ? splits[splits.length - 1] : '';

      const recentData = this.chartId.includes('_v');

      try {
          // this.detailChart = createLineChart(this.chartId, 'timestamp', this.records, this.graphs,
          //                             !this.chartId.includes('_v'), undefined, this.seriesSettings, dateFormatingInfos,
          //                              undefined, this.fileObject.numberFormat, this.fileObject.dateFormatTime,
          //                              this.chartDone, this.chartError);
          this.detailChart = createSerialChart(this.chartId, ` ${unit}`, this.graphs, this.records, this.delay, this.chartDone, this.chartError, recentData, this.convertLocalTime);
      } catch (error) {
        this.chartIsLoading = false;
        this.dataError = `Error creating chart: ${error}`;
      }
    },
    chartError(error) {
      this.chartIsLoading = false;
      this.dataError = error.message;

      this.dataAvailable = false;
      this.dataLength = 0;
      this.clearChart();
    },
    chartDone(doneResponse) {
      this.chartIsLoading = false;
      const dataLength = doneResponse && typeof doneResponse === 'number' ? doneResponse : 0;
      
      this.dataAvailable = dataLength > 0;
      this.dataLength = dataLength;
      this.dataError = '';

      if (!this.dataAvailable) {
        this.clearChart();
      }
    },
    registeryIntersectionObserver() {
      this.ISObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!this.intersected) {
            this.intersected = true;
            this.loadChart();
          }
        }
      });

      this.ISObserver.observe(this.$el);
    },
    clearChart() {
      if (this.detailChart) {
        // console.log('dispose via DetailChart');
        // this.detailChart.dispose(); 
        // console.log('delete via DetailChart');
        this.detailChart = null;
        // delete this.detailChart;
      }

      this.records = [];
    },
  },
  data() {
    return {
      graphs: [],
      dateFormat: 'MMM dd, YYYY HH:mm UTC',
      dateFormatNoTime: 'MMM dd, YYYY',
      detailChart: null,
      visible: false,
      chartIsLoading: true,
      dataLength: 0,
      dataAvailable: false,
      dataError: '',
      preloading: true,
      ISObserver: null,
      intersected: false,
      noDataText: 'No data available',
      disclaimerText: 'Please note: this data is a daily average for visualisation purposes.',
      records: [],
      seriesSettings: { ...defaultSeriesSettings },
    };
  },
};
</script>

<style scoped>

</style>
