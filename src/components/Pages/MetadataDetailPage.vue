<template>
  <v-container fluid
              tag="article"
              pa-0
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
                            v-on:clickedAuthor="catchAuthorClicked"
                            :showPlaceholder="showPlaceholder"
                            :doiIcon="doiIcon"
                            :contactIcon="contactIcon"
                            :mailIcon="mailIcon"
                            :licenseIcon="licenseIcon"
                            />

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
              <metadata-location v-bind="location" />
            </v-flex>

            <v-flex mb-2 v-if="showDetailsOnTheLeft">
              <metadata-details :details="details"
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
                                  :showPlaceholder="showPlaceholder"
                                  :doiIcon="doiIcon"
                                  :downloadIcon="downloadIcon"
                                  :linkIcon="linkIcon"
                                  :fileSizeIcon="fileSizeIcon"
                                  :dateCreatedIcon="dateCreatedIcon"
                                  :lastModifiedIcon="lastModifiedIcon"
                                  />

            </v-flex>

            <v-flex xs12 mb-2 v-if="!showDetailsOnTheLeft">
              <metadata-details :details="details"
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
                            v-on:clickedAuthor="catchAuthorClicked"
                            :showPlaceholder="showPlaceholder"
                            :doiIcon="doiIcon"
                            :contactIcon="contactIcon"
                            :mailIcon="mailIcon"
                            :licenseIcon="licenseIcon"
                            />

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

          <metadata-resources v-bind="resources"
                              :twoColumnLayout="twoColumnLayout"
                              :showPlaceholder="showPlaceholder"
                              :doiIcon="doiIcon"
                              :downloadIcon="downloadIcon"
                              :linkIcon="linkIcon"
                              :fileSizeIcon="fileSizeIcon"
                              :dateCreatedIcon="dateCreatedIcon"
                              :lastModifiedIcon="lastModifiedIcon"
                              />
        </v-flex>

        <v-flex xs12
                mb-2
                v-bind="fullWidthPadding"
                >
          <metadata-location v-bind="location" />
        </v-flex>

        <v-flex xs12
                mb-2
                v-bind="fullWidthPadding"
                >
          <metadata-details :details="details"
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
  /**
   * The MetadataDetailPage shows all the important information of a metadata entry.
   */
  import { mapGetters } from 'vuex';
  import { BROWSE_PATH } from '@/router/routeConsts';
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

  // blured background?
  // https://paper-leaf.com/blog/2016/01/creating-blurred-background-using-only-css/

  //TODO: Check #/metadata/2016gl071822 for the lost list of data and the background

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(SET_CURRENT_PAGE, 'metadataDetailPage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    /**
     * @description load all the icons once before the first component's rendering.
     */
    beforeMount: function beforeMount() {
      this.downloadIcon = this.mixinMethods_getIcon('download');
      this.linkIcon = this.mixinMethods_getIcon('link');
      this.doiIcon = this.mixinMethods_getIcon('doi');
      this.fileSizeIcon = this.mixinMethods_getIcon('fileSize');
      this.dateCreatedIcon = this.mixinMethods_getIcon('dateCreated');
      this.lastModifiedIcon = this.mixinMethods_getIcon('dateModified');
      this.contactIcon = this.mixinMethods_getIcon('contact2');
      this.mailIcon = this.mixinMethods_getIcon('mail');
      this.licenseIcon = this.mixinMethods_getIcon('license');
    },
    /**
     * @description reset the scrolling to the top.
     */
    mounted: function mounted() {
      this.loadMetaDataContent();
      window.scrollTo(0, 0);
    },
    /**
     * @description
     */
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
        detailPageBackRoute: 'metadata/detailPageBackRoute',
        iconImages: 'iconImages',
        cardBGImages: 'cardBGImages',
      }),
      /**
       * @returns {Number} Size of the metadatasContent
       */
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      /**
       * @returns {String} the metadataId from the route
       */
      metadataId: function metadataId() {
        return this.$route.params.metadataid;
      },
      /**
       * @returns {Boolean} if the placeHolders should be shown be somethings are still loading
       */
      showPlaceholder: function showPlaceholder() {
        return this.loadingMetadatasContent || this.loadingCurrentMetadataContent;
      },
      /**
       * @returns {Boolean}
       */
      leftOrFullWidth: function leftOrFullWidth() {
        return this.twoColumnLayout ? this.halfWidthLeft : this.fullWidthPadding;
      },
      /**
       * @returns {Boolean}
       */
      rightOrFullWidth: function rightOrFullWidth() {
        return this.twoColumnLayout ? this.halfWidthRight : this.fullWidthPadding;
      },
      /**
       * @returns {Boolean}
       */
      twoColumnLayout: function twoColumnLayout() {
        return this.$vuetify.breakpoint.lgAndUp;
      },
      /**
       * @returns {Object} with the diffent paddings based on the screen size (this.$vuetify.breakpoint)
       */
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
      /**
       * @description
       * @returns {any}
       */
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
      /**
       * @description
       * @returns {any}
       */
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
      /**
       * @description
       * @returns {any}
       */
      showDetailsOnTheLeft: function showDetailsOnTheLeft() {
        const left = this.resources
        && this.resources.resources.length > this.amountOfResourcesToShowDetailsLeft;
        return left;
      },
    },
    methods: {
      /**
       * @description
       */
      createMetadataContent: function createMetadataContent() {
        let currentContent = this.currentMetadataContent;

        currentContent = this.mixinMethods_enhanceMetadataEntry(currentContent, this.cardBGImages);

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
      /**
       * @description
       * @param {any} idOrName
       * @returns {any}
       */
      isCurrentIdOrName: function isCurrentIdOrName(idOrName) {
        return this.currentMetadataContent.id === idOrName || this.currentMetadataContent.name === idOrName;
      },
      /**
       * @description
       * @param {any} tagName
       */
      catchTagClicked: function catchTagClicked(tagName) {
        const tagNames = [];
        tagNames.push(tagName);

        const tagsEncoded = this.mixinMethods_encodeTagForUrl(tagNames);
        const query = {};
        query.tags = tagsEncoded;

        this.$router.push({
          path: BROWSE_PATH,
          query,
        });
      },
      /**
       * @description
       * @param {any} authorName
       */
      catchAuthorClicked: function catchAuthorClicked(authorName) {
        const query = {};
        query.search = authorName;

        this.$router.push({
          path: BROWSE_PATH,
          query,
        });
      },
      /**
       * @description
       */
      catchBackClicked: function catchBackClicked() {
        // console.log(this.$router);
        const backRoute = this.detailPageBackRoute;

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
      /**
       * @description loads the content of this metadata entry (metadataid) from the URL.
       * Either loads it from the backend via action or creates it from the localStorage.
       */
      loadMetaDataContent: function loadMetaDataContent() {
        if (!this.loadingMetadatasContent
        && (this.currentMetadataContent.title === undefined
            || !this.isCurrentIdOrName(this.metadataId))) {
          // in case of directly entring the page load the content directly via Id
          this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
        } else {
          this.createMetadataContent();
        }
      },
    },
    watch: {
      /* eslint-disable no-unused-vars */
      /**
       * @description
       * @param {any} to
       * @param {any} from
       */
      $route: function watchRouteChanges(to, from) {
        // react on changes of the route (browser back / forward click)

        this.loadMetaDataContent();
      },
      /**
       * @description
       */
      currentMetadataContent: function updateContent() {
        this.createMetadataContent();
      },
      /**
       * @description
       */
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
      downloadIcon: null,
      linkIcon: null,
      doiIcon: null,
      fileSizeIcon: null,
      dateCreatedIcon: null,
      lastModifiedIcon: null,
      contactIcon: null,
      mailIcon: null,
      licenseIcon: null,
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
  



