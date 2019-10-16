<template>
  <v-card flat :color="error.color">
    <v-container pa-0 grid-list-lg>
      <v-layout row wrap>

        <v-flex xs1 >
          <v-icon>{{ error.icon }}</v-icon>
        </v-flex>

        <v-flex xs11>
          {{ error.message }}
        </v-flex>

        <v-flex xs12>
          <div class="caption"> {{ error.details }}</div>
        </v-flex>

        <v-flex v-if="showReportButton">
          <base-rectangle-button buttonText="Report"
                                  @clicked="$emit('clickedReport')" />
        </v-flex>

        <v-flex>
          <base-rectangle-button color="black"
                                  buttonText="Close"
                                  @clicked="$emit('clickedClose')" />
        </v-flex>
      </v-layout>
    </v-container>
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
