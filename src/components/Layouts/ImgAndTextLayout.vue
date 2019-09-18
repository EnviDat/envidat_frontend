<template>
  <v-container pa-0 style="position: relative;">
    <v-layout column>
        <v-sheet :height="height">
          <v-parallax :height="height" :src="img" style="opacity: 0.8; filter: blur(2px);" />
          <v-layout align-center justify-center fill-height
                    :style="`position: relative; top: -${ height }px; text-align: center;`" >
            <v-flex class="text" :class="{
                'display-3' : $vuetify.breakpoint.mdAndUp,
                'display-1' : $vuetify.breakpoint.smAndDown,
              }">
              {{ title }}
            </v-flex>
          </v-layout>
        </v-sheet>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'ImgAndTextLayout',
  props: {
    height: Number,
    title: String,
    img: String,
  },
};
</script>

<style scoped>
  .text {
    font-family: "Libre Baskerville", serif !important;
    letter-spacing: 0em !important;
    text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.7);
  }
</style>
