<template>
  <v-card raised >

    <v-card-title>

      <v-row align="center" >
        <v-col class="shrink">
          <v-avatar color="primary" class="elevation-2">
            <span class="white--text headline">{{ nameInitials }}</span>
          </v-avatar>
        </v-col>

        <v-col>
          <v-row align="center" no-gutters>
            <v-col cols="12">
              <h2>{{ author.fullName }}</h2>
            </v-col>
            <v-col cols="12">
              <div class="caption">
                Datasets Published {{ author.datasetCount }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-title>

    <v-card-text>

      <v-row no-gutters>
        <v-col cols="6" offset="6">
          <v-row >
            <v-col class="py-1">
              <v-btn color="secondary">
                check datasets
              </v-btn>
            </v-col>
          </v-row>

          <v-row >
            <v-col class="py-1">
              <v-btn color="secondary">
                check datasets
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-text>

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
 * Last modified  : 2020-07-16 11:49:22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  components: {
  },
  props: {
    author: Object,
  },
  data: () => ({
    modeInfoPrefix: 'Special View',
    tooltipText: 'You are in a specific view which shows data for',
  }),
  computed: {
    nameInitials() {
      let first = this.author.firstName ? this.author.firstName.slice(0, 1) : '';
      let last = this.author.lastName ? this.author.lastName.slice(0, 1) : '';

      if (!first || !last) {
        const splits = this.author.fullName.split('');
        first = splits[0];
        last = last[splits.lenght - 1];
      }

      return `${first}${last}`;
    },
  },
};
</script>

<style scoped>
  .item {
    margin: 0px 5px;
  }
</style>
