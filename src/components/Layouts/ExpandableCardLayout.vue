<template>
  <!-- <v-layout style="position: relative; "> -->
  <v-card :class="cardClass" >

    <v-card-actions v-if="expandable"
                    class="ma-0 pa-2"
                    :style="`position: absolute; top: 0px; right: 0px;`"
                    @click="toggleContent" >

      <base-icon-button material-icon-name="expand_more"
                        :iconColor="showContent ? 'accent' : 'primary'"
                        :color="showContent ? 'accent' : 'primary'"
                        :outlined="true"
                        :rotateOnClick="true"
                        :rotateToggle="showContent"
                        :tooltipText="showContent ? 'Collaspe text' : 'Show full text'"
                        @clicked="toggleContent" />
    </v-card-actions>

    <slot name="title" @click="toggleContent" />

    <slot v-if="!expandable || (expandable && showContent)"
          name="content" />

    <slot name="placeholder" />

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
  mounted() {
  },
  props: {
    cardClass: String,
    expandable: Boolean,
  },
  computed: {
  },
  methods: {
    toggleContent() {
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
