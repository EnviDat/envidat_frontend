<template>
  <v-card id="NoUserDatasetsView"
          class="pa-0 noDatasetsGrid" >

    <v-img :src="one ? UserNotFound1 : UserNotFound2"
            max-height="500"
            style="border-bottom-left-radius: 4px; border-top-left-radius: 4px; border-top-right-radius: 0px;" />

    <v-container fluid class="pa-4">

      <v-row>
        <v-col class="display-2">
          {{ title }}
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="12"
                class="text-md-h5 text-xs-body-1" >
          {{ description }}
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="6"
                class="text-body-1" >
          {{ descriptionCreate }}
        </v-col>

        <v-col cols="6"  >
          <base-rectangle-button :button-text="createButtonText"
                                  @clicked="catchCreateClicked" />
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="6"
                class="text-body-1" >
          {{ descriptionFollow }}
        </v-col>

        <v-col cols="6"  >
          <base-rectangle-button :button-text="followButtonText"
                                  @clicked="catchFollowClicked" />
        </v-col>
      </v-row>


    </v-container>

  </v-card>

</template>


<script>
/**
 * NoUserDatasetsView is used to communicate that the users has no
 * datasets.
 *
 * @summary card with img, title, description and button to add datasets
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2020-07-15 09:25:10
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import UserNotFound1 from '@/modules/user/assets/UserNotFound1.jpg';
import UserNotFound2 from '@/modules/user/assets/UserNotFound2.jpg';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  name: 'NoUserDatasetsView',
  props: {
    one: Boolean,
  },
  data() {
    return {
      title: 'No Datasets',
      description: "It seems you don't have any datasets.",
      descriptionCreate: 'You can create a datasets',
      createButtonText: 'Create Dataset',
      descriptionFollow: 'Or you can follow existing datasets to get updates',
      followButtonText: 'Follow Datasets',
      UserNotFound1,
      UserNotFound2,
    };
  },
  computed: {
  },
  methods: {
    catchCreateClicked() {
      this.$emit('createClick');
    },
    catchFollowClicked() {
      this.$emit('followClick');
    },
  },
  components: {
    BaseRectangleButton,
  },
};
</script>

<style lang="scss" scoped>
  .noDatasetsGrid {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>
