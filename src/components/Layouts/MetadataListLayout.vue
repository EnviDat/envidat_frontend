<template>
<v-container class="fill-height pa-0" fluid
              
              
              grid-list-lg>

  <v-row v-if="!topFilteringLayout && showMapFilter
                  && $vuetify.breakpoint.mdAndUp"
            >

    <v-col class="py-0" cols="4" >
      <v-container class="fill-height pa-0" fluid
                    
                    >
      <v-row column
                ref="metadataListLayoutFiltering">

        <v-col class="shrink" 
                key="filterKeywords" >
          <slot name="filterKeywords" />
        </v-col>

        <v-col class="grow pb-0" v-if="showMapFilter && mapFilteringPossible"
                
                
                key="filterMap" >
          <slot name="filterMap" />

        </v-col>

      </v-row>
      </v-container>
    </v-col>

    <v-col class="py-0" cols="8" >
      <v-container class="fill-height pa-0" fluid
                    
                    >
      <v-row column>
        <v-col class="hidden-xs-only shrink" 
                
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-col>
        

        <v-col class="grow pb-0" ref="metadataListScroll"
                
                
                v-on:scroll="onScroll()"
                :class="useDynamicHeight ? 'listScroll' : ''"
                :style="useDynamicHeight ? `height: calc(100vh - ${filteringComponentsHeight }px);` : ''" >
          
          <slot name="metadataListPlaceholder" />

          <slot name="metadataListLayout" />

        </v-col>
      </v-row>
      </v-container>
    </v-col>

  </v-row>

  <v-row v-else
            column>
    <v-col >
      <v-container class="pa-0" fluid
                    >
      <v-row 
                ref="metadataListLayoutFiltering" >

        <v-col class="hidden-sm-and-up py-0" 
                cols="12"
                
                key="controlPanel_smallscreen" >
          <slot name="controlPanel" />
        </v-col>

        <v-col class="pb-0" cols="12"
                
                key="filterKeywords" >
          <slot name="filterKeywords" />
        </v-col>

        <v-col class="hidden-xs-only pb-0" 
                cols="12"
                
                key="controlPanel" >
          <slot name="controlPanel" />
        </v-col>


        <v-col v-if="showMapFilter && mapFilteringPossible"
                cols="12"
                key="filterMap" >
          <slot name="filterMap" />
        </v-col>

      </v-row>
      </v-container>
    </v-col>

    <v-col ref="metadataListScroll"
            v-on:scroll="onScroll()"
            :class="useDynamicHeight ? 'listScroll' : ''"
            :style="useDynamicHeight ? `height: calc(100vh - ${filteringComponentsHeight }px);` : ''" >

      <v-container class="pa-0" fluid
                    >

      <slot name="metadataListPlaceholder" />

      <slot name="metadataListLayout" />

      </v-container>
    </v-col>
  </v-row>

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
