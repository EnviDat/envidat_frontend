<template>

    <v-chip
        small
        class="placeholder_chip" >
          <div style="width: 50px;" class="skeleton skeleton-size-small skeleton-color-concrete skeleton-animation-pulse">
            <div class='bone bone-type-text bone-style-steps'></div>
          </div>
    </v-chip>

</template>

<script>
  export default {
    props: {
      name: String,
      closeable: Boolean,
      selectable: Boolean,
      highlighted: Boolean,
      count: Number,
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