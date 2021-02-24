/* eslint-disable object-property-newline */
/**
 * @summary story of all the MetadataDetailViews for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2021-02-24 10:58:19
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';
// import { defaultSeriesSettings } from '@/factories/chartFactory';
// const seriesSettings = defaultSeriesSettings;

// import DetailChart from '@/modules/metadata/components/GC-Net/DetailChart';
import DetailChartsList from '@/modules/metadata/components/GC-Net/DetailChartsList';

const stations = [
  {
    id: 1,
    name: 'Swiss Camp',
    latitude: '69.56833',
    longitude: '49.31582',
    elevation: 1176,
    startdate: '1990.30',
    active: true,
    alias: 'swisscamp',
    data: 1,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/swisscamp/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/1temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
  {
    id: 3,
    name: 'NASA-U',
    latitude: '73.84189',
    longitude: '49.49831',
    elevation: 2369,
    startdate: '1995.41',
    active: true,
    alias: 'nasau',
    data: 0,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/nasa_u/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/3temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
  {
    id: 4,
    name: 'GITS',
    latitude: '77.13781',
    longitude: '61.04113',
    elevation: 1887,
    startdate: '1995.43',
    active: true,
    alias: 'gits',
    data: 0,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/gits/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/4temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
];

const fileObjects = [
  {
    apiSuffix: 'airtemp1',
    parameters: [
      'airtemp1',
      'airtemp2',
    ],
    fileName: 'temp_v.json',
    chartTitle: 'Air Temperatures Recent Days',
    numberFormat: '##  °C',
    dateFormatTime: true,
    preload: true,
    showDisclaimer: false,
  },
  {
    apiSuffix: 'airtemp1',
    parameters: [
      'airtemp1',
      'airtemp2',
    ],
    fileName: 'temp.json',
    chartTitle: 'Air Temperatures Historical Data',
    numberFormat: '##  °C',
    dateFormatTime: false,
    preload: true,
    showDisclaimer: false,
  },
  {
    apiSuffix: 'windspeed1',
    parameters: [
      'windspeed1',
      'windspeed2',
    ],
    fileName: 'ws_v.json',
    chartTitle: 'Wind Speed Recent Days',
    numberFormat: '###  m/s',
    dateFormatTime: true,
    preload: true,
    showDisclaimer: false,
  },
  {
    apiSuffix: 'windspeed1',
    parameters: [
      'windspeed1',
      'windspeed2',
    ],
    fileName: 'ws.json',
    chartTitle: 'Wind Speed Historical Data',
    numberFormat: '###  m/s',
    dateFormatTime: false,
    preload: true,
    showDisclaimer: false,
  },
];

const graphStyling = {
  airtemp1: {
    color: '#D48E00',
      negativeColor: '#00CED4',
        titleString: 'Thermocouple 1',
          precision: 1,
  },
  airtemp2: {
    color: '#D26200',
      negativeColor: '#07AACD',
        titleString: 'Thermocouple 2',
          precision: 1,
  },
  windspeed1: {
    color: '#046401',
      titleString: 'Wind-speed 1',
        precision: 1,
  },
  windspeed2: {
    color: '#5ED352',
      titleString: 'Wind-speed 2',
        precision: 1,
  },
};


// export const methods = {
//   onCardClick: action('clicked on card'),
//   onTagClick: action('clicked on tag'),
// };

storiesOf('7 GC-Net Views / Charts', module)
  // .add('DetailChart', () => ({
  //   components: { DetailChart },
  //   template: `
  //   <v-col>
     
  //     <v-row>
  //       Station 1 DetailChart
  //     </v-row>

  //     <v-row class="py-3" >
  //       <v-col >
  //         <DetailChart :apiUrl="currentStation.envidatConfig.apiUrl"
  //                       :fallbackUrl="currentStation.envidatConfig.fallbackUrl"
  //                       :fallbackFilename="fileObject.fileName"
  //                       :stationName="currentStation.name"
  //                       :stationId="currentStation.id"
  //                       :fileObject="fileObject"
  //                       :chartId="chartId(fileObject.fileName)"
  //                       :graphs="buildGraphs(fileObject)"
  //                       :preload="fileObject.preload"
  //                       :showDisclaimer="fileObject.showDisclaimer"
  //                       :key="fileObject.fileName" />

  //       </v-col>
  //     </v-row>

  //   </v-col>
  //   `,
  //   computed: {
  //     currentStation() {
  //       return this.stations[0];
  //     },
  //     fileObject() {
  //       return this.fileObjects[0];
  //     },
  //   },
  //   methods: {
  //     buildGraphs(fileObject) {
  //       const graphs = [];

  //       if(!fileObject?.parameters) {
  //         return graphs;
  //       }

  //       for(let i = 0; i<fileObject.parameters.length; i++) {
  //         const param = fileObject.parameters[i];
  //         const paramStyle = this.graphStyling[param];

  //         if (paramStyle) {
  //           graphs.push(this.buildGraph(param, paramStyle, fileObject));
  //         }
  //       }

  //       // this.graphs = graphs;
  //       return graphs;
  //     },
  //     buildGraph(parameter, infoObj, fileObject) {
  //       const splits = fileObject.numberFormat.split(' ');
  //       const unit = splits.length > 0 ? splits[splits.length - 1] : '';

  //       return {
  //         lineColor: infoObj.color,
  //         bulletRadius: this.seriesSettings.bulletsRadius,
  //         title: infoObj.titleString,
  //         valueField: parameter,
  //         balloonText: `<b><span style='font-size:12px;'>${infoObj.titleString}: [[value]] ${unit}</span></b>`,
  //         hideBulletsCount: 200,
  //         bullet: 'round',
  //         bulletBorderAlpha: this.seriesSettings.bulletsStrokeOpacity,
  //         bulletAlpha: this.seriesSettings.bulletsfillOpacity,
  //         bulletSize: this.seriesSettings.bulletsRadius,
  //         bulletBorderThickness: this.seriesSettings.bulletsStrokeWidth,
  //         lineThickness: this.seriesSettings.lineStrokeWidth,
  //         connect: false,
  //         gridAboveGraphs: true,
  //         negativeLineColor: infoObj.negativeColor ? infoObj.negativeColor : infoObj.color,
  //         negativeFillColors: infoObj.negativeColor ? infoObj.negativeColor : infoObj.color,
  //         precision: infoObj.precision ? infoObj.precision : 0,
  //       };
  //     },
  //     chartId(fileName) {
  //       return `${this.stationId}_${fileName}`;
  //     },
  //     stationId() {
  //       return `${this.currentStation.id}_${this.currentStation.alias ? this.currentStation.alias : this.currentStation.name}`;
  //     },      
  //   },
  //   data: () => ({
  //     stations,
  //     fileObjects,
  //     graphStyling,
  //     seriesSettings,
  //   }),
  // }))
  .add('DetailChartsList', () => ({
    components: { DetailChartsList },
    template: `
    <v-col>
      
      <v-row class="py-3"
              >
        Station 1 DetailChartsList
      </v-row>

      <v-row style="border: solid 1px;"
              no-gutters>
        <v-col >
          <DetailChartsList :currentStation="station1"
                            :fileObjects="fileObjects"
                            :graphStyling="graphStyling" />
        </v-col>
      </v-row>

    </v-col>
    `,
    computed: {
      station1() {
        return this.stations[0];
      },
      station2() {
        return this.stations[1];
      },
    },
    // methods,
    data: () => ({
      stations,
      fileObjects,
      graphStyling,
    }),
  }));
