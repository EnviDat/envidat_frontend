<template>
  <v-card ripple
          hover
          @click.native="clicked" >
    <v-container grid-list-md
                  pa-0 >
      <v-layout row align-center >
        <v-flex xs5
                py-0 >
          <v-img class="imagezoom"
                  :height=" $vuetify.breakpoint.smAndDown ? '65px' : '100px' "
                  :src="img" />
        </v-flex>

        <v-flex xs7
          px-0 mt-1 >
          <div class="px-2 headline"
                :class="{ 'compactTitle' : this.$vuetify.breakpoint.smAndDown }" >
            {{ title }}
          </div>

          <div v-if="color"
                class="py-0 mr-1 my-0 "
                :style="`height: 5px; background-color: ${color}; margin-left: -5px;`" >
          </div>

        </v-flex>
      </v-layout>
    </v-container>

    <!-- <div v-if="color"
          class="py-0 my-0 "
          :style="`height: 5px; background-color: ${color};`" >
    </div> -->

  </v-card>
</template>


<script>
/**
 * BaseClickCard.vue creates a small card with a title and an image, it emits the
 * 'clicked' event with the title a parameter.
 *
 * @summary Card with title & img, emits a 'clicked' event
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-10-02 11:37:16
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

// un blurry zooming
// https://stackoverflow.com/questions/36143337/how-to-prevent-blur-from-css-transform

export default {
  props: {
    title: String,
    img: String,
    color: String,
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked', this.title.toLowerCase());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card .headline {
    font-size: 1.45em !important;
    overflow: inherit !important;
    text-overflow: inherit !important;
    max-height: inherit !important;
    line-height: inherit !important;
  }

  .compactTitle {
    font-size: 15px !important;
    line-height: 1.3em !important;
  }

  .v-card__media img {
    width: inherit !important;
  }
</style>
