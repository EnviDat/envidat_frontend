<template>
  <v-card
    ripple
    hover
    @click.native="clicked"
  >
    <v-container
      grid-list-md
      pa-0
    >
      <v-layout
        row
        align-center
      >
        <v-flex
          xs5
          py-0
        >
          <v-img
            class="imagezoom"
            :height=" $vuetify.breakpoint.smAndDown ? '65px' : '100px' "
            :src="img"
          />
        </v-flex>

        <v-flex
          xs7
          mx-1
          mt-1
        >
          <div
            class="headline"
            :class="{ 'compactTitle' : this.$vuetify.breakpoint.smAndDown }"
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
  props: {
    title: String,
    img: String,
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked', this.title.toLowerCase());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
