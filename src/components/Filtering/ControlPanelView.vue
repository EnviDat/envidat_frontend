<template>
  <v-card
    raised
    :height="compactLayout ? $vuetify.breakpoint.sm ? 38 : 32 : 40"
  >
    <v-card-actions class="fill-height ma-0 py-0 px-1">
      <v-text-field
        class="fill-height envidatControlInfos"
        style="align-items: center;"
        :class="{'small' : compactLayout }"
        :label="label"
        flat
        single-line
        readonly
        solo
        disabled
        hide-details
      />

      <!-- <div class="pl-2">Controls</div> -->

      <v-spacer />

      <v-btn-toggle
        v-model="controlsActive"
        multiple
      >
        <v-btn
          flat
          :class="isActiveControl(0) ? 'highlight' : ''"
          :style="compactLayout ? 'height: 32px !important' : ''"
        >
          <img
            class="envidatIcon"
            :src="listViewIcon"
          >
        </v-btn>

        <v-btn
          flat
          :class="isActiveControl(1) ? 'highlight' : ''"
          :style="compactLayout ? 'height: 32px !important' : ''"
        >
          <img
            class="envidatIcon"
            :src="mapIcon"
          >
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  props: {
    compactLayout: Boolean,
    label: String,
  },
  data: () => ({
    mapFilterActivateText: 'Activate Mapfiltering',
    mapFilterDeactivateText: 'Deactivate Mapfiltering',
    listViewActivate: 'List view',
    listViewDeactivate: 'Grid view',
    controlsActive: [],
    listViewIcon: null,
    mapIcon: null,
  }),
  beforeMount: function beforeMount() {
    this.listViewIcon = this.mixinMethods_getIcon('listView');
    this.mapIcon = this.mixinMethods_getIcon('map');
  },
  mounted: function mounted() {
    this.controlsActive = this.$store.getters.controls;
  },
  updated: function updated() {
    this.$emit('controlsChanged', this.controlsActive);
  },
  methods: {
    isActiveControl(number) {
      return this.controlsActive.includes(number);
    },
    catchMapFilterClick: function catchMapFilterClick() {
      this.$emit('clickedMapFilter');
    },
    catchListViewClick: function catchListViewClick() {
      this.$emit('clickedListViewClick');
    },
  },
};
</script>

<style>

.envidatControlInfos.small > .v-input__control > .v-input__slot > .v-text-field__slot > .v-label {
  font-size: 12px !important;
}

.envidatControlInfos.small > .v-input__control {
  min-height: 32px !important;
}
.envidatControlInfos > .v-input__control {
  min-height: 40px !important;
}

.envidatControlInfos > .v-input__slot {
    margin: 0 !important;
}

.envidatControlInfos > .v-input__append-outer {
  margin: auto !important;
}

</style>
