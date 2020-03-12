<template>
  <v-card
    color="primary"
    class="metadataResourceCard white--text"
    style="height: 100%; min-width: 200px;"
  >
    <v-card-title>
      <div
        class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer"
        style="width: 100%;"
      >
        <div class="bone bone-type-heading" />
      </div>
    </v-card-title>

    <v-card-text class="pt-0">
      <v-container grid-list-xs>
        <v-layout
          row
          wrap
        >
          <v-flex
            v-bind="{ [`xs8`]: !this.twoColumnLayout ,
                      [`xs12`]: this.twoColumnLayout }"
          >
            <v-layout column>
              <v-flex xs11>
                <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
                  <div class="bone bone-type-multiline bone-style-paragraph" />
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex
            v-bind="{ [`xs4`]: !this.twoColumnLayout ,
                      [`xs12`]: this.twoColumnLayout,
                      [`pt-3`]: this.twoColumnLayout }"
          >
            <v-layout column>
              <v-flex px-0>
                <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
                  <div class="bone bone-type-multiline " />
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions
      class="mb-2 py-0"
      style="position: absolute; bottom: 0; right: 0;"
    >
      <v-spacer />

      <div
        color="accent"
        class="skeleton skeleton-size-big skeleton-color-yellow skeleton-animation-shimmer"
      >
        <div
          style="width: 32px; height: 32px;"
          class="bone bone-type-image bone-style-round"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>


<script>
/**
 * ResourceCardPlaceholder.vue is a placeholder card for the resoureceCard.vue
 *
 * @summary placeholder card for a resource
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:13:47
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  components: {
  },
  props: {
    twoColumnLayout: Boolean,
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
};
</script>
