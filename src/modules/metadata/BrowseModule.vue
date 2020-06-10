<template>
  <article class="ma-0 pa-0 fill-height">

  </article>
</template>

<script>
/**
 * The browse Module can be a next step for refactoring the metadata / browse module
 * 
 * @summary browse page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-14 18:11:43
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

// import { mapGetters } from 'vuex';
// import {
//   BROWSE_PAGENAME,
//   BROWSE_PATH,
// } from '@/router/routeConsts';
// import {
//   SEARCH_METADATA,
//   CLEAR_SEARCH_METADATA,
//   FILTER_METADATA,
//   METADATA_NAMESPACE,
//   LISTCONTROL_LIST_ACTIVE,
//   LISTCONTROL_MAP_ACTIVE,
//   LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
// } from '@/store/metadataMutationsConsts';
// import {
//   SET_APP_BACKGROUND,
//   SET_CURRENT_PAGE,
//   SET_BROWSE_SCROLL_POSITION,
// } from '@/store/mainMutationsConsts';


export default {
  name: 'BrowseModule',
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.commit(SET_CURRENT_PAGE, BROWSE_PAGENAME);
  //     vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
  //   });
  // },
  mounted() {
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  components: {
  },
  data: () => ({
  }),
};
</script>


<style scoped>

  .stickyFilterBar {
    position: -webkit-sticky;
    position: sticky;
    top: 50px;
    z-index: 1000;
  }

</style>
