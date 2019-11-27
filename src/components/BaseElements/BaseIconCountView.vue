<template>
  <v-tooltip bottom
              :disabled="$vuetify.breakpoint.xsOnly" >
    <div slot="activator"
          class="metadataInfoIcon" >
      <v-layout row
                  @mouseover="hoverBadge = true"
                  @mouseleave="hoverBadge = false" >
        <v-flex pa-0>
          <v-badge :left="!hoverBadge"
                    overlap
                    color="secondary"
                    :class="{ envidatBadgeBigNumber : count > 9,
                              envidatBadge: count <= 9 }" >
<!-- :style="`top: 3px !important; left: ${hoverBadge ? '-10' : '0' }px !important;`" -->
                                                  
            <span slot="badge">{{ count }}</span>
          </v-badge>
        </v-flex>

        <v-flex pa-0>
          <img class="envidatIcon" :src="iconString">
        </v-flex>
      </v-layout>
    </div>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
/**
 * BaseIconCountView.vue creates a round with an icon with a badge which shows a number
 * Similar to @class BaseIconButton but without the click event.
 *
 * @summary icon with a small number in a circle
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-27 14:54:23
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/** Review
     * Wieso 2x envidatBadge? --> in BasIconButton
     * Wieso -View im Namen?
     */

export default {
  name: 'BaseIconCountView',
  props: {
    iconString: String,
    count: Number,
    tooltipText: String,
  },
  data: () => ({
    hoverBadge: false,
  }),
};
</script>

<style scoped>

</style>
