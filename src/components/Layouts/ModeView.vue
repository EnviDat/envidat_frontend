<template>
  <v-layout row
            :justify-center="!compact"
            :justify-space-between="compact"
            align-center>
    <div v-if="compact"
          class="item body-2">
      {{ modeInfoPrefix }}:
      <br />
      {{ modeTitle }}
    </div>

    <div v-else 
          class="item title">
      {{ modeInfo }}
    </div>

    <div v-if="modeLogo"
          class="item"
          style="height: 34px; width: 34px;">

      <a v-if="modeExternalUrl"
          :href="modeExternalUrl"
          target="_blank" >
        <v-img :src="modeLogo" />
      </a>
      <v-img v-else
              :src="modeLogo" />

    </div>

    <div class="item">
      <base-icon-button materialIconName="info_outline"
                        :tooltipText="`${tooltipText} ${modeTitle}`"
                        tooltipBottom
                        color="transparent"
                        iconColor="secondary"
                        isSmall />
    </div>

    <div v-if="closeCallback"
          class="item">
      <base-icon-button materialIconName="close"
                        :tooltipText="`Exit ${modeTitle} ${modeInfoPrefix}`"
                        tooltipBottom
                        color="transparent"
                        iconColor="red"
                        isSmall
                        @clicked="closeCallback" />
    </div>

  </v-layout>
</template>

<script>
/**
 * TheTitleScreenLayout.vue shows the EnviDat logo and the SloganCard
 * with different layouts for the differen screen sizes.
 *
 * @summary responsive layout for the title screen with logo and SloganCard
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-31 15:29:14
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import { getModeData } from '@/factories/modeFactory';

export default {
  components: {
    BaseIconButton,
  },
  props: {
    mode: String,
    compact: Boolean,
    closeCallback: Function,
  },
  data: () => ({
    modeInfoPrefix: 'Special View',
    tooltipText: 'You are in a specific view which shows data for',
  }),
  computed: {
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
    modeLogo() {
      return this.modeData ? this.modeData.logo : null;
    },
    modeExternalUrl() {
      return this.modeData ? this.modeData.externalUrl : null;
    },
    modeData() {
      if (!this.mode) return null;

      return getModeData(this.mode);
    },
  },
};
</script>

<style scoped>
  .item {
    margin: 0px 5px;
  }
</style>
