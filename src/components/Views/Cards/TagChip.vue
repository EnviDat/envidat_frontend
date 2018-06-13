<template>

    <v-chip
        small
        class="envidat_chip"
        :class="highlightedClass"
        v-bind="{['close'] : closeable,
                 [`color`]: highlighted ? 'primary' : '',
                 ['disabled'] : selectable,
                 }"
        @click.stop="clicked"
        @input="clickedClose">
        {{ name }}
    </v-chip>

</template>

<script>
  export default {
    props: {
      id: String,
      name: String,
      closeable: Boolean,
      selectable: Boolean,
      highlighted: Boolean,
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
        this.$emit('clicked', this.id);
      },
      clickedClose: function clickedClose() {
        this.$emit('clickedClose', this.id);
      },
    },
  };
</script>

<style scoped>
  .envidat_chip{
    height: 1.5rem;
    font-size: 0.75rem;
  }
</style>