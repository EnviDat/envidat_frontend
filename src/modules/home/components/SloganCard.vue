<template>
  <v-card ripple hover
            @click="buttonCallback" >

    <v-container class="pa-0" grid-list-md
                    >
      <v-row v-bind="{ 'row' : $vuetify.breakpoint.xsOnly ? false : true,
                          'column' : $vuetify.breakpoint.xsOnly ? true : false, }" >
        <v-col class="py-0" cols="5"
                >
          <v-img
            :src="fingertipsImg"
            :style="{ 'max-height': '200px', 'min-height': '100%' }"
          />
        </v-col>

        <v-col class="pa-2" cols="7" >
          <div class="hidden-sm-and-down envidatSlogan display-1"
                v-html="slogan">
          </div>
          <div class="hidden-xs-only hidden-md-and-up envidatSlogan headline px-2"
                v-html="slogan">
          </div>
          <div class="hidden-sm-and-up envidatSlogan headline x"
                style="text-align: center;"
                v-html="slogan" >
          </div>
          <div class="pt-3 pb-5"
                :class="{'px-2': $vuetify.breakpoint.smAndDown }"
                :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 14px !important;' : '' " >
            {{ subSlogan }}
          </div>
        </v-col>
      </v-row>
    </v-container>


    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;" >

      <base-rectangle-button v-if="moreButtonText && moreButtonCallback"
                                class="mr-3"
                                :buttonText="moreButtonText"
                                :isSmall="true"
                                :isFlat="true"
                                @clicked="moreButtonCallback" />

      <base-rectangle-button :button-text="buttonText"
                              :is-small="true"
                              @clicked="buttonCallback"/>

    </v-card-actions>
  </v-card>
</template>


<script>
/**
 * SloganCard.vue is card with an image and a catch phrase and a few details
 *
 * @summary catch phrase card
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-11-13 18:19:42
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import fingertipsImg from '../assets/fingertips_small.jpg';

export default {
  name: 'SloganCard',
  components: { BaseRectangleButton },
  data: () => ({
    fingertipsImg,
  }),
  props: {
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
    moreButtonText: String,
    moreButtonCallback: Function,
  },
  methods: {
  },
};
</script>
