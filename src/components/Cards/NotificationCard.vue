<template>
  <v-card height="165"
          class="elevation-5"
          :color="notification.color">

    <v-card-title class="pb-0">
      <v-container pa-0 grid-list-md>
        <v-layout row wrap align-content-center>

          <v-flex xs1 >
            <v-icon>{{ notification.icon }}</v-icon>
          </v-flex>

          <v-flex xs11>
            <div class="title">{{ notification.message }}</div>
          </v-flex>

          <v-flex xs12>
            <div style="height: 60px; overflow: hidden scroll;"
                class="caption"> {{ notification.details }}</div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-text class="px-2 py-1">
    <v-layout row wrap fill-height align-end justify-end>
      <v-flex v-if="showReportButton"
              shrink>
        <base-rectangle-button buttonText="Report"
                                isSmall
                                @clicked="$emit('clickedReport')" />
      </v-flex>

      <v-flex shrink>
      <base-rectangle-button color="black"
                              buttonText="Close"
                              isSmall
                              marginClass="white--text"
                              @clicked="$emit('clickedClose')" />
      </v-flex>
    </v-layout>
    </v-card-text>

  </v-card>
</template>

<script>
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
