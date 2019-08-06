<template>
  <!-- <v-card raised> -->
  <v-layout
    row
    style="min-height: 48px;"
    align-center
    justify-end
  >
    <v-flex xs6>
      <v-btn
        small
        flat
        color="primary"
        @click.stop="toggleExpand"
      >
        {{ expanded ? expandedButtonText : expandButtonText }}
        <v-icon color="accent">
          {{ expanded ? 'expand_less' : 'expand_more' }}
        </v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs6>
      <v-btn
        small
        flat
        color="primary"
        @click.native="toggleMapExpand"
      >
        {{ mapExpanded ? mapExpandedButtonText : mapExpandButtonText }}
        <v-icon
          color="accent"
          :style="mapExpanded ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
        >
          expand_more
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
  <!-- </v-card> -->
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    mapExpanded: Boolean,
    mapExpandButtonText: String,
    mapExpandedButtonText: String,
  },
  methods: {
    toggleExpand: function toggleExpand() {
      this.$emit('clickedExpand');
    },
    toggleMapExpand: function toggleMapExpand() {
      this.$emit('clickedMapExpand');
    },
    clearTags: function clearTags() {
      this.$emit('clickedClearTags');
    },
  },
};
</script>
