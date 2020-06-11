<template>
  <v-card ripple hover :expanded="expanded">
    <v-container class="pa-0" grid-list-md @click="toggleExpand">
      <v-row align="center">
        <v-col class="py-0" cols="5" >
          <v-img
            class="imagezoom"
            :contain="contain"
            :height=" $vuetify.breakpoint.xsOnly ? minHeight + 'px' : maxHeight + 'px' "
            :src="img"
          />
        </v-col>

        <v-col class="mx-1 mt-1" cols="7" >
          <div
            class="headline"
            :class="{ 'compactTitle' : this.$vuetify.breakpoint.xsOnly }"
          >
            {{ title }}
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions class="ma-0 pa-2" style="position: absolute; bottom: 5px; right: 5px;">
      <base-icon-button materialIconName="expand_more"
                        :outlined="false"
                        color="transparent"
                        iconColor="grey"
                        :isToggled="expanded"
                        :rotateOnClick="true"
                        :rotateToggle="expanded"
                        :tooltipText="expanded ? 'Hide info' : 'Show info'"
                        @clicked="toggleExpand"
      />
    </v-card-actions>

    <v-slide-y-transition>
      <v-card-text v-if="expanded" class="py-4" v-html="markdownText">
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>


<script>
/**
 * ExpandableCard.vue creates a card with a header image, title, and preview text.
 * When clicked it expands to show the full text in markdown.
 *
 * @summary card with img, title and expandable markdown text
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-10-23 14:37:17
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/*
  Review David
  - Min Height / Max Height etwas kompliziert --> intern lösen
  - Contain als property?
   */
import remark from 'remark';
// import remark-parse from 'remark-parse';
import html from 'remark-html';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  name: 'ExpandableCard',
  components: {
    BaseIconButton,
  },
  props: {
    title: String,
    img: String,
    contain: Boolean,
    text: String,
    minHeight: Number,
    maxHeight: Number,
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    markdownText() {
      return remark().use(html).processSync(this.text.trim());
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style scoped>

  .card .headline {
    font-size: 1.45em !important;
    overflow: inherit !important;
    text-overflow: inherit !important;
    max-height: inherit !important;
    line-height: inherit !important;
  }

  .compactTitle {
    font-size: 15px !important;
    line-height: 1.3em !important;
  }

  .v-card__media img {
    width: inherit !important;
  }
</style>
