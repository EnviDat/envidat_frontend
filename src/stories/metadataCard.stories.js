/**
 * @summary story of MetadataCard & MetadataCardPlaceholder for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-24 11:04:02
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import MetadataCard from '@/components/Cards/MetadataCard.vue';
import MetadataCardPlaceholder from '@/components/Cards/MetadataCardPlaceholder.vue';
import App from '@/App.vue';
import fileIcon from '@/assets/icons/file.png';
import lockedIcon from '@/assets/icons/lockClosed.png';
import unlockedIcon from '@/assets/icons/lockOpen.png';

// metadata gets enhance in the storybook config
import metadataCards from './js/metadata';

export const methods = {
  hasRestrictedResources: function hasRestrictedResources(metadata) {
    if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
      return false;
    }

    /* eslint-disable consistent-return  */
    metadata.resources.forEach(res => {
      if (
        res.restricted !== undefined &&
        (res.restricted.allowed_users !== undefined ||
          (res.restricted.level !== undefined && res.restricted.level !== 'public'))
      ) {
        return true;
      }
    });

    return false;
  },
  onCardClick: action('clicked on card'),
  onTagClick: action('clicked on tag'),
};

storiesOf('3 Cards | Metadata Cards', module)
  .add('collection', () => ({
    components: { MetadataCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          :categoryColor="metadata.categoryColor"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>

    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          :categoryColor="metadata.categoryColor"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>

  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          :categoryColor="metadata.categoryColor"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          :categoryColor="metadata.categoryColor"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon,
    }),
  }))
  .add('Flat collection', () => ({
    components: { MetadataCard },
    template: `
    <v-layout row wrap>

      <v-flex xs12 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          flatLayout
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          :categoryColor="metadata.categoryColor"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>`,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon,
    }),
  }))
  .add('Placeholder / Loading collection', () => ({
    components: { MetadataCardPlaceholder },
    template: `
    <v-layout column>
      <v-flex>
        <v-layout row wrap>

          <v-flex xs3 pa-2
            v-for="index in 3"
            :key="index"
          >
            <metadata-card-placeholder />
          </v-flex>

        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row wrap>

          <v-flex xs4 pa-2
            v-for="index in 3"
            :key="index"
          >
            <metadata-card-placeholder />
          </v-flex>

        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row wrap>

          <v-flex xs6 pa-2
            v-for="index in 3"
            :key="index"
          >
            <metadata-card-placeholder />
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
    `,
    methods,
    data: () => ({}),
  }));
