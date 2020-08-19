<template >
  <article class="ma-0 pa-0 fill-height"
            id="DashboardPage">

    <v-row>
      <v-col class="text-h2">
        {{ title }}
      </v-col>
    </v-row>

    <v-row>
      <v-col >
        <v-card>
          <v-row justify="end"
                  align="center">
            <v-col class="text-h4" >
              My Datasets
            </v-col>
            <v-col>
              <BaseRectangleButton materialIconName="refresh"
                                    :buttonText="refreshButtonText"
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

    <v-row v-if="!hasUserDatasets" >
      <v-col>
        <NoUserDatasetsView />
      </v-col>
    </v-row>

    <v-row v-if="!user" >
      <v-col>
        <div >
          Not signed in
        </div>
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
 * Last modified  : 2020-08-19 11:17:04
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

import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
import NoUserDatasetsView from '@/modules/user/components/NoUserDatasetsView';
import MetadataList from '@/components/MetadataList';

export default {
  name: 'DashboardPage',
  components: {
    MetadataList,
    NoUserDatasetsView,
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
      'selectedTagNames',
      ]),
    hasUserDatasets() {
      return this.userDatasets && this.userDatasets.length > 0;
    },
  },
  methods: {
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
    catchTagClicked(tagName) {
      console.log(`Click on tag ${tagName}`);
    //   if (!this.mixinMethods_isTagSelected(tagName)) {
    //     const newTags = [...this.selectedTagNames, tagName];

    //     const tagsEncoded = this.mixinMethods_encodeTagForUrl(newTags);
    //     this.mixinMethods_additiveChangeRoute(BROWSE_PATH, undefined, tagsEncoded);
    //   }
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
    refreshButtonText: 'Reload Datasets',
    placeHolderAmount: 4,
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
