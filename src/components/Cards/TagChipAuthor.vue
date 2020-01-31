<template>
  <v-chip
    slot="activator"
    class="authorTag"
    :class="{ 'white--text': highlighted ? true : false,
              'smallChip': $vuetify.breakpoint.smAndDown ? true : false,
    }"
    :style="{'height' : $vuetify.breakpoint.xsOnly ? '15px' : '' }"
    @click.stop="clicked"
  >
    <v-avatar>
      <v-icon>account_circle</v-icon>
    </v-avatar>

    {{ authorName }}

    <v-tooltip v-if="authorIsDead"
                bottom>
      <v-icon slot="activator" >
        hourglass_empty
      </v-icon>
      {{ authorPassedInfo }}
    </v-tooltip>

  </v-chip>

</template>

<script>
/**
 * TagChipAuthor.vue creates a chip specific for authors with the name as text.
 *
 * @summary tag for authors
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 14:16:14
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import { mapGetters } from 'vuex';
import { METADATA_NAMESPACE } from '@/store/metadataMutationsConsts';

export default {
  props: {
    name: String,
    tooltipText: String,
    highlighted: Boolean,
  },
  computed: {
    ...mapGetters({
      asciiDead: `${METADATA_NAMESPACE}/asciiDead`,
      authorPassedInfo: `${METADATA_NAMESPACE}/authorPassedInfo`,
    }),
    authorIsDead() {
      return this.name ? this.name.includes(this.asciiDead) : false;
    },
    authorName() {
      return this.authorIsDead ? this.name.replace(`(${this.asciiDead})`, '') : this.name;
    },
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked', this.name);
    },
  },
};
</script>

<style scoped>
  .authorTag {
    opacity: 0.85;
    height: 24px !important;
    background-color: #f8f8f8 !important;
    margin: 1px 2px !important;
  }

  .authorTag > .v-chip__content > .v-avatar {
    margin-left: -16px !important;
  }

</style>
