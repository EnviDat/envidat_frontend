<template>
  <v-container tag="article"
                fluid fill-height
                pa-0 >
    <v-layout row wrap >
      <v-flex xs12  >
        <form>
            <v-text-field
              v-model="name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="error.message"
              label="Error message"
              required
            ></v-text-field>

            <v-text-area v-model="error.details">

            </v-text-area>

            <v-text-area v-model="error.stack">

            </v-text-area>


            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/**
   * The about page of EnviDat. It consists of:
   * - TitleImage and Title (ImgAndTextLayout)
   * - Different Card with infomation about some about topics (ExpandableCard)
   */
import { mapGetters } from 'vuex';
import {
  REPORT_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mutationsConsts';


export default {
  /**
     * @description beforeRouteEnter is used to change background image of this page.
     * It's called via vue-router.
     */
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, REPORT_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  /**
     * @description reset the scrolling to the top,
     * because of the scrolling is set from the browsePage or metaDetailPage
     */
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      error: 'error',
    }),
  },
  methods: {
  },
  components: {
  },
  data: () => ({
    PageBGImage: './app_b_browsepage.jpg',
    name: '',
    email: '',
  }),
};
</script>
