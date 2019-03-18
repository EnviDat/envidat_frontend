<template>
  <div @mouseover="hoverBadge = true" @mouseleave="hoverBadge = false"
      @click.stop="clicked"
      style="height: 36px;"
  >
    <v-tooltip v-bind="{ top: !toolTipBottom, bottom: toolTipBottom }" >

      <v-btn :icon="!isElevated"
              :fab="isElevated"
              :small="isElevated"
              :outline="outlined && !isToggled"
              :color="color ? color : disabled ? '' : 'primary'"
              :href="url"
              :disabled="disabled"
              @click.stop="clicked" slot="activator"
              v-bind="{['target'] : '_blank' }">

          <div class="iconCentering"
                v-if="customIcon">
              <img class="envidatIcon" :src="customIcon" />
          </div>

          <v-icon v-if="materialIconName"
                  :color="iconColor ? iconColor : 'primary'"
                  :style="rotateOnClick && isToggled ? 'transform: rotate(-180deg);' : ''"
          >
              {{ materialIconName }}
          </v-icon>


      </v-btn>
      <span>{{ toolTipText }}</span>

    </v-tooltip>

    <div v-if="count > 0"
          style="position: relative; right: -5px; top: -25px;">

      <v-badge v-bind="{ left: !hoverBadge }"
              overlap
              color="highlight"
              :class="{ envidatBadgeBigNumber : count > 9,
                        envidatBadge: count <= 9 }"
              >
        <span slot="badge" class="black--text">{{ count }}</span>
      </v-badge>              
    </div>
  </div>      
</template>

<script>
/**
 * A round button with an icon, either a custom icon or a material (material design libery) icon.
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
    rotateOnClick: Boolean,
    url: String,
    isElevated: Boolean,
    disabled: Boolean,
    count: Number,
  },
  methods: {
    /**
     * @description emits 'clicked' event
     */
    clicked: function clicked() {
      this.$emit('clicked');
    },
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    hoverBadge: false,
  }),
};

</script>