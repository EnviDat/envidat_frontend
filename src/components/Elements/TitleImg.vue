<template>

  <div :style="`height: ${ height }px;`">

    <!-- use slot for the content and make a component for only the layouting -->

    <v-parallax v-if="parallax"
                :height="height"
                :src="img"
                :dark="dark"
                :class="{ 'blur_parallax' : blur }"
                :style="blur ? 'opacity: 0.8' : ''"
    />

    <v-img v-if="!parallax"
            :height="height"
            :src="img"
            :dark="dark"
            :class="{ 'blur_parallax' : blur }"
            :style="blur ? 'opacity: 0.8' : ''"
    />

    <v-layout align-center
              column
              justify-center
              mx-2
              :style="`position: relative; top: -${ height * 0.5 }px; text-align: center;`"
    >

      <div style="background-color: white;">

      </div>

      <div class="envidatTitle mb-3"
          :class="{
            'black--text': dark,
            'white--text': !dark,
            'display-3' : $vuetify.breakpoint.mdAndUp, 
            'display-1' : $vuetify.breakpoint.smAndDown, 
          }"
      >
        {{ title }}
      </div>

      <div class="envidatTitle"
          :class="{
            'black--text': dark,
            'white--text': !dark,
            'headline' : $vuetify.breakpoint.mdAndUp, 
            'subheading' : $vuetify.breakpoint.smAndDown, 
          }"
      >
        {{ subTitle }}
      </div>

    </v-layout>

  </div>

</template>

<script>
  export default {
    props: {
      parallax: Boolean,
      height: Number,
      title: String,
      subTitle: String,
      img: String,
      dark: Boolean,
      blur: Boolean,
    },
  };
</script>

<style scoped>

  .blur_parallax {
    filter: blur(2px);
  }

</style>