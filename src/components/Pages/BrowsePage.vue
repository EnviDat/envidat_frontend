<template>
  <v-container grid-list-xs>

    <v-layout style="position: sticky; top: -1px; z-index: 2;">

      <v-flex xs12 my-2>
        <filter-view :searchViewLabelText="searchLabelText"
                      :searchTerm="searchTerm"
                      :searchCount="searchCount"
                      :searchViewHasButton="false"
                      :allTags="allTags" 
                      :selectedTagids.sync="selectedTagids"
                      :popularTagids="popularTagids"
                      v-on:clickedSearch="catchSearchClicked"
                      v-on:clearedSearch="catchSearchCleared"
                      v-on:clickedTag="catchTagClicked"
                      v-on:clickedTagClose="catchTagCloseClicked"
                      v-on:clickedClear="catchTagCleared"
                      >
        </filter-view>

        <img v-if="loadingMetadatasContent || searchingMetadatasContent" src="../../assets/loadingspinner.gif" alt="" height="50px;">

      </v-flex>

    </v-layout>

    <v-layout column
                      style="margin-top: 50px; z-index: 1;">

        <!--div v-if="loadingMetadatasContent">
          <img style="width: 200px;" src="@/assets/loadingspinner.gif" alt="Loading">
        </div>
        <div v-else>
          <p v-if="metadataIds" >metadataIds length: {{ metadataIds.length }}</p>

          <p v-if="metadatasContent" >metadatasContent length: {{ this.metadatasContentSize }}</p>
        </div-->
        <!--metadata-card v-bind:title="currentMetadata.name" v-on:clickedEvent="metaDataClicked"></metadata-card-->
        
        <!--p v-if="currentMetadata" >currentMetadata name: {{ currentMetadata.name }}</p>
        <p v-else>currentMetadata length: 0</p -->

<!--
        v-bind:style="'opacity: ' + 1 - window.scrollTop() / 250"
-->  

        <v-container fluid grid-list-md @scroll="updateScroll" >
          <v-layout row wrap>

            <v-flex xs12 sm6 md4 xl3
                    v-for="metadata in filteredMetadataContent" :key="metadata.id">
              <metadata-card
                            :title="metadata.title"
                            :id="metadata.id"
                            :subtitle="metadata.notes"
                            :tags="metadata.tags"
                            :titleImg="metadata.titleImg"
                            v-on:clickedEvent="metaDataClicked($event, metadataid)">
              </metadata-card>
    
            </v-flex>

            <v-flex xs12 v-if="!filteredMetadataContent">
              <p>nothing found for {{ searchTerm }}</p>
    
            </v-flex>

          </v-layout>
        </v-container>

    </v-layout>
  </v-container>
  
</template>

<script>
  import { mapGetters } from 'vuex';
  import FilterView from '../Views/FilterView';
  import MetadataCard from '../Views/Cards/MetadataCard';
  import { SEARCH_METADATA } from '../../store/metadataMutationsConsts';
  import { CHANGE_APP_BG } from '../../store/mutationsConsts';

  // check filtering in detail https://www.npmjs.com/package/vue2-filters

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.commit(CHANGE_APP_BG, vm.browsePageBGImage);
      });
    },
    mounted: function mounted() {
      // window.addEventListener('scroll', this.updateScroll);
      this.$store.commit(CHANGE_APP_BG, this.browsePageBGImage);

      const tagsEncoded = this.$route.query.tags ? this.$route.query.tags : '';
      if (tagsEncoded.length > 0) {
        this.selectedTagids = this.decodeTagsFromUrl(tagsEncoded);
      } else {
        const category = this.$route.params.category ? this.$route.params.category : null;
        this.selectedTagids = this.decodeCategoryFromUrl(category);
      }

      this.searchTerm = this.$route.query.search ? this.$route.query.search : '';
      if (this.searchTerm.length > 0) {
        this.catchSearchClicked(this.searchTerm);
      }
    },
    destroy: function destroy() {
      // window.removeEventListener('scroll', this.updateScroll);
    },
    methods: {
      updateScroll: function updateScroll() {
        this.scrollPosition = window.scrollY;
      },
      metaDataClicked: function metaDataClicked(datasetname) {
        this.$router.push({
          name: 'MetadataDetailPage',
          params: {
            metadataid: datasetname,
          },
        });
      },
      replaceTagsInRouter: function replaceTagsInRouter() {
        const tagsEncoded = this.encodeTagForUrl(this.selectedTagids);

        this.$router.push({
          name: 'BrowsePage',
          query: { tags: tagsEncoded },
        });
      },
      encodeTagForUrl: function encodeTagForUrl(jsonTags) {
        if (jsonTags && jsonTags.length > 0) {
          const jsonString = JSON.stringify(jsonTags);

          const urlquery = btoa(jsonString);

          let urlConformString = urlquery.replace(/\+/g, '.');
          urlConformString = urlConformString.replace(/\//g, '_');
          urlConformString = urlConformString.replace(/=/g, '-');

          return urlConformString;
        }

        return '';
      },
      decodeTagsFromUrl: function decodeTagsFromUrl(urlquery) {
        if (urlquery) {
          let jsonConformString = urlquery.replace(/\./g, '+');
          jsonConformString = jsonConformString.replace(/_/g, '/');
          jsonConformString = jsonConformString.replace(/-/g, '=');

          const jsonString = atob(jsonConformString);

          const jsonTags = JSON.parse(jsonString);

          return jsonTags;
        }

        // return an empty array for the selectedTagIds
        return [];
      },
      decodeCategoryFromUrl: function decodeCategoryFromUrl(urlquery) {
        if (urlquery) {
          // TODO: figure out which tags should be auto selected
          console.log("got category via url: " + urlquery);
        }

        // return an empty array for the selectedTagIds
        return [];
      },
      catchTagClicked: function catchTagClicked(tagId) {
        const index = this.allTags.findIndex(obj => obj.id === tagId);
        const tag = this.allTags[index];

        if (!tag || tag.colseable) {
          return;
        }

        if (!this.isTagSelected(tagId)) {
          this.selectedTagids.push(tagId);

          this.replaceTagsInRouter();
        }
      },
      catchTagCloseClicked: function catchTagCloseClicked(tagId) {
        if (this.selectedTagids === undefined) {
          return;
        }

        const index = this.selectedTagids.indexOf(tagId);

        if (index >= 0) {
          this.selectedTagids.splice(index, 1);

          this.replaceTagsInRouter();
        }
      },
      catchTagCleared: function catchTagCleared() {
        this.selectedTagids = [];
      },
      catchSearchClicked: function catchSearchClicked(searchTerm) {
        this.searchTerm = searchTerm;

        if (this.searchTerm && this.searchTerm.length > 0) {
          this.$store.dispatch(`metadata/${SEARCH_METADATA}`, this.searchTerm);

          this.$router.push({
            query: { search: this.searchTerm },
          });
        }
      },
      catchSearchCleared: function catchSearchCleared() {
        this.searchTerm = '';

        this.$router.push({
          query: {},
        });

        console.log("clear");
      },
      isTagSelected: function isTagSelected(tagId) {
        if (!tagId || this.selectedTagids === undefined) {
          return false;
        }

        return this.selectedTagids.indexOf(tagId) >= 0;
      },
      tagsIncludeSelected: function tagsIncludeSelected(tags) {
        for (let i = 0; i < tags.length; i++) {
          const tagId = tags[i].id;

          // let tagsMatchSelection = false;

          for (let j = 0; j < this.selectedTagids.length; j++) {
            const selectedTagId = this.selectedTagids[j];
            if (tagId === selectedTagId) {
              return true;
            }
          }
        }

        return false;
      },
      contentFilteredByTags: function contentFilteredByTags() {
        const contentList = [];

        if (this.metadatasContentSize > 0) {
          const metaDataKeys = Object.keys(this.metadatasContent);

          for (let i = 0; i < metaDataKeys.length; i++) {
            const key = metaDataKeys[i];
            const value = this.metadatasContent[key];

            if (value.tags && this.tagsIncludeSelected(value.tags)) {
              contentList.push(value);
            }
          }
        }

        return contentList;
      },
      enhanceSearchWithTags: function enhanceSearchWithTags(searchResult) {
        if (searchResult === undefined && searchResult.length <= 0) {
          return undefined;
        }

        for (let i = 0; i < searchResult.length; i++) {
          const el = searchResult[i];

          for (let j = 0; j < el.tags.length; j++) {
            const element = el.tags[j];

            const index = this.allTags.findIndex(obj => obj.name === element);
            const tag = this.allTags[index];

            if (tag) {
              /* eslint-disable no-param-reassign */
              el.tags[j] = tag;
            }
          }
        }

        return searchResult;
      },
      randomInt: function randomInt(min, max) {
        return Math.floor(Math.random() * (max - (min + 1))) + min;
      },
      enhanceMetadata: function enhanceMetadata(metadatas) {
        if (metadatas === undefined && metadatas.length <= 0) {
          return undefined;
        }

        for (let i = 0; i < metadatas.length; i++) {
          const el = metadatas[i];

          const category = this.getTagCategory(el.tags);
          const categoryImgs = this.cardBGImages[category];
          const max = Object.keys(categoryImgs).length - 1;
          const randomIndex = this.randomInt(0, max);
          const cardImg = randomIndex >= 0 ? Object.values(categoryImgs)[randomIndex] : 0;

          // console.log("loaded " + cardImg + " for category " + category);

          el.titleImg = cardImg;
        }

        return metadatas;
      },
      getTagCategory: function getTagCategory(tags) {
        let category = this.tagCategory;

        if (tags) {
          for (let i = 0; i < tags.length; i++) {
            const element = tags[i];
            if (element.name) {
              if (element.name.includes('forest')) {
                category = 'forest'; break;
              }
              if (element.name.includes('landscape')) {
                category = 'landscape'; break;
              }
              if (element.name.includes('snow')) {
                category = 'snow'; break;
              }
              if (element.name.includes('hazard')) {
                category = 'hazard'; break;
              }
              if (element.name.includes('diversity')) {
                category = 'diversity'; break;
              }
            }
          }
        }

        return category;
      },
      dynamicCardBackground: function dynamicCardBackground() {
        const max = Object.keys(this.imagesImports).length;
        const randomIndex = this.randomInt(0, max);
        const cardImg = Object.values(this.imagesImports)[randomIndex];
        // console.log(this.imageIndex + " cardImg " + cardImg);

        if (cardImg) {
          return `background-image: linear-gradient(to bottom, rgba(1,1,1,0.5), rgba(255,255,255,0)), url(${cardImg}); background-position: center, center;`;
        }

        return '';
      },
      updateSearchCount: function updateSearchCount(searchResult) {
        this.searchCount = searchResult !== undefined ? searchResult.length : 0;
      },
    },
    computed: {
      ...mapGetters({
        metadataIds: 'metadata/metadataIds',
        metadatasContent: 'metadata/metadatasContent',
        searchedMetadatasContent: 'metadata/searchedMetadatasContent',
        searchingMetadatasContent: 'metadata/searchingMetadatasContent',
        loadingMetadataIds: 'metadata/loadingMetadataIds',
        loadingMetadatasContent: 'metadata/loadingMetadatasContent',
        // allTags: 'metadata/allTags',
        currentMetadata: 'metadata/currentMetadata',
        cardBGImages: 'cardBGImages',
      }),
      metadatasContentSize: function metadatasContentSize() {
        return this.metadatasContent !== undefined ? Object.keys(this.metadatasContent).length : 0;
      },
      searchMetadatasContentSize: function searchMetadatasContentSize() {
        return this.searchedMetadatasContent !== undefined ? Object.keys(this.searchedMetadatasContent).length : 0;
      },
      filteredMetadataContent: function filteredMetadataContent() {
        let contentToFilter;

        console.log("search content " + this.searchMetadatasContentSize);

        if (this.searchTerm && this.searchTerm.length > 0
         && this.searchMetadatasContentSize > 0) {
          contentToFilter = Object.values(this.searchedMetadatasContent);
          contentToFilter = this.enhanceSearchWithTags(contentToFilter);
          // console.log("use search content " + contentToFilter.length);
        } else {
          contentToFilter = Object.values(this.metadatasContent);
          console.log("use local content " + contentToFilter.length);
        }

        contentToFilter = this.enhanceMetadata(contentToFilter);

        if (this.selectedTagids !== undefined
         && this.selectedTagids.length > 0) {
          contentToFilter = this.contentFilteredByTags(contentToFilter);
        }

        this.updateSearchCount(contentToFilter);

        return contentToFilter;
      },
    },
    data: () => ({
      browsePageBGImage: './app_b_browsepage.jpg',
      tagCategory: 'landscape', // default
      searchTerm: '',
      searchLabelText: 'Search',
      searchCount: 0,
      selectedTagids: [],
      allTags: [
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'AIR TEMPERATURE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd13',
          name: 'AIR TEMPERATURE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'HUMIDITY',
          id: '5d5d3a6d-1047-4c33-bee7-d1bb119bbe32',
          name: 'HUMIDITY',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONGWAVE RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb50c',
          name: 'LONGWAVE RADIATION',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONGWAVE RADI',
          id: '4a3b1721-1050-434e-8573-9c36284bb51c',
          name: 'LONGWAVE RADI',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LONG RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb52c',
          name: 'LONG RADIATION',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'RADIATION',
          id: '4a3b1721-1050-434e-8573-9c36284bb53c',
          name: 'RADIATION',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'TEMPER',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd14',
          name: 'TEMPER',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'SNOW',
          id: 'c4e9ea3f-6149-45ce-8631-c872b96a9537',
          name: 'SNOW',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'ICE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd16',
          name: 'ICE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'LANDSCAPE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd17',
          name: 'LANDSCAPE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'EARTH QUAKE',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd20',
          name: 'EARTH QUAKE',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'AVALANCHES',
          id: 'e9bbed2b-85d9-49a7-bdfb-2e5785e2202b',
          name: 'AVALANCHES',
        },
        {
          vocabulary_id: null,
          state: 'active',
          display_name: 'SOIL',
          id: 'ba9c8c16-f908-4173-affa-f813f7f8cd21',
          name: 'SOIL',
        },
      ],
      popularTagids: [
        'ba9c8c16-f908-4173-affa-f813f7f8cd13',
        'c4e9ea3f-6149-45ce-8631-c872b96a9537',
        'ba9c8c16-f908-4173-affa-f813f7f8cd16',
        'e9bbed2b-85d9-49a7-bdfb-2e5785e2202b',
        '4a3b1721-1050-434e-8573-9c36284bb51c',
      ],
      scrollPosition: null,
    }),
    components: {
      FilterView,
      MetadataCard,
    },
};
</script>


<style scoped>

</style>
