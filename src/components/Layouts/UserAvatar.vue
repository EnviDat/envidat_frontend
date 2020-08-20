<template>
  <v-avatar :color="color"
            :size="size" >

    <v-img v-if="showGravatar"
          :src="`https://gravatar.com/avatar/${emailHash}?s=${size}&d=${defaultGavatar}&r=g`"
          @error="imageError" />

    <span v-if="!showGravatar && nameInitials"
          class="white--text"
          :class="initialsTextClass" >{{ nameInitials }}</span>

    <v-icon v-if="!showGravatar && !nameInitials"
            color="black"
            :small="size <= 20"
            :large="size > 40 && size < 128"
            :x-large="size >= 128" >account_circle</v-icon>

  </v-avatar>
</template>

<script>
/**
 * UserAvatar.vue
 *
 * @summary Shows the users avatar circle
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2020-08-20 08:24:02
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  components: {
  },
  props: {
    nameInitials: String,
    emailHash: String,
    defaultGavatar: {
      type: String,
      default: 'identicon',
    },
    size: {
      type: Number,
      default: 48,
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  data: () => ({
    gravatarNotLoaded: false,
  }),
  computed: {
    showGravatar() {
      return !this.gravatarNotLoaded && this.emailHash;
    },
    initialsTextClass() {
      if (this.size >= 128) {
        return 'display-2';
      } 

      if (this.size > 48) {
        return 'display-1';
      } 

      if (this.size <= 32) {
        return 'subtitle-1';
      }

      return 'headline';
    },
  },
  methods: {
    imageError() {
      this.gravatarNotLoaded = true;
    },
  },
};
</script>
