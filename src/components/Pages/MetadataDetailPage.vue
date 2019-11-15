<template>
  <v-container fluid
                tag="article"
                pa-0 >
    <v-layout row wrap  >
      <v-flex xs12
              elevation-5
              ref="header"
              style="z-index: 1; position: absolute; left: 0;" 
              :style="headerStyle" >
        <metadata-header v-bind="header"
                          :metadataId="metadataId"
                          :showPlaceholder="showPlaceholder"
                          :doiIcon="doiIcon"
                          :contactIcon="contactIcon"
                          :mailIcon="mailIcon"
                          :licenseIcon="licenseIcon"
                          @clickedTag="catchTagClicked"
                          @clickedBack="catchBackClicked"
                          @clickedAuthor="catchAuthorClicked"
                          @checkSize="resize"
                          :expanded="headerExpanded" />
      </v-flex>
    </v-layout>

    <two-column-layout :style="`position: relative; top: ${headerHeight()}px`"
                        :first-column="firstColumn"
                        :second-column="secondColumn"
                        :show-placeholder="showPlaceholder" >

      <template v-slot:leftColumn>

        <v-flex v-for="(entry, index) in firstColumn"
                :key="`left_${index}`"
                mb-2 >
          <component :is="entry"
                      :generic-props="entry.genericProps"
                      :show-placeholder="showPlaceholder" />
        </v-flex>
      </template>

      <template v-slot:rightColumn>
        <v-flex v-for="(entry, index) in secondColumn"
                :key="`right_${index}`"
                mb-2 >
          <component :is="entry"
                      :generic-props="entry.genericProps"
                      :show-placeholder="showPlaceholder" />
        </v-flex>
      </template>
    </two-column-layout>
  </v-container>
</template>

<script>
/**
 * The MetadataDetailPage shows all the important information of a metadata entry.
 * It consists of all the MetadataDetailViews.
 *
 * @summary metadata detail page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-14 17:41:06
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import {
  BROWSE_PATH,
  METADATADETAIL_PAGENAME,
} from '@/router/routeConsts';
import {
  SET_APP_BACKGROUND,
  SET_CURRENT_PAGE,
} from '@/store/mainMutationsConsts';
import {
  METADATA_NAMESPACE,
  LOAD_METADATA_CONTENT_BY_ID,
  CLEAN_CURRENT_METADATA,
} from '@/store/metadataMutationsConsts';
import MetadataHeader from '@/components/Metadata/MetadataHeader';
import MetadataBody from '@/components/Metadata/MetadataBody';
import MetadataResources from '@/components/Metadata/MetadataResources';
import MetadataLocation from '@/components/Metadata/MetadataLocation';
import MetadataDetails from '@/components/Metadata/MetadataDetails';
import MetadataCitation from '@/components/Metadata/MetadataCitation';
import metaDataFactory from '@/factories/metaDataFactory';
import TwoColumnLayout from '@/components/Layouts/TwoColumnLayout';

// Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
// for animations between the different parts of the Metadata

// blured background?
// https://paper-leaf.com/blog/2016/01/creating-blurred-background-using-only-css/

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit(SET_CURRENT_PAGE, METADATADETAIL_PAGENAME);
      vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
    });
  },
  /**
     * @description load all the icons once before the first component's rendering.
     */
  beforeMount() {
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
  mounted() {
    this.loadMetaDataContent();
    window.scrollTo(0, 0);
  },
  /**
   * @description
   */
  beforeDestroy() {
    // clean current metadata to make be empty for the next to load up
    this.$store.commit(`metadata/${CLEAN_CURRENT_METADATA}`);
  },
  computed: {
    ...mapGetters({
      metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
      loadingMetadatasContent: `${METADATA_NAMESPACE}/loadingMetadatasContent`,
      loadingCurrentMetadataContent: `${METADATA_NAMESPACE}/loadingCurrentMetadataContent`,
      currentMetadataContent: `${METADATA_NAMESPACE}/currentMetadataContent`,
      detailPageBackRoute: `${METADATA_NAMESPACE}/detailPageBackRoute`,
      idRemapping: `${METADATA_NAMESPACE}/idRemapping`,
      iconImages: 'iconImages',
      cardBGImages: 'cardBGImages',
      appScrollPosition: 'appScrollPosition',
    }),
    /**
     * @returns {Number} Size of the metadatasContent
     */
    metadatasContentSize() {
      return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
    },
    /**
     * @returns {String} the metadataId from the route
     */
    metadataId() {
      let id = this.$route.params.metadataid;

      if (this.idRemapping.has(id)) {
        id = this.idRemapping.get(id);
      }

      return id;
    },
    /**
     * @returns {Boolean} if the placeHolders should be shown be somethings are still loading
     */
    showPlaceholder() {
      return this.loadingMetadatasContent || this.loadingCurrentMetadataContent;
    },
    firstColumn() {
      return this.$vuetify.breakpoint.mdAndUp ? this.firstCol : this.singleCol;
    },
    secondColumn() {
      return this.$vuetify.breakpoint.mdAndUp ? this.secondCol : [];
    },
    headerStyle() {
      let width = 82.25;
      let margin = '0px 8.33333%';

      if (this.$vuetify.breakpoint.mdAndDown) {
        width = 100;
        margin = '0';
      }

      if (this.$vuetify.breakpoint.lg) {
        width = 83.25;
      }

      return `width: ${width}%; margin: ${margin};`;
    },
    headerExpanded() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return true;
      }

      return this.appScrollPosition < 20;
    },
  },
  methods: {
    resize() {
      this.$forceUpdate();
    },
    headerHeight() {
      if (!this.showPlaceholder && this.$refs && this.$refs.header) {
        return this.$refs.header.clientHeight;
      }

      return 150;
    },
    /**
     * @description
     */
    createMetadataContent() {
      const currentContent = this.currentMetadataContent;
      const { components } = this.$options;

      // always initialize because when changing the url directly the reloading
      // would not work and the old content would be loaded
      this.header = null;
      this.body = null;
      this.citation = null;
      this.resources = null;
      this.location = null;
      this.details = null;

      if (currentContent && currentContent.title !== undefined) {

        this.header = metaDataFactory.createHeader(currentContent, this.$vuetify.breakpoint.smAndDown);

        this.body = metaDataFactory.createBody(currentContent);

        this.citation = metaDataFactory.createCitation(currentContent);

        this.resources = metaDataFactory.createResources(currentContent);
        this.resources.doiIcon = this.doiIcon;
        this.resources.downloadIcon = this.downloadIcon;
        this.resources.linkIcon = this.linkIcon;
        this.resources.fileSizeIcon = this.fileSizeIcon;
        this.resources.dateCreatedIcon = this.dateCreatedIcon;
        this.resources.lastModifiedIcon = this.lastModifiedIcon;

        this.location = metaDataFactory.createLocation(currentContent);

        this.details = metaDataFactory.createDetails(currentContent);
      }

      this.$set(components.MetadataHeader, 'genericProps', this.header);
      this.$set(components.MetadataBody, 'genericProps', this.body);
      this.$set(components.MetadataCitation, 'genericProps', this.citation);
      this.$set(components.MetadataResources, 'genericProps', this.resources);
      this.$set(components.MetadataLocation, 'genericProps', this.location);
      this.$set(components.MetadataDetails, 'genericProps', { details: this.details });

      this.firstCol = [
        components.MetadataBody,
        components.MetadataCitation,
        components.MetadataLocation,
      ];

      this.secondCol = [
        components.MetadataResources,
        components.MetadataDetails,
      ];

      this.singleCol = [
        components.MetadataBody,
        components.MetadataCitation,
        components.MetadataResources,
        components.MetadataLocation,
        components.MetadataDetails,
      ];

      this.$forceUpdate();
    },
    /**
       * @description
       * @param {any} idOrName
       * @returns {any}
       */
    isCurrentIdOrName(idOrName) {
      return this.currentMetadataContent.id === idOrName || this.currentMetadataContent.name === idOrName;
    },
    /**
       * @description
       * @param {any} tagName
       */
    catchTagClicked(tagName) {
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
    catchAuthorClicked(authorName) {
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
    catchBackClicked() {
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
    loadMetaDataContent() {
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
    currentMetadataContent() {
      this.createMetadataContent();
    },
    /**
       * @description
       */
    metadatasContent() {
      // in case all the metadataContents are already loaded take it from there
      // if EnviDat is called via MetadataDetailPage URL directly

      if (!this.loadingCurrentMetadataContent) {
        this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
      }
    },
  },
  components: {
    MetadataHeader,
    MetadataBody,
    MetadataResources,
    MetadataLocation,
    MetadataDetails,
    MetadataCitation,
    TwoColumnLayout,
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
    firstCol: [],
    secondCol: [],
    singleCol: [],
  }),
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
    overflow: hidden;
  }

</style>
