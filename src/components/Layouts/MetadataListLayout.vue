<template>
<v-container fluid
              fill-height
              pa-0
              grid-list-lg>

  <v-layout v-if="topFilteringLayout"
            column>
    <v-flex >
      
      <v-layout row wrap
                ref="metadataListLayoutFiltering" >

        <v-flex xs12 sm9
                key="filterKeywords" >
          <slot name="filterKeywords" />
        </v-flex>

        <v-flex hidden-xs-only sm3
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-flex>


        <v-flex v-if="showMapFilter && mapFilteringPossible"
                xs12
                key="filterMap" >
          <slot name="filterMap" />
        </v-flex>

      </v-layout>

    </v-flex>

    <v-flex ref="metadataListScroll"
            :class="useDynamicHeight ? 'metadataListScroll' : ''"
            :style="useDynamicHeight ? `height: calc(100vh - ${ filteringComponentsHeight }px);` : ''" >
      
      <slot name="metadataListPlaceholder" />

      <slot name="metadataListLayout" />

    </v-flex>
  </v-layout>


  <v-layout v-if="!topFilteringLayout"
            row wrap>

    <v-flex xs5 pb-0>
      <v-layout column
                fill-height>

        <v-flex shrink
                key="filterKeywords" >
          <slot name="filterKeywords" />
        </v-flex>

        <v-flex v-if="showMapFilter && mapFilteringPossible"
                grow
                pb-0
                key="filterMap" >
          <slot name="filterMap" />

        </v-flex>

      </v-layout>
    </v-flex>

    <v-flex xs7 pb-0>
      <v-layout column fill-height>
        <v-flex hidden-xs-only
                shrink 
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-flex>
        

        <v-flex ref="metadataListScroll"
                grow
                pb-0
                :class="useDynamicHeight ? 'metadataListScroll' : ''"
                :style="useDynamicHeight ? `height: calc(100vh - ${ filteringComponentsHeight }px);` : ''" >
          
          <slot name="metadataListPlaceholder" />

          <slot name="metadataListLayout" />

        </v-flex>

      </v-layout>
    </v-flex>

  </v-layout>

</v-container>
</template>

<script>
/**
 * SubLayout.vue uses the FilterKeywordView, FilterMapView and the ControlPanelView
 * to create a List of metadata cards which can be filtered via the mentioned
 * filtering components.
 *
 * @summary filterable list of metadata cards
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-13 11:31:27
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  name: 'MetadataListLayout',
  props: {
    showMapFilter: Boolean,
    mapFilteringPossible: Boolean,
    useDynamicHeight: Boolean,
    topFilteringLayout: {
      type: Boolean,
      default: false,
    },
    filteringComponentsHeight: Number,
    // scrollPosition: Number,
  },
  // updated() {
  //   this.setScrollPos(this.scrollPosition);
  // },
  methods: {
    setScrollPos(toPos) {
      if (this.$refs && this.$refs.metadataListScroll) {
        this.$refs.metadataListScroll.scrollTop = toPos;
      }
    },    
  },
};
</script>

<style scoped>

  .metadataListScroll {
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
</style>
