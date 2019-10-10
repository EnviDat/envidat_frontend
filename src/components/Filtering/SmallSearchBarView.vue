<template>
  <v-card :height="height">

    <v-layout row align-center fill-height justify-space-between>

      <v-flex v-if="loading"
      style="min-width: 55px; text-align: center;"
              shrink >
        <v-progress-circular indeterminate
                              size="20"
                              width="2"
                              color="primary" />
      </v-flex>

      <v-flex v-if="showSearchCount && !loading"
              shrink py-0 px-1
              style="min-width: 55px; text-align: center;" >

        <v-tooltip bottom :disabled="$vuetify.breakpoint.xsOnly">
          <tag-chip slot="activator"
                    :style="$vuetify.breakpoint.xsOnly ? 'font-size: 0.65rem !important;' : 'font-size: 0.8rem !important;'"
                    :name="searchCount ? searchCount.toString() : '0'"
                    :selectable="false"
                    :highlighted="searchCount > 0"
                    :closeable="false" />

          <span>{{ searchCount }} metadata entries found</span>
        </v-tooltip>
      </v-flex>

      <v-flex v-if="!hasButton"
              shrink >
        <base-icon-button materialIconName="search"
                          marginClass="ma-0"
                          color="transparent"
                          :isToggled="!searchTerm"
                          @clicked="clicked"
        />
      </v-flex>

      <v-flex grow py-0 px-2>
        <v-tooltip bottom :disabled="$vuetify.breakpoint.xsOnly || !searchToolTipText">
          <div slot="activator">
            <v-text-field
              class="envidatSmallSearch"
              style="align-items: center;"
              :class="compactLayout ? 'small' : ''"
              v-model="searchText"
              single-line
              hide-details
              :flat="isFlat"
              :placeholder="labelText"
              @keyup.enter="clicked"
              append-icon="clear"
              @click:append="clearClicked"
            />
          </div>

          <span>{{ searchToolTipText }}</span>
        </v-tooltip>
      </v-flex>

      <v-flex v-if="hasButton"
              shrink >
        <base-rectangle-button :button-text="buttonText" :is-small="true" @clicked="clicked" />
      </v-flex>

    </v-layout>
  </v-card>
</template>

<script>
import TagChip from '@/components/Cards/TagChip';
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    TagChip,
    BaseRectangleButton,
    BaseIconButton,
  },
  props: {
    labelText: String,
    searchTerm: String,
    showSearchCount: Boolean,
    searchCount: Number,
    hasButton: Boolean,
    buttonText: String,
    compactLayout: Boolean,
    isFlat: Boolean,
    fixedHeight: Number,
    loading: Boolean,
  },
  beforeMount() {
    this.searchText = this.searchTerm;
  },
  data: () => ({
    searchText: '',
    lastSearch: '',
    placeHolderText: 'Enter research term, topic or author',
    searchToolTipText:
      'The full text search works for research terms, topics or authors',
  }),
  computed: {
    height() {
      let height = this.fixedHeight;

      if (this.fixedHeight) {
        return height;
      }

      height = this.compactLayout ? this.$vuetify.breakpoint.sm ? 38 : 32 : 40;

      return height;
    },
  },
  watch: {
    searchTerm(val) {
      // watcher to overtake the property value to the v-model value
      this.searchText = val;
    },
  },
  updated() {
    if (!this.searchText && this.lastSearch) {
      this.clearClicked();
      this.lastSearch = '';
    }
  },
  methods: {
    clicked() {
      this.$emit('clicked', this.searchText);
      this.lastSearch = this.searchText;
    },
    clearClicked() {
      // this.$emit('searchCleared');
      this.searchText = '';
      this.$emit('clicked', this.searchText);
    },
    focusChanged() {
      if (!this.searchText) {
        this.clearClicked();
        this.lastSearch = '';
      } else {
        this.$emit('clicked', this.searchText);
        this.lastSearch = this.searchText;
      }
    },
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

.envidatSmallSearch {
  padding: 0px !important;
  margin: 0px !important;
}

.envidatSmallSearch > .v-input__control {
  max-height: 40px !important;
  margin-bottom: 2px !important;
}

.envidatSmallSearch > .v-input__control > .v-input__slot > .v-text-field__slot > input {
  padding: 0;
}

.envidatSmallSearch.small > .v-input__control {
  margin-bottom: 2px !important;
  /* min-height: 32px !important; */
  font-size: 12px !important;
}

.envidatSmallSearch > .v-input__append-outer {
  margin: auto !important;
}
</style>
