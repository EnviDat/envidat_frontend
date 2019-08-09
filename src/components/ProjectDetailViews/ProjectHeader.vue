<template>
  <v-card :height="height"
          :class="{
            'pa-4': $vuetify.breakpoint.smAndUp,
            'pa-3': $vuetify.breakpoint.xsOnly,
          }"
          :dark="dark"
          :color="showPlaceholder ? 'primary' : 'white'" >
          <!-- v-bind="{['style'] : dynamicCardBackground }" > -->

    <base-icon-button style="position: absolute; top: 0px; right: 0px; z-index: 2;"
                      material-icon-name="close"
                      icon-color="primary"
                      color="primary"
                      outlined
                      tool-tip-text="Close Project Detail"
                      :tool-tip-bottom="true"
                      @clicked="catchBackClicked" />


  <!-- <v-layout row
            style="background-color: white;"
            class="fullWidthImg elevation-2"
  >
    <v-flex xs6>
      <v-img height="100%" cover :src="titleImage.src" />
    </v-flex>


    <v-flex xs6 px-2 pt-4>
      <div class="headline mb-0"
            :class="this.dark ? 'white--text' : 'black--text'"
      >
        {{ title }}
      </div>
    </v-flex>

  </v-layout> -->

    <div v-if="title"
          :style="`position: absolute; top: 0px; right: 0px;
                  height: ${height}px; width: 100%;
                  z-index: 1;`"
          class="headerTitle pa-3"
          :class="{ 'display-2': $vuetify.breakpoint.lgAndUp,
                    'display-1': $vuetify.breakpoint.mdAndDown,
                    'headline': $vuetify.breakpoint.smAndDown,
          }" >
      {{ title }}
    </div>

    <div v-bind="{['style'] : dynamicCardBackground }" >

    </div>

    <div
      v-if="!title && showPlaceholder"
      class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer"
    >
      <div class="bone bone-type-multiline bone-style-steps" />
    </div>

  </v-card>
</template>

<script>
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    BaseIconLabelView,
    BaseIconButton,
  },
  props: {
    title: String,
    titleImg: String,
    defaultImg: String,
    showPlaceholder: Boolean,
  },
  computed: {
    titleImage() {
      let img = new Image();
      let imgSrc = this.defaultImg;

      if (this.titleImg) {
        imgSrc = this.titleImg;
        if (!imgSrc.includes('http')) {
          imgSrc = `https://www.envidat.ch/uploads/group/${imgSrc}`
        }
      }

      img.src = imgSrc;
      // img.onload = this.setHeightAndWidth;

      return img;
    },
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.titleImage) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.titleImage.src});
        background-position: center, center; background-size: cover;
        background-repeat: initial;
        
        position: absolute; top: 0px; right: 0px;
        height: ${this.height}px; width: 100%;`;
      }

      return '';
    },
  },
  methods: {
    catchBackClicked: function catchBackClicked() {
      this.$emit('clickedBack');
    },
  },
  data: () => ({
    height: 150,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
  }),
};
</script>

<style scoped>

  .headerTitle {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 400;
    opacity: 1;
  }

</style>
