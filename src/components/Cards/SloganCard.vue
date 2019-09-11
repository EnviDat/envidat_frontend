<template>
  <v-card ripple hover @click.native="onClick">
    <v-container grid-list-md pa-0>
      <v-layout
        v-bind="{ 'row' : $vuetify.breakpoint.xsOnly ? false : true,
                  'column' : $vuetify.breakpoint.xsOnly ? true : false,
        }"
      >
        <v-flex xs5 py-0>
          <v-img
            :src="fingertipsImg"
            :style="{ 'max-height': '200px', 'min-height': '100%' }"
          />
        </v-flex>

        <v-flex xs7 pa-2>
          <div
            class="hidden-sm-and-down envidatSlogan display-1"
          >{{slogan}}</div>

          <div
            class="hidden-xs-only hidden-md-and-up envidatSlogan headline px-2"
          >{{slogan}}</div>

          <div
            class="hidden-sm-and-up envidatSlogan headline x"
            style="text-align: center;"
          >{{slogan}}</div>

          <div
            class="pt-3 pb-5"
            :class="{'px-2': $vuetify.breakpoint.smAndDown }"
            :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 14px !important;' : '' "
          >
            {{ subSlogan }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>


    <v-card-actions class="ma-0 pa-2" style="position: absolute; bottom: 0; right: 0;">
      <base-rectangle-button
        :button-text="buttonText"
        :is-small="true"
      />
    </v-card-actions>
  </v-card>
</template>


<script>
import fingertipsImg from '@/assets/cards/fingertips_small.jpg';
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  components: { BaseRectangleButton },
  props: {
    slogan: String,
    subSlogan: String,
    buttonText: String,
  },
  data: () => ({
    fingertipsImg,
  }),
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>

</style>
