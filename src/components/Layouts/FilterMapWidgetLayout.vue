<template>
  <v-card class="elevation-0" >

    <v-card-title :class="mdScreen ? 'pa-2' : 'pb-2'" >
      <div class="mb-0"
          :class="mdScreen ? 'body-2 font-weight-bold' : 'title '" >
        {{ title }}</div>
    </v-card-title>


    <div v-if="!mdScreen"
          class="py-0 my-0 "
          :class="mdScreen ? 'px-1 mb-1' : 'px-3'"
          :style="`background-color: ${$vuetify.theme.highlight};`" >

      <v-layout v-if="topLayout"
                  row
                  align-center
                  my-0 >
        <v-flex grow
                py-0
                :class="mdScreen ? 'caption' : 'body-2'" >
          {{ highlightedText }}
        </v-flex>

        <v-flex shrink
                py-0>
          <div :style="`color:${pinnedAmount > 0 ? 'black' : 'rgba(0,0,0,.47)'};`">
            {{ filterText + pinnedAmount }}
          </div>
        </v-flex>

        <v-flex shrink
                py-0>
          <slot name="clearPins" />
        </v-flex>
      </v-layout>

      <div v-if="!topLayout"
          class="my-0"
          :class="mdScreen ? 'caption' : 'body-2'" >
        {{ highlightedText }}
      </div>

    </div>

    <v-container :class="mdScreen ? 'px-3' : 'py-2 px-3'" >

    <v-layout v-if="topLayout"
              row wrap
              align-center justify-end>

      <v-flex shrink >
        <slot name="focus" />
      </v-flex>              
      <v-flex shrink >
        <slot name="pinEnabled" />
      </v-flex>              
      <v-flex shrink >
        <slot name="multiPinEnabled" />
      </v-flex>              
      <v-flex shrink >
        <slot name="polygonEnabled" />
      </v-flex>              
    </v-layout>

    <v-layout v-if="!topLayout"
              :row="!mdScreen"
              :column="mdScreen"
              wrap
              align-center>

      <v-flex v-if="mdScreen"
              pa-0 >
        <v-layout row align-center>
          <v-flex shrink>
            <div :style="`color:${pinnedAmount > 0 ? $vuetify.theme.primary : 'rgba(0,0,0,.47)'};`">
              {{ filterText + pinnedAmount }}
            </div>
          </v-flex>
          <v-flex grow>

            <slot name="clearPins" />

          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex v-if="!mdScreen"
              grow
              py-1>
        <div :style="`color:${pinnedAmount > 0 ? $vuetify.theme.primary : 'rgba(0,0,0,.47)'};`">
          {{ filterText + pinnedAmount }}
        </div>
      </v-flex>

      <v-flex v-if="!mdScreen"
              py-1
              :class="mdScreen ? 'shrink' : 'lg3'">

        <slot name="clearPins" />

      </v-flex>


      <v-flex hidden-md-and-down lg9
              py-1 >
        {{ focusText }}
      </v-flex>

      <v-flex md12 lg3
              py-1 >
        <slot name="focus" />
      </v-flex>

      <v-flex v-if="hasPins"
              hidden-md-and-down
              lg9
              py-1 >
        {{ pinText }}
      </v-flex>

      <v-flex v-if="hasPins"
              md12 lg3
              py-1 >
        <slot name="pinEnabled" />
      </v-flex>

      <v-flex v-if="hasMultiPins"
              hidden-md-and-down
              lg9
              py-1 >
        {{ multiPinText }}
      </v-flex>

      <v-flex v-if="hasMultiPins"
              md12 lg3
              py-1 >
        <slot name="multiPinEnabled" />
      </v-flex>

      <v-flex v-if="hasPolygons"
              hidden-md-and-down
              lg9
              py-1 >
        {{ polygonText }}
      </v-flex>

      <v-flex v-if="hasPolygons"
              md12 lg3
              py-1 >
        <slot name="polygonEnabled" />
      </v-flex>


    </v-layout>
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
 * Last modified  : 2019-11-13 16:23:53
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

<style>

</style>
