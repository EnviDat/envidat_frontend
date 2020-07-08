<template>
  <v-app-bar clipped-left
              app
              color="white"
              :height="$vuetify.breakpoint.xsOnly ? 50 : 36" >

    <v-row class="pa-0" align="center" justify="center" >

      <!-- <v-spacer v-if="!compact"></v-spacer> -->

      <v-col v-if="compact"
              class="shrink item body-2">
        {{ modeInfoPrefix }}: {{ modeTitle }}
      </v-col>

      <v-col v-else
              class="shrink title text-no-wrap">
        {{ modeInfo }}
      </v-col>

      <v-col v-if="modeLogo"
              class="shrink">
        <a v-if="modeExternalUrl"
           :href="modeExternalUrl"
           target="_blank" >
          <v-img :src="modeLogo" style="height: 34px; width: 34px;" />
        </a>
        <v-img v-else :src="modeLogo" style="height: 34px; width: 34px;" />

      </v-col>

      <!-- <v-spacer v-if="!compact"></v-spacer> -->

      <v-col class="shrink">
        <base-icon-button materialIconName="info_outline"
                          :tooltipText="`${tooltipText} ${modeTitle}`"
                          tooltipBottom
                          color="transparent"
                          iconColor="secondary"
                          isSmall />
      </v-col>

      <v-col v-if="modeCloseCallback" class="shrink">
        <base-icon-button materialIconName="close"
                          :tooltipText="`Exit ${modeTitle} ${modeInfoPrefix}`"
                          tooltipBottom
                          color="transparent"
                          iconColor="red"
                          isSmall
                          @clicked="modeCloseCallback" />
      </v-col>

      <v-col v-if="userIsSignedIn">
        <user-avatar v-if="$vuetify.breakpoint.smAndUp"
                    :clickCallback="avatarClickCallback" />
      </v-col>

      <v-progress-linear v-show="loading"
                         indeterminate
                         style="position: absolute; left: 0; bottom: 0;"
                         height="2"
                         color="primary" />
    </v-row>


  </v-app-bar>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import UserAvatar from '@/components/Layouts/UserAvatar';
import { getModeData } from '@/factories/modeFactory';
import BaseIconButton from '../BaseElements/BaseIconButton';


export default {
  name: 'TheNavigationToolbar',
  components: {
    BaseIconButton,
    UserAvatar,
  },
  props: {
    loading: Boolean,
    mode: String,
    modeCloseCallback: Function,
    userIsSignedIn: Boolean,
    avatarClickCallback: Function,
  },
  computed: {
    compact() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    modeData() {
      if (!this.mode) return null;
      return getModeData(this.mode);
    },
    modeLogo() {
      return this.modeData ? this.modeData.logo : null;
    },
    modeExternalUrl() {
      return this.modeData ? this.modeData.externalUrl : null;
    },
    modeInfo() {
      let infoText = this.modeInfoPrefix;

      if (this.modeTitle) {
        infoText = `${infoText}: ${this.modeTitle}`;
      }

      return infoText;
    },
    modeTitle() {
      return this.modeData ? this.modeData.title : null;
    },
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    expanded: false,
    modeInfoPrefix: 'Special View',
    tooltipText: 'You are in a specific view which shows data for',
  }),
};
</script>
