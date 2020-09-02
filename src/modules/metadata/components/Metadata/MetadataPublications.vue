<template  id="MetadataPublications">
  <expandable-text-layout v-bind="publications"
                            :showPlaceholder="showPlaceholder"
                            :maxTextLength="publications.maxTextLength"
                            :emptyTextColor="publications.emptyTextColor" />
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
  },
  computed: {
    publications() {
      return this.mixinMethods_getGenericProp('publications');
    },
  },
  methods: {
  },
  data: () => ({
  }),
};
</script>
