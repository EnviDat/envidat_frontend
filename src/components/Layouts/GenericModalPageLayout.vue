<template>
  <v-dialog v-model="showDialog"
            transition="dialog-bottom-transition"
            scrollable
            persistent >

    <v-card class="pa-0 ml-15">
      
      <v-toolbar flat
                  dark
                  color="primary" >

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon
                @click="closeClicked" >
          <v-icon dark >
            close
          </v-icon>
        </v-btn>

      </v-toolbar>

      <v-card-text class="py-0 px-4">
        
        <slot name="default" />

      </v-card-text>
    </v-card>

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
    title: String,
    open: Boolean,
  },
  mounted() {
    this.showDialog = this.open;
  },
  watch: {
    open() {
      if (this.open) {
        this.showDialog = true;
      }
    },
  },
  methods: {
    closeClicked() {
      this.showDialog = false;
      this.$emit('modalClosed');
    },
  },
  data: () => ({
    showDialog: false,
  }),
};
</script>
