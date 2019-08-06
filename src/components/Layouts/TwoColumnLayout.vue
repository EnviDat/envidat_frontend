<template>
  <v-layout
    row
    wrap
    style="z-index: 0;"
  >
    <v-flex
      v-bind="firstColWidth"
    >
      <v-layout column>
        <slot name="leftColumn" />
      </v-layout>
    </v-flex>


    <v-flex
      v-if="secondColumn"
      v-bind="secondColWidth"
    >
      <v-layout column>
        <slot name="rightColumn" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
  },
  props: {
    firstColumn: Array,
    secondColumn: Array,
    showPlaceholder: Boolean,
  },
  computed: {
    firstColWidth: function firstColWidth() {
      let bindings = {};
      const colWidth = this.secondColumn && this.secondColumn.length > 0 ? { xs6: true } : { xs12: true };

      bindings = Object.assign(bindings, this.leftOrFullWidth);
      bindings = Object.assign(bindings, colWidth);

      return bindings;
    },
    secondColWidth: function secondColWidth() {
      let bindings = {};
      const colWidth = this.secondColumn && this.secondColumn.length > 0 ? { xs6: true } : {};

      bindings = Object.assign(bindings, this.rightOrFullWidth);
      bindings = Object.assign(bindings, colWidth);

      return bindings;
    },
    textFontSizeStyle: function textFontSizeStyle() {
      return this.textFontSize ? `font-size: ${this.textFontSize}px !important;` : '';
    },
    leftOrFullWidth: function leftOrFullWidth() {
      return this.firstColumn && this.firstColumn.length > 0 ? this.halfWidthLeft : this.fullWidthPadding;
    },
    /**
       * @returns {Boolean}
       */
    rightOrFullWidth: function rightOrFullWidth() {
      return this.secondColumn && this.secondColumn.length > 0 ? this.halfWidthRight : this.fullWidthPadding;
    },
    fullWidthPadding: function fullwidthPadding() {
      const json = {
        // xl10: true,
        // 'offset-xl2': true,
      };

      if (this.$vuetify.breakpoint.xsOnly) {
        json['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        json['px-2'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        json['px-3'] = true;
      }

      return json;
    },
    halfWidthLeft: function halfWidthLeft() {
      const json = {
        // xl4: true,
        // 'offset-xl2': true,
        lg5: true,
        'offset-lg1': true,
      };

      if (this.$vuetify.breakpoint.xsOnly) {
        json['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        json['pl-2'] = true;
        json['pr-1'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        json['pl-3'] = true;
        json['pr-1'] = true;
      }

      return json;
    },
    /**
       * @description
       * @returns {any}
       */
    halfWidthRight: function halfWidthRight() {
      const json = {
        // xl4: true,
        lg5: true,
      };

      if (this.$vuetify.breakpoint.xsOnly) {
        json['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        json['pl-1'] = true;
        json['pr-2'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        json['pl-1'] = true;
        json['pr-3'] = true;
      }

      return json;
    },
  },
  updated() {
    this.$children.forEach((child) => {
      child.$forceUpdate();
    });
  },
};
</script>

<style scoped>

</style>
