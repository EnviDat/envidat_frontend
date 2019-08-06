<template>
  <v-card
    hover
    raised
  >
    <v-layout
      row
      align-center
      justify-space-between
    >
      <v-flex
        grow
        pl-2
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
      </v-flex>

      <v-flex
        shrink
        pl-2
      >
        <base-rectangle-button
          :button-text="buttonText"
          :is-small="true"
          @clicked="clicked"
        />
      </v-flex>

    </v-layout>

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
.adjustIconSearchbar > .v-input__prepend-outer {
  margin-top: 16px !important;
}
</style>
