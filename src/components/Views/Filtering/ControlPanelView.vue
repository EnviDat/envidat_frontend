<template>
  <v-card raised
          :height="compactLayout ? 32 : 40"
  >
    <v-card-actions class="fill-height ma-0 py-0 px-1" >

      <v-text-field class="fill-height envidatControlInfos"
                    :class="{'small' : compactLayout }"
                    label="Controls" 
                    flat
                    single-line
                    readonly
                    solo
                    disabled
      />

      <!-- <div class="pl-2">Controls</div> -->
      
      <v-spacer></v-spacer>

        <v-btn-toggle v-model="controlsActive"
                      multiple>

          <v-btn flat
                :style="compactLayout ? 'height: 32px !important' : ''">
            <img class="envidatIcon" :src="getIcon('listView')" />
          </v-btn>
          
          <v-btn flat
                :style="compactLayout ? 'height: 32px !important' : ''">
            <img class="envidatIcon" :src="getIcon('map')" />
          </v-btn>

        </v-btn-toggle>


    </v-card-actions>

  </v-card>
</template>

<script>
import IconLabelView from '../IconLabelView';

export default {
  props: {
    compactLayout: Boolean,
  },
  data: () => ({
    mapFilterActivateText: 'Activate Mapfiltering',
    mapFilterDeactivateText: 'Deactivate Mapfiltering',
    listViewActivate: 'List view',
    listViewDeactivate: 'Grid view',
    controlsActive: [],
  }),
  updated: function updated() {
    this.$emit('controlsChanged', this.controlsActive);
  },
  methods: {
    catchMapFilterClick: function catchMapFilterClick() {
      this.$emit('clickedMapFilter');
    },
    catchListViewClick: function catchListViewClick() {
      this.$emit('clickedListViewClick');
    },
  },
  components: {
    IconLabelView,
  },
};
</script>

<style>

.envidatControlInfos.small > div > div > div.v-label {
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