<template>
  <v-card class="elevation-0" >

    <v-card-title :class="smScreen ? 'pa-2' : ''" >
      <div class="mb-0"
          :class="smScreen ? 'body-2 font-weight-bold' : 'title '" >
        Cartographic Filtering</div>
    </v-card-title>

    <div class="py-0 my-0 "
          :class="smScreen ? 'px-1 mb-1' : 'px-3 mb-2'"
          :style="`background-color: ${$vuetify.theme.highlight};`" >

      <p class="my-0"
          :class="smScreen ? 'caption' : 'body-2'" >
        {{ highlightedText }}
      </p>

    </div>

    <v-container py-2
                :class="smScreen ? '' : 'px-3'" >

    <v-layout wrap :row="!smScreen" :column="smScreen" align-center>

      <v-flex xs12 md7>
        <div :style="`color:${pinnedIds.length > 0 ? $vuetify.theme.primary : 'rgba(0,0,0,.47)'};`">
          {{ filterText + pinnedIds.length }}
        </div>
      </v-flex>

      <v-flex hidden-sm-and-down sm12 md5 >
        <base-rectangle-button :buttonText="clearButtonText"
                                :toolTipText="clearButtonTooltipText"
                                :isSmall="true"
                                :isFlat="true"
                                iconColor="red"
                                :disabled="pinnedIds.length <= 0"
                                materialIconName="close"
                                marginClass="my-0 mx-0 pa-0"
                                @clicked="catchClearClicked()" />
      </v-flex>

      <v-flex hidden-md-and-up sm12>
        <base-icon-button materialIconName="close"
                          iconColor="red"
                          :outlined="true"
                          :disabled="pinnedIds.length <= 0"
                          :toolTipText="clearButtonTooltipText"
                          @clicked="catchClearClicked()" />
      </v-flex>


      <v-flex hidden-sm-and-down md9>
        {{ focusText }}
      </v-flex>

      <v-flex sm12 md3 py-1>
        <base-icon-button materialIconName="remove_red_eye"
                          iconColor="black"
                          color="highlight"
                          :outlined="true"
                          :toolTipText="focusText"
                          @clicked="catchFocusClicked()" />
      </v-flex>

      <v-flex hidden-sm-and-down md9 v-if="hasPins" >
        {{ pinText }}
      </v-flex>

      <v-flex sm12 md3 py-1 v-if="hasPins" >
        <base-icon-button :count="pinNumber"
                          :customIcon="pinIcon"
                          color="secondary"
                          :outlined="true"
                          :isToggled="pinEnabled"
                          :toolTipText="pinText"
                          @clicked="catchPinClicked()" />
      </v-flex>

      <v-flex hidden-sm-and-down md9 v-if="hasMultiPins">
        {{ multiPinText }}
      </v-flex>

      <v-flex sm12 md3 py-1 v-if="hasMultiPins">
        <base-icon-button :count="multiPinNumber"
                          :customIcon="multiPinIcon"
                          color="secondary"
                          :outlined="true"
                          :isToggled="multiPinEnabled"
                          :toolTipText="multiPinText"
                          @clicked="catchMultipinClicked()" />
      </v-flex>

      <v-flex hidden-sm-and-down md9 v-if="hasPolygons">
        {{ polygonText }}
      </v-flex>

      <v-flex sm12 md3 py-1 v-if="hasPolygons">
        <base-icon-button :count="polygonNumber"
                          materialIconName="layers"
                          iconColor="black"
                          color="secondary"
                          :isToggled="polygonEnabled"
                          :outlined="true"
                          :toolTipText="polygonText"
                          @clicked="catchPolygonClicked()" />
      </v-flex>


    </v-layout>
    </v-container>

  </v-card>
</template>

<script>
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
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
    BaseRectangleButton,
    BaseIconButton,
  },
};
</script>

<style>

</style>
