<template>
  <v-container tag="article"
                fluid fill-height
                pa-0
  >  

    <v-layout row wrap >

      <!-- <v-flex xs12 lg10 offset-lg1>

        <img-and-text-layout :dark="false"
                        :blur="true"
                        :img="books"
                        :height="300"
                        :textFontSize="16"
                        :parallax="true"
                        :title="policiesTitle"
                        >

          <base-icon-button style="position: absolute; top: 0px; right: 0px; z-index: 10;"
                                  materialIconName="close"
                                  :outlined="true"
                                  color="white"
                                  iconColor="white"
                                  toolTipText ="Close Policies Page"
                                  :toolTipBottom="true"
                                  v-on:clicked="catchBackClicked" />

        </img-and-text-layout>
      </v-flex> -->


      <v-flex xs12 md8 offset-md2 lg10 offset-lg1 mt-5 >
        <generic-text-layout :textArray="policiesInfo" />
      </v-flex>

    </v-layout>


  </v-container>
</template>

<script>
  /**
   * The policies page of EnviDat. It consists of:
   * - TitleImage and Title (ImgAndTextLayout)
   */
  import { mapGetters } from 'vuex';
  import { BROWSE_PATH } from '@/router/routeConsts';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '@/store/mutationsConsts';

  import BaseIconButton from '@/components/BaseElements/BaseIconButton';
  import ImgAndTextLayout from '@/components/Layouts/ImgAndTextLayout';
  import GenericTextLayout from '@/components/Layouts/GenericTextLayout';

  // import books from '@/assets/policies/books.jpg';
  // import inkpen from '@/assets/policies/inkpen.jpg';
  // import lawBooks from '@/assets/policies/law_books.jpg';

  // import ExpandableCard from '@/components/Cards/ExpandableCard';

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, 'aboutPage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    /**
     * @description reset the scrolling to the top,
     * because of the scrolling is set from the browsePage or metaDetailPage
     */
    mounted: function mounted() {
      window.scrollTo(0, 0);
    },
    computed: {
      ...mapGetters({
        policiesPageBackRoute: 'policies/policiesPageBackRoute',
        policiesTitle: 'policies/policiesTitle',
        policiesInfo: 'policies/policiesInfo',
      }),
      /**
       * @returns missionImage based on the screen size
       */
      missionImg: function missionImg() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return team;
        }

        return teamSmall;
      },
    },
    methods: {
      /**
       * @description changes the url to page the user was before. Fallback: BrowsePage
       */
      catchBackClicked: function catchBackClicked() {
        const backRoute = this.aboutPageBackRoute;

        if (backRoute) {
          this.$router.push({
            path: backRoute.path,
            query: backRoute.query,
            params: backRoute.params,
          });
          return;
        }

        this.$router.push({
          path: BROWSE_PATH,
        });
      },
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      // books,
      // inkpen,
      // lawBooks,
    }),
    components: {
      GenericTextLayout,
      ImgAndTextLayout,
      BaseIconButton,
    },
  };
</script>

