<template>
  <v-card >
  
    <v-container class="pa-3" fluid >
      <v-row  > 

        <v-col class="display-1"
                style="text-align: center;">
          {{ `Detailed charts of ${ stationName } station` }}
        </v-col>

      </v-row> 

      <v-row  > 
        <v-col cols="12"
                class="title">
          Directly scroll to specific chart
        </v-col>
      </v-row> 

      <v-row no-gutters >

        <v-col v-for="(paramObj, index) in paramList"
                :key="index" 
                class="py-1">

          <v-badge dot :color="paramObj.color">
            <v-btn color="secondary"
                  :small="$vuetify.breakpoint.mdAndUp"
                  @click="$emit('paramClick', paramObj.param);">
              {{ paramObj.paramName }}
            </v-btn>

          </v-badge>

        </v-col>                

      </v-row>

    </v-container>
  </v-card>

</template>

<script>

export default {
  name: 'StationControl',
  components: {
  },
  props: {
    stationName: String,
    stationImage: String,
    stationPreloadImage: String,
    paramList: Array,
    scrollPos: Number,
  },
  computed: {
    bigSize() {
      return this.$vuetify.breakpoint.xsOnly ? 450 : 700;
    },
  },
  data: () => ({
    expand: false,
    convertLocalTime: false,
    smallSize: 140,
    convertTimeText: 'Convert chart times to your local time',
  }),
};
</script>

<style>

</style>
