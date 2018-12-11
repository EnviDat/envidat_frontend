<template>

  <!-- <v-card> -->

    <v-container fluid fill-height pa-0>  

      <v-layout v-if="!leftAlign && !rightAlign"
                column>

        <v-flex >

          <parallax-title-img :dark="dark"
                              :blur="blur"
                              :img="img"
                              :height="height"
                              :title="title"
                              :subTitle="subTitle"/>

        </v-flex>

        <v-flex >
          <v-card-text :style="textFontSizeStyle">
            {{ text }}
          </v-card-text>
        </v-flex>

      </v-layout>

      <v-layout v-if="leftAlign"
                row wrap>

        <v-flex xs12 sm6 md4 >

          <parallax-title-img :dark="dark"
                              :blur="blur"
                              :img="img"
                              :height="height"
                              :title="title"
                              :subTitle="subTitle"/>

        </v-flex>

        <v-flex xs12 sm6 md8 >

          <v-card-text :style="textFontSizeStyle">
            {{ text }}
          </v-card-text>

        </v-flex>

      </v-layout>

      <v-layout v-if="rightAlign"
                row wrap>

        <v-flex xs12 sm6 md8 >

          <v-card-text :style="textFontSizeStyle">
            {{ text }}
          </v-card-text>

        </v-flex>

        <v-flex xs12 sm6 md4 >

          <parallax-title-img :dark="dark"
                              :blur="blur"
                              :img="img"
                              :height="height"
                              :title="title"
                              :subTitle="subTitle"/>

        </v-flex>

      </v-layout>

    </v-container>

  <!-- </v-card> -->

</template>

<script>
  import ParallaxTitleImg from '../ParallaxTitleImg';

  export default {
    props: {
      height: Number,
      textFontSize: Number,
      title: String,
      subTitle: String,
      text: String,
      img: String,
      dark: Boolean,
      blur: Boolean,
      leftAlign: Boolean,
      rightAlign: Boolean,
    },
    computed: {
      textFontSizeStyle: function textFontSizeStyle() {
        return this.textFontSize ? `font-size: ${this.textFontSize}px !important;` : '';
      },
    },
    components: {
      ParallaxTitleImg,
    },
  };
</script>

<style scoped>

</style>
