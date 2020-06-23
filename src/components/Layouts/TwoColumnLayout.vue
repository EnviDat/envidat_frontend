<template>
  <v-row style="z-index: 0;" >

    <v-col :class="firstColWidth"
            class="pt-0"
            cols="6" >
      <slot name="leftColumn" />
    </v-col>

    <v-col v-if="secondColumn"
            class="pt-0"
            :class="secondColWidth"
            cols="6" >
      <slot name="rightColumn" />
    </v-col>
  </v-row>
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
    textFontSizeStyle() {
      return this.textFontSize ? `font-size: ${this.textFontSize}px !important;` : '';
    },
    leftOrFullWidth() {
      return this.firstColumn && this.firstColumn.length > 0 ? this.halfWidthLeft : this.fullWidthPadding;
    },
    rightOrFullWidth() {
      return this.secondColumn && this.secondColumn.length > 0 ? this.halfWidthRight : this.fullWidthPadding;
    },
    fullwidthPadding() {
      const cssClasses = {};

      if (this.$vuetify.breakpoint.xsOnly) {
        cssClasses['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        cssClasses['px-2'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        cssClasses['px-3'] = true;
      }

      return cssClasses;
    },
    halfWidthLeft() {
      const cssClasses = {
        'col-lg-5': true,
        'offset-lg-1': true,
      };

      if (this.$vuetify.breakpoint.xsOnly) {
        cssClasses['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        cssClasses['pl-2'] = true;
        cssClasses['pr-1'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        cssClasses['pl-3'] = true;
        cssClasses['pr-1'] = true;
      }

      return cssClasses;
    },
    halfWidthRight() {
      const cssClasses = {
        'col-lg-5': true,
      };

      if (this.$vuetify.breakpoint.xsOnly) {
        cssClasses['px-1'] = true;
      } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
        cssClasses['pl-1'] = true;
        cssClasses['pr-2'] = true;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        cssClasses['pl-1'] = true;
        cssClasses['pr-3'] = true;
      }

      return cssClasses;
    },
  },
  updated() {
    this.$children.forEach((child) => {
      child.$forceUpdate();
    });
  },
};
</script>
