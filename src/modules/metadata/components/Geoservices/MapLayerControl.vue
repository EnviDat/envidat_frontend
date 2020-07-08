<template>
    <v-card style="overflow-y: auto; max-height: 100%;">
      <v-list dense>
        <v-list-tile>
          <v-slider min="0" max="100" :value="opacity" @change="setOpacity"></v-slider>
        </v-list-tile>
        <v-divider></v-divider>
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
          opacity: Number,
          layers: Array,
        selected: String,
        },
      methods: {
          select(layerName) {
            this.$emit('select', layerName);
          },
        setOpacity(value) {
            this.$emit('setOpacity', value);
        },
      },
    };
</script>

<style scoped>
</style>
