<template>
  <v-layout row
            wrap
            style="z-index: 0;" >

    <v-flex v-bind="firstColWidth" >

      <v-layout column>
        <slot name="leftColumn" />
      </v-layout>

    </v-flex>


    <v-flex v-if="secondColumn"
            v-bind="secondColWidth" >

      <v-layout column>
        <slot name="rightColumn" />
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
/**
 * TwoColumnLayout.vue creates a dynamically a responsive layout
 * either a two column or a single column layout.
 * The components are dynamically via slots so it's basically
 * handling css based on the screen size.
 *
 * @summary dynamic two column layout
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 15:53:08
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  components: {
  },
  props: {
    firstColumn: Array,
    secondColumn: Array,
    showPlaceholder: Boolean,
  },
  computed: {
    firstColWidth() {
      let bindings = {};
      const colWidth = this.secondColumn && this.secondColumn.length > 0 ? { xs6: true } : { xs12: true };

      bindings = Object.assign(bindings, this.leftOrFullWidth);
      bindings = Object.assign(bindings, colWidth);

      return bindings;
    },
    secondColWidth() {
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
    rightOrFullWidth() {
      return this.secondColumn && this.secondColumn.length > 0 ? this.halfWidthRight : this.fullWidthPadding;
    },
    fullwidthPadding() {
      const json = {};

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
    halfWidthLeft() {
      const json = {
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
    halfWidthRight() {
      const json = {
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
