<template>
<v-container fluid
              fill-height
              pa-0
              grid-list-lg>

  <v-layout v-if="!topFilteringLayout && showMapFilter
                  && $vuetify.breakpoint.mdAndUp"
            row wrap>

    <v-flex xs4 py-0>
      <v-container fluid
                    fill-height
                    pa-0 >
      <v-layout column
                ref="metadataListLayoutFiltering">

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
      </v-container>
    </v-flex>

    <v-flex xs8 py-0>
      <v-container fluid
                    fill-height
                    pa-0 >
      <v-layout column>
        <v-flex hidden-xs-only
                shrink 
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-flex>
        

        <v-flex ref="metadataListScroll"
                grow
                pb-0
                v-on:scroll="onScroll()"
                :class="useDynamicHeight ? 'listScroll' : ''"
                :style="useDynamicHeight ? `height: calc(100vh - ${filteringComponentsHeight }px);` : ''" >
          
          <slot name="metadataListPlaceholder" />

          <slot name="metadataListLayout" />

        </v-flex>
      </v-layout>
      </v-container>
    </v-flex>

  </v-layout>

  <v-layout v-else
            column>
    <v-flex >
      <v-container fluid
                    pa-0 >
      <v-layout row wrap
                ref="metadataListLayoutFiltering" >

        <v-flex hidden-sm-and-up
                xs12
                py-0
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-flex>

        <v-flex xs12
                pb-0
                key="filterKeywords" >
          <slot name="filterKeywords" />
        </v-flex>

        <v-flex hidden-xs-only
                xs12
                pb-0
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-flex>


        <v-flex v-if="showMapFilter && mapFilteringPossible"
                xs12
                key="filterMap" >
          <slot name="filterMap" />
        </v-flex>

      </v-layout>
      </v-container>
    </v-flex>

    <v-flex ref="metadataListScroll"
            v-on:scroll="onScroll()"
            :class="useDynamicHeight ? 'listScroll' : ''"
            :style="useDynamicHeight ? `height: calc(100vh - ${filteringComponentsHeight }px);` : ''" >

      <v-container fluid
                    pa-0 >

      <slot name="metadataListPlaceholder" />

      <slot name="metadataListLayout" />

      </v-container>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>
/**
 * MetadataListLayout.vue only handles the different layouts for the metadatalist
 * with slots for the FilterKeywordView, FilterMapView and the ControlPanelView.
 *
 * @summary layout of the list of metadata cards
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-22 13:05:03
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
    // filteringComponentsHeight: Number,
  },
  updated() {
    this.setFilteringComponentsHeight();
  },
  methods: {
    setFilteringComponentsHeight() {
      const FilterKeywordViewHeight = 88;
      const TheNavigationToolbar = 36;
      const padding = 8;
      let height = FilterKeywordViewHeight;

      if (this.showMapFilter && this.$refs && this.$refs.metadataListLayoutFiltering) {
        // around 455px
        height = this.$refs.metadataListLayoutFiltering.clientHeight;
      }

      this.filteringComponentsHeight = height + TheNavigationToolbar + padding;
    },
    setScrollPos(toPos) {
      if (this.$refs && this.$refs.metadataListScroll) {
        this.$refs.metadataListScroll.scrollTop = toPos;
      }
    },
    onScroll() {
      this.$emit('onScroll', this.$refs.metadataListScroll.scrollTop);
    },
  },
  data: () => ({
    filteringComponentsHeight: 150,
  }),
};
</script>

<style scoped>

  .listScroll {
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
</style>
