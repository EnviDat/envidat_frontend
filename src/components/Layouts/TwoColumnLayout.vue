<template>
      
  <v-layout row wrap>

    <v-flex v-bind="firstColWidth"
            >

      <v-layout column>

        <v-flex mb-2
                v-for="(entry, index) in firstColumn"
                :key="`left_${index}`"
                >
          <component :is="entry"
                      :genericProps="entry.genericProps"
                      />
        </v-flex>

      </v-layout>
    </v-flex>


    <v-flex v-if="secondColumn"
            v-bind="secondColWidth"
            >

      <v-layout column>

        <v-flex mb-2
                v-for="(entry, index) in secondColumn"
                :key="`right_${index}`"
                >
          <component :is="entry"
                      :genericProps="entry.genericProps"
                      />
        </v-flex>

      </v-layout>
    </v-flex>

  </v-layout>

</template>

<script>

  export default {
    props: {
      firstColumn: Array,
      secondColumn: Array,
    },
    computed: {
      firstColWidth: function firstColWidth() {
        return this.secondColumn && this.secondColumn.length > 0 ? { xs6: true } : { xs12: true };
      },
      secondColWidth: function secondColWidth() {
        return this.secondColumn && this.secondColumn.length > 0 ? { xs6: true } : {};
      },
      textFontSizeStyle: function textFontSizeStyle() {
        return this.textFontSize ? `font-size: ${this.textFontSize}px !important;` : '';
      },
    },
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },
    components: {
    },
  };
</script>

<style scoped>

</style>
