<template>
  <v-tooltip bottom :disabled="$vuetify.breakpoint.xsOnly">
    <div slot="activator" class="metadataInfoIcon">
      <v-layout @mouseover="hovered=true" @mouseleave="hovered=false">
        <v-flex pa-0>
          <v-badge
            :left="!hovered"
            overlap
            color="secondary"
            :class="{ envidatBadgeBigNumber : count > 9,
                      envidatBadge: count <= 9 }"
          >
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
/** Review
     * css Klassen lokal wo nur lokal gebraucht
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
    hovered: false,
  }),
};
</script>

<style scoped>
  .envidatBadge span {
    font-size: 0.95em !important;
  }

  .envidatBadgeBigNumber span {
    font-size: 0.9em !important;
  }
</style>
