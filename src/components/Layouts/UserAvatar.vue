<template>
  <v-avatar color="secondary"
            :size="size" >

    <img v-if="emailHash"
          :src="`https://gravatar.com/avatar/${emailHash}?s=${size}&d=${defaultGavatar}&r=g`" />

    <span v-if="!emailHash && nameInitials"
          class="white--text"
          :class="initialsTextClass" >{{ nameInitials }}</span>

    <v-icon v-if="!emailHash && !nameInitials"
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
 * Last modified  : 2020-08-12 14:03:02
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
  },
  data: () => ({
  }),
  computed: {
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
};
</script>
