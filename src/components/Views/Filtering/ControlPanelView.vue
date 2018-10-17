<template>
  <v-card raised height="40">

    <v-card-actions class="ma-0 py-0 px-1" >
      
      <v-spacer></v-spacer>

        <v-btn-toggle style="padding-top: 1px !important;"
                      v-model="controlsActive" multiple>
          <v-btn flat>
            <img class="envidatIcon" :src="getIcon('listView')" />
          </v-btn>
          <v-btn flat>
            <img class="envidatIcon" :src="getIcon('map')" />
          </v-btn>
        </v-btn-toggle>

      <!-- <v-spacer></v-spacer>

      <v-btn :color="mapFilterActive ? 'primary' : ''"
        
        @click.native="catchMapFilterClick"> 

        <img class="envidatIcon" :src="getIcon('map')" />

      </v-btn>

      <v-divider vertical />

      <v-btn :color="catchListViewClick ? 'primary' : ''"
        icon
        @click.native="catchListViewClick"> 

        <img class="envidatIcon" :src="getIcon(listViewActive ? 'listView' : 'gridView')" />

      </v-btn> -->

    </v-card-actions>

    <!-- <v-container fluid fill-height>

      <v-layout row fill-height align-end py-1>

        <v-flex xs1 >
          <v-btn :color="mapFilterActive ? 'primary' : ''"
                  icon
                  @click.native="catchMapFilterClick"> 

            <img class="envidatIcon" :src="getIcon('map')" />

          </v-btn>
        </v-flex>

        <v-flex >
          <v-divider vertical />
        </v-flex>

        <v-flex xs1 >
          <v-btn :color="listViewActive ? 'primary' : ''"
                  icon
                  @click.native="catchListViewClick"> 

            <icon-label-view  :icon="getIcon(listViewActive ? 'listView' : 'gridView')"
                              :iconTooltip="listViewActive ? listViewDeactivate : listViewActivate"
                              :alignLeft="true" />

          </v-btn>
        </v-flex>

          <v-divider vertical />

      </v-layout>

    </v-container> -->

  </v-card>
</template>

<script>
import IconLabelView from '../IconLabelView';

export default {
  props: {
    // controlsActive: Array,
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
  

</style>