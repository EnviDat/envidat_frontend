<template>
  <v-card raised
          :height="compactLayout ? 32 : 40"
  >
    <!-- long slim search bar  -->

    <v-layout row
              align-center
              fill-height
              justify-space-between>

      <v-flex xs10 sm8 md9 lg10 py-0 pl-2 fill-height>

        <v-text-field
            class="envidatSmallSearch"
            :class="compactLayout ? 'small' : ''"
            single-line
            hide-details
            clearable
            solo
            flat
            append-outer-icon="search"
            @click:append-outer="clicked"
            v-on:keyup.enter="clicked"
            v-model="searchText"
            @click:clear="clearClicked"
            :placeholder="placeHolderText">
        </v-text-field>

      </v-flex>

      <v-flex xs2 sm4 md3 lg2 pa-0
              style="text-align: center;">

        <v-tooltip bottom >
          
          <tag-chip slot="activator"
                  style="font-size: 0.75rem !important;"
                  :name="searchCount.toString()"
                  :selectable="false"
                  :highlighted="searchCount > 0"
                  :closeable="false"  />

          <span>{{ searchCount }} metadata entries found</span>
        </v-tooltip>
      </v-flex>

      <v-flex sm4 lg3 xl2 
              v-if="hasButton">
        <v-btn color="primary"
                v-bind="{ [`large`]: this.$vuetify.breakpoint.mdAndUp}"
                @click.native="clicked"> {{ buttonText }}</v-btn>
      </v-flex>

    </v-layout>

  </v-card>
</template>

<script>
  import TagChip from '../Cards/TagChip';

  export default {
    props: {
      labelText: String,
      searchTerm: String,
      searchCount: Number,
      hasButton: Boolean,
      buttonText: String,
      resultCount: String,
      compactLayout: Boolean,
    },
    data: () => ({
      searchText: '',
      lastSearch: '',
      placeHolderText: 'Search for research topics',
    }),
    updated: function updated() {
      if (!this.searchText && this.lastSearch) {
        this.$emit('searchCleared');
        this.lastSearch = '';
      }
    },
    watch: {
      searchTerm: function searchTerm(val) {
        // watcher to overtake the property value to the v-model value
        this.searchText = val;
      },
    },
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.searchText);
        this.lastSearch = this.searchText;
      },
      clearClicked: function clearClicked() {
        this.$emit('searchCleared');
      },
      focusChanged: function focusChanged() {
        if (!this.searchText) {
          this.clearClicked();
          this.lastSearch = '';
        } else {
          this.$emit('clicked', this.searchText);
          this.lastSearch = this.searchText;
        }
      },
    },
    components: {
      TagChip,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
.smallSearchBar > label {
  top: inherit !important;
}

.smallSearchBar .input-group__details {
  min-height: 0px !important;
}

.envidatSmallSearch > .v-input__control {
    min-height: 40px !important;
}

.envidatSmallSearch.small > .v-input__control {
    min-height: 32px !important;
}

.envidatSmallSearch > .v-input__append-outer {
  margin: auto !important;
}

</style>