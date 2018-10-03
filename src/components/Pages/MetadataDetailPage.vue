<template>
  <v-container fluid
              tag="article"
              v-bind="{ [`pa-0`]: this.$vuetify.breakpoint.smAndDown,
                        [`pa-2`]: this.$vuetify.breakpoint.mdAndUp }"
  >

    <div v-if="currentMetadataContent">
      
      <v-layout row wrap v-if="twoColumnLayout">

        <v-flex xs12 
              md8 offset-md2
              lg10 offset-lg1
              style="position: sticky; top: -1px; z-index: 2;" >

          <nav-bar-view />

        </v-flex>

        <v-flex xs12
                md8 offset-md2
                lg10 offset-lg1
                elevation-5
                style="z-index: 1;">

          <metadata-header v-bind="header"
                            v-on:clickedTag="catchTagClicked"
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

          <metadata-header v-bind="header" :maxTags="10"
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
  import { CHANGE_APP_BG } from '../../store/mutationsConsts';
  import {
    LOAD_METADATA_CONTENT_BY_ID,
    CLEAN_CURRENT_METADATA,
  } from '../../store/metadataMutationsConsts';
  import NavBarView from '../Views/NavbarView';
  import MetadataHeader from '../Views/MetadataViews/MetadataHeader';
  import MetadataBody from '../Views/MetadataViews/MetadataBody';
  import MetadataResources from '../Views/MetadataViews/MetadataResources';
  import MetadataLocation from '../Views/MetadataViews/MetadataLocation';
  import MetadataDetails from '../Views/MetadataViews/MetadataDetails';
  import MetadataCitation from '../Views/MetadataViews/MetadataCitation';
  import NotFoundView from '../Views/NotFoundView';
  // import { LOAD_METADATAS_CONTENT } from '../../store/metadataMutationsConsts';

  // Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
  // for animations between the different parts of the Metadata

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(CHANGE_APP_BG, vm.PageBGImage);
      });
    },
    created: function created() {
      // console.log('created ' + this.metadataId + ' loading ' + this.currentMetadataContent.title + ' ' + this.metadatasContentSize);
    },
    mounted: function mounted() {
      // console.log('mounted ' + this.metadataId + ' loading ' + this.currentMetadataContent.title + ' ' + this.metadatasContentSize);
      if (!this.loadingMetadatasContent && this.currentMetadataContent.title === undefined) {
        // in case of directly entring the page load the content directly via Id
        this.$store.dispatch(`metadata/${LOAD_METADATA_CONTENT_BY_ID}`, this.metadataId);
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
        allTags: 'metadata/allTags',
        loadingAllTags: 'metadata/loadingAllTags',
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
        return this.loadingCurrentMetadataContent;
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
          /*
          md8: true,
          'offset-md2': true,
          lg10: true,
          'offset-lg1': true,
          */
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
      createMetadataContent: function createMetadataContent() {
        let currentContent = this.currentMetadataContent;

        if (!currentContent && this.loadingMetadatasContent
          && this.metadatasContentSize > 0 && this.metadataId) {
          // in case all the metadataContents are already loaded take it from there
          currentContent = this.metadatasContent[this.metadataId];
        }

        currentContent = this.enhanceMetadata(currentContent, this.cardBGImages);

        if (currentContent) {
          // console.log("create content " + currentContent.spatial + " " + this.header);
          this.header = this.createHeader(currentContent);
          this.body = this.createBody(currentContent);
          this.citation = this.createCitation(currentContent);
          this.resources = this.createResources(currentContent);
          // createLocation is a globalMethod
          this.location = this.createLocation(currentContent);
          this.details = this.createDetails(currentContent);
        }
      },
      createHeader: function createHeader(dataset) {
        let { maintainer } = dataset;

        if (typeof (dataset.maintainer) === 'string') {
          maintainer = JSON.parse(dataset.maintainer);
        }

        let contactEmail = dataset.maintainer_email;
        if (!dataset.maintainer_email && maintainer) {
          contactEmail = maintainer.email ? maintainer.email : '';
        }

        const license = this.createLicense(dataset);

        return {
          metadataTitle: dataset.title,
          doi: dataset.doi,
          contactName: maintainer ? maintainer.name : '',
          contactEmail,
          license: license.title,
          tags: dataset.tags,
          titleImg: dataset.titleImg,
          maxTags: 12,
        };
      },
      createBody: function createBody(dataset) {
        return {
          id: dataset.id,
          title: dataset.title,
          doi: dataset.doi,
          description: dataset.notes,
        };
      },
      getAuthorsString: function getAuthorsString(dataset) {
        let authors = '';

        if (dataset.author !== undefined) {
          let { author } = dataset;

          if (typeof (dataset.author) === 'string') {
            author = JSON.parse(dataset.author);
          }

          author.forEach((element) => {
            authors += ` ${element.name};`;
          });

          // cut of the last ';'
          if (authors.length > 1) {
            authors = authors.substring(0, authors.length - 1);
          }
        }

        return authors;
      },
      createCitation: function createCitation(dataset) {
        const authors = this.getAuthorsString(dataset);

        let { publication } = dataset;

        if (typeof (dataset.publication) === 'string') {
          publication = JSON.parse(dataset.publication);
        }

        let text = '';
        if (publication) {
          text = `${authors.trim()} (${publication.publication_year}). ${publication.publisher},`;
        }

        if (dataset.doi !== undefined) {
          text += ` doi: ${dataset.doi}`;
        }

        return {
          id: dataset.id,
          title: dataset.title,
          authors: dataset.author,
          publication: dataset.publication,
          citationText: text,
          // TODO how to get to the links?
          // https://www.envidat.ch/dataset/datasets-for-testing-the-repository-and-storage
          // add /export/datacite.xml or /export/iso19139.xml to the base url www.envidat.ch/dataset/[title]
          // citationXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/datacite.xml',
          // ciationIsoXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/iso19139.xml',
          citationXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/datacite.xml`,
          ciationIsoXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/iso19139.xml`,
          ciationGCMDXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/gcmd_diff.xml`,
        };
      },
      createResources: function createResources(dataset) {
        const resources = [];

        if (dataset.resources) {
          dataset.resources.forEach((element) => {
            const res = {
              // "hash": "",
              description: element.description,
              // "cache_last_updated": null,
              metadataId: element.package_id,
              // "mimetype_inner": null,
              // url_type: "upload",
              id: element.id,
              size: element.size,
              mimetype: element.mimetype,
              cacheUrl: element.cache_url,
              doi: element.doi,
              name: element.name,
              url: element.url,
              restricted: element.restricted,
              format: element.format,
              state: element.state,
              created: element.created,
              lastModified: element.last_modified,
              position: element.position,
              revisionId: element.revision_id,
            };

            resources.push(res);
          });
        }

        return {
          metadataId: dataset.id,
          metadataTitle: dataset.title,
          doi: dataset.doi,
          resources,
        };
      },
      createDetails: function createDetails(dataset) {
        const details = [];

        details.push({ label: 'Title', text: dataset.title });

        const authors = this.getAuthorsString(dataset);
        details.push({ label: 'Authors', text: authors });

        // DataCRedit

        details.push({ label: 'DOI', text: dataset.doi, url: `https://doi.org/${dataset.doi}` });
        details.push({ label: 'Created', text: dataset.created });
        details.push({ label: 'Last Modified', text: dataset.last_modified });

        const license = this.createLicense(dataset);
        details.push({ label: 'License', text: license.title, url: license.url });

        details.push({ label: 'MetadataId', text: dataset.id });


        return details;
      },
      createLicense: function createLicense(dataset) {
        const license = {};

        license.id = dataset.license_id;
        license.title = dataset.license_title;
        license.url = dataset.license_url;

        return license;
      },
    },
    watch: {
      currentMetadataContent: function updateContent() {
        this.createMetadataContent();
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
      NavBarView,
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

  .metadata_title{
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }

  .metadataResourceCard{
    min-height: 200px !important;
  }

</style>
  



