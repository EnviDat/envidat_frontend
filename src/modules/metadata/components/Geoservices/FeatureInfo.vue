<template>
  <v-card style="resize: both; overflow: auto; position: absolute; max-width: 100%;">
    <v-btn small icon @click="close" style="position: absolute; right: 0; top: 0; z-index: 999999999999;">
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn small icon style="position: absolute; right: 0; top: 40px; z-index: 999999999999;" @click="download">
      <v-icon>save</v-icon>
    </v-btn>
    <feature-info-chart :div-id="divId" :layers="layers"></feature-info-chart>
  </v-card>
</template>

<script>
  import 'amcharts3';
  import 'amcharts3/amcharts/serial';
  import 'amcharts3/amcharts/pie';
  import 'amcharts3/amcharts/themes/light';
  import FeatureInfoChart from '@/modules/metadata/components/Geoservices/FeatureInfoChart';

  export default {
    name: 'FeatureInfo',
    components: { FeatureInfoChart },
    data() {
      return {
        chart: null,
        chartData: null,
      };
    },
    props: {
      divId: String,
      layers: Array,
      selected: String,
    },
    computed: {
      coords() {
        return this.$store.getters.coords;
      },
      csvContent() {
        const rows = this.chartData.map(d => [d.name, d.value]);
        rows.splice(0, 0, ['layer', `${this.coords.lat} ${this.coords.lng}`]);
        return `data:text/csv;charset=utf-8,${rows.map(e => e.join(',')).join('\n')}`;
      },
    },
    methods: {
      download() {
        const encodedUri = encodeURI(this.csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'my_data.csv');
        document.body.appendChild(link); // Required for FF
        link.click();
      },
      close() {
        this.$store.dispatch('closeFeatureInfo');
      },
    },
  };
</script>

<style scoped>

</style>
