<template>
  <v-card >
  
    <v-container class="pa-3" fluid >
      <v-row  > 

        <v-col cols="12"
                class="display-1"
                style="text-align: center;">
          {{ `Detailed charts of ${ stationName } station` }}
        </v-col>

        <v-col class="shrink" cols="12" sm="6" >
          <v-row >
          <!-- <v-row column> -->
            <v-col class="title">Directly scroll to specific measurement</v-col>

            <v-col class="pt-4" >
              <v-row  >

                <v-col class="pa-0" v-for="(paramObj, index) in paramList"
                        :key="index"
                        >

                  <v-btn color="primary"
                        :small="$vuetify.breakpoint.mdAndUp"
                        @click="$emit('paramClick', paramObj.fileName);">
                    {{ paramObj.paramName }}
                  </v-btn>
                </v-col>                

              </v-row>
            </v-col>

            <v-col class="pt-4" >
              <v-row   align="center"
                        @click="convertLocalTime = !convertLocalTime; $emit('localTimeClick', convertLocalTime)"
                        style="cursor: pointer;" >
                <v-col class="shrink" >
                  <v-icon :color="convertLocalTime ? 'accent' : 'primary'" >{{ convertLocalTime ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
                </v-col>                
                <v-col class="shrink" >
                  <v-icon >access_time</v-icon>
                </v-col>                
                <v-col class="shrink" >{{ convertTimeText }}</v-col>
              </v-row>
            </v-col>

          </v-row>
        </v-col>
        
        <v-col class="grow" cols="12" sm="6" >
          <!-- <v-row class="fill-height" column align="center" > -->
          <v-row class="fill-height" align="center" >

            <v-col class="shrink" >
              <img style="height: 450px; max-width: 100%; "
                    :src="stationImage" />
            </v-col>

            <!-- <v-flex shrink
                    pa-0>
              <v-btn
                dark
                small
                color="secondary"
                @click="expand = !expand" >

                {{ expand ? 'Minimize Image' : 'Expand Image' }}

                <v-icon right >image</v-icon>
              </v-btn>
            </v-flex> -->
            
          </v-row>
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
