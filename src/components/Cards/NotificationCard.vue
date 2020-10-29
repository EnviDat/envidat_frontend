<template>
  <v-card height="165"
          class="elevation-5"
          :color="notification.color">

    <v-card-title class="pb-0">
      <v-container class="pa-0" >
        <v-row align-content="center">

          <v-col cols="1" >
            <v-icon>{{ notification.icon }}</v-icon>
          </v-col>

          <v-col cols="11">
            <div class="title">{{ notification.message }}</div>
          </v-col>

          <v-col cols="12">
            <div style="height: 60px; overflow: hidden scroll;"
                class="caption"> {{ notification.details }}</div>
          </v-col>

        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text class="px-2 py-1">
      <v-row class="fill-height"  align="end" justify="end">
        <v-col class="shrink" v-if="showReportButton"
                >
          <base-rectangle-button buttonText="Report"
                                  isSmall
                                  @clicked="$emit('clickedReport')" />
        </v-col>

        <v-col class="shrink" >
          <base-rectangle-button color="black"
                                  buttonText="Close"
                                  isSmall
                                  marginClass="white--text"
                                  @clicked="$emit('clickedClose')" />
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
/**
 * NotificationCard.vue is used to show infos, warnings and errors
 * to the user.
 *
 * @summary card for notifications
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:38:19
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    BaseRectangleButton,
  },
  props: {
    notification: Object,
    showReportButton: Boolean,
  },
  mounted() {
    this.setTimeout();
  },
  computed: {
  },
  methods: {
    setTimeout() {
      const that = this;
      window.clearTimeout(this.activeTimeout);

      if (this.notification.timeout) {
        this.activeTimeout = window.setTimeout(() => {
          that.$emit('clickedClose');
        }, this.notification.timeout);
      }
    },
  },
  data: () => ({
    activeTimeout: -1,
  }),
};
</script>
