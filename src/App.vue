<template>
  <v-app id="inspire"
        v-bind:style="'background-image: url(' + this.backgroundImg + ') !important;'">

    <!--v-btn fab top left color="success" @click="testStore" >Test</v-btn>

    <v-icon v-if="loading" color="warning">autorenew</v-icon-->

    <v-content>
      <router-view/>
    </v-content>
        
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import backgroundImg from '@/assets/landingpage/landing_lowres.jpg';
  import { LOAD_ALL_METADATA } from './store/mutation_consts';

  export default {
    created: function created() {
      this.loadAllMetadata();
    },
    methods: {
      loadAllMetadata: function loadAllMetadata() {
        if (!this.loadingMetadatasContent && this.metadatasContentSize <= 0) {
          this.$store.dispatch(`metadata/${LOAD_ALL_METADATA}`);
        }
      },
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        currentMetadata: 'metadata/currentMetadata',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
    },
    data: () => ({
      backgroundImg,
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
