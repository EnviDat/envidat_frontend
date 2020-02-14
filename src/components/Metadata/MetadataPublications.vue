<template>
  <expandable-text-layout v-bind="publications"
                          :showPlaceholder="showPlaceholder"
                          :expandable="expandable && hasPublications" />
</template>

<script>
/**
 * MetadataPublications.vue renders markdown showing the Related Publications of the metadatas.
 *
 * @summary shows the Related Publications of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-28 16:02:25
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import ExpandableTextLayout from '@/components/Layouts/ExpandableTextLayout';

export default {
  name: 'MetadataPublications',
  components: {
    ExpandableTextLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
    expandable: Boolean,
  },
  created() {
    this.pubs = this.mixinMethods_getGenericProp('publications');
  },
  computed: {
    hasPublications() {
      return this.pubs !== null && this.pubs.text !== '';
    },
    publications() {
      if (!this.pubs) {
        return {
          title: this.title, 
          emptyTextColor: 'black',
          emptyText: 'No related publications available for this dataset.',
        };
      }

      return this.pubs;
    },
  },
  methods: {
  },
  data: () => ({
    title: 'Related Publications',
    pubs: null,
  }),
};
</script>

<style scoped>

</style>
