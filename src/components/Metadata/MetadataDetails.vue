<template>

  <expandable-card-layout :expandable="expandable && hasDetails" >

    <template v-slot:title >
      <v-card-title class="metadata_title title">
        Further Information
      </v-card-title>
    </template>

    <template v-if="!showPlaceholder && hasDetails"
              v-slot:content >

      <v-card-text>
        <v-form>
          <div v-for="val in details"
                :key="val.label" >
            <v-text-field v-if="isSingleText(val.text)"
                          :id="val.label"
                          :label="val.label"
                          :name="val.label"
                          :value="detailText(val.text)"
                          readonly />

            <v-textarea v-if="!isSingleText(val.text)"
                        :id="val.label"
                        :label="val.label"
                        :name="val.label"
                        :value="detailText(val.text)"
                        readonly />
          </div>
        </v-form>
      </v-card-text>

    </template>

    <template v-slot:placeholder >

      <v-card-text v-if="showPlaceholder" >
        <v-layout row wrap
                  v-for="n in 5"
                  :key="n + 'label'" >

            <div class="flex xs2 pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
              <div class="bone bone-type-text " />
            </div>

            <div class="flex xs10 pl-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
              <div class="bone bone-type-text " />
            </div>
        </v-layout>
      </v-card-text>

      <v-card-text v-if="!showPlaceholder && !hasDetails"
                    style="color: red;" >
        {{ emptyText }}
      </v-card-text>

    </template>

  </expandable-card-layout>

</template>

<script>
/**
 * MetadataDetails.vue shows the detailed information about the
 * metadata entry in a form.
 *
 * @summary shows the detail infos of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 15:54:13
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
// import { mapGetters } from 'vuex';
// import { METADATA_NAMESPACE } from '@/store/metadataMutationsConsts';
import ExpandableCardLayout from '@/components/Layouts/ExpandableCardLayout';


export default {
  components: {
    ExpandableCardLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
    expandable: Boolean,
    authorDeadInfo: {
      type: Object,
      default: () => ({
        asciiDead: {
          type: String,
          default: '',
        },
        authorPassedInfo: {
          type: String,
          default: '',
        },
      }),
    },
  },
  data: () => ({
    maxSingleTextLengthLg: 80,
    maxSingleTextLengthMd: 80,
    maxSingleTextLengthXs: 70,
    emptyText: 'No details found for this dataset',
  }),
  computed: {
    // ...mapGetters({
    //   asciiDead: `${METADATA_NAMESPACE}/asciiDead`,
    //   authorPassedInfo: `${METADATA_NAMESPACE}/authorPassedInfo`,
    // }),
    hasDetails() {
      return this.details && this.details.length > 0;
    },
    details() {
      return this.mixinMethods_getGenericProp('details');
    },
  },
  methods: {
    detailText(text) {
      if (!text) return '';

      if (this.authorDeadInfo && this.authorDeadInfo.asciiDead) {
        return text.replace(`(${this.authorDeadInfo.asciiDead})`, '').trim();
      }

      return text.trim();
    },
    isSingleText(text) {
      if (!text || text.length <= 0) {
        return true;
      }

      if (this.$vuetify.breakpoint.xsOnly) {
        return text.length <= this.maxSingleTextLengthXs;
      }

      if (this.$vuetify.breakpoint.mdAndDown) {
        return text.length <= this.maxSingleTextLengthMd;
      }

      return text.length <= this.maxSingleTextLengthLg;
    },
  },
};

</script>
