<template>
  <v-card class="elevation-0" >

    <v-card-title :class="mdScreen ? 'pa-2' : 'pb-2'" >
      <div class="mb-0"
          :class="mdScreen ? 'body-2 font-weight-bold' : 'title '" >
        {{ title }} </div>
    </v-card-title>

    <div v-if="!mdScreen"
          class="py-0 my-0 "
          :class="mdScreen ? 'px-1 mb-1' : 'px-3'"
          :style="`background-color: ${$vuetify.theme.highlight};`" >

      <p class="my-0"
          :class="mdScreen ? 'caption' : 'body-2'" >
        {{ highlightedText }}
      </p>

    </div>

    <v-container :class="mdScreen ? 'px-3' : 'py-2 px-3'" >

    <v-layout :row="!mdScreen"
              :column="mdScreen"
              wrap
              align-center>

      <v-flex v-if="mdScreen"
              pa-0 >
        <v-layout row align-center>
          <v-flex shrink>
            <div :style="`color:${pinnedIds.length > 0 ? $vuetify.theme.primary : 'rgba(0,0,0,.47)'};`">
              {{ filterText + pinnedIds.length }}
            </div>
          </v-flex>
          <v-flex grow>
            <base-icon-button materialIconName="close"
                              iconColor="red"
                              :outlined="pinnedIds.length > 0"
                              :isSmall="mdScreen"
                              :disabled="pinnedIds.length <= 0"
                              :tooltipText="clearButtonTooltipText"
                              @clicked="catchClearClicked()" />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex v-if="!mdScreen"
              grow
              py-1>
        <div :style="`color:${pinnedIds.length > 0 ? $vuetify.theme.primary : 'rgba(0,0,0,.47)'};`">
          {{ filterText + pinnedIds.length }}
        </div>
      </v-flex>

      <v-flex v-if="!mdScreen"
              py-1
              :class="mdScreen ? 'shrink' : 'lg3'">
        <base-icon-button materialIconName="close"
                          iconColor="red"
                          :outlined="pinnedIds.length > 0"
                          :isSmall="mdScreen"
                          :disabled="pinnedIds.length <= 0"
                          :tooltipText="clearButtonTooltipText"
                          @clicked="catchClearClicked()" />
      </v-flex>


      <v-flex hidden-md-and-down lg9
              py-1 >
        {{ focusText }}
      </v-flex>

      <v-flex md12 lg3
              py-1 >
        <base-icon-button materialIconName="remove_red_eye"
                          iconColor="black"
                          color="highlight"
                          :isSmall="mdScreen"
                          :outlined="true"
                          :tooltipText="focusText"
                          @clicked="catchFocusClicked()" />
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
        <base-icon-button :count="pinNumber"
                          :customIcon="pinIcon"
                          color="secondary"
                          :outlined="true"
                          :isSmall="mdScreen"
                          :isToggled="pinEnabled"
                          :tooltipText="pinText"
                          @clicked="catchPinClicked()" />
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
        <base-icon-button :count="multiPinNumber"
                          :customIcon="multiPinIcon"
                          color="secondary"
                          :outlined="true"
                          :isSmall="mdScreen"
                          :isToggled="multiPinEnabled"
                          :tooltipText="multiPinText"
                          @clicked="catchMultipinClicked()" />
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
        <base-icon-button :count="polygonNumber"
                          materialIconName="layers"
                          iconColor="black"
                          color="secondary"
                          :isSmall="mdScreen"
                          :isToggled="polygonEnabled"
                          :outlined="true"
                          :tooltipText="polygonText"
                          @clicked="catchPolygonClicked()" />
      </v-flex>


    </v-layout>
    </v-container>

  </v-card>
</template>

<script>
/**
 * FilterMapWidget.vue shows the buttons and configurations for the FilterMapView.vue
 *
 * @summary view buttons with buttons to show / hide markers on the map
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-01 12:52:50
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
    title: {
      type: String,
      default: 'Cartographic Filtering',
    },
    pinnedIds: Array,
    hasPins: Boolean,
    pinEnabled: Boolean,
    pinNumber: {
      default: 0,
      type: Number,
    },
    hasMultiPins: Boolean,
    multiPinEnabled: Boolean,
    multiPinNumber: {
      default: 0,
      type: Number,
    },
    hasPolygons: Boolean,
    polygonEnabled: Boolean,
    polygonNumber: {
      default: 0,
      type: Number,
    },
  },
  beforeMount() {
    this.pinIcon = this.mixinMethods_getIcon('marker');
    this.multiPinIcon = this.mixinMethods_getIcon('markerMulti');
    // this.polygonIcon = this.mixinMethods_getIcon('polygons');
    // this.eyeIcon = this.mixinMethods_getIcon('eye');
  },
  computed: {
    smScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    mdScreen() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    pinText() {
      return this.pinEnabled ? 'Hide single markers' : 'Show single markers';
    },
    multiPinText() {
      return this.multiPinEnabled ? 'Hide multi markers' : 'Show multi markers';
    },
    polygonText() {
      return this.polygonEnabled ? 'Hide polygons' : 'Show polygons';
    },
  },
  methods: {
    catchFocusClicked() {
      this.$emit('clickedFocus');
    },
    catchPinClicked() {
      this.$emit('clickedPin');
    },
    catchMultipinClicked() {
      this.$emit('clickedMultipin');
    },
    catchPolygonClicked() {
      this.$emit('clickedPolygon');
    },
    catchClearClicked() {
      this.$emit('clickedClear');
    },
  },
  data: () => ({
    filterText: 'Pinned: ',
    highlightedText: 'Select markers to pin entries to the top of the list',
    clearButtonText: 'Clear Pins',
    clearButtonTooltipText: 'Clear all pinned Entries',
    focusText: 'Focus all elements on the map',
  }),
  components: {
    BaseIconButton,
  },
};
</script>

<style>

</style>
