<template >
  <article class="ma-0 pa-0 fill-height"
            id="DashboardPage">

    <v-row v-if="!user" >
      <v-col>
        <NotFoundCard v-bind="notSignedInInfos" 
                      :actionButtonCallback="catchSigninClick" />
      </v-col>
    </v-row>

    <v-row v-if="user" >
      <v-col cols="12"
              class="text-display-1">
        {{ title }}
      </v-col>

      <v-col cols="12" >
        <v-card class="pa-4">
          <v-row justify="end"
                  align="center"
                  no-gutters>
            <v-col class="text-h6" >
              My Datasets
            </v-col>
            <v-col>
              <BaseRectangleButton materialIconName="refresh"
                                    :tooltipText="refreshButtonText"
                                    isFlat
                                    @clicked="catchRefreshClick" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="hasUserDatasets" >
      <v-col class="pt-0">

        <metadata-list ref="metadataList"
                        :listContent="userDatasets"
                        :mapFilteringPossible="$vuetify.breakpoint.smAndUp"
                        :placeHolderAmount="placeHolderAmount"
                        @clickedTag="catchTagClicked"
                        :selectedTagNames="selectedTagNames"
                        :allTags="allTags"
                        :showPlaceholder="updatingTags"
                        @clickedTagClose="catchTagCloseClicked"
                        @clickedClear="catchTagCleared"
                        :defaultListControls="userListDefaultControls"
                        :enabledControls="userListEnabledControls"
                        :useDynamicHeight="true"
                        :minMapHeight="310"
                        :mapTopLayout="$vuetify.breakpoint.lgAndUp"
                        :topFilteringLayout="$vuetify.breakpoint.mdAndDown"
                        :showSearch="false" />

      </v-col>
    </v-row>

    <v-row v-if="user && !hasUserDatasets" >
      <v-col>
        <NotFoundCard v-bind="noDatasetsInfos"
                      :actionButtonCallback="catchCreateClick" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-dialog
          v-model="showModal"
          attach="#DashboardPage"
        >
        <template v-slot:activator="{on, attrs}">
          <v-btn v-bind="attrs"
                v-on="on" >
                showModal
            </v-btn>

        </template>
          <v-card>
            dialog thingy
          </v-card>

          <!-- hide-overlay
          lazy
          max-width="none"
          origin="center center"
          persistent
          return-value="returnValue"
          scrollable
          transition="dialog-transition"
          value="value"
          width="auto" -->
          
        </v-dialog>
      </v-col>
    </v-row>

  </article>

</template>

<script>
/**
 * Dashboard Page
 *
 * @summary Dashboard page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:18:32 
 * Last modified  : 2020-08-20 07:58:47
 */

import {
  mapState,
  mapGetters,
} from 'vuex';

import {
  USER_NAMESPACE,
  FETCH_USER_DATA,
  ACTION_USER_SHOW,
  USER_GET_DATASETS,
} from '@/modules/user/store/userMutationsConsts';

import {
  METADATA_NAMESPACE,
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_LIST_ACTIVE,
  LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
} from '@/store/metadataMutationsConsts';

import {
  USER_DASHBOARD_PAGENAME,
  USER_DASHBOARD_PATH,
  USER_SIGNIN_PATH,
} from '@/router/routeConsts';

import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import NotFoundCard from '@/components/Cards/NotFoundCard';
import MetadataList from '@/components/MetadataList';

import UserNotFound1 from '@/modules/user/assets/UserNotFound1.jpg';
import UserNotFound2 from '@/modules/user/assets/UserNotFound2.jpg';

export default {
  name: 'DashboardPage',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, USER_DASHBOARD_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  components: {
    MetadataList,
    NotFoundCard,
    BaseRectangleButton,
  },
  beforeMount() {
    if (this.user) {
      this.fetchUserDatasets();
    }
  },
  computed: {
    ...mapState(USER_NAMESPACE, ['user', 'userLoading']),
    ...mapGetters(USER_NAMESPACE, ['userDatasets']),
    ...mapGetters(METADATA_NAMESPACE, [
      'allTags',
      'updatingTags',
      ]),
    hasUserDatasets() {
      return this.userDatasets && this.userDatasets.length > 0;
    },
  },
  methods: {
    loadRouteTags() {
      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
      let decodedTags = [];

      if (tagsEncoded.length > 0) {
        decodedTags = this.mixinMethods_decodeTagsFromUrl(tagsEncoded);
      }

      if (!this.mixinMethods_areArraysIdentical(this.selectedTagNames, decodedTags)) {
        this.selectedTagNames = decodedTags;
        return true;
      }

      return false;
    },
    fetchUserDatasets() {
      this.$store.dispatch(`${USER_NAMESPACE}/${FETCH_USER_DATA}`,
        {
          action: ACTION_USER_SHOW,
          body: {
            id: this.user.id,
            include_datasets: true,
            key: this.user.apikey,
          },
          commit: true,
          mutation: USER_GET_DATASETS,
        });
    },
    catchRefreshClick() {
      if (this.user) {
        this.fetchUserDatasets();
      }
    },
    catchSigninClick() {
      this.$router.push({ path: USER_SIGNIN_PATH, query: '' });
    },
    catchCreateClick() {
      console.log('clicked create dataset');
      // this.$router.push({ path: USER_SIGNIN_PATH, query: '' });
    },
    catchTagClicked(tagName) {
      console.log(`Click on tag ${tagName}`);
      if (!this.mixinMethods_isTagSelected(tagName)) {
        const newTags = [...this.selectedTagNames, tagName];

        const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
        this.mixinMethods_additiveChangeRoute(USER_DASHBOARD_PATH, undefined, tagsEncoded);
      }
    },
    catchTagCloseClicked(tagId) {
      console.log(`Click close on tag ${tagId}`);
    //   if (this.selectedTagNames === undefined) {
    //     return;
    //   }

    //   const newTags = this.selectedTagNames.filter(tag => tag !== tagId);

    //   const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
    //   this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
    },
    catchTagCleared() {
      console.log('Tags cleared');
    //   this.selectedTagNames = [];
    //   this.filterContent();
    },
  },
  data: () => ({
    title: 'Dashboard',
    PageBGImage: './app_b_browsepage.jpg',
    refreshButtonText: 'Reload Datasets',
    placeHolderAmount: 4,
    showModal: false,
    selectedTagNames: [],
    notSignedInInfos: {
      title: 'Not Signed in',
      description: 'Sign in with your e-mail to see your datasets.',
      actionButtonText: 'Sign in',
      image: UserNotFound1,
    },
    noDatasetsInfos: {
      title: 'No Datasets',
      description: "It seems you don't have any datasets.",
      actionDescription: 'Get started and create a new dataset',
      actionButtonText: 'New Dataset',
      image: UserNotFound2,
    },
    userListDefaultControls: [
      LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
    ],
    userListEnabledControls: [
      LISTCONTROL_LIST_ACTIVE,
      LISTCONTROL_MAP_ACTIVE,
      LISTCONTROL_COMPACT_LAYOUT_ACTIVE,
    ],
  }),
};
</script>


<style lang="scss" scoped>

</style>
