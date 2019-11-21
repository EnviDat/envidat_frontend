<template>
  <expandable-text-layout v-bind="funding"
                            :showPlaceholder="showPlaceholder" />
</template>

<script>
/**
 * MetadataFunding.vue renders markdown showing the Related Funding of the metadatas.
 *
 * @summary shows the Related Funding of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-20 13:07:27
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import ExpandableTextLayout from '@/components/Layouts/ExpandableTextLayout';

export default {
  name: 'MetadataFunding',
  components: {
    ExpandableTextLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  computed: {
    funding() {
      let pub = this.mixinMethods_getGenericProp('funding');

      if (!pub) {
        pub = { title: 'Funding Information' };
      }

      return pub;
    },
  },
  methods: {
  },
  data: () => ({
  }),
};
</script>

<style scoped>

</style>
