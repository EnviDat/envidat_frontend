<template >
  <v-container class="pa-0"
                tag="article"
                fluid
                id="DashboardPage">

    <div v-if="!user"
          class="notSignedinGrid">

    <NotFoundCard v-bind="notSignedInInfos" 
                  :actionButtonCallback="catchSigninClick" />
   </div>

   <div v-if="user"
        class="dashboardGrid"
        :style="`grid-template-rows: 30px ${userCardHeight}px auto 380px`">

    <div class="header" >

      <div class="headerTitle title" >
        {{ headerTitle }}
      </div>

      <!-- <div class="headerButtons" >

        <div class="skeleton skeleton-size-big skeleton-color-yellow skeleton-animation-shimmer" >
          <div style="width: 28px; height: 28px;"
                class="bone bone-type-image bone-style-round" />
        </div>

        <div class="skeleton skeleton-size-big skeleton-color-yellow skeleton-animation-shimmer" >
          <div style="width: 28px; height: 28px;"
                class="bone bone-type-image bone-style-round" />
        </div>

      </div> -->

    </div>

    <div class="topBoard" >

      <WelcomeCard :userName="user.fullname"
                    :publishedDatasetCount="publishedDatasets.length"
                    :unpublishedDatasetCount="unpublishedDatasets.length" 
                    :editingDatasetCount="editingDatasets.length"
                    :createClickCallback="catchCreateClick"
                    :unpublishedClickCallback="catchShowUnpublishedClick"
                    :editingClickCallback="catchEditingClick" />

      <UserCard :height="userCardHeight"
                :userName="user.fullname"
                :email="user.email"
                :emailHash="user.email_hash"
                :nameInitials="nameInitials"
                :datasetCount="publishedDatasets.length"  />


    </div>

    <div class="midBoard pt-4" >

      <TitleCard title="My Datasets"
                  icon="refresh"
                  :tooltipText="refreshButtonText"
                  :clickCallback="catchRefreshClick" />

      <MetadataList v-if="hasUserDatasets"
                      ref="metadataList"
                      :listContent="userDatasets"
                      :mapFilteringPossible="$vuetify.breakpoint.smAndUp"
                      :loading="loading"
                      :placeHolderAmount="placeHolderAmount"
                      @clickedTag="catchTagClicked"
                      :selectedTagNames="selectedTagNames"
                      :allTags="allTags"
                      :showPlaceholder="updatingTags"
                      @clickedTagClose="catchTagCloseClicked"
                      @clickedClear="catchTagCleared"
                      :defaultListControls="userListDefaultControls"
                      :enabledControls="userListEnabledControls"
                      :useDynamicHeight="false"
                      :minMapHeight="250"
                      :mapTopLayout="$vuetify.breakpoint.mdAndUp"
                      :topFilteringLayout="$vuetify.breakpoint.mdAndDown"
                      :showSearch="false" />


      <NotFoundCard v-if="!hasUserDatasets"
                    v-bind="noDatasetsInfos"
                    :actionButtonCallback="catchCreateClick" />

    </div>

    <div class="bottomBoard" >

      <TitleCard :title="`Recent Datasets of ${usersOrganisation}`"
                  icon="refresh"
                  :tooltipText="refreshOrgaButtonText"
                  :clickCallback="catchRefreshOrgaClick" />
      
      <div class="orgaDatasets" >

        <MetadataCardPlaceholder id="orgaDataset"
                                  class="mx-2"
                                  v-for="n in placeHolderAmount"
                                  :key="n"
                                  :style="`height: 300px; min-width: ${placeHolderWidth}px;`" />
      </div>

    </div>

   </div>
   
<!--
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
          
        </v-dialog>
      </v-col>
    </v-row> -->

  </v-container>

</template>

<script>
/**
 * Dashboard Page
 *
 * @summary Dashboard page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:18:32 
 * Last modified  : 2020-08-25 23:31:41
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

import { getNameInitials } from '@/factories/authorFactory';

// import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import NotFoundCard from '@/components/Cards/NotFoundCard';
import MetadataList from '@/components/MetadataList';
import MetadataCardPlaceholder from '@/components/Cards/MetadataCardPlaceholder';
import WelcomeCard from '@/components/Cards/WelcomeCard';
import TitleCard from '@/components/Cards/TitleCard';
import UserCard from '@/components/Cards/UserCard';

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
    WelcomeCard,
    TitleCard,
    UserCard,
    BaseIconButton,
    MetadataCardPlaceholder,
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
    loading() {
      return this.userLoading;
    },
    hasUserDatasets() {
      return this.userDatasets && this.userDatasets.length > 0;
    },
    publishedDatasets() {
      if (this.user.datasets) {
        return this.user.datasets.filter(dataset => !dataset.private);
      }

      return [];
    },
    unpublishedDatasets() {
      if (this.user.datasets) {
        return this.user.datasets.filter(dataset => dataset.private);
      }

      return [];
    },
    editingDatasets() {
      return [];
    },
    nameInitials() {
      return getNameInitials(this.user);
    },
    usersOrganisation() {
      return this.user.organisation ? this.user.organisation.name : 'your organisation';
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
    catchRefreshOrgaClick() {
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
    catchShowUnpublishedClick() {
      console.log('clicked show unpublished dataset');
      // this.$router.push({ path: USER_SIGNIN_PATH, query: '' });
    },
    catchEditingClick() {
      console.log('clicked editing dataset');
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
    PageBGImage: './app_b_dashboardpage.jpg',
    refreshButtonText: 'Reload Datasets',
    refreshOrgaButtonText: 'Reload Organisation Datasets',
    placeHolderAmount: 5,
    placeHolderWidth: 370,
    userCardHeight: 350,
    showModal: false,
    left: false,
    right: false,
    headerTitle: 'Dashboard',
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

<style lang="sass" scoped>
  @import "~vuetify/src/styles/settings/_variables.scss"
  $gridGap: $spacer * 4

  .notSignedinGrid
    display: grid
    grid-template-rows: auto 1fr
    gap: $gridGap

  .dashboardGrid
    display: grid
    gap: $gridGap
    grid-template-columns: 1fr

    .header
      display: grid
      grid-template-columns: 3fr 1fr
      align-items: center

      .headerButtons
        display: grid
        grid-template-columns: repeat(2, auto)
        justify-content: end
        gap: $gridGap

    .topBoard
      display: grid
      grid-template-columns: 5fr 1fr
      gap: $gridGap

    .midBoard
      display: grid
      grid-template-rows: 36px auto
      gap: $gridGap
      transition: 1s all

      .datasetTitleCard
        display: grid
        grid-template-columns: 11fr 1fr

    .bottomBoard
      overflow: auto
      display: grid
      grid-template-rows: 36px auto
      gap: $gridGap

      .orgaDatasets
        overflow: auto
        display: grid
        grid-auto-flow: column

      .orgaDatasets:first-child
        margin-left: 0

      .orgaDatasets:last-child
        margin-right: 0

</style>

<style scoped>
  /* html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: #222;
  } */

  /* #placeHolderContainer {
    width: 100%;
    height: 100%;
    background: center url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(40,40,40)' viewBox='0 0 100 169.5'%3E%3Cpolygon points='50,34.75 93.5,59.75 93.5,109.75 50,134.75 6.5,109.75 6.5,59.75'%3E%3C/polygon%3E%3Cpolygon points='0,-50 43.5,-25 43.5,25 0,50 -43.5,25 -43.5,-25'%3E%3C/polygon%3E%3Cpolygon points='100,-50 143.5,-25 143.5,25 100,50 56.5,25 56.5,-25'%3E%3C/polygon%3E%3Cpolygon points='0,119.5 43.5,144.5 43.5,194.5 0,219.5 -43.5,194.5 -43.5,144.5'%3E%3C/polygon%3E%3Cpolygon points='100,119.5 143.5,144.5 143.5,194.5 100,219.5 56.5,194.5 56.5,144.5'%3E%3C/polygon%3E%3C/svg%3E");
    background-size: 8px;
  } */
</style>
