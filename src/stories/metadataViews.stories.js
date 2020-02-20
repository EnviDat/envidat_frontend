/* eslint-disable object-property-newline */
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

import MetadataHeader from '@/components/Metadata/MetadataHeader.vue';
import MetadataBody from '@/components/Metadata/MetadataBody.vue';
import MetadataCitation from '@/components/Metadata/MetadataCitation.vue';
import MetadataDetails from '@/components/Metadata/MetadataDetails.vue';
import MetadataLocation from '@/components/Metadata/MetadataLocation.vue';

import doiIcon from '@/assets/icons/doi.png';
import mailIcon from '@/assets/icons/mail.png';
import contactIcon from '@/assets/icons/contact2.png';
import licenseIcon from '@/assets/icons/license.png';

import {
  createHeader,
  createCitation,
  createDetails,
  createBody,
  createLocation,
} from '@/factories/metaDataFactory';
// metadata gets enhance in the storybook config
import metadata from './js/metadata';

const smallHeader = createHeader(metadata[0], true);
const largeHeader = createHeader(metadata[1], false);

const citation1 = createCitation(metadata[0]);
const citation2 = createCitation(metadata[2]);

const genericProps1 = {
  showPlaceholder: false,
  id: citation1.id,
  citationText: citation1.citationText,
  citationXmlLink: citation1.citationBibtexXmlLink,
  citationIsoXmlLink: citation1.citationIsoXmlLink,
  citationGCMDXmlLink: citation1.citationGCMDXmlLink,
  citationBibtexXmlLink: citation1.citationBibtexXmlLink,
  citationRisXmlLink: citation1.citationRisXmlLink,
};

const genericProps2 = {
  showPlaceholder: false,
  id: citation2.id,
  citationText: citation2.citationText,
  citationXmlLink: citation2.citationBibtexXmlLink,
  citationIsoXmlLink: citation2.citationIsoXmlLink,
  citationGCMDXmlLink: citation2.citationGCMDXmlLink,
  citationBibtexXmlLink: citation2.citationBibtexXmlLink,
  citationRisXmlLink: citation2.citationRisXmlLink,
};

const details1 = createDetails(metadata[0]);

const body1 = createBody(metadata[0]);
const body2 = createBody(metadata[1]);

const genericProps3 = {
  showPlaceholder: false,
  details: details1,
};

const location1 = createLocation(metadata[2]);

const genericProps4 = {
  showPlaceholder: false,
  id: location1.id,
  name: location1.name,
  title: location1.title,
  pointArray: location1.pointArray,
  isPolygon: location1.isPolygon,
  isPoint: location1.isPoint,
  isMultiPoint: location1.isMultiPoint,
  geoJSON: location1.geoJSON,
};

export const methods = {
  onCardClick: action('clicked on card'),
  onTagClick: action('clicked on tag'),
};

storiesOf('6 Detail Views | Metadata', module)
  .add('Metadata Header', () => ({
    components: { MetadataHeader },
    template: `
    <v-layout row wrap>

      <v-flex xs12 >
        Empty Metadata Header
      </v-flex>

      <v-flex xs12 py-2 >
        <metadata-header metadataId="id-which-can-not-be-found" />
      </v-flex>

      <v-flex xs12 >
        Metadata Header with showPlaceholder
      </v-flex>

      <v-flex xs12 py-2 >
        <metadata-header :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-2>
        <metadata-header
          v-bind="smallHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

      <v-flex xs12 py-2>
        <metadata-header
          v-bind="largeHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

    </v-layout>        
    `,
    methods,
    data: () => ({
      smallHeader,
      largeHeader,
      doiIcon,
      contactIcon,
      licenseIcon,
      mailIcon,
    }),
  })).add('Metadata Body', () => ({
    components: { MetadataBody },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2>
        <metadata-body :genericProps="genericPropsPlaceholder" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-body :genericProps="genericPropsBody" />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-body
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-2>
        <metadata-body :genericProps="genericPropsBodyLongDesc" />
      </v-flex>

    </v-layout>        
    `,
    methods,
    data: () => ({
      genericPropsPlaceholder: {
        showPlaceholder: true,
        body: null,
      },
      genericPropsBody: {
        showPlaceholder: false,
        body: body1,
      },
      genericPropsBodyLongDesc: {
        showPlaceholder: false,
        body: body2,
      },
    }),
  })).add('Metadata Citation', () => ({
    components: { MetadataCitation },
    template: `
    <v-layout row wrap>

      <v-flex xs6 py-2>
        <metadata-citation
          :genericProps="genericProps1"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-2>
        <metadata-citation
          :genericProps="genericProps2"
        />
      </v-flex>

      <v-flex xs12 py-2>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-2>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },
    methods: {
    },
    data: () => ({
      genericProps1,
      genericProps2,
      genericPropsPlaceholder: {
        showPlaceholder: true,
        fixedHeight: false,
      },
    }),
  }))
.add('Metadata Details', () => ({
    components: { MetadataDetails },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2>
        <metadata-details :expandable="true"
                          :genericProps="genericProps3"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-details :genericProps="genericProps3"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-details :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },
    methods: {
    },
    data: () => ({
      genericProps3,
      genericProps2,
      genericPropsPlaceholder: {
        details: [],
        showPlaceholder: true,
        fixedHeight: false,
      },
    }),
  }))
.add('Metadata Location', () => ({
    components: { MetadataLocation },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-2>
        <metadata-location :expandable="true"
                            :genericProps="genericProps4"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-location :expandable="true"
                            :genericProps="genericPropsPlaceholder"
                            :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs6 py-2>
        <metadata-location :genericProps="genericProps4"
        />
      </v-flex>

    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },
    methods: {
    },
    data: () => ({
      genericProps4,
      genericPropsPlaceholder: {
        details: [],
        showPlaceholder: true,
        fixedHeight: false,
      },
    }),
}));
