<template>
  <v-app id="inspire"
        v-bind:style="dynamicBackground">

    <!--v-btn fab top left color="success" @click="testStore" >Test</v-btn>

    <v-icon v-if="loading" color="warning">autorenew</v-icon-->

    <v-content>
      <router-view/>
    </v-content>
        
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import '../node_modules/skeleton-placeholder/dist/bone.min.css';
  import {
    LOAD_ALL_METADATA,
    LOAD_ALL_TAGS,
    LOAD_METADATA_CONTENT_BY_ID,
  } from './store/metadataMutationsConsts';
  import {
    ADD_CARD_IMAGES,
    ADD_ICON_IMAGE,
  } from './store/mutationsConsts';

  export default {
    created: function created() {
      const metadataId = this.$route.params.metadataid;

      if (metadataId && !this.loadingCurrentMetadataContent) {
        this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, metadataId);
      } else {
        this.loadAllMetadata();
      }
      this.loadAllTags();

      const bgImgs = require.context('./assets/', false, /\.jpg$/);
      this.appBGImages = this.importImages(bgImgs, 'app_b');

      this.importCardBackgrounds();
      this.importIcons();

      // const values = Object.values(this.imagesImports);
      // values.forEach(element => {
      //   console.log("value " + element);
      // });
    },
    methods: {
      loadAllMetadata: function loadAllMetadata() {
        if (!this.loadingMetadatasContent && this.metadatasContentSize <= 0) {
          this.$store.dispatch(`metadata/${LOAD_ALL_METADATA}`);
        }
      },
      loadAllTags: function loadAllTags() {
        if (!this.loadingAllTags && this.allTags.length <= 0) {
          this.$store.dispatch(`metadata/${LOAD_ALL_TAGS}`);
        }
      },
      importCardBackgrounds: function importCardBackgrounds() {
        let imgPaths = require.context('./assets/cards/landscape/', false, /\.jpg$/);
        let images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, { key: 'landscape', value: images });

        imgPaths = require.context('./assets/cards/forest/', false, /\.jpg$/);
        images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, { key: 'forest', value: images });

        imgPaths = require.context('./assets/cards/snow/', false, /\.jpg$/);
        images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, { key: 'snow', value: images });

        imgPaths = require.context('./assets/cards/diversity/', false, /\.jpg$/);
        images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, { key: 'diversity', value: images });

        imgPaths = require.context('./assets/cards/hazard/', false, /\.jpg$/);
        images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, { key: 'hazard', value: images });
      },
      importIcons: function importIcons() {
        const imgPaths = require.context('./assets/icons/', false, /\.png$/);
        const images = this.importImages(imgPaths);

        const keys = Object.keys(images);
        keys.forEach((key) => {
          // console.log('icon ' + key + ' value ' + images[key]);
          this.$store.commit(ADD_ICON_IMAGE, { key, value: images[key] });
        });
      },
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        loadingCurrentMetadataContent: 'metadata/loadingCurrentMetadataContent',
        currentMetadataContent: 'metadata/currentMetadataContent',
        allTags: 'metadata/allTags',
        loadingAllTags: 'metadata/loadingAllTags',
        popularTags: 'metadata/popularTags',
        loadingPopularTags: 'metadata/loadingPopularTags',
        appBGImage: 'appBGImage',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      dynamicBackground: function dynamicBackground() {
        const imageKey = this.appBGImage;
        const bgImg = this.appBGImages[imageKey];
        // console.log(imageKey + " bgImg " + bgImg);
        let bgStyle = '';

        if (bgImg) {
          bgStyle = `background-image: url(${bgImg}) !important;`;
        }

        if (bgImg.includes('browsepage')) {
          bgStyle = `background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.7) 100%), url(${bgImg}) !important;`;
        }

        return bgStyle;
      },
    },
    data: () => ({
      appBGImages: {},
    }),
    props: {
      source: String,
    },
  };
</script>

<style>

  @import '../node_modules/leaflet/dist/leaflet.css';
  /* import vuetify.css here to be able to overwrite the fonts */
  @import '../node_modules/vuetify/dist/vuetify.min.css';

/* overrite the applications background https://css-tricks.com/use-cases-fixed-backgrounds-css/ */
  .application {
    /* font-family: 'Libre Baskerville', serif !important; */
    font-family: 'Raleway', sans-serif !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
  }  

  /*** General Card styles ***/

  .headline {
    font-family: 'Libre Baskerville', serif !important;
    /* font-weight: 700; */

    /*
    overflow: hidden;
    text-overflow: ellipsis;    
    max-height: 2.15em;
    */
    line-height: 1.2em !important;
  }


  .block-with-text {
    font-family: 'Libre Baskerville', serif !important;
    
    /* styles for '...' */ 
    /* hide text if it more than N lines  */
    overflow: hidden;
    /* for set '...' in absolute position */
    position: relative; 
    /* use this value to count block height */
    line-height: 1.2em !important;
    /* max-height = line-height (1.2) * lines max number (3) */
    max-height: 6.7em; 
    /* fix problem when last visible word doesn't adjoin right side  */
    text-align: justify;  
    /* place for '...' */
    margin-right: -1em;
    padding-right: 1em;
  }
  /* create the ... */
  .block-with-text:before {
    /* points in the end */
    content: '...';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of block */
    right: 0;
    bottom: 0;
  }
  /* hide ... if we have text, which is less than or equal to max lines */
  .block-with-text:after {
    /* points in the end */
    content: '';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of text */
    right: 0;
    /* set width and height */
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    /* bg color = bg color under block */
    background: white;
  }

  .card .subheading{
    /* font-family: 'Libre Baskerville', serif; */
    font-weight: 400;
    /* color: #555; */
    opacity: 0.75;
    line-height: 1.25em;
  }

  .imagezoom,
  .imagezoom img {
    transition: all .2s;
  }

  .imagezoom img:hover,
  .imagezoom img:focus {
    transform: scale(1.2);
  }

  .envidatIcon {
    height: 24px !important;
    width: 24px !important;
  }

  .metadataInfoIcon {
    opacity: 0.75;
  }

</style>
