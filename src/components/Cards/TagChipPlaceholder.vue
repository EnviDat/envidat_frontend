<template>
  <v-chip
    small
    class="placeholder_chip"
  >
    <div
      style="width: 50px;"
      class="skeleton skeleton-size-small skeleton-color-concrete skeleton-animation-shimmer"
    >
      <div class="bone bone-type-text bone-style-steps" />
    </div>
  </v-chip>
</template>

<script>
export default {
  props: {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>
  .placeholder_chip{
    height: 1.5rem;
    font-size: 0.75rem;
  }
</style>
