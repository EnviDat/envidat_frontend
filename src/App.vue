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
  import {
    LOAD_ALL_METADATA,
    LOAD_ALL_TAGS,
    LOAD_POPULAR_TAGS,
  } from './store/metadataMutationsConsts';
  import { ADD_CARD_IMAGES } from './store/mutationsConsts';

  export default {
    created: function created() {
      this.loadAllMetadata();
      this.loadAllTags();
      this.loadPopularTags();

      const bgImgs = require.context('./assets/', false, /\.jpg$/);
      this.appBGImages = this.importImages(bgImgs, 'app_b');

      this.importCardBackgrounds();

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
      loadPopularTags: function loadPopularTags() {
        if (!this.loadingPopularTags && this.popularTags.lengt <= 0) {
          this.$store.dispatch(`metadata/${LOAD_POPULAR_TAGS}`);
        }
      },
      importCardBackgrounds: function importCardBackgrounds(){
        let imgPaths = require.context('./assets/cards/landscape/', false, /\.jpg$/);
        let images = this.importImages(imgPaths);
        this.$store.commit(ADD_CARD_IMAGES, {key: 'landscape', value: images});

        imgPaths = require.context('./assets/cards/forest/', false, /\.jpg$/);
        images = this.importImages(imgPaths);        
        this.$store.commit(ADD_CARD_IMAGES, {key: 'forest', value: images});

        imgPaths = require.context('./assets/cards/snow/', false, /\.jpg$/);
        images = this.importImages(imgPaths);        
        this.$store.commit(ADD_CARD_IMAGES, {key: 'snow', value: images});

        imgPaths = require.context('./assets/cards/diversity/', false, /\.jpg$/);
        images = this.importImages(imgPaths);        
        this.$store.commit(ADD_CARD_IMAGES, {key: 'diversity', value: images});

        imgPaths = require.context('./assets/cards/hazard/', false, /\.jpg$/);
        images = this.importImages(imgPaths);        
        this.$store.commit(ADD_CARD_IMAGES, {key: 'hazard', value: images});
      },
      importImages: function importImages(imgs, checkForString){
        let imgCache = {};
        // console.log("importImages " + imgs.keys().length);

        imgs.keys().forEach(key => {
          if (!checkForString ||(checkForString && key.includes(checkForString))){
            imgCache[key] = imgs(key);
            //console.log(key + " -> " + imgCache[key]);
          }
        });

        return imgCache;

        /*
        const imports = {};
        const pic = imgs('./c_b_snow.jpg');
        console.log("pic " + pic);

        this.images.forEach(element => {
          var imgImport = require(`../../../assets/cards/${element}`);
          console.log("imgImport " + imgImport);
          imports[element] = imgImport;
        });

        return imports;
        */
      }      
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        currentMetadata: 'metadata/currentMetadata',
        allTags: 'metadata/allTags',
        loadingAllTags: 'metadata/loadingAllTags',
        popularTags: 'metadata/popularTags',
        loadingPopularTags: 'metadata/loadingPopularTags',
        appBGImage: 'appBGImage',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      dynamicBackground: function dynamicBackground(){
        const imageKey = this.appBGImage;
        const bgImg = this.appBGImages[imageKey];
        // console.log(imageKey + " bgImg " + bgImg);
        let bgStyle = '';

        if (bgImg){
          bgStyle = 'background-image: url(' + bgImg  + ') !important;';
        }

        if (bgImg.includes('browsepage')){
          bgStyle = 'background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.7) 100%), ' +
                    ' url(' + bgImg  + ') !important;'
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



  .card .card__media {
    background: #00695c; /* Old Browsers */
    background: -webkit-linear-gradient(top,#00695c,#00897b); /*Safari 5.1-6*/
    background: -o-linear-gradient(top,#00695c,#00897b); /*Opera 11.1-12*/
    background: -moz-linear-gradient(top,#00695c,#00897b); /*Fx 3.6-15*/
    background: linear-gradient(to bottom, #00695c, #00897b); /*Standard*/
  }

  .card .headline {
    font-family: 'Karma', serif;
    /* font-weight: 700; */

    overflow: hidden;
    text-overflow: ellipsis;    
    max-height: 2.15em;
    line-height: 1.1em !important;
  }

  .card .subheading{
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    /* color: #555; */
    opacity: 0.75;
  }

  .imagezoom,
  .imagezoom img {
    transition: all .2s;
  }

  .imagezoom img:hover,
  .imagezoom img:focus {
    transform: scale(1.2);
  }
  
</style>
