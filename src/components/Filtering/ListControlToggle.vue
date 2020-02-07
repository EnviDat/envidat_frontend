<template>
  <v-btn-toggle v-model="controlsActive"
                multiple >
    <v-btn v-if="isEnabledControl(LISTCONTROL_LIST_ACTIVE)"
            flat
            @click="catchControlClick(LISTCONTROL_LIST_ACTIVE)"
            :class="isActiveControl(LISTCONTROL_LIST_ACTIVE) ? 'highlight' : ''"
            :style="compactLayout ? 'height: 32px !important' : ''" >
      <v-icon>view_headline</v-icon>
    </v-btn>

    <v-btn v-if="isEnabledControl(LISTCONTROL_MAP_ACTIVE)"
            flat
            @click="catchControlClick(LISTCONTROL_MAP_ACTIVE)"
            :class="isActiveControl(LISTCONTROL_MAP_ACTIVE) ? 'highlight' : ''"
            :style="compactLayout ? 'height: 32px !important' : ''" >
      <v-icon>map</v-icon>
    </v-btn>

    <v-btn v-if="isEnabledControl(LISTCONTROL_COMPACT_LAYOUT_ACTIVE)"
            flat
            @click="catchControlClick(LISTCONTROL_COMPACT_LAYOUT_ACTIVE)"
            :class="isActiveControl(LISTCONTROL_COMPACT_LAYOUT_ACTIVE) ? 'highlight' : ''"
            :style="compactLayout ? 'height: 32px !important' : ''" >
      <v-icon>view_comfortable</v-icon>
    </v-btn>

    <v-btn v-if="isEnabledControl(3)"
            flat
            @click="catchControlClick(3)"
            :class="isActiveControl(3) ? 'highlight' : ''"
            :style="compactLayout ? 'height: 32px !important' : ''" >
      <v-icon>view_stream</v-icon>
    </v-btn>

  </v-btn-toggle>
</template>

<script>
/**
 * ListControlToggle.vue shows toggle buttons for the
 * configurations of the metadata list
 *
 * @summary controls for list
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-08 16:32:31
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import {
  LISTCONTROL_LIST_ACTIVE,
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
} from '@/store/metadataMutationsConsts';

export default {
  components: {
  },
  props: {
    compactLayout: Boolean,
    controls: Array,
    enabledControls: Array,
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
    LISTCONTROL_LIST_ACTIVE,
    LISTCONTROL_MAP_ACTIVE,
    LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
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
    isEnabledControl(number) {
      return this.enabledControls.includes(number);
    },
    catchControlClick(number) {
      this.$emit('controlsChanged', number);
    },
  },
};
</script>

<style>

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
