<template>
  <v-row column>
    <v-col cols="12" class="error py-4">
      <h2>{{ noResultText }}</h2>
    </v-col>

    <v-col cols="12">
      <h3>{{ suggestionText }}</h3>
    </v-col>

    <v-col class="pt-2" cols="12" >
      <v-container class="pa-0" fluid grid-list-md >
        <v-row >

          <v-col class="my-2 px-1" v-for="card in categoryCards"
                  :key="card.title"
                  
                  cols="6" md="4" >
              <base-click-card :title="card.title"
                                :img="card.img"
                                :color="card.darkColor"
                                :contain="card.contain"
                                @click="catchCategoryClicked(card.type)" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
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
