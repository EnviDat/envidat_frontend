<template>
    <v-tooltip bottom 
                :disabled="$vuetify.breakpoint.xsOnly"
                >

      <v-btn :small="isSmall"
              :class="marginClass"
              :outline="isOutlined"
              :flat="isFlat"
              :color="color ? color : 'primary'"
              :disabled="disabled"
              :href="url"
              @click.native="clicked" slot="activator"
              v-bind="{['target'] : '_blank' }"
      >
        <div v-if="customIcon" class="iconCentering">
          <img class="envidatIcon" :src="customIcon" />
        </div>

        <v-icon v-if="materialIconName"
                :color="iconColor ? iconColor : 'primary'"
        >
          {{ materialIconName }}
        </v-icon>

        {{ buttonText }}

      </v-btn>
      
      <span>{{ toolTipText }}</span>

  </v-tooltip>
</template>

<script>
/**
 * A rectangle button with an icon, either a custom icon or a material (material design libery) icon.
 * Similar to @class IconButton
 * React on the 'clicked' event or pass an @prop url to create a href-link.
 *
 * Use the @prop isSmall to make a 
 * Fill the @prop toolTipText for a toolTip when hovering over the Button.
 * 
 * If @prop outlined is true the button only has an outline in the @prop color.
 * Otherwise the whole button as that color.
 * The @prop iconColor only works for material icons.
 * 
 * Set the @prop rotateOnClick to true for the icon to rotate 180° once clicked
 * works together with the @prop isToggled
 * 
 * Use @prop marginClass to apply any css-class to the button
 * 
 * When @prop disabled is true clicks won't do anything.
 */

export default {
  props: {
    customIcon: String,
    materialIconName: String,
    buttonText: String,
    toolTipText: String,
    isOutlined: Boolean,
    isFlat: Boolean,
    color: String,
    iconColor: String,
    isSmall: Boolean,
    url: String,
    marginClass: String,
    disabled: Boolean,
  },
  methods: {
    /**
     * @description emits the 'clicked' event
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
  }),
};

</script>