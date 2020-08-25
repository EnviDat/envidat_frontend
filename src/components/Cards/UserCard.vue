<template>
  <v-card raised
          :width="width"
          :height="height">

    <div class="cardGrid fill-height"
          :style="`grid-template-rows: ${headerHeight}px 70px auto`">

      <div :style="`height: ${headerHeight}px; overflow: hidden;`">
        <v-img :height="headerHeight" :src="`https://gravatar.com/avatar/${email}?s=${headerHeight}&d=identicon&r=g`" />
      </div>
      
      <div class="title black--text mx-auto pt-8">
        {{ userName }}
      </div>
      
      <div class="subGrid pb-4" >
        <div class="body-2">Datasets</div>

        <div class="body-2">Email</div>

        <div class="caption" >{{ datasetCount }}</div>

        <div class="caption">{{ email }}</div>
      </div>
    
    </div>

    <div style="position: absolute; right: 37.5%; border-radius: 50%;"
          :style="`top: ${avatarTopPosition}px;`" >
      <UserAvatar :size="avatarHeight"
                  :emailHash="emailHash"
                  :nameInitials="nameInitials"
                  class="elevation-5" />
    </div>

  </v-card>
</template>

<script>
/**
 * UserCard.vue
 *
 * @summary users card
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2020-08-25 15:51:20
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import UserAvatar from '@/components/Layouts/UserAvatar';

export default {
  components: {
    UserAvatar,
  },
  props: {
    height: {
      type: Number,
      default: 350,
    },
    userName: String,
    email: String,
    emailHash: String,
    nameInitials: String,
    datasetCount: Number,
  },
  data: () => ({
    width: 250,
    avatarHeight: 64,
  }),
  computed: {
    headerHeight() {
      return this.height >= 350 ? this.height * 0.6 : this.height * 0.4;
    },
    avatarTopPosition() {
      return this.headerHeight - this.avatarHeight * 0.5;
    },
  },
};
</script>

<style lang="sass" scoped>

  @import "~vuetify/src/styles/settings/_variables.scss"
  $gridPadding: $spacer * 4

  .cardGrid
    display: grid
    justify-content: center

  .subGrid 
    align-content: end
    display: grid
    grid-template-columns: 1fr 1fr
    column-gap: 5px
    padding-right: $gridPadding
    padding-left: $gridPadding
    /* background-color: grey; */

  .subGrid div 
    place-self: center
    word-break: break-all
    align-content: end

</style>
