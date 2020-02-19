/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import Vue2Filters from 'vue2-filters';
import './js/vuetify-components';
import globalMethods from '@/factories/globalMethods';

import ResourceCard from '@/components/Cards/ResourceCard.vue';
import ResourceCardPlaceholder from '@/components/Cards/ResourceCardPlaceholder.vue';

import fileSizeIcon from '@/assets/icons/fileSize.png';
import doiIcon from '@/assets/icons/doi.png';
import linkIcon from '@/assets/icons/link.png';
import downloadIcon from '@/assets/icons/download.png';
import dateCreatedIcon from '@/assets/icons/dateCreated.png';
import lastModifiedIcon from '@/assets/icons/dateModified.png';
import unFormatedMetadataCards from '@/stories/js/metadata';

Vue.use(Vue2Filters);
Vue.mixin(globalMethods);

const apiFactory = require('@/factories/apiFactory');

function getIcons() {
  const icons = new Map();

  const imgPaths = require.context('@/assets/icons/', false, /\.png$/);

  imgPaths.keys().forEach((iconFileName) => {
    const splits = iconFileName.split('/');
    let key = splits[splits.length - 1];
    key = key.replace('.png', '');
    icons.set(key, iconFileName);
  });

  return icons;
}

const iconFiles = getIcons();

// let str = '';
// for (let [key, value] of iconFiles) {
//   str += 'got key ' + key + ' value ' + value + ' \n';
// }

// alert('icons ' + str);

const metadataCards = [];

unFormatedMetadataCards.forEach((el) => {
  const formatted = apiFactory.solrResultToCKANJSON(el);
  // let keys = Object.keys(el.tags[0]);
  // let props = '';
  // keys.forEach(element => {
  //   props += element + ' ';
  // });
  // alert(typeof el.resources + ' resources: ' + el.resources.length + ' ' + el.resources instanceof Array);
  metadataCards.push(formatted);
});

export const methods = {
  onCardClick: action('clicked on card'),
  onTagClick: action('clicked on tag'),
};

storiesOf('3 Cards | Resource Cards', module)
  .add('Resource card collection twoColumnLayout', () => ({
    components: { ResourceCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(res, index) in metadataCards[0].resources"
        :key="index"
      >
        <resource-card
          v-bind="res"
          :doiIcon="doiIcon"
          :linkIcon="linkIcon"
          :downloadIcon="downloadIcon"
          :fileSizeIcon="fileSizeIcon"
          :dateCreatedIcon="dateCreatedIcon"
          :lastModifiedIcon="lastModifiedIcon"
          :fileExtensionIcon="iconFiles"
          twoColumnLayout
          @clicked="onCardClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
      v-for="(res, index) in metadataCards[1].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      twoColumnLayout
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
      v-for="(res, index) in metadataCards[2].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      twoColumnLayout
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      doiIcon,
      linkIcon,
      downloadIcon,
      fileSizeIcon,
      dateCreatedIcon,
      lastModifiedIcon,
      iconFiles,
    }),
  }))

  .add('Resource card collection', () => ({
    components: { ResourceCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(res, index) in metadataCards[0].resources"
        :key="index"
      >
        <resource-card
          v-bind="res"
          :doiIcon="doiIcon"
          :linkIcon="linkIcon"
          :downloadIcon="downloadIcon"
          :fileSizeIcon="fileSizeIcon"
          :dateCreatedIcon="dateCreatedIcon"
          :lastModifiedIcon="lastModifiedIcon"
          :fileExtensionIcon="iconFiles"
          @clicked="onCardClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
      v-for="(res, index) in metadataCards[1].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
      v-for="(res, index) in metadataCards[2].resources"
      :key="index"
      >
      <resource-card
      v-bind="res"
      :doiIcon="doiIcon"
      :linkIcon="linkIcon"
      :downloadIcon="downloadIcon"
      :fileSizeIcon="fileSizeIcon"
      :dateCreatedIcon="dateCreatedIcon"
      :lastModifiedIcon="lastModifiedIcon"
      :fileExtensionIcon="iconFiles"
      @clicked="onCardClick"
    />
  </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      doiIcon,
      linkIcon,
      downloadIcon,
      fileSizeIcon,
      dateCreatedIcon,
      lastModifiedIcon,
      iconFiles,
    }),
  }))

  .add('Resource Placeholder collection', () => ({
    components: { ResourceCardPlaceholder },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder twoColumnLayout />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="index in 3"
        :key="index"
      >
        <resource-card-placeholder twoColumnLayout />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({}),
  }));
