<template>
  <v-card >
    <v-card-title v-if="title"
                  class="metadata_title title">
      {{ title }}
    </v-card-title>
    
    <v-card-title v-if="showPlaceholder && !title" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer"
            style="width: 100%;">
        <div class="bone bone-type-heading" />
      </div>
    </v-card-title>

    <v-card-text v-if="fundingItems"
                  ref="funding"
                  style="overflow-x: hidden;"
                  class="heightAndScroll pb-4" >

      <v-row >
        <v-col class="py-1" cols="12" >
          {{ preText }}
        </v-col>
        <v-col class="py-1" cols="6" md="4"
                
                v-for="(item, index) in fundingItems"
                :key="index" >

          <div v-if="showFundingItem(item)">

            <a v-if="item.institution_url"
                :href="item.institution_url"
                target="_blank">
              <div>{{ item.institution }}</div>
            </a>

            <div v-else>{{ item.institution }}</div>

            <div v-if="item.grant_number">(Grant/Award:{{ item.grant_number }})</div>
          </div>

        </v-col>
      </v-row>

    </v-card-text>

    <v-card-text v-if="showPlaceholder && !funding" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !funding"
                  class="pt-0"
                  :style="`color: ${emptyTextColor};`" >
      {{ emptyText }}
    </v-card-text>

  </v-card>
</template>

<script>
/**
 * MetadataFunding.vue renders markdown showing the Related Funding of the metadatas.
 *
 * @summary shows the Related Funding of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-29 16:34:29
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

export default {
  name: 'MetadataFunding',
  components: {
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  computed: {
    funding() {
      const funding = this.mixinMethods_getGenericProp('funding');

      if (funding) {
        let notAvailable = 0;

        for (let i = 0; i < funding.length; i++) {
          const item = funding[i];
          if (!this.showFundingItem(item)) {
            notAvailable++;
          }
        }

        if (notAvailable === funding.length) {
          return null;
        }
      }

      return funding;
    },
    fundingItems() {
      if (!this.funding) return null;

      return Object.values(this.funding);
    },
  },
  methods: {
    showFundingItem(item) {
      // console.log('item.institution ' + item.institution);
      return item.institution && !item.institution.includes('not available');
    },
  },
  data: () => ({
    title: 'Funding Information',
    preText: 'This work was supported by:',
    emptyText: 'No information about funding available for this dataset.',
    emptyTextColor: 'black',
  }),
};
</script>
