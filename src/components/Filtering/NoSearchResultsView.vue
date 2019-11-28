<template>
  <v-layout column>
    <v-flex xs12 py-4 class="error">
      <h2>{{ noResultText }}</h2>
    </v-flex>

    <v-flex xs12>
      <h3>{{ suggestionText }}</h3>
    </v-flex>

    <v-flex xs12 pt-2>
      <v-container fluid grid-list-md pa-0>
        <v-layout row wrap>

          <v-flex v-for="card in categoryCards"
                  :key="card.title"
                  my-2 px-1
                  xs6 md4 >
              <base-click-card :title="card.title"
                                :img="card.img"
                                :color="card.darkColor"
                                :contain="card.contain"
                                @click="catchCategoryClicked(card.type)" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>


<script>
/**
 * NoSearchResults.vue is used to communicate to the users
 * that there aren't any results the used search parameters.
 *
 * @summary card with img, title, keywords and preview description
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-28 15:16:55
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import BaseClickCard from '@/components/BaseElements/BaseClickCard';

export default {
  name: 'NoSearchResultView',
  props: {
    categoryCards: Array,
  },
  data() {
    return {
      noResultText: 'Nothing found for these search criteria.',
      suggestionText: 'Change the criteria or try one of these categories',
    };
  },
  computed: {
  },
  methods: {
    catchCategoryClicked(cardTitle) {
      this.$emit('clicked', cardTitle);
    },
  },
  components: {
    BaseClickCard,
  },
};
</script>
