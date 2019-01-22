<template>
  <v-layout column>
    <v-flex xs12 py-5 style="font-weight: 700;">
      <h2>{{ noResultText }}</h2>
    </v-flex>

    <v-flex xs12 >
      <h3>{{ suggestionText }}</h3>
    </v-flex>

    <v-flex xs12
            mx-1
            pt-2
    >
      <v-container fluid grid-list-md pa-0>
        <v-layout row wrap>

          <v-flex my-2 px-1
              v-bind="{ 'xs3' : $vuetify.breakpoint.xsOnly ? false : true,
                        'xs6' : $vuetify.breakpoint.xsOnly ? true : false,
                      }"                  
              v-for="card in categorycards" :key="card.title">

            <category-card :title="card.title"
                            :type="card.type"
                            v-on:clicked="catchCategoryClicked">
            </category-card>

          </v-flex>

        </v-layout>
      </v-container>
    </v-flex>

  </v-layout>    
</template>


<script>
  import { mapGetters } from 'vuex';
  import CategoryCard from './Cards/CategoryCard';

  export default {
    props: {
      noResultText: String,
      suggestionText: String,
    },
    computed: {
      ...mapGetters({
        categorycards: 'metadata/categorycards',
      }),
    },
    methods: {
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        this.$emit('clicked', cardTitle);
      },
    },
    components: {
      CategoryCard,
    },
  };
</script>
