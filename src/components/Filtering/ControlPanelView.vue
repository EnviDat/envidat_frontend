<template>
  <v-card :class="flat ? 'elevation-0' : ''">
    <!-- :height="compactLayout ? $vuetify.breakpoint.sm ? 38 : 32 : 40" -->
    <v-card-actions class="ma-0 py-0 px-2"
                    :class="flat ? '' : 'fill-height'" >

      <v-text-field v-if="$vuetify.breakpoint.mdAndUp"
                    class="fill-height envidatControlInfos"
                    style="align-items: center;"
                    :class="{'small' : compactLayout }"
                    :label="label"
                    flat
                    single-line
                    readonly
                    solo
                    disabled
                    hide-details />

      <!-- <div class="pl-2">Controls</div> -->

      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />

      <v-btn-toggle v-model="controlsActive"
                    multiple >
        <v-btn flat
                @click="catchControlClick(0)"
                :class="isActiveControl(0) ? 'highlight' : ''"
                :style="compactLayout ? 'height: 32px !important' : ''" >
          <img class="envidatIcon"
                :src="listViewIcon" >
        </v-btn>

        <v-btn flat
                @click="catchControlClick(1)"
                :class="isActiveControl(1) ? 'highlight' : ''"
                :style="compactLayout ? 'height: 32px !important' : ''" >
          <img class="envidatIcon"
                :src="mapIcon" >
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
    controls: Array,
    flat: Boolean,
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
  mounted() {
    this.controlsActive = this.controls;
  },
  watch: {
    controls() {
      this.controlsActive = this.controls;
    },
  },
  methods: {
    isActiveControl(number) {
      return this.controlsActive.includes(number);
    },
    catchControlClick(number) {
      this.$emit('controlsChanged', number);
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
