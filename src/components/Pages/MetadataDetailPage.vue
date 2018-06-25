<template>
  <v-container fluid >
    <div v-if="metadataIdValid">

      <v-layout row wrap>
        <v-flex xs12 md8 offset-md2
                elevation-5
                style="z-index: 1;">

          <metadata-header v-bind="header"> </metadata-header>

        </v-flex>

        <v-flex xs12 md8 offset-md2
                mb-2
                style="z-index: 0;">

          <metadata-body v-bind="body"> </metadata-body>
        </v-flex>

        <v-flex xs12 md8 offset-md2
                my-2 >

          <metadata-citation v-bind="citation"> </metadata-citation>
        </v-flex>

        <v-flex xs12 md8 offset-md2
                my-2 >

          <metadata-resources v-bind="resources" ></metadata-resources>
        </v-flex>

        <v-flex xs12 md8 offset-md2
                my-2 >
          <metadata-location v-if="location"
                              v-bind="location" ></metadata-location>
        </v-flex>

        <v-flex xs12 md8 offset-md2
                my-2 >
          <metadata-details v-if="details"
                              v-bind="details" ></metadata-details>
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
  import MetadataHeader from '../Views/MetadataViews/MetadataHeader';
  import MetadataBody from '../Views/MetadataViews/MetadataBody';
  import MetadataResources from '../Views/MetadataViews/MetadataResources';
  import MetadataLocation from '../Views/MetadataViews/MetadataLocation';
  import MetadataDetails from '../Views/MetadataViews/MetadataDetails';
  import MetadataCitation from '../Views/MetadataViews/MetadataCitation';
  import NotFoundView from '../Views/NotFoundView';
  // import { LOAD_METADATAS_CONTENT } from '../../store/mutation_consts';

  // Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
  // for animations between the different parts of the Metadata

  export default {
    data: () => ({
      // metadataId: '',
      header: Object,
      body: Object,
      citation: Object,
      resources: Array,
      location: null,
      details: Object,
      notFoundBackPath: 'browse',
    }),
    created: function created() {
      // console.log(`created MetaDataDetailPage router params: ${this.$route.params.metadataid}`);
      //this.metadataId = this.$route.params.metadataid;
    },
    mounted: function mounted() {
      this.createMetadataContent();
    },
    update: function update() {
      this.createMetadataContent();
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      metadataId: function metadataId() {
        return this.$route.params.metadataid;
      },
      metadataIdValid: function metadataIdValid(){
        return true;
        // return (this.metadataId && this.metadataIds !== undefined
        //  && this.metadataIds.includes(this.metadataId));
      }
    },
    methods: {
      createMetadataContent: function createMetadataContent(){
        let currentMetadataContent;

        if (this.metadatasContentSize > 0 && this.metadataIdValid){
          currentMetadataContent = this.metadatasContent[this.metadataId];
        }

        if (currentMetadataContent){
          this.header = this.createHeader(currentMetadataContent);
          this.body = this.createBody(currentMetadataContent);
          this.citation = this.createCitation(currentMetadataContent);
          this.resources = this.createResources(currentMetadataContent);
          console.log("created resources " + this.resources);
          this.location = this.createLocation(currentMetadataContent);
          this.details = this.createDetails(currentMetadataContent);
        }
      },
      createHeader: function createHeader(dataset) {

        if (typeof(dataset.maintainer) === 'string'){
          dataset.maintainer = JSON.parse(dataset.maintainer);
        }

        return {
          metadataTitle: dataset.title,
          doi: dataset.doi,
          contactName: dataset.maintainer ? dataset.maintainer.name : "",
          contactEmail: dataset.maintainer_email ? dataset.maintainer_email : dataset.maintainer.email ? dataset.maintainer.email : "",
          citation: "",
          tags: dataset.tags,
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
      createCitation: function createCitation(dataset) {
        let authors = '';

        if (dataset.author !== undefined){

          if (typeof(dataset.author) === 'string'){
            dataset.author = JSON.parse(dataset.author);
          }
          
          dataset.author.forEach((element) => {
            authors += ` ${element.name};`;
          });

          // cut of the last ';'
          if (authors.length > 1){
            authors = authors.substring(0, authors.length - 1);
          }
        }

        if (typeof(dataset.publication) === 'string'){
          dataset.publication = JSON.parse(dataset.publication);
        }

        let text = `${authors.trim()} (${dataset.publication.publication_year}). ${dataset.publication.publisher},`;

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
          citationXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/datacite.xml',
          ciationIsoXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/iso19139.xml',
        };
      },
      createResources: function createResources(dataset) {
        const resources = [];

        dataset.author.forEach((element) => {
          const res = {
            // "hash": "",
            description: element.description,
            // "cache_last_updated": null,
            datasetId: element.package_id,
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

        return {
          metadataId: dataset.id,
          metadataTitle: dataset.title,
          doi: dataset.doi,
          resources,
        };
      },
      createLocation: function createLocation(dataset) {
        return {};
        /*
        return {
          metadataTitle: dataset.title,
          doi: dataset.doi,
          contactName: dataset.maintainer ? dataset.maintainer : "",
          contactEmail: dataset.maintainer_email ? maintainer_email : dataset.maintainer.email ? dataset.maintainer.email : "",
          citation: "",
          tags: dataset.tags,
        };
        */
      },
      createDetails: function createDetails(dataset) {
        return {
          metadataId: dataset.id,
          metadataTitle: dataset.title,
          doi: dataset.doi,
          created: dataset.created,
          lastModified: dataset.last_modified,
          authors: authors,
        };
      },      
    },
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
  /*
  body: {
    metaid: '1',
    metadataTitle: 'Awesome Metadata #1',
    doi: 'envidat.2192318293',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non nisl condimentum, consequat tellus quis, mollis ex. Nulla a lorem non sapien molestie efficitur. Nam auctor felis id fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porttitor odio sed dolor viverra, at efficitur arcu aliquam. Nam facilisis, ipsum sit amet bibendum faucibus, magna dolor pellentesque neque, vel tincidunt metus mi non nisl. Nullam vitae congue nisi, ut accumsan sem. Vivamus vestibulum, lectus ut vehicula dignissim, augue dolor dictum eros, vel congue odio magna et ex. Maecenas luctus vestibulum nisl. Sed laoreet ultricies nulla ut luctus. Nunc et dolor ornare, pretium diam in, tristique dui. Ut lorem mi, finibus non orci sit amet, faucibus pellentesque magna. Nulla vitae gravida neque, vitae facilisis tellus. Vestibulum facilisis elementum augue sed dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam arcu est, interdum sed maximus vel, interdum sit amet mi. Vivamus pellentesque lorem eget ante blandit, in consequat nisi bibendum. Etiam luctus, nibh ut sagittis vulputate, ligula sapien faucibus justo, eu ullamcorper diam lectus sed diam. Morbi cursus congue magna, sed pulvinar leo elementum ut. Nunc arcu turpis, suscipit id mattis ut, semper et est. Aliquam pharetra et diam ut consectetur. Curabitur maximus, ante vitae accumsan consectetur, orci purus vehicula sapien, ac tempor est nulla sed leo. Mauris eu augue hendrerit, placerat risus sit amet, pulvinar diam. Donec non semper neque. Phasellus bibendum libero justo, vel mattis metus ornare sed. Integer in nisl in dui dapibus dapibus pharetra vitae erat. Quisque lacinia ac lorem at dapibus. Cras fringilla commodo risus, sed dapibus lorem ultrices imperdiet. Aliquam erat volutpat. Sed dapibus ligula scelerisque lectus dictum, eget ullamcorper odio faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas molestie magna non felis sagittis, ut imperdiet dolor euismod. Suspendisse quis risus at lorem ornare maximus sit amet quis ligula. Ut odio felis, suscipit nec justo et, tempus molestie nisl. Pellentesque et sapien lacinia, semper mauris ac, consectetur arcu. Curabitur eget orci et enim sollicitudin consectetur. Pellentesque lacinia malesuada imperdiet. Nulla ornare lectus in dapibus scelerisque. Maecenas blandit condimentum purus vel sagittis. In venenatis libero sit amet commodo gravida. Vivamus fringilla, sapien non pulvinar placerat, nisi lacus laoreet odio, a cursus nulla risus at justo. Aliquam erat volutpat. Aenean dictum vehicula eros. Phasellus posuere rutrum posuere. In finibus eu velit id tincidunt. Vivamus vulputate urna quis aliquet faucibus. Aenean vestibulum ligula leo, in tincidunt lorem imperdiet quis. Mauris mi enim, tempor id consequat sit amet, suscipit vel lectus. In risus lectus, mollis vel pretium pretium, maximus venenatis felis. Donec mattis velit quis risus fermentum blandit. Etiam vel porta odio, ut iaculis metus. Aenean pharetra, lorem et accumsan tempus, ex orci dictum neque, ac aliquam leo neque ut nisl. Duis eget tempor dui, vitae bibendum sapien. Pellentesque pharetra magna ac interdum varius. Sed congue bibendum mauris, id eleifend diam sagittis non. Etiam convallis feugiat magna eu lobortis. Donec bibendum. ',
  },
  citation: {
    metaid: '1',
    citationText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non nisl condimentum, consequat tellus quis, mollis ex. Nulla a lorem non sapien molestie efficitur. Nam auctor felis id fringilla faucibus. ',
    citationXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/datacite.xml',
    ciationIsoXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/iso19139.xml',
  },
  resources: {
    metaid: '1',
    id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
    resource_link: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
    download_link: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
  },
  */
</script>

<style>

  .metadata_title{
    font-family: 'Karma', serif;
    font-weight: 700 !important;
  }

</style>
  



