
<template>
  <div :style="isSmall ? 'height: 28px;' : 'height: 36px;'"
        @mouseover="hoverBadge = true"
        @mouseleave="hoverBadge = false"
        @click.stop="clicked" >

    <v-tooltip v-bind="{ top: !toolTipBottom, bottom: toolTipBottom }"
              :disabled="$vuetify.breakpoint.smAndDown || !toolTipText" >

      <v-btn slot="activator"
            style="margin: 0 !important;"
            :icon="!isElevated"
            :fab="isElevated"
            :small="isSmall || isElevated"
            :outline="outlined && !isToggled"
            :color="color ? color : disabled ? '' : 'primary'"
            :href="url"
            :disabled="disabled"
            v-bind="{['target'] : '_blank' }"
            @click.stop="clicked" >

        <div v-if="customIcon"
              class="iconCentering" >

          <img class="envidatIcon"
              :src="customIcon" >
        </div>

        <v-icon v-if="materialIconName"
                :color="iconColor ? iconColor : 'primary'"
                :style="rotateOnClick && rotateToggle ? 'transform: rotate(-180deg);' : ''" >
          {{ materialIconName }}
        </v-icon>
      </v-btn>
      <span>{{ toolTipText }}</span>
    </v-tooltip>

    <div v-if="count > 0"
          style="position: relative; right: -7px; top: -25px;" >

      <v-badge overlap
              :style="(hoverBadge && $vuetify.breakpoint.smAndUp) || $vuetify.breakpoint.xsOnly ? 'right: 5px;' : ''"
              color="highlight"
              :class="{ envidatBadgeBigNumber : count > 9,
                        envidatBadge: count <= 9 }" >
        <span slot="badge"
              class="black--text" >
          {{ count }}
        </span>
      </v-badge>
    </div>
  </div>
</template>

<script>
/**
 * BaseIconButton.vue creates a round button with an icon, either a custom icon or a material (material design libery) icon.
 * Similar to @class RectangleButton
 * React on the 'clicked' event or pass an @prop url to create a href-link.
 *
 * Fill the @prop toolTipText for a toolTip when hovering over the Button.
 * Use the @prop toolTipBottom to set it to appear beneath the button.
 *
 * When the @prop isToggled is true the background is filled with the @prop color.
 * If @prop outlined is true the button only has an outline in the @prop color,
 * it'sonly visible when @prop isToggled is false.
 * The @prop iconColor only works for material icons.
 *
 * Set the @prop rotateOnClick to true for the icon to rotate 180° once clicked
 * works together with the @prop isToggled
 *
 * If @prop count is > 0 a little Circle with the number is appear in the bottom left of the icon Button.
 *
 * The @prop isElevated creates a FAB button with high elevation (box-shadows) if true.
 *
 * When @prop disabled is true clicks won't do anything.
 *
 * @summary a clickable icon button which emits 'clicked' event
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:32:12
 * Last modified  : 2019-10-23 14:04:41
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export default {
  props: {
    customIcon: String,
    materialIconName: String,
    toolTipText: String,
    toolTipBottom: Boolean,
    outlined: Boolean,
    color: String,
    iconColor: String,
    isToggled: Boolean,
    isSmall: Boolean,
    rotateOnClick: Boolean,
    rotateToggle: Boolean,
    url: String,
    isElevated: Boolean,
    disabled: Boolean,
    count: Number,
    marginClass: String,
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    hoverBadge: false,
  }),
  methods: {
    /**
     * @description emits 'clicked' event
     */
    clicked: function clicked() {
      this.$emit('clicked');
    },
  },
};

</script>
