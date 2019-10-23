<template>
  <v-card
    ripple
    hover
    :expanded="expanded"
    @click.native="clicked"
  >
    <v-container
      grid-list-md
      pa-0
    >
      <v-layout
        row
        align-center
      >

        <v-flex
          xs5
          py-0
        >
          <v-img
            class="imagezoom"
            :contain="contain"
            :height=" $vuetify.breakpoint.xsOnly ? minHeight + 'px' : maxHeight + 'px' "
            :src="img"
          />
        </v-flex>

        <v-flex
          xs7
          mx-1
          mt-1
        >
          <div
            class="headline"
            :class="{ 'compactTitle' : this.$vuetify.breakpoint.xsOnly }"
          >
            {{ title }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions
      class="ma-0 pa-2"
      style="position: absolute; bottom: 5px; right: 5px;"
    >
      <base-icon-button materialIconName="expand_more"
                        :outlined="false"
                        color="transparent"
                        iconColor="grey"
                        :isToggled="expanded"
                        :rotateOnClick="true"
                        :rotateToggle="expanded"
                        :toolTipText="expanded ? 'Hide info' : 'Show info'"
                        @clicked="clicked" />
    </v-card-actions>

    <v-slide-y-transition>
      <v-card-text
        v-show="expanded"
        class="py-4"
      >
        <m-markdown-preview
          :markdown="text"
          :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }"
        />
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>


<script>
import MMarkdownPreview from 'm-markdown-preview';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    BaseIconButton,
    MMarkdownPreview,
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
  },
  methods: {
    clicked: function clicked() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
