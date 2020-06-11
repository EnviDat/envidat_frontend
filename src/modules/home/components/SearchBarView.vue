<template>
  <v-card
    hover
    raised
  >
    <v-row
      
      align="center"
      justify="space-between"
    >
      <v-col class="grow pl-2"
        
        
      >
        <v-text-field
          class="adjustIconSearchbar"
          v-model="searchText"
          hide-details
          full-width
          prepend-icon="search"
          :label="labelText"
          @click:prepend="clicked"
          @keyup.enter="clicked"
        />
      </v-col>

      <v-col class="shrink pl-2"
        
        
      >
        <base-rectangle-button
          :button-text="buttonText"
          :is-small="true"
          @clicked="clicked"
        />
      </v-col>

    </v-row>

  </v-card>
</template>

<script>
/**
 * SearchBarView.vue is a broad search bar to jump to the browsepage.
 *
 * @summary textfield with icon and button
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-10-23 14:52:28
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  components: {
    BaseRectangleButton,
  },
  props: {
    labelText: String,
    buttonText: String,
    hasButton: Boolean,
  },
  data: () => ({
    searchText: '',
  }),
  updated() {
    if (!this.searchText) {
      this.$emit('searchEmpty');
    }
  },
  methods: {
    clicked() {
      this.$emit('clicked', this.searchText);
    },
  },
};
</script>

<style>
.adjustIconSearchbar > .v-input__prepend-outer {
  margin-top: 16px !important;
}
</style>
