<template>
  <v-card ripple hover @click.native="click">
    <v-container grid-list-md pa-0>
      <v-layout row align-center>

        <!-- Image -->
        <v-flex xs5 py-0>
          <v-img
            :height="$vuetify.breakpoint.smAndDown ? '65px' : '100px'"
            :src="img"
          />
        </v-flex>

        <!-- Text -->
        <v-flex xs7 px-1 mt-1>
          <div
            class="headline"
            :class="{ 'compactTitle' : $vuetify.breakpoint.smAndDown }"
          >
            {{ title }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
// un blurry zooming
// https://stackoverflow.com/questions/36143337/how-to-prevent-blur-from-css-transform

export default {
  name: 'BaseClickCard',
  props: {
    title: String,
    img: String,
  },
  methods: {
    click() {
      this.$emit('click', this.title.toLowerCase());
    },
  },
};
</script>

<style scoped>

  .card .headline {
    font-size: 1.45em !important;
    overflow: inherit !important;
    text-overflow: inherit !important;
    max-height: inherit !important;
    line-height: inherit !important;
  }

  .compactTitle {
    font-size: 15px !important;
    line-height: 1.3em !important;
  }

  .v-card__media img {
    width: inherit !important;
  }
</style>
