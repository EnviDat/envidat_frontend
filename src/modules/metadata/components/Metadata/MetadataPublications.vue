<template  id="MetadataPublications">
  <expandable-text-layout :title="METADATA_PUBLICATIONS_TITLE"
                          :text="publicationsText"
                          :showPlaceholder="showPlaceholder || isResolving"
                          :maxTextLength="publications ? publications.maxTextLength : undefined"
                          :emptyTextColor="emptyTextColor"
                          :emptyText="emptyText"
                          class="relatedPubList"/>
</template>

<script>
/**
 * MetadataPublications.vue renders markdown showing the Related Publications of the metadatas.
 *
 * @summary shows the Related Publications of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2020-10-20 11:33:05
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import axios from 'axios';
import ExpandableTextLayout from '@/components/Layouts/ExpandableTextLayout';
import { METADATA_PUBLICATIONS_TITLE } from '@/factories/metadataConsts';

export default {
  name: 'MetadataPublications',
  components: {
    ExpandableTextLayout,
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  computed: {    
    publications() {
      return this.mixinMethods_getGenericProp('publications');
    },
    emptyTextColor() {
      return this.mixinMethods_getGenericProp('emptyTextColor', 'black');
    },
    emptyText() {
      return this.mixinMethods_getGenericProp('emptyText', 'No related publications available for this dataset.');
    },
    publicationsConfig() {
      const metaConfig = this.mixinMethods_getGenericProp('metadataConfig', {});
      return metaConfig?.publicationsConfig || {};
    },
    publicationsText() {
      let publicationsText = this.publications?.text;

      if (this.resolveDone && this.resolvedPublications) {

        if (publicationsText && this.idsToResolve) {
          this.idsToResolve.forEach((id) => {
            const resolvedObject = this.resolvedPublications[id];
            const text = resolvedObject?.citation?.ACS;
            if (text) {
              publicationsText = publicationsText.replace(id, text);
            }
          });
        }
      }

      return publicationsText;
    },
    resolveIdsActive() {
      return this.resolveIds && this.resolveBaseUrl;
    },
    resolveIds() {
      return this.publicationsConfig.resolveIds;
    },
    idDelimiter() {
      return this.publicationsConfig.idDelimiter;
    },
    idPrefix() {
      return this.publicationsConfig.idPrefix;
    },
    resolveBaseUrl() {
      return this.publicationsConfig.resolveBaseUrl;
    },
    textContainsIds() {
      return this.idsToResolve && this.idsToResolve.length > 0 && this.idsToResolve[0] !== '';      
    },
  },
  methods: {
    extractTextIds(idString) {
      if (idString) {
        const delimiter = this.idDelimiter || '';
        const prefix = this.idPrefix || '';

        const regExStr = `\\${prefix}\\s?[a-zA-Z]+${delimiter}\\d+`;
        const regEx = new RegExp(regExStr, 'gm');
        const hasValidIds = idString.match(regEx) || [];
        // console.log(`hasValidIds ${hasValidIds?.length}`);

        const ids = [];
        hasValidIds.forEach((match) => {
          let idOnly = match;
          if (prefix) {
            idOnly = idOnly.replace(prefix, '');
          }

          ids.push(idOnly.trim());
          // console.log(`Found match, group ${groupIndex}: ${match}`);
        });        

        return ids;
      }

      return [];
    },
    async resolvePublications() {
      const requests = [];
      this.isResolving = true;

      this.idsToResolve.forEach((id) => {
        
        const url = this.resolveBaseUrl + id;

        requests.push(axios.get(url));
      });

      await Promise.all(requests)
        .then((responses) => {
          this.isResolving = false;
          for (let i = 0; i < responses.length; i++) {
            const response = responses[i];
            this.resolvedPublications = { ...this.resolvedPublications, ...response.data };
          }

          this.resolveDone = true;          
        })
        .catch((error) => {
          this.isResolving = false;
          this.resolveDone = true;          
          console.log(`publications resolving error: ${error}`);
        });
    },
  },
  updated() {
//     this.textContainsIds(`* wsl:21234
// * psi:24720`);
    if (this.resolveIdsActive && !this.isResolving && !this.resolveDone) {

      this.idsToResolve = this.extractTextIds(this.publications?.text);

      if (this.textContainsIds) {
        this.resolvePublications();
      }
    }

    // if (this.resolveDone && this.isResolving) {
    //   this.re
    // }
  },
  data: () => ({
    resolveDone: false,
    isResolving: false,
    idsToResolve: [],
    resolvedPublications: null,
    METADATA_PUBLICATIONS_TITLE,
  }),
};
</script>

<style scoped>
  .relatedPubList .readableText ul > * + * {
    padding: 5px 0px;
  }
</style>
