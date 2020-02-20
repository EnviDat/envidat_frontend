<template>

  <expandable-card-layout :expandable="expandable && hasAuthors" >

    <template v-slot:title >
      <v-card-title class="metadata_title title">
        Author Details
      </v-card-title>
    </template>

    <template v-if="!showPlaceholder && showAuthors && hasAuthors"
              v-slot:content >

      <v-container fluid
                  grid-list-md
                  pa-3 >

        <v-layout row wrap >

          <v-flex v-for="author in authors"
                  :key="author.fullName"
                  xs12 sm6 >
            <author-card :author="author" />
          </v-flex>
        </v-layout>
      </v-container>

    </template>

    <template v-slot:placeholder >

      <v-container v-if="showPlaceholder"
                  fluid
                  grid-list-md
                  pa-3 >

        <v-layout row wrap >
          <v-flex v-for="n in 2"
                    :key="n"
                    xs12 sm6 >
            <author-card-placeholder />
          </v-flex>
        </v-layout>

      </v-container>

      <v-card-text v-if="!showPlaceholder && !hasAuthors"
                    style="color: red;" >
        {{ emptyText }}
      </v-card-text>

    </template>

  </expandable-card-layout>

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
import ExpandableCardLayout from '@/components/Layouts/ExpandableCardLayout';

export default {
  components: {
    AuthorCard,
    AuthorCardPlaceholder,
    ExpandableCardLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
    expandable: Boolean,
  },
  mounted() {
    const options = this.options || {};

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.showAuthors = true;
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
    this.showAuthors = false;
  },  
  data: () => ({
    showAuthors: false,
    checkedGenericProps: false,
    emptyText: 'No authors found for this dataset',
    observer: null,
  }),
  computed: {
    hasAuthors() {
      return this.authors && this.authors.length > 0;
    },
    authors() {
      return this.mixinMethods_getGenericProp('authors');
    },
  },
  methods: {
  },
};
</script>
