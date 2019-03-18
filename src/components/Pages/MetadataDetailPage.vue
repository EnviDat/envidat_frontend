<template>
  <v-container fluid
              tag="article"
              pa-0
  >

  <v-layout row wrap>

    <v-flex xs12
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
  </v-layout>

  <two-column-layout :firstColumn="$vuetify.breakpoint.mdAndUp ? firstColumn : singleColumn"
                      :secondColumn="$vuetify.breakpoint.mdAndUp ? secondColumn : []"
                      :showPlaceholder="showPlaceholder"
                      />

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
  } from '@/store/mutationsConsts';
  import {
    LOAD_METADATA_CONTENT_BY_ID,
    CLEAN_CURRENT_METADATA,
  } from '@/store/metadataMutationsConsts';
  import MetadataHeader from '@/components/MetadataDetailViews/MetadataHeader';
  import MetadataBody from '@/components/MetadataDetailViews/MetadataBody';
  import MetadataResources from '@/components/MetadataDetailViews/MetadataResources';
  import MetadataLocation from '@/components/MetadataDetailViews/MetadataLocation';
  import MetadataDetails from '@/components/MetadataDetailViews/MetadataDetails';
  import MetadataCitation from '@/components/MetadataDetailViews/MetadataCitation';
  import NotFoundView from '@/components/Errors/NotFoundView';
  import metaDataFactory from '@/components/metaDataFactory';
  import TwoColumnLayout from '@/components/Layouts/TwoColumnLayout';

  // import { LOAD_METADATAS_CONTENT } from '@/store/metadataMutationsConsts';

  // Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
  // for animations between the different parts of the Metadata

  // blured background?
  // https://paper-leaf.com/blog/2016/01/creating-blurred-background-using-only-css/

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
    },
    methods: {
      /**
       * @description
       */
      createMetadataContent: function createMetadataContent() {
        let currentContent = this.currentMetadataContent;
        const components = this.$options.components;

        currentContent = this.mixinMethods_enhanceMetadataEntry(currentContent, this.cardBGImages);

        if (currentContent && currentContent.title !== undefined) {
          // console.log("create content " + currentContent.spatial + " " + this.header);
          this.header = metaDataFactory.createHeader(currentContent, this.$vuetify.breakpoint);
          this.$set(components.MetadataHeader, 'genericProps', this.header);

          this.body = metaDataFactory.createBody(currentContent);
          this.$set(components.MetadataBody, 'genericProps', this.body);

          this.citation = metaDataFactory.createCitation(currentContent);
          this.$set(components.MetadataCitation, 'genericProps', this.citation);

          this.resources = metaDataFactory.createResources(currentContent);
          this.$set(components.MetadataResources, 'genericProps', this.resources);

          this.location = metaDataFactory.createLocation(currentContent);
          this.$set(components.MetadataLocation, 'genericProps', this.location);

          this.details = metaDataFactory.createDetails(currentContent);
          this.$set(components.MetadataDetails, 'genericProps', this.details);

          const fstCol = [
            components.MetadataBody,
            components.MetadataCitation,
            components.MetadataLocation,
          ];

          const sndCol = [
            components.MetadataResources,
            components.MetadataDetails,
          ];

          const snglCol = [
            components.MetadataBody,
            components.MetadataCitation,
            components.MetadataResources,
            components.MetadataLocation,
            components.MetadataDetails,
          ];

          this.firstColumn = fstCol;
          this.secondColumn = sndCol;
          this.singleColumn = snglCol;

          this.$forceUpdate();
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
      citation: {
        id: String,
        citationText: String,
        citationXmlLink: String,
        ciationIsoXmlLink: String,
        ciationGCMDXmlLink: String,
        fixedHeight: Boolean,
        showPlaceholder: Boolean,
      },
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
      // firstColumn: ['B', 'C', 'L'],
      // secondColumn: ['R', 'D'],
      // singleColumn: ['B', 'C', 'R', 'L', 'D'],
      firstColumn: [],
      // secondColumn: [MetadataResources, MetadataDetails],
      secondColumn: [],
      // singleColumn: [MetadataBody, MetadataCitation, MetadataResources, MetadataLocation, MetadataDetails],
      singleColumn: [],
    }),
    components: {
      MetadataHeader,
      MetadataBody,
      MetadataResources,
      MetadataLocation,
      MetadataDetails,
      MetadataCitation,
      NotFoundView,
      TwoColumnLayout,
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
  



