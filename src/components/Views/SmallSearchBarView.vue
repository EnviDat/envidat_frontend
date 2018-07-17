<template>
  <v-card hover raised >

    <!-- long slim search bar  -->

    <v-layout row
              align-center
              justify-space-between>

      <v-flex xs10 pa-0>
        <v-text-field
          class="py-2 pl-3 pr-0 smallSearchBar"
          hide-details
          full-width
          single-line
          clearable
          prepend-icon="search"          
          :prepend-icon-cb="clicked"
          v-on:keyup.enter="clicked"
          v-on:change="focusChanged"
          v-model="searchText"
          :label="labelText">
        </v-text-field>
      </v-flex>

      <v-flex xs2 pa-0>
        <v-chip small disabled 
        class="envidat_chip"
        v-bind="{ ['color']: searchCount > 0 ? 'primary' : ''}"
        :class="{ ['white--text']: searchCount > 0 ? true : false }"
        >
          {{ searchCount }}
        </v-chip>
      </v-flex>

      <!-- <v-flex xs1 pr-2 pl-0 py-0>
        <div class="input-group input-group--slider input-group--focused input-group--active"
        style="padding: 0; margin: 0;">
          <div class="slider__thumb--lable__container"
            :value="searchCount"
            thumb-label
          >
            <div class="slider__thumb--label"> <span>{{ searchCount }}</span> </div>
          </div>
        </div>        
      </v-flex> -->

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
  export default {
    props: {
      labelText: String,
      searchTerm: String,
      searchCount: Number,
      hasButton: Boolean,
      buttonText: String,
      resultCount: String,
    },
    data: () => ({
      searchText: '',
      lastSearch: '',
    }),
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
      focusChanged: function focusChanged() {
        if (!this.searchText) {
          this.$emit('searchCleared');
          this.lastSearch = '';
        } else {
          this.$emit('clicked', this.searchText);
          this.lastSearch = this.searchText;
        }
      },
    },
    updated: function updated() {
      if (!this.searchText && this.lastSearch) {
        this.$emit('searchCleared');
        this.lastSearch = '';
      }
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


</style>