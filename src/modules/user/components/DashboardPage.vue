<template >
  <article class="ma-0 pa-0 fill-height"
            id="DashboardPage">

    <v-row>
      <v-col class="text-h1">
        {{ title }}
      </v-col>
    </v-row>

    <v-row>
      <v-col >
        <v-card>
          <v-card-title primary style="word-break: break-word;">
            {{ 'My Datasets' }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>


    <metadata-list v-if="hasUserDatasets"
                    ref="metadataList"
                    :listContent="filteredContent"
                    :mapFilteringPossible="mapFilteringPossible"
                    :placeHolderAmount="placeHolderAmount"
                    @clickedTag="catchTagClicked"
                    :selectedTagNames="selectedTagNames"
                    :allTags="allTags"
                    :showPlaceholder="keywordsPlaceholder"
                    @clickedExpand="catchFilterExpandClicked"
                    @clickedTagClose="catchTagCloseClicked"
                    @clickedClear="catchTagCleared"
                    :mode="mode"
                    :defaultListControls="defaultControls"
                    :enabledControls="enabledControls"
                    :useDynamicHeight="true"
                    :minMapHeight="310"
                    :mapTopLayout="$vuetify.breakpoint.lgAndUp"
                    :topFilteringLayout="$vuetify.breakpoint.mdAndDown"
                    :showSearch="false" />

    <NoUserDatasetsView v-if="!hasUserDatasets" />

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
 * Last modified  : 2020-08-12 15:53:55
 */

import { mapGetters } from 'vuex';

import {
  USER_NAMESPACE,
  FETCH_USER_DATA,
  ACTION_USER_SHOW,
  USER_GET_DATASETS,
} from '@/modules/user/store/userMutationsConsts';

import {
  LISTCONTROL_MAP_ACTIVE,
  LISTCONTROL_LIST_ACTIVE,
} from '@/store/metadataMutationsConsts';

import NoUserDatasetsView from '@/modules/user/components/NoUserDatasetsView';

export default {
  components: {
    NoUserDatasetsView,
  },
  beforeMount() {
    if (this.user) {
      this.fetchUserDatasets();
    }
  },
  computed: {
    ...mapGetters(USER_NAMESPACE, ['user']),
    prefilledEmail() {
      return this.$route.query.email;
    },
    prefilledKey() {
      return this.$route.query.key;
    },
    hasUserDatasets() {
      return this.userDataset && this.userDataset.length > 0;
    },
    userDataset() {
      if (this.user?.datasets?.length > 0) {
        return this.user.datasets;
      }

      return null;
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
          },
          commit: true,
          mutation: USER_GET_DATASETS,
        });
    },
  },
  data: () => ({
    title: 'Dashboard',
    placeHolderAmount: 4,
    userListDefaultControls: [
      LISTCONTROL_MAP_ACTIVE,
      LISTCONTROL_LIST_ACTIVE,
    ],
  }),
};
</script>


<style lang="scss" scoped>

</style>
