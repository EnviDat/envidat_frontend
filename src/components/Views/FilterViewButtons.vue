<template>
    <v-layout row  align-center align-content-center justify-end>
        
        <v-btn v-if="showClearTags"
                small flat 
                @click.stop="clearTags">
            {{ clearButtonText }}
            <v-icon color="red" style="font-size: 20px !important">close</v-icon>
        </v-btn>

        <v-btn small flat 
                @click.stop="toggleExpand">
            {{ expanded ? expandedButtonText : expandButtonText }}
            <v-icon color="primary">{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>

        <!-- <v-btn icon 
            @click.stop="toggleExpand">
            <v-icon color="primary">{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>
        -->
    </v-layout>
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    showClearTags: Boolean,
    clearButtonText: String,
  },
  methods: {
    toggleExpand: function toggleExpand() {
      this.$emit('clickedExpand', !this.expanded);
    },
    clearTags: function clearTags() {
      this.$emit('clickedClearTags');
    },
  },
};
</script>