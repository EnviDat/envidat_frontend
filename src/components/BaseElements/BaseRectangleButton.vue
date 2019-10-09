<template>
  <v-tooltip bottom :disabled="$vuetify.breakpoint.xsOnly || tooltipText === ''">
    <v-btn
      slot="activator"
      :small="isSmall"
      :class="marginClass"
      :outline="isOutlined"
      :flat="isFlat"
      :color="color"
      :disabled="disabled"
      :href="url"
      target="_blank"
      @click.native="onClick"
    >
      <div v-if="customIcon" class="iconCentering">
<!--      TODO: Klasse envidatIcon ist in irgendeinem File. Entweder Global oder Lokal  -->
        <img class="envidatIcon" :src="customIcon" />
      </div>

      <v-icon left v-if="materialIconName" :color="iconColor">
        {{ materialIconName }}
      </v-icon>
      {{ buttonText }}
    </v-btn>

    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
/**
 * A rectangle button with an icon, either a custom icon or a material (material design libery) icon.
 * Similar to @class IconButton
 * React on the 'clicked' event or pass an @prop url to create a href-link.
 *
 * Use the @prop isSmall to make a
 * Fill the @prop tooltipText for a tooltip when hovering over the Button.
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
  name: 'BaseRectangleButton',
  props: {
    customIcon: String,
    materialIconName: String,
    buttonText: String,
    tooltipText: String,
    isOutlined: Boolean,
    isFlat: Boolean,
    color: { type: String, default: 'primary' },
    iconColor: { type: String, default: 'primary' },
    isSmall: Boolean,
    url: String,
    marginClass: String,
    disabled: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
  /*
  CSS Schwer verständlich
   */
.citationButton
  > .v-btn__content
  > i.v-icon.material-icons.theme--light.white--text {
  padding-right: 5px !important;
}
</style>
