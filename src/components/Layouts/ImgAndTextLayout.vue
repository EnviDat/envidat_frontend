<template>
  <v-container class="pa-0" style="position: relative;">
    <v-row column>
        <v-sheet :height="height">

          <v-parallax :height="height" :src="img" style="opacity: 0.8; filter: blur(2px);" />

          <v-row class="fill-height" align="center" justify="center" 
                    :style="`position: relative; top: -${height }px; text-align: center;`" >
            <v-col class="text"
                    :class="{ 'display-3' : $vuetify.breakpoint.mdAndUp,
                              'display-1' : $vuetify.breakpoint.smAndDown, }">
              {{ title }}
            </v-col>
          </v-row>
        </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
/**
 * TagChipPlaceholder.vue is a placeholder to show the placement any tag while the page is loading.
 *
 * @summary placeholder for tags
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-20 14:05:26
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

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
