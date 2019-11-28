<template>
  <v-layout row ma-0 pa-0 >
    <v-tooltip bottom
                :disabled="$vuetify.breakpoint.xsOnly || !iconTooltip" >

      <div slot="activator" class="layout row align-center">
        <div v-if="icon && iconTooltip"
              :class="alignClass"
              class="iconCentering"
              style="position: relative: top: 2px; max-width: 100%" >

          <img class="envidatIcon"
                :class="compactLayout ? 'small' : ''"
                :src="icon" >
        </div>

        <v-flex v-if="icon && !iconTooltip"
                xs2
                pr-2
                style="max-width: 100%" >
          <div class="iconCentering">
            <img class="envidatIcon"
                  :class="compactLayout ? 'small' : ''"
                  :src="icon" >
          </div>
        </v-flex>

        <v-flex v-if="label"
                xs4
                :style="textStyle" >
          {{ label }}
        </v-flex>

        <v-flex v-if="text && !url"
                :style="textStyle" >
          {{ text }}
        </v-flex>

        <v-flex v-if="url"
                :style="textStyle" >
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ text ? text : url }}</a>
        </v-flex>

        <v-flex v-if="!text && usePlaceholder">
          <div class="pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
            <div class="bone bone-type-text bone-style-steps" />
          </div>
        </v-flex>
      </div>

      <span>{{ iconTooltip }}</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
/**
 * BaseIconLabelView.vue creates a field with a label (text or icon) with the given
 * text as well a tooltip.
 *
 * @summary icon as label and text or text as label and text
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-28 16:15:58
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export default {
  name: 'BaseIconLabelView',
  props: {
    icon: String,
    iconTooltip: String,
    label: String,
    text: String,
    url: String,
    alignLeft: Boolean,
    bold: Boolean,
    usePlaceholder: Boolean,
    wordBreak: Boolean,
    compactLayout: Boolean,
  },
  computed: {
      /**
       * TODO Sehr schwer verstädnlich was das macht
       */
    alignClass() {
      return {
        flex: !this.alignLeft,
        xs3: !this.alignLeft,
        md2: !this.alignLeft,
        'pr-3': this.alignLeft,
        'pl-1': this.alignLeft,
        'py-0': true,
      };
    },
    textStyle() {
      let style = '';

      if (this.bold) {
        style = 'font-weight: 700 !important;';
      }

      if (this.wordBreak) {
        style += 'word-break: break-all;';
      }

      if (this.$vuetify.breakpoint.smAndDown) {
        style += 'font-size: 0.85rem;';
      }

      return style;
    },
  },
};
</script>

<style>
.iconCentering {
  position: relative;
  top: 2px;
}
</style>
