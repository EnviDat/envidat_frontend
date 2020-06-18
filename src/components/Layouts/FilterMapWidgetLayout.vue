<template>
  <v-card class="elevation-0" >

    <v-card-title :class="mdScreen ? 'pa-2' : 'pb-2'" >
      <div class="mb-0"
          :class="mdScreen ? 'body-2 font-weight-bold' : 'title '" >
        {{ title }}</div>
    </v-card-title>


    <div class="py-0 my-0 "
          :class="mdScreen ? 'px-1 mb-1' : 'px-3'"
          :style="`background-color: ${$vuetify.theme.themes.light.highlight};`" >

      <v-row class="my-0" v-if="topLayout"
                  
                  align="center"
                  >
        <v-col class="grow py-0" 
                
                :class="mdScreen ? 'caption' : 'body-2'" >
          {{ highlightedText }}
        </v-col>

        <v-col class="shrink py-0" 
                >
          <div :style="`color:${pinnedAmount > 0 ? 'black' : 'rgba(0,0,0,.47)'};`">
            {{ filterText + pinnedAmount }}
          </div>
        </v-col>

        <v-col class="shrink py-0" 
                >
          <slot name="clearPins" />
        </v-col>
      </v-row>

      <div v-if="!topLayout"
          class="my-0"
          :class="mdScreen ? 'caption' : 'body-2'" >
        {{ highlightedText }}
      </div>

    </div>

    <v-container :class="mdScreen ? 'px-3' : 'py-2 px-3'" >

      <v-row v-if="topLayout"
                
                align="center" justify="end">

        <v-col class="shrink" >
          <slot name="focus" />
        </v-col>              
        <v-col class="shrink" v-if="hasPins"
                >
          <slot name="pinEnabled" />
        </v-col>              
        <v-col class="shrink" v-if="hasMultiPins"
                >
          <slot name="multiPinEnabled" />
        </v-col>              
        <v-col class="shrink" v-if="hasPolygons"
                >
          <slot name="polygonEnabled" />
        </v-col>              
      </v-row>

                <!-- :column="mdScreen" -->
      <v-row v-if="!topLayout"
              align="center">

        <v-col v-if="mdScreen"
                class="pa-0" >
          <v-row align="center">
            <v-col class="shrink" >
              <div :style="`color:${pinnedAmount > 0 ? $vuetify.theme.themes.light.primary : 'rgba(0,0,0,.47)'};`">
                {{ filterText + pinnedAmount }}
              </div>
            </v-col>
            <v-col class="grow" >

              <slot name="clearPins" />

            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="!mdScreen"
                class="grow py-1" >
          <div :style="`color:${pinnedAmount > 0 ? $vuetify.theme.themes.light.primary : 'rgba(0,0,0,.47)'};`">
            {{ filterText + pinnedAmount }}
          </div>
        </v-col>

        <v-col v-if="!mdScreen"
                class="py-1"
                :class="mdScreen ? 'shrink' : 'lg3'" >

          <slot name="clearPins" />

        </v-col>

        <v-col class="hidden-md-and-down py-1" lg="9" >
          {{ focusText }}
        </v-col>

        <v-col class="py-1" md="12" lg="3" >
          <slot name="focus" />
        </v-col>

        <v-col v-if="hasPins"
                class="hidden-md-and-down py-1"
                lg="9" >
          {{ pinText }}
        </v-col>

        <v-col v-if="hasPins"
                class="py-1"
                md="12" lg="3" >
          <slot name="pinEnabled" />
        </v-col>

        <v-col v-if="hasMultiPins"
                class="hidden-md-and-down py-1"
                lg="9" >
          {{ multiPinText }}
        </v-col>

        <v-col v-if="hasMultiPins"
                class="py-1"
                md="12" lg="3" >
          <slot name="multiPinEnabled" />
        </v-col>

        <v-col v-if="hasPolygons"
                class="hidden-md-and-down py-1"
                lg="9" >
          {{ polygonText }}
        </v-col>

        <v-col v-if="hasPolygons"
                class="py-1"
                md="12" lg="3" >
          <slot name="polygonEnabled" />
        </v-col>

      </v-row>
    </v-container>

  </v-card>
</template>

<script>
/**
 * FilterMapWidgetLayout.vue only handles the different layout of the FilterMapWidget.
 *
 * @summary layout fot the FilterMapWidgetLayout
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-14 17:57:05
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export default {
  props: {
    title: String,
    highlightedText: String,
    pinnedAmount: {
      type: Number,
      default: 0,
    },
    hasPins: Boolean,
    hasMultiPins: Boolean,
    hasPolygons: Boolean,
    topLayout: Boolean,
    pinText: String,
    multiPinText: String,
    polygonText: String,
  },
  computed: {
    smScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    mdScreen() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  methods: {
  },
  data: () => ({
    filterText: 'Pinned: ',
    focusText: 'Focus all elements on the map',
  }),
  components: {
  },
};
</script>
