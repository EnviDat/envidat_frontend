<template>
  <v-card>
    <v-btn small icon style="position: absolute; right: 0; top: 0; z-index: 999999999999;" @click="close">
      <v-icon>close</v-icon>
    </v-btn>
    <div id="chartdiv" style="height: 100%; width: 100%;">
    </div>
  </v-card>
</template>

<script>
  import 'amcharts3';
  import 'amcharts3/amcharts/serial';
  import 'amcharts3/amcharts/pie';
  import 'amcharts3/amcharts/themes/light';

  export default {
    name: 'FeatureInfo',
    data() {
      return {
        chart: null,
      };
    },
    props: {
      data: Array,
      layers: Array,
      selected: String,
    },
    watch: {
      selected() {
        this.updateSelection();
      },
    },
    computed: {
      currentIndex() {
        return this.chart ? this.chart.chart.dataProvider.findIndex(dataPoint => dataPoint.name === this.selected) : null;
      },
      nDataPoints() {
        return this.chart ? this.chart.chart.dataProvider.length : null;
      },
    },
    mounted() {
      const chartData = this.layers.map(layer => ({
          ...layer,
          value: this.data.find(d => d.name === layer.name).value,
        }));
      const that = this;

      const config = {
        type: 'serial',
        theme: 'none',
        zoomOutText: '', // Hack, to hide show all button
        marginRight: 80,
        autoMarginOffset: 20,
        marginTop: 7,
        dataProvider: chartData,
        valueAxes: [{
          axisAlpha: 0.2,
          dashLength: 1,
          position: 'left',
        }],
        mouseWheelZoomEnabled: true,
        graphs: [{
          id: 'g1',
          fillColorsField: 'selected',
          colorField: 'selectedColor',
          lineColorField: 'selectedLineColor',
          bulletField: 'selectedBullet',
          bulletColor: this.$vuetify.theme.primary,
          lineColor: this.$vuetify.theme.primary,
          bulletSizeField: 'selectedSize',
          balloonText: '[[value]]',
          bullet: 'round',
          bulletBorderAlpha: 1,
          hideBulletsCount: 50,
          title: 'red line',
          valueField: 'value',
          useLineColorForBulletBorder: true,
          balloon: {
            drop: true,
          },
        }],
        chartScrollbar: {
          autoGridCount: true,
          graph: 'g1',
          scrollbarHeight: 40,
        },
        chartCursor: {
          limitToGraph: 'g1',
        },
        categoryField: 'timestamp',
        zoomOutOnDataUpdate: false,
        categoryAxis: {
          parseDates: true,
          axisColor: '#DADADA',
          dashLength: 1,
          minorGridEnabled: true,
        },
        export: {
          enabled: true,
        },
        listeners: [{
          event: 'init',
          method(e) {
            that.chart = e;
            e.chart.chartDiv.addEventListener('click', () => {
              // track cursor's last known position by "changed" event
              if (e.chart.lastCursorPosition !== undefined) {
                // get date of the last known cursor position
                const date = e.chart.dataProvider[e.chart.lastCursorPosition];
                that.$emit('select', date.name);
              }
            });
          },
        }, {
          event: 'changed',
          method(e) {
            e.chart.lastCursorPosition = e.index; // Log cursor's last known position
          },
        },
        ],
      };
      // eslint-disable-next-line no-undef
      AmCharts.makeChart('chartdiv', config);

    },
    methods: {
      close() {
        this.$emit('close');
      },
      updateSelection() {
        this.chart.chart.dataProvider.forEach((dataPoint) => {
          if (dataPoint.name !== this.selected) {
            dataPoint.selectedColor = undefined;
            dataPoint.selectedSize = undefined;
          } else {
            dataPoint.selectedColor = '#8198b4';
            dataPoint.selectedSize = '20';
          }
        });
        this.chart.chart.validateData(); // update chart
      },
    },
  };
</script>

<style scoped>

</style>
