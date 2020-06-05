<template>
  <div>
    <v-tooltip v-if="$vuetify.breakpoint.mdAndUp && tooltipText"
                bottom >
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
                                                    
              <span slot="badge" >{{ count }}</span>
            </v-badge>
          </v-flex>

          <v-flex pa-0>
            <img class="envidatIcon" :src="iconString" :alt="`${iconString} icon`">
          </v-flex>
        </v-layout>
      </div>
      <span>{{ tooltipText }}</span>
    </v-tooltip>

    <div v-else
          class="metadataInfoIcon" >
      <v-layout row
                  @mouseover="hoverBadge = true"
                  @mouseleave="hoverBadge = false" >
        <v-flex pa-0>
          <v-badge :left="!hoverBadge"
                    overlap
                    color="secondary"
                    style="z-index: 2;"
                    :class="{ envidatBadgeBigNumber : count > 9,
                              envidatBadge: count <= 9 }" >
                                                  
            <span slot="badge">{{ count }}</span>
          </v-badge>
        </v-flex>

        <v-flex pa-0 style="z-index: 1;" >
          <img class="envidatIcon" :src="iconString" :alt="`${iconString} icon`">
        </v-flex>
      </v-layout>
    </div>

  </div>
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
