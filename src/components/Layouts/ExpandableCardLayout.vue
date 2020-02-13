<template>
  <v-card :class="cardClass">
    <v-card-title v-if="title"
                  class="metadata_title title"
                  @click="toggleShowContent">
      {{ title }}
    </v-card-title>

    <v-card-actions class="ma-0 pa-2"
                    :style="`position: absolute; top: 0px; right: 0px;`" >

      <base-icon-button material-icon-name="expand_more"
                        :iconColor="'primary'"
                        :color="'accent'"
                        :outlined="showContent"
                        :rotateOnClick="true"
                        :rotateToggle="showContent"
                        :tooltipText="showContent ? 'Collaspe text' : 'Show full text'"
                        @clicked="toggleShowContent" />

    </v-card-actions>

    <slot v-if="showContent" />

  </v-card>
</template>

<script>
/**
 * ExpandableCardLayout.vue renders a title with a expand icon button
 * to toggle showing it's content which is a slot.
 *
 * @summary shows the markdown text in an expanable card
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-28 16:19:15
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  name: 'ExpandableCardLayout',
  components: {
    BaseIconButton,
  },
  props: {
    title: String,
    cardClass: String,
  },
  computed: {
  },
  methods: {
    toggleShowContent() {
      this.showContent = !this.showContent;
    },
  },
  data: () => ({
    showContent: false,
  }),
};
</script>

<style scoped>

</style>
