<template>
  <v-container fluid >  
    <v-layout column >
  
      <v-flex py-2 xs6
        v-for="metadata in metadatasContent" :key="metadata.id">

        <a :href="gcdmLink(metadata)">
          {{ gcdmLink(metadata) }}
        </a>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { SET_APP_BACKGROUND } from '../../store/mutationsConsts';

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    computed: {
      ...mapGetters({
        metadatasContent: 'metadata/metadatasContent',
      }),
    },
    methods: {
      gcdmLink: function gcdmLink(metadata) {
        return `https://www.envidat.ch/dataset/${metadata.name}/export/gcmd_diff.xml`;
      },
    },
    data: () => ({
    }),
    components: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  
</style>
