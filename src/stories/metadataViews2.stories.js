/**
 * @summary story of all the MetadataDetailViews for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-24 10:59:28
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

/* import App needed for Css classes */
// eslint-disable-next-line no-unused-vars
import App from '@/App';

import MetadataPublications from '@/components/Metadata/MetadataPublications';
import MetadataFunding from '@/components/Metadata/MetadataFunding';
import MetadataAuthors from '@/components/Metadata/MetadataAuthors';

import {
  createPublications,
  createAuthors,
} from '@/factories/metaDataFactory';
// metadata gets enhance in the storybook config
import metadata from './js/metadata';


metadata[0].related_publications = 'blabla bla';
const publications1 = createPublications(metadata[0]);
// const details2 = createDetails(metadata[1]);

const publications2 = createPublications(metadata[1]);

// const funding1 = createFunding(metadata[0]);
const funding1 = [{ grant_number: '', institution: 'Funding not available', institution_url: '' }];
// const funding2 = createFunding(metadata[1]);
const funding2 = [
  { grant_number: 'XYZ', institution: 'WSL', institution_url: 'https://www.wsl.ch' },
  { grant_number: 'XZZ', institution: 'EAWAG', institution_url: 'https://www.eawag.ch' },
  { grant_number: '', institution: 'Aquascope', institution_url: '' },
  { grant_number: 'XYZ-ZYX', institution: 'EAWAG', institution_url: 'https://www.eawag.ch' },
  { grant_number: '', institution: 'Someone', institution_url: '' },
  { grant_number: '', institution: 'Someone you do not know with a long name', institution_url: '' },
];

const authors = createAuthors(metadata[2]);

const genericProps5 = {
  showPlaceholder: false,
  authors,
};

export const methods = {
  onCardClick: action('clicked on card'),
  onTagClick: action('clicked on tag'),
};

storiesOf('6 Detail Views | Metadata', module)
.add('Metadata Publications', () => ({
    components: { MetadataPublications },
    template: `
    <v-layout row wrap>

      <v-flex xs6 py-2>
        <metadata-publications :genericProps="genericPropsEmpty"
                                :showPlaceholder="genericPropsEmpty.showPlaceholder"/>
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-publications :genericProps="genericPropsPublications" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-publications :genericProps="genericPropsPlaceholder"
                                :showPlaceholder="genericPropsPlaceholder.showPlaceholder" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-publications />
      </v-flex>
      
    </v-layout>        
    `,
    updated() {
    },
    methods: {
    },
    data: () => ({
      genericProp: {
        publications: publications1,
        showPlaceholder: false,
      },
      genericPropsPlaceholder: {
        publications: null,
        showPlaceholder: true,
      },
      genericPropsEmpty: {
        publications: publications2,
        showPlaceholder: false,
      },
      genericPropsPublications: {
        showPlaceholder: false,
        publications: {
          title: 'Related Publications',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Quis enim lobortis scelerisque fermentum dui. Neque egestas congue quisque egestas. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Volutpat blandit aliquam etiam erat. Tempor id eu nisl nunc. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Ultricies mi eget mauris pharetra et ultrices. Eu consequat ac felis donec et odio pellentesque diam volutpat. Fames ac turpis egestas integer. Faucibus interdum posuere lorem ipsum dolor sit amet. Cursus euismod quis viverra nibh cras. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. At elementum eu facilisis sed odio morbi quis. Ut sem viverra aliquet eget sit amet tellus.
          Proin nibh nisl condimentum id venenatis. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Eu mi bibendum neque egestas congue quisque egestas diam. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sed velit dignissim sodales ut. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Sodales ut eu sem integer vitae. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Augue lacus viverra vitae congue. Eget sit amet tellus cras adipiscing enim eu turpis. Pharetra vel turpis nunc eget lorem. Cras sed felis eget velit aliquet sagittis.
          Sagittis nisl rhoncus mattis rhoncus urna. Vehicula ipsum a arcu cursus vitae. Sed elementum tempus egestas sed. Nec nam aliquam sem et tortor. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Massa eget egestas purus viverra accumsan in. Integer eget aliquet nibh praesent. Ut placerat orci nulla pellentesque dignissim enim sit amet. Amet venenatis urna cursus eget. Nunc pulvinar sapien et ligula. Vel pharetra vel turpis nunc eget lorem dolor. Felis donec et odio pellentesque diam. Porttitor rhoncus dolor purus non enim.
          Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. A diam maecenas sed enim ut sem viverra. Ac felis donec et odio pellentesque diam volutpat commodo. Risus commodo viverra maecenas accumsan lacus vel facilisis. Vitae aliquet nec ullamcorper sit amet. Ullamcorper malesuada proin libero nunc consequat. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Et tortor consequat id porta nibh venenatis. Lectus mauris ultrices eros in cursus. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Justo donec enim diam vulputate ut pharetra sit. Sit amet luctus venenatis lectus magna fringilla. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Orci dapibus ultrices in iaculis nunc sed augue lacus.
          `,
        },
      },
    }),
  }))
.add('Metadata Funding', () => ({
    components: { MetadataFunding },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2>
        <metadata-funding :genericProps="genericProps2"
                          :showPlaceholder="genericProps2.showPlaceholder"/>
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-funding :expandable="true"
                          :genericProps="genericProps2"
                          :showPlaceholder="genericProps2.showPlaceholder"/>
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-funding :expandable="true"
                          :genericProps="genericProp" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-funding :expandable="true"
                          :genericProps="genericPropsPlaceholder"
                                :showPlaceholder="genericPropsPlaceholder.showPlaceholder" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-funding />
      </v-flex>

    </v-layout>        
    `,
    updated() {
    },
    methods: {
    },
    data: () => ({
      genericProp: {
        funding: funding1,
        showPlaceholder: false,
      },
      genericPropsPlaceholder: {
        funding: null,
        showPlaceholder: true,
      },
      genericProps2: {
        funding: funding2,
        showPlaceholder: false,
      },
    }),
  }))
.add('Metadata Authors', () => ({
    components: { MetadataAuthors },
    template: `
    <v-layout row wrap>

      <v-flex xs12 md6 py-2>
        <metadata-authors :genericProps="genericProps5" />
      </v-flex>

      <v-flex xs12 md6 py-2>
        <metadata-authors :expandable="true"
                          :genericProps="genericProps5" />
      </v-flex>

      <v-flex xs12 md6 py-2>
        <metadata-authors :expandable="true"
                          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder" />
      </v-flex>

      <v-flex xs12 md6 py-2>
        <metadata-authors :expandable="true" />
      </v-flex>

    </v-layout>        
    `,
    // updated() {
    //   this.$children.forEach((child) => {
    //     child.$forceUpdate();
    //   });
    // },
    methods: {
    },
    data: () => ({
      genericProps5,
      genericPropsPlaceholder: {
        authors: [],
        showPlaceholder: true,
      },
    }),
}));
