<template>

  <v-container fluid fill-height pa-0>  

    <v-layout v-if="!leftAlign && !rightAlign"
              column>

      <v-flex >
        <title-img :parallax="parallax"
                  :dark="dark"
                  :blur="blur"
                  :img="img"
                  :height="height"
                  :title="title"
                  :subTitle="subTitle"/>
      </v-flex>

      <v-flex >
        <div :style="textFontSizeStyle">
          {{ text }}
        </div>
      </v-flex>

    </v-layout>

    <v-layout v-if="leftAlign"
              row wrap>

      <v-flex xs12 sm6 md4 >
        <title-img :parallax="parallax"
                  :dark="dark"
                  :blur="blur"
                  :img="img"
                  :height="height"
                  :title="title"
                  :subTitle="subTitle"/>
      </v-flex>

      <v-flex xs12 sm6 md8 >
        <div :style="textFontSizeStyle">
          {{ text }}
        </div>
      </v-flex>

    </v-layout>

    <v-layout v-if="rightAlign"
              row wrap>

      <v-flex xs12 sm6 md8 >
        <div :style="textFontSizeStyle">
          {{ text }}
        </div>
      </v-flex>

      <v-flex xs12 sm6 md4 >
        <title-img :parallax="parallax"
                  :dark="dark"
                  :blur="blur"
                  :img="img"
                  :height="height"
                  :title="title"
                  :subTitle="subTitle"/>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
  import TitleImg from '../Elements/TitleImg';

  export default {
    props: {
      height: Number,
      textFontSize: Number,
      title: String,
      subTitle: String,
      text: String,
      img: String,
      dark: Boolean,
      parallax: Boolean,
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
      TitleImg,
    },
  };
</script>

<style scoped>

</style>
