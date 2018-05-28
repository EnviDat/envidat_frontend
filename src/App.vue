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
  import {
    GET_METADATA_IDS,
    /* GET_ALL_METADATA_SUCCESS,
    GET_ALL_METADATA_ERROR,
    SET_CURRENT_METADATA,
    SET_CURRENT_METADATA_SUCCESS,
    SET_CURRENT_METADATA_ERROR,
    ADD_METADATA,
    */
  } from './store/mutation_consts';

  export default {
    beforeCreate: function beforeCreate() {
      // alert('mounted from App.vue ' + this.$store.getters + ' ?' );
      this.$store.dispatch(`metadata/${GET_METADATA_IDS}`);
    },
    methods: {
      testStore: function testStore() {
        // alert('testStore ' + GET_ALL_METADATA + ' ' + this.$store);
        // this.$store.commit('metadata/randomMutation');
        this.$store.dispatch(`metadata/${GET_METADATA_IDS}`);
      },
    },
    computed: mapGetters({
      loading: 'metadata/loading',
      metadataIds: 'metadata/metadataIds',
      metadatasContent: 'metadata/metadatasContent',
      currentMetadata: 'metadata/currentMetadata',
    }),
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
    max-height: 2em;
    line-height: 1.1em !important;
  }

  .card .subheading{
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    /* color: #555; */
    opacity: 0.7;
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
