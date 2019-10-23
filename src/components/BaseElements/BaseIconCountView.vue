<template>
  <v-tooltip
    bottom
    :disabled="$vuetify.breakpoint.xsOnly || !tooltip"
  >
    <div
      slot="activator"
      class="metadataInfoIcon"
    >
      <v-layout
        row
        @mouseover="hoverBadge = true"
        @mouseleave="hoverBadge = false"
      >
        <v-flex pa-0>
          <v-badge
            v-bind="{ left: !hoverBadge }"
            overlap
            color="secondary"
            :class="{ envidatBadgeBigNumber : count > 9,
                      envidatBadge: count <= 9 }"
          >
            <span slot="badge">{{ count }}</span>
          </v-badge>
        </v-flex>

        <v-flex pa-0>
          <img
            class="envidatIcon"
            :src="iconString"
          >
        </v-flex>
      </v-layout>
    </div>

    <span>{{ tooltip }}</span>
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
 * Last modified  : 2019-10-02 11:41:29
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export default {
  props: {
    iconString: String,
    count: Number,
    tooltip: String,
  },
  data: () => ({
    hoverBadge: false,
  }),
  computed: {
  },
};
</script>

<style>
  .iconCentering {
    position: relative;
    top: 2px;
  }
</style>
