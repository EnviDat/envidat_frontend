<template>
  <v-app id="inspire" >

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
      /*
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ]
      */
    }),
    props: {
      source: String,
    },
  };
</script>

<style scoped >
  .application {
    font-family: 'Raleway', sans-serif;
  }

/*
  .application h1,
  .application h2 {
      font-family: 'Karma', serif;
  }
*/

</style>
