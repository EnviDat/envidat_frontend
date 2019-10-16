<template>
  <v-card flat :color="error.color">
    <v-container pa-0 grid-list-md>
      <v-layout row wrap align-content-center>

        <v-flex xs1 >
          <v-icon>{{ error.icon }}</v-icon>
        </v-flex>

        <v-flex xs11>
          <div class="title">{{ error.message }}</div>
        </v-flex>

        <v-flex xs12>
          <div class="caption"> {{ error.details }}</div>
        </v-flex>

      </v-layout>
    </v-container>

    <v-card-actions class="right">
      <base-rectangle-button v-if="showReportButton"
                              buttonText="Report"
                              @clicked="$emit('clickedReport')" />
      <base-rectangle-button color="black"
                              buttonText="Close"
                              @clicked="$emit('clickedClose')" />
    </v-card-actions>
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
    error: Object,
    showReportButton: Boolean,
  },
  computed: {
  },
  methods: {
  },
  data: () => ({
  }),
};
</script>
