<template>

    <v-chip
        small
        light
        class="envidat_chip"
        :class="highlightedClass"
        v-bind="{['close'] : closeable,
                 [`color`]: higlighted ? 'primary' : '',
                 }"
        @click.stop="clicked"
        @input.stop="clickedClose">
        {{ name }}
    </v-chip>            

</template>

<script>
  export default {
    props: {
      id: String,
      name: String,
      closeable: Boolean,
      higlighted: Boolean,
    },
    computed: {
      highlightedClass: function highlightedClass() {
        return {
          'white--text': this.higlighted,
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