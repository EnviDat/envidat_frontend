<template>
    <v-card>
      <v-list dense>
        <v-list-tile
          v-for="(layer, key) in layers"
          :key="key"
          :class="{'primary lighten-2': layer.name === selected }"
          @click="select(layer.name)"
        >
          {{ layer.title }}
        </v-list-tile>
      </v-list>
    </v-card>
</template>

<script>
    export default {
        name: 'MapLayerControl',
      props: {
          layers: Array,
        selected: String,
        },
      methods: {
          select(layerName) {
            this.$emit('select', layerName);
          },
      },
    };
</script>

<style scoped>
  .selected {
    background-color: cadetblue;
  }
</style>
