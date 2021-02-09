/* eslint-disable consistent-return */
<template>

  <v-card :id="stationId"
          ref="main_container"
          class="metadataResourceCard"
          :color="darkTheme ? 'primary' : 'white'"
          :dark="darkTheme"
          v-show="visible" >

    <v-container fluid
                  class="pa-0" >

      <v-row no-gutters >

        <v-col cols="3"
                @click="catchDetailClick(station.alias)" >
          <v-img :src="image"
                  height="100%"
                  style="border-bottom-left-radius: 4px; border-top-left-radius: 4px; cursor: pointer;" />

        </v-col>
 
        <v-col cols="9"
                class="pr-4 pb-4 pl-3 pt-2">

          <v-row no-gutters           
                  justify="space-between"
                  class="fill-height" >

            <v-col class="grow pb-1 headline v-card__title"
                    style="font-weight: 700;">
              {{ station.name }}
            </v-col> 

            <v-col v-if="chartIsLoading"
                    class="py-0"
                    cols="12" 
                    style="width: 100%">
              <div class='skeleton skeleton-animation-shimmer' :style="`height: ${chartHeight};`" >
                <div style="width: 100%;" class='bone bone-type-image'></div>
              </div>
            </v-col>

            <v-col v-if="!chartIsLoading && !hasData()"
                  cols="12" 
                  class="body-1 pb-1"
                  :style="`color: red;`" >
              {{ noDataText }}
            </v-col>

            <v-col v-if="dataError"
                    cols="12"
                    class="smallText py-1"
                    :style="`color: red;`" >
              {{ dataError }}
            </v-col>

            <v-col v-show="!dataError"
                    cols="12" 
                    :id="microChartId"
                    ref="microChart"
                    :style="`background-color: #f5f5f5; width: 100%; height: ${chartHeight}; border: 1px solid #eee;`" >
            </v-col>

            <v-col v-if="!dataError && hasData()"
                    cols="12" 
                    class="smallText py-1">
              {{ chartSubText }}
            </v-col>

            <v-col class="grow"
                    cols="12"
                    style="height:40px;" >
              <v-row no-gutters
                      justify="end">

              <BaseIconButton materialIconName="search"
                              color="accent"
                              iconColor="black"
                              isSmall
                              isElevated
                              @clicked="catchDetailClick(station.alias)" />
              </v-row>
            </v-col>
          </v-row>

        </v-col>
      </v-row>

    </v-container>
  </v-card>

</template>

<script>
import {
  eventBus,
  GCNET_OPEN_DETAIL_CHARTS,
} from '@/factories/eventBus';

import axios from 'axios';
import uPlot from 'uplot/dist/uPlot.esm';
import 'uplot/dist/uPlot.min.css';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  name: 'MicroChart',
  props: {
    station: Object,
    // station: {
    //   type: Object,
    //   default: () => ({
    //     id: 0,
    //     name: 'Swiss Camp 10m',
    //     latitude: '69.56833',
    //     longitude: '49.31582',
    //     elevation: 1176,
    //     startdate: '1990.4',
    //     active: true,
    //     alias: 'swisscamp10m',
    //     data: 1,
    //   }),
    // },
    image: String,
    apiUrl: String,
    fallbackUrl: String,
    parameter: String,
    delay: {
      type: Number,
      default: 10,
    },
    darkTheme: Boolean,
  },
  components: {
    BaseIconButton,
  },
  mounted() {
    let that = this;

    setTimeout(() => {
      that.visible = true;

      if (that.$refs && that.$refs.main_container) {
        that.loadChart();
      }
      that = null;
    }, this.delay);
  },
  beforeDestroy() {
    this.clearChart();
  },
  computed: {
    microChartId() {
      return `${this.stationId}_microChart`;
    },
    stationId() {
      return `${this.station.id}_${this.station.alias ? this.station.alias : this.station.name}`;
    },
    chartSubText() {
      return `${this.chartIsLoading ? 'Loading' : 'Showing'} ${this.parameter ? this.parameter : '[parameter missing]'} from ${new Date(this.minDate).toLocaleDateString('en-US')} to ${new Date(this.maxDate).toLocaleDateString('en-US')}`;
    },
  },
  methods: {
    hasData() {
      // has to be a method, it doesn't work as computed property
      return this.data?.length > 0;
    },
    loadChart() {
      this.clearChart();
      this.chartIsLoading = true;

      // clear and then new loading on the next tick is needed for the disposing to finish
      this.$nextTick(() => {
        // this.loadJsonCharts();
        this.loadJsonFiles(this.apiUrl);
      });
    },
    clearChart() {

      if (this.$refs.microChart) {

        const childs = this.$refs.microChart.children;

        if (childs) {
          for (let i = 0; i < childs.length; i++) {
            const child = childs[i];
            this.$refs.microChart.removeChild(child);
          }
        }
      }
    },
    addStartEndDateUrl(url, daysBetween = 14) {

      const currentDate = new Date();
      const endDate = currentDate.toISOString().substring(0, 19);

      const dateTwoWeeksAgo = new Date(currentDate.setDate(currentDate.getDate() - daysBetween));
      const startDate = dateTwoWeeksAgo.toISOString().substring(0, 19);
     
      return `${url + startDate}/${endDate}/`;
    },
    loadJsonFiles(url, isFallback = false) {
      this.data = null;
      
      if (!isFallback) {
       url = this.addStartEndDateUrl(url);
      }
     
      axios
      .get(url)
      .then((response) => {
        this.chartIsLoading = false;        
        this.data = response.data;

        if (this.data?.length > 0) {
          this.makeSparkChart(this.data, this.parameter);
        } else if (isFallback) {
          this.dataError = `${this.noDataText} on the fallback for ${this.fallbackUrl}`;
        } else {
          this.loadJsonFiles(this.fallbackUrl, true);
        }
      })
      .catch((error) => {

        if (isFallback) {
          this.chartIsLoading = false;
          this.dataError = `${error.message} on the fallback for ${this.fallbackUrl}`;
        } else {
          this.loadJsonFiles(this.fallbackUrl, true);
        }
      });
    },
    makeSparkChart(data, chartParameter) {

      const x = [];
      const y = [];
      const dataLength = data ? data.length : 0;

      if (dataLength > 0) {

        for (let i = 0; i < data.length; i++) {
          const entry = data[i];
          const param = entry[chartParameter];
          
          x.push(entry.timestamp);
          y.push(param);
        }

        this.makeSpark([x, y]);

        this.minDate = data[0].timestamp;
        this.maxDate = data[data.length - 1].timestamp;
      }

    },
    makeSpark(data) {
      this.sparkLineOptions.width = this.$refs.microChart.clientWidth;
      this.sparkLineOptions.height = this.chartHeight;
      this.sparkLineOptions.plugins = [this.tooltipsPlugin()];

      // eslint-disable-next-line new-cap
      const sparkChart = new uPlot(this.sparkLineOptions, data, this.$refs.microChart);

      return sparkChart;
    },
    /* eslint-disable no-unused-vars */
    tooltipsPlugin(opts) {
      // eslint-disable-next-line no-shadow
      function init(u, opts, data) {
        const plot = u.root.querySelector('.u-over');

        // eslint-disable-next-line no-multi-assign
        const ttc = u.cursortt = document.createElement('div');
        ttc.className = 'tooltip';
        ttc.textContent = '(x,y)';
        ttc.style.pointerEvents = 'none';
        ttc.style.position = 'absolute';
        ttc.style.background = 'rgba(0,0,255,0.1)';
        // plot.appendChild(ttc);

        u.seriestt = opts.series.map((s, i) => {
          if (i === 0) return;

          const tt = document.createElement('div');
          tt.className = 'tooltip';
          tt.textContent = 'Tooltip!';
          tt.style.pointerEvents = 'none';
          tt.style.position = 'absolute';
          tt.style.background = 'rgba(0,0,0,0.1)';
          tt.style.color = s.color;
          tt.style.display = s.show ? null : 'none';
          plot.appendChild(tt);
          // eslint-disable-next-line consistent-return
          return tt;
        });

        function hideTips() {
          // ttc.style.display = "none";
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return;

            tt.style.display = 'none';
          });
        }

        function showTips() {
          // ttc.style.display = null;
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return;

            const s = u.series[i];
            tt.style.display = s.show ? null : 'none';
          });
        }

        plot.addEventListener('mouseleave', () => {
          if (!u.cursor.locked) {
            // u.setCursor({ left: -10, top: -10 });
            hideTips();
          }
        });

        plot.addEventListener('mouseenter', () => {
          showTips();
        });

        hideTips();
      }

      function setCursor(u) {
        const { left, top, idx } = u.cursor;

        // this is here to handle if initial cursor position is set
        // not great (can be optimized by doing more enter/leave state transition tracking)
      // if (left > 0)
      //  u.cursortt.style.display = null;

        // u.cursortt.style.left = left + "px";
        // u.cursortt.style.top = top + "px";
        // u.cursortt.textContent = "(" + u.posToVal(left, "x").toFixed(2) + ", " + u.posToVal(top, "y").toFixed(2) + ")";
        u.cursortt.textContent = `(${u.posToVal(top, 'y').toFixed(2)})`;

        // can optimize further by not applying styles if idx did not change
        u.seriestt.forEach((tt, i) => {
          if (i === 0) return;

          const s = u.series[i];

          if (s.show) {
            // this is here to handle if initial cursor position is set
            // not great (can be optimized by doing more enter/leave state transition tracking)
            // if (left > 0)
            // tt.style.display = null;

            // let xVal = u.data[0][idx];
            const yVal = u.data[i][idx];

            tt.textContent = `(${yVal})`;

            // tt.style.left = Math.round(u.valToPos(xVal, 'x')) + "px";
            // tt.style.top = Math.round(u.valToPos(yVal, 'y')) + "px";
          }
        });
      }

      return {
        hooks: {
          init,
          setCursor,
          setScale: [
            (u, key) => {
              // console.log('setScale', key);
            },
          ],
          setSeries: [
            (u, idx) => {
              // console.log('setSeries', idx);
            },
          ],
        },
      };
    },
    catchDetailClick(stationId) {
      eventBus.$emit(GCNET_OPEN_DETAIL_CHARTS, stationId);
    },
  },
  data: () => ({
    microChart: null,
    chartHeight: 50,
    dateFormat: 'HH:mm DD/MM/YYYY',
    dataError: '',
    noDataText: 'No preview data available',
    chartIsLoading: true,
    showInfo: false,
    minDate: null,
    maxDate: null,
    sparkLineOptions: {
      class: 'spark',
      background: 'black',
      cursor: {
        show: true,
        y: false,
        drag: { setScale: false },
      },
      select: {
        show: false,
      },
      legend: {
        show: false,
      },
      scales: {
        x: {
          time: false,
        },
      },
      axes: [
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      series: [
        {},
        {
          stroke: '#03a9f4',
          fill: '#b3e5fc',
        },
      ],
    },
    visible: false,
  }),
};
</script>

<style scoped>
 .smallText {
   font-size: 10px;
   word-break: break-word;
 }
</style>
