<template>
  <v-card ripple
          hover
          style="height: 100%; max-height: 375px !important;"
  >
    <v-img background-color="primary"
            :height="flatLayout ? '65px' : $vuetify.breakpoint.smAndDown ? '100px' : '125px'"
    >

      <v-container style="position: absolute;"
                  fill-height
                  grid-list-xs
                  pb-0 >
        <v-layout column>
          <v-flex xs12
                  py-0 >
            <v-layout row
                      align-start >
              <v-flex xs12>
                <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
                  <div class="bone bone-type-multiline bone-style-steps" />
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-container>
    </v-img>

    <v-card-text primary-title >
      <div class="skeleton skeleton-color-silver skeleton-animation-shimmer"
            style="width: 100%;" >
        <div class="bone bone-type-multiline" />
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>

      <v-layout row wrap
                fill-height
                align-end >
        <v-flex v-for="n in 3"
                :key="n">
          <tag-chip-placeholder py-0
                                class="envidatChip" />
        </v-flex>
      </v-layout>

    </v-card-text>
  </v-card>
</template>


<script>
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    TagChipPlaceholder,
  },
  props: {
    flatLayout: Boolean,
    categoryColor: String,
  },
  data: () => ({
  }),
  computed: {
  },
  created() {
  },
  methods: {
  },
};
</script>
