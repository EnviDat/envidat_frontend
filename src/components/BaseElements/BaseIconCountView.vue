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
