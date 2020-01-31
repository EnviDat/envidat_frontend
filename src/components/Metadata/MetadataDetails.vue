<template>
  <v-card>
    <v-card-title class="title metadata_title">
      Further Information
    </v-card-title>

    <v-card-text v-if="details && details.length > 0">
      <v-form>
        <div v-for="val in details"
              :key="val.label" >
          <v-text-field v-if="isSingleText(val.text)"
                        :id="val.label"
                        :label="val.label"
                        :name="val.label"
                        :value="val.text.replace(`(${asciiDead})`, '').trim()"
                        readonly />

          <v-textarea v-if="!isSingleText(val.text)"
                      :id="val.label"
                      :label="val.label"
                      :name="val.label"
                      :value="val.text.replace(`(${asciiDead})`, '').trim()"
                      readonly />
        </div>
      </v-form>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && (!details || details.length <= 0)"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>


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

  </v-card>
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
import { mapGetters } from 'vuex';
import { METADATA_NAMESPACE } from '@/store/metadataMutationsConsts';


export default {
  components: {
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    maxSingleTextLengthLg: 80,
    maxSingleTextLengthMd: 80,
    maxSingleTextLengthXs: 70,
    emptyText: 'No details found for this dataset',
  }),
  computed: {
    ...mapGetters({
      asciiDead: `${METADATA_NAMESPACE}/asciiDead`,
      authorPassedInfo: `${METADATA_NAMESPACE}/authorPassedInfo`,
    }),
    details() {
      return this.mixinMethods_getGenericProp('details');
    },
  },
  methods: {
    isSingleText: function isSingleText(text) {
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
