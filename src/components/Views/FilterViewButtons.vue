<template>
    <v-layout row justify-end>
        
        <v-btn small flat 
                style="margin-top: 10px !important;"
                @click.stop="toggleExpand">
            {{ expanded ? expandedButtonText : expandButtonText }}
        </v-btn>

        <v-btn icon
            @click.stop="toggleExpand">
            <v-icon color="primary">{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
  },
  methods: {
    toggleExpand: function toggleExpand() {
      this.$emit('clickedExpand', !this.expanded);
    },
  },
};
</script>