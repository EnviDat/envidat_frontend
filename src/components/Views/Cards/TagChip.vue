<template>

    <v-chip
        small
        class="envidatChip"
        :class="highlightedClass"
        v-bind="{['close'] : closeable,
                 ['color']: highlighted ? 'primary' : '',
                 ['disabled'] : !selectable,
                 }"
        @click.stop="clicked"
        @input="clickedClose">
        {{ name }}
    </v-chip>

</template>

<script>
  export default {
    props: {
      name: String,
      closeable: Boolean,
      selectable: Boolean,
      highlighted: Boolean,
      count: Number,
    },
    computed: {
      highlightedClass: function highlightedClass() {
        return {
          'white--text': this.highlighted,
          // fontSize: this.name.length > 10 ? '10pt' : 'inherit',
        };
      },
    },
    methods: {
      clicked: function clicked() {
        if (!this.selectable) {
          return;
        }

        this.$emit('clicked', this.name);
      },
      clickedClose: function clickedClose() {
        this.$emit('clickedClose', this.name);
      },
    },
  };
</script>

<style scoped>
</style>