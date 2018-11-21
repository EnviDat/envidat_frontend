<template>
  <v-container fluid
              tag="article"
              py-2
  >
              <!-- v-bind="{ [`pa-0`]: this.$vuetify.breakpoint.smAndDown,
                        [`pa-2`]: this.$vuetify.breakpoint.mdAndUp }" -->

    <div v-if="currentMetadataContent">
      
      <v-layout row wrap v-if="twoColumnLayout">

        <v-flex xs12
                md8 offset-md2
                lg10 offset-lg1
                elevation-5
                style="z-index: 1;">

          <metadata-header v-bind="header"
                            v-on:clickedTag="catchTagClicked"
                            v-on:clickedBack="catchBackClicked"                           
                            :showPlaceholder="showPlaceholder" />

        </v-flex>

        <v-flex 
                v-bind="leftOrFullWidth"
                mb-2 
                style="z-index: 0;">

          <v-layout column>

            <v-flex mb-2 >
              <metadata-body v-bind="body" :isOnTop="true" 
                              :showPlaceholder="showPlaceholder" />
            </v-flex>

            <v-flex mb-2>
              <metadata-citation v-bind="citation"
                                  :showPlaceholder="showPlaceholder" />
            </v-flex>

            <v-flex mb-2>
              <metadata-location v-if="location"
                                  v-bind="location" />
            </v-flex>

            <v-flex mb-2 v-if="showDetailsOnTheLeft">
              <metadata-details v-if="details"
                              :details="details"
                              :showPlaceholder="showPlaceholder" />
            </v-flex>

          </v-layout>
        </v-flex>


        <v-flex 
                v-bind="rightOrFullWidth"
                mb-2 
                style="z-index: 0;">

          <v-layout row wrap>
            <v-flex xs12 mb-2>
              <metadata-resources v-bind="resources"
                                  :isOnTop="true"
                                  :twoColumnLayout="twoColumnLayout"
                                  :showPlaceholder="showPlaceholder" />
            </v-flex>

            <v-flex xs12 mb-2 v-if="!showDetailsOnTheLeft">
              <metadata-details v-if="details"
                                :details="details"
                                :showPlaceholder="showPlaceholder" />
            </v-flex>

          </v-layout>
        </v-flex>

      </v-layout>

      <v-layout row wrap v-if="!twoColumnLayout">

        <v-flex xs12
                md10 offset-md1
                elevation-5
                style="z-index: 1;">

          <metadata-header v-bind="header"
                            v-on:clickedTag="catchTagClicked"
                            v-on:clickedBack="catchBackClicked"
                            :showPlaceholder="showPlaceholder" />

        </v-flex>

        <v-flex xs12
                v-bind="leftOrFullWidth"
                mb-2 
                style="z-index: 0;">

          <metadata-body v-bind="body" :isOnTop="true"
                          :showPlaceholder="showPlaceholder" />
        </v-flex>

        <v-flex xs12
                mb-2 
                v-bind="rightOrFullWidth"
                 >

          <metadata-citation v-bind="citation" :fixedHeight="twoColumnLayout"
                              :showPlaceholder="showPlaceholder" />
        </v-flex>

        <v-flex xs12
                mb-2
                v-bind="fullWidthPadding"
                >

          <metadata-resources v-bind="resources" :twoColumnLayout="twoColumnLayout"
                              :showPlaceholder="showPlaceholder" />
        </v-flex>

        <v-flex xs12
                mb-2
                v-bind="fullWidthPadding"
                >
          <metadata-location v-if="location" v-bind="location" />
        </v-flex>

        <v-flex xs12
                mb-2
                v-bind="fullWidthPadding"
                >
          <metadata-details v-if="details" :details="details"
                              :showPlaceholder="showPlaceholder" />
        </v-flex>

      </v-layout>
    </div>

    <div v-else> 

        <not-found-view :backPath="notFoundBackPath">
        </not-found-view>

    </div>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '../../store/mutationsConsts';
  import {
    LOAD_METADATA_CONTENT_BY_ID,
    CLEAN_CURRENT_METADATA,
  } from '../../store/metadataMutationsConsts';
  import MetadataHeader from '../Views/MetadataViews/MetadataHeader';
  import MetadataBody from '../Views/MetadataViews/MetadataBody';
  import MetadataResources from '../Views/MetadataViews/MetadataResources';
  import MetadataLocation from '../Views/MetadataViews/MetadataLocation';
  import MetadataDetails from '../Views/MetadataViews/MetadataDetails';
  import MetadataCitation from '../Views/MetadataViews/MetadataCitation';
  import NotFoundView from '../Views/Errors/NotFoundView';
  import metaDataFactory from '../metaDataFactory';
  // import { LOAD_METADATAS_CONTENT } from '../../store/metadataMutationsConsts';

  // Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
  // for animations between the different parts of the Metadata

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_CURRENT_PAGE, 'metadataDetailPage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    mounted: function mounted() {
      // console.log('mounted ' + this.metadataId + ' loading ' + this.currentMetadataContent.title + ' ' + this.metadatasContentSize);
      if (!this.loadingMetadatasContent && this.currentMetadataContent.title === undefined) {
        // in case of directly entring the page load the content directly via Id
        this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
      } else {
        this.createMetadataContent();
      }
    },
    beforeDestroy: function beforeDestroy() {
      // clean current metadata to make be empty for the next to load up
      this.$store.commit(`metadata/${CLEAN_CURRENT_METADATA}`);
    },
    computed: {
      ...mapGetters({
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        loadingCurrentMetadataContent: 'metadata/loadingCurrentMetadataContent',
        currentMetadataContent: 'metadata/currentMetadataContent',
        iconImages: 'iconImages',
        cardBGImages: 'cardBGImages',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      metadataId: function metadataId() {
        return this.$route.params.metadataid;
      },
      metadataIdValid: function metadataIdValid() {
        return true;
        // return (this.metadataId && this.metadataIds !== undefined
        //  && this.metadataIds.includes(this.metadataId));
      },
      showPlaceholder: function showPlaceholder() {
        return this.loadingMetadatasContent || this.loadingCurrentMetadataContent;
      },
      leftOrFullWidth: function leftOrFullWidth() {
        return this.twoColumnLayout ? this.halfWidthLeft : this.fullWidthPadding;
      },
      rightOrFullWidth: function rightOrFullWidth() {
        return this.twoColumnLayout ? this.halfWidthRight : this.fullWidthPadding;
      },
      twoColumnLayout: function twoColumnLayout() {
        return this.$vuetify.breakpoint.lgAndUp;
      },
      fullWidthPadding: function fullwidthPadding() {
        const json = {
          md10: true,
          'offset-md1': true,
        };

        if (this.$vuetify.breakpoint.xsOnly) {
          json['px-1'] = true;
        } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
          json['px-2'] = true;
        } else if (this.$vuetify.breakpoint.lgAndUp) {
          json['px-3'] = true;
        }

        return json;
      },
      halfWidthLeft: function halfWidthLeft() {
        const json = {
          md4: true,
          'offset-md2': true,
          lg5: true,
          'offset-lg1': true,
        };

        if (this.$vuetify.breakpoint.xsOnly) {
          json['px-1'] = true;
        } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
          json['pl-2'] = true;
          json['pr-1'] = true;
        } else if (this.$vuetify.breakpoint.lgAndUp) {
          json['pl-3'] = true;
          json['pr-1'] = true;
        }

        return json;
      },
      halfWidthRight: function halfWidthRight() {
        const json = {
          md4: true,
          lg5: true,
        };

        if (this.$vuetify.breakpoint.xsOnly) {
          json['px-1'] = true;
        } else if (this.$vuetify.breakpoint.mdAndUp
          && this.$vuetify.breakpoint.lgAndDown) {
          json['pl-1'] = true;
          json['pr-2'] = true;
        } else if (this.$vuetify.breakpoint.lgAndUp) {
          json['pl-1'] = true;
          json['pr-3'] = true;
        }

        return json;
      },
      showDetailsOnTheLeft: function showDetailsOnTheLeft() {
        const left = this.resources
        && this.resources.resources.length > this.amountOfResourcesToShowDetailsLeft;
        return left;
      },
    },
    methods: {
      createMetadataContent: function createMetadataContent() {
        let currentContent = this.currentMetadataContent;

        currentContent = this.enhanceMetadataEntry(currentContent, this.cardBGImages);

        if (currentContent && currentContent.title !== undefined) {
          // console.log("create content " + currentContent.spatial + " " + this.header);
          this.header = metaDataFactory.createHeader(currentContent, this.$vuetify.breakpoint);
          this.body = metaDataFactory.createBody(currentContent);
          this.citation = metaDataFactory.createCitation(currentContent);
          this.resources = metaDataFactory.createResources(currentContent);
          this.location = metaDataFactory.createLocation(currentContent);
          this.details = metaDataFactory.createDetails(currentContent);
        }
      },
      catchTagClicked: function catchTagClicked(tagName) {
        const tagNames = [];
        tagNames.push(tagName);

        const tagsEncoded = this.encodeTagForUrl(tagNames);
        const query = {};
        query.tags = tagsEncoded;

        this.$router.push({
          path: '/browse',
          query,
        });
      },
      catchBackClicked: function catchBackClicked() {
        // console.log(this.$router);
        this.$router.go(-1);
      },
      OnScroll: function OnScroll(scrollPos) {
        this.savedPosition = scrollPos;
      },
    },
    watch: {
      currentMetadataContent: function updateContent() {
        this.createMetadataContent();
      },
      metadatasContent: function updateContent() {
        // in case all the metadataContents are already loaded take it from there
        // if EnviDat is called via MetadataDetailPage URL directly

        if (!this.loadingCurrentMetadataContent) {
          this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
        }
      },
    },
    data: () => ({
      PageBGImage: './app_b_browsepage.jpg',
      header: null,
      body: null,
      citation: null,
      resources: null,
      location: null,
      details: null,
      amountOfResourcesToShowDetailsLeft: 4,
      notFoundBackPath: 'browse',
    }),
    components: {
      MetadataHeader,
      MetadataBody,
      MetadataResources,
      MetadataLocation,
      MetadataDetails,
      MetadataCitation,
      NotFoundView,
    },
  };
</script>

<style>

  .metadata_title {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }

  .metadataResourceCard {
    min-height: 100px !important;
  }

  .metadataResourceCard .headline {
    font-size: 20px !important;
  }

  .resourceCardText {
    font-size: 12px;
  }

</style>
  



