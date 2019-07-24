<template>
  <v-card
    hover
    raised
  >
    <v-layout
      row
      align-center
    >
      <v-flex
        xs8
        sm9
        pl-2
      >
        <v-text-field
          v-model="searchText"
          hide-details
          full-width
          solo
          flat
          prepend-icon="search"
          :label="labelText"
          @click:prepend="clicked"
          @keyup.enter="clicked"
        />
      </v-flex>
    </v-layout>

    <v-card-actions
      v-if="hasButton"
      class="ma-0 pa-2"
      style="position: absolute; bottom: 0; right: 0;"
    >
      <base-rectangle-button
        :button-text="buttonText"
        :is-small="true"
        @clicked="clicked"
      />

    </v-card-actions>
  </v-card>
</template>

<script>
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
  updated: function updated() {
    if (!this.searchText) {
      this.$emit('searchEmpty');
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked', this.searchText);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
