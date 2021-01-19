<template>
  <v-dialog v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable >

    <slot name="filterKeywords" />

  </v-dialog>
</template>

<script>
/**
 * GenericModalPageLayout.vue renders a list of markdown objects
 *
 * @summary renders a list of markdown objects
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:54:16
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  components: {
  },
  props: {
  },
  methods: {
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
