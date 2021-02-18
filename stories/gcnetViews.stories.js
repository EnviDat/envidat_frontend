/* eslint-disable object-property-newline */
/**
 * @summary story of all the MetadataDetailViews for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2021-02-18 16:10:39
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';

import MicroChart from '@/modules/metadata/components/GC-Net/MicroChart';

const stations = [
  {
    id: 1,
    name: 'Swiss Camp',
    latitude: '69.56833',
    longitude: '49.31582',
    elevation: 1176,
    startdate: '1990.30',
    active: true,
    alias: 'swisscamp',
    data: 1,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/swisscamp/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/1temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
  {
    id: 3,
    name: 'NASA-U',
    latitude: '73.84189',
    longitude: '49.49831',
    elevation: 2369,
    startdate: '1995.41',
    active: true,
    alias: 'nasau',
    data: 0,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/nasa_u/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/3temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
  {
    id: 4,
    name: 'GITS',
    latitude: '77.13781',
    longitude: '61.04113',
    elevation: 1887,
    startdate: '1995.43',
    active: true,
    alias: 'gits',
    data: 0,
    envidatConfig: {
      apiUrl: 'https://www.envidat.ch/data-api/gcnet/json/gits/airtemp1/',
      graphParameter: 'airtemp1',
      fallbackUrl: 'https://www.envidat.ch/data-files/4temp.json',
      fallbackParameter: 'airtemp1',
      previewImageUrl: '',
    },
  },
];

// export const methods = {
//   onCardClick: action('clicked on card'),
//   onTagClick: action('clicked on tag'),
// };

storiesOf('7 GC-Net Views / Charts', module)
  .add('MicroChart', () => ({
    components: { MicroChart },
    template: `
    <v-col>
    <!--
      <v-row>
        Empty MicroChart
      </v-row>

      <v-row class="py-3" >
        <v-col >
          <MicroChart />
        </v-col>
      </v-row>
      -->
      
      <v-row>
        Station 1 MicroChart
      </v-row>

      <v-row class="py-3" >
        <v-col >
          <MicroChart :station="station1"
                      :apiUrl="station1.envidatConfig.apiUrl"
                      :fallbackUrl="station1.envidatConfig.fallbackUrl"
                      :parameter="station1.envidatConfig.graphParameter"
                      />
        </v-col>
      </v-row>

      <v-row>
        Station 2 MicroChart
      </v-row>

      <v-row class="py-3" >
        <v-col >
          <MicroChart :station="station2"
                      :apiUrl="station2.envidatConfig.apiUrl"
                      :fallbackUrl="station2.envidatConfig.fallbackUrl"
                      :parameter="station2.envidatConfig.graphParameter"
                      />
        </v-col>
      </v-row>

    </v-col>
    `,
    computed: {
      station1() {
        return this.stations[0];
      },
      station2() {
        return this.stations[1];
      },
    },
    // methods,
    data: () => ({
      stations,
    }),
  }));
