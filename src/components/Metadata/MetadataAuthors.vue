<template>
  <v-card >
    <v-card-title class="title metadata_title">
      Author Details
    </v-card-title>

    <v-container fluid
                grid-list-md
                pa-3 >

      <v-layout v-if="showPlaceholder"
                  row wrap >
        <v-flex v-for="n in 2"
                  :key="n"
                  xs12 sm6 >
          <author-card-placeholder />
        </v-flex>
      </v-layout>

      <v-layout v-if="!showPlaceholder && authors && authors.length > 0"
                row wrap >

        <v-flex v-for="author in authors"
                :key="author.fullName"
                xs12 sm6 >
          <author-card :author="author" />
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-text v-if="!showPlaceholder && (!authors || authors.length <= 0)"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

  </v-card>
</template>

<script>
/**
 * MetadataAuthors.vue shows all the resources of a metadata entry in a list.
 *
 * @summary shows the resources the a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 16:01:41
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import AuthorCard from '@/components/Cards/AuthorCard';
import AuthorCardPlaceholder from '@/components/Cards/AuthorCardPlaceholder';

export default {
  components: {
    AuthorCard,
    AuthorCardPlaceholder,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    showAllResources: false,
    checkedGenericProps: false,
    emptyText: 'No authors found for this dataset',
  }),
  computed: {
    authors() {
      return this.mixinMethods_getGenericProp('authors');
    },
  },
  methods: {
  },
};
</script>
