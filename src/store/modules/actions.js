import axios from 'axios';

import {
  LOAD_ALL_METADATA,
  LOAD_ALL_METADATA_SUCCESS,
  LOAD_ALL_METADATA_ERROR,
  LOAD_METADATA_IDS,
  LOAD_METADATA_IDS_SUCCESS,
  LOAD_METADATA_IDS_ERROR,
  LOAD_METADATAS_CONTENT,
  LOAD_METADATAS_CONTENT_SUCCESS,
  LOAD_METADATAS_CONTENT_ERROR,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  ADD_METADATA,
  LOAD_ALL_TAGS,
  LOAD_ALL_TAGS_SUCCESS,
  LOAD_ALL_TAGS_ERROR,
} from '../metadataMutationsConsts';

const API_BASE = '/api/3/action/';
const SOLR_API_BASE = '/solr/ckan_default/';

/* eslint-disable no-unused-vars  */
let packageListJSON = '';
let dataset = '';

function loadMetadataIdsPromise() {
  return axios.get(`${API_BASE}package_list`);
}

function loadMetadataContentPromises(commit, metadataIds) {
  const calls = [];

  for (let index = 0; index < metadataIds.length; index += 1) {
    const packageId = metadataIds[index];

    // console.log(`adding call to ${packageId}`);
    // calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`));

    /* eslint-disable no-loop-func */
    calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
      commit(ADD_METADATA, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATAS_CONTENT_ERROR, reason);
    }));
  }

  return calls;
}

export default {
  async [LOAD_ALL_METADATA]({ commit }) {
    commit(LOAD_ALL_METADATA);

    let metadataIds = this.getters['metadata/metadataIds'];

    if (metadataIds === undefined || metadataIds.length <= 0) {
      const response = await loadMetadataIdsPromise();

      if (response.data.result !== undefined) {
        commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);
        metadataIds = this.getters['metadata/metadataIds'];
      }
    }

    const calls = loadMetadataContentPromises(commit, metadataIds);

    axios.all(calls).then((response) => {
      commit(LOAD_ALL_METADATA_SUCCESS);
    }).catch((reason) => {
      commit(LOAD_ALL_METADATA_ERROR, reason);
    });
  },
  async [SEARCH_METADATA]({ commit }, searchTerm) {
    commit(SEARCH_METADATA);

    // tags:SNOW%20AND%20notes:snow
    // maybe use notes:"snow avalanche"
    // select?indent=on&q=tags:${searchTerm}%20AND%20notes:${searchTerm}&wt=json

    axios.get(`${SOLR_API_BASE}select?indent=on&q=notes:${searchTerm}&wt=json`)
      .then((response) => {
        commit(SEARCH_METADATA_SUCCESS, response.data.response.docs);
      })
      .catch((reason) => {
        commit(SEARCH_METADATA_ERROR, reason);
      });
  },
  async [LOAD_METADATA_IDS]({ commit }) {
    commit(LOAD_METADATA_IDS);

    commit(LOAD_METADATA_IDS_SUCCESS, packageListJSON.result);
    return;
    /* eslint-disable no-unreachable  */

    loadMetadataIdsPromise().then((response) => {
      commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_IDS_ERROR, reason);
    });
  },
  async [LOAD_METADATAS_CONTENT]({ dispatch, commit }, metadataIds) {
    commit(LOAD_METADATAS_CONTENT);

    for (let index = 0; index < metadataIds.length; index += 1) {
      dataset.result.id += index;
      commit(ADD_METADATA, dataset.result);
    }

    commit(LOAD_METADATAS_CONTENT_SUCCESS);
    return;
    /* eslint-disable no-unreachable  */

    if (metadataIds === undefined || metadataIds.length <= 0) {
      loadMetadataIdsPromise().then((response) => {
        commit(LOAD_METADATA_IDS_SUCCESS, response.data.result);

        /* eslint-disable no-param-reassign  */
        metadataIds = response.data.result;
        // console.log(`reload ids ${metadataIds}`);
      }).catch((reason) => {
        commit(LOAD_METADATA_IDS_ERROR, reason);
      });
    }

    /*
    const calls = [];

    for (let index = 0; index < metadataIds.length; index += 1) {
      const packageId = metadataIds[index];

      // console.log(`adding call to ${packageId}`);
      calls.push(axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
        commit(ADD_METADATA, response.data.result);
      }).catch((reason) => {
        commit(LOAD_METADATA_IDS_ERROR, reason);
      }));
    }
    */
    const calls = loadMetadataContentPromises(commit, metadataIds);

    axios.all(calls).then(() => {
      commit(LOAD_METADATAS_CONTENT_SUCCESS);
    }).catch((reason) => {
      commit(LOAD_METADATAS_CONTENT_ERROR, reason);
    });

    /* eslint-disable no-await-in-loop */
    /*
    for (let index = 0; index < metadataIds.length; index += 1) {
      const packageId = metadataIds[index];

      await axios.get(`${API_BASE}package_show?id=${packageId}`).then((response) => {
        commit(ADD_METADATA, response.data.result);
      }).catch((reason) => {
        commit(LOAD_METADATA_IDS_ERROR, reason);
      });
    }

    commit(LOAD_METADATAS_CONTENT_SUCCESS);
    */
  },
  async [LOAD_ALL_TAGS]({ commit }) {
    commit(LOAD_ALL_TAGS);

    // axios.get(`${API_BASE}package_search?facet.field=[%22tags%22]&facet.limit=1000&rows=0`)

    axios.get(`${SOLR_API_BASE}select&q=*:*&wt=json&facet=true&facet.field=tags&facet.limit=10000&rows=0`)
      .then((response) => {
        commit(LOAD_ALL_TAGS_SUCCESS, response.data.facet_counts.facet_fields.tags);
      })
      .catch((reason) => {
        commit(LOAD_ALL_TAGS_ERROR, reason);
      });
  },
};

packageListJSON = {
  help: 'https://www.envidat.ch/api/3/action/help_show?name=package_list',
  success: true,
  result: [
    '10-16904-1',
    '10-16904-10',
    '10-16904-19',
    '10-16904-2',
    '10-16904-21',
    '10-16904-22',
    '10-16904-23',
    '10-16904-3',
    '10-16904-4',
    '10-16904-5',
    '10-16904-6',
    '10-16904-7',
    '10-16904-8',
    '10-16904-9',
    '10-16904-envidat-24',
    '10-16904-envidat-25',
    '10-16904-envidat-27',
    '10-16904-envidat-28',
    '10-16904-envidat-29',
    '10-16904-envidat-30',
    '2016gl071822',
    'asrb-dav',
    'asrb-vf',
    'asrb-wfj',
    'avalanche-fatalities-european-alps-1969-2015',
    'avalanche-fatalities-per-calendar-year-since-1936',
    'avalanche-fatalities-switzerland-1936',
    'ch2014',
    'ckanext-restricted-test',
    'cosmo-wrf-documentation',
    'data-for-huelsmann_et_al_ecol_appl_2016',
    'datasets-for-testing-the-repository-and-storage',
    'experimental-rockfall-dataset-tschamut-grisons-switzerland',
    'face-stillberg',
    'fatal-avalanche-accidents-switzerland-1995',
    'flu-a-bh',
    'forest-type-nfi',
    'gcos-swe-data',
    'gem2',
    'gem-bh',
    'gtree',
    'hillshade-for-vegetation-height-model-nfi',
    'longterm-hydrological-observatory-alptal-central-switzerland',
    'lwf-tea-bag-sites',
    'mountland-jura',
    'pfynwald',
    'rit1',
    'snow-deltao18-metamorphism-advection',
    'snowmip',
    'soil-moisture-measurements-davos',
    'stillberg-climate',
    'stillberg-reforestation',
    'swiss-biomass-potentials',
    'uas-based-snow-depth-maps-bramabuel-davos-ch',
    'vegetation-height-model-nfi',
  ],
};

dataset = {
  help: 'https://www.envidat.ch/api/3/action/help_show?name=package_show',
  success: true,
  result: {
    owner_org: 'a17b145f-2191-4c21-aabf-55661d5cb140',
    maintainer: '{"identifier_scheme": "", "affiliation": "SLF", "identifier": "", "email": "wever@slf.ch", "name": "Nander Wever"}',
    relationships_as_object: [],
    private: false,
    maintainer_email: 'joel@slf.ch',
    num_tags: 9,
    subtitle: 'Meteorologische und Schneedecke Messungen von Weissfluhjoch, Davos, Schweiz',
    id: '38112bee-f865-4b29-ba19-47a99ba78833',
    metadata_created: '2016-05-25T15:07:58.297238',
    publication: '{"publisher": "WSL Institute for Snow and Avalanche Research SLF", "publication_year": "2015"}',
    metadata_modified: '2018-01-25T12:34:34.155591',
    author: '[{"affiliation": "SLF", "name": "WSL Institute for Snow and Avalanche Research SLF"}]',
    author_email: 'info@slf.ch',
    isopen: true,
    state: 'active',
    version: '1',
    spatial: '{"type":"Point", "coordinates":[ 9.809568, 46.829598]}',
    license_id: 'odc-odbl',
    type: 'dataset',
    resources: [
      {
        hash: '',
        description: 'Release notes:\r\n\r\nBug fix: in previous versions, snow lysimeter data from September 2010 onwards was erroneously reported for UTC+2, instead of UTC+1 (i.e., reported one hour later than should have been).\r\n\r\nUpdate: dataset extended to 2017-07-11T00:30.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: '3074d1dc-6083-4025-9ac4-484cfa88658b',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 7 (current)',
        created: '2017-07-19T18:06:57.825156',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/Wir5VAfGpDBbq8R',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 0,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version.\r\n\r\nRelease notes:\r\n\r\n- Missing ISWR for 2009-09-30 and 2010-04-30 has been replaced by data from WFJ Gipfel\r\n\r\nThis dataset is the basis for the Weissfluhjoch dataset in ESM-SnowMIP (doi: http://dx.doi.org/10.16904/16).',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: 'b648c8ac-d514-45df-813b-7bff4a229a75',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 6',
        created: '2017-03-28T18:45:14.752419',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/3HuhVPC8614xwGF',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: 'SMET',
        state: 'active',
        last_modified: null,
        position: 1,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version. Release notes:\r\n\r\nUpdate: using the incoming and outgoing short- and longwave radiation data from the new processing chain from 2010 onwards, filling also data gaps in pre-2010 data.\r\n\r\nUpdate: dataset extended to 2016-10-04T00:30\r\n\r\nUpdate: refreshing data originating from MeteoSwiss (particularly precipitation)',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: '5eaab5c4-6d54-4aa3-b6c3-b0c1c063c61f',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 5',
        created: '2017-03-21T14:06:27.508973',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/lHzKsz2oFkYfYHA',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 2,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version. Release notes:\r\n\r\nUpdate: dataset extended to 2016-09-02T00:30\r\n\r\nUpdate: refreshing data originating from MeteoSwiss (particularly precipitation)',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: 'be7b42d8-1d7f-44fd-97e2-1e574e8c609f',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 4',
        created: '2017-03-16T15:49:10.047776',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/nnWEGFR8Z7HQTGj',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 3,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version. Release notes:\r\n\r\nBug fix: in version 2, the undercatch correction was not applied correctly\r\n\r\nBug fix: in version 2, snow lysimeter data was missing for extended periods of time\r\n\r\nUpdate: dataset extended to 2016-01-02T00:30\r\n\r\nUpdate: refreshing data originating from MeteoSwiss (particularly precipitation)',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: '62b81ecf-ae20-42cd-9d24-684d11288a08',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 3',
        created: '2017-03-16T15:42:06.235511',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/l1ttKFAnEXwp7hc',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 4,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version. Release notes:\r\n\r\nBug fix: in v1, incoming radiation components were taken from WFJ_Gipfel station, instead of WFJ Versuchsfeld.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: '960deeef-fe0d-4201-a72e-666d8ac0f42e',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 2',
        created: '2017-03-16T15:48:34.156063',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/93dtOq2yCH7uyZX',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 5,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'Deprecated version. Release notes:\r\n\r\nFirst release of dataset.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: '989ec005-eb3b-420c-81a2-204a92f1ee58',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'Version 1',
        created: '2016-05-25T17:10:26.982918',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/ZwaKg8kCcbK1HXG',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: 'SMET',
        state: 'active',
        last_modified: null,
        position: 6,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: '',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: null,
        id: 'cb423865-fdb7-4b16-a912-bb7dd40275ff',
        size: null,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'All versions',
        created: '2017-03-21T16:56:21.537497',
        url: 'http://montblanc.slf.ch/owncloud/index.php/s/csDu5ZbaQyOoBgd',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: null,
        position: 7,
        revision_id: '0dd11c6b-f322-442d-9798-70f9c74457bd',
        resource_type: null,
      },
      {
        hash: '',
        description: 'This ini-file can be used to run SNOWPACK simulations with the WFJ data set, using the new MeteoIO Filter, Generator and Interpolation syntax.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: 'upload',
        id: '8d201858-fba9-449c-b41b-4e49624fa6cc',
        size: 2490,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'SNOWPACK ini file (new syntax)',
        created: '2017-07-19T18:13:02.732960',
        url: 'https://www.envidat.ch/dataset/38112bee-f865-4b29-ba19-47a99ba78833/resource/8d201858-fba9-449c-b41b-4e49624fa6cc/download/iowfjref.ini',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: '2017-07-31T10:12:38.187010',
        position: 8,
        revision_id: '6f920ee6-fd62-41af-9bd5-1501d9614be8',
        resource_type: null,
      },
      {
        hash: '',
        description: 'This ini-file can be used to run SNOWPACK simulations with the WFJ data set, using version 3.4.0 or higher.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: 'upload',
        id: 'e51b83ae-99a6-42f0-add4-8da9590c6573',
        size: 2223,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'SNOWPACK ini file (old syntax)',
        created: '2017-03-23T15:18:35.685744',
        url: 'https://www.envidat.ch/dataset/38112bee-f865-4b29-ba19-47a99ba78833/resource/e51b83ae-99a6-42f0-add4-8da9590c6573/download/iowfjref.ini',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: '2017-04-06T17:11:20.850456',
        position: 9,
        revision_id: '189ba684-ca9f-4f27-bde2-23a7e4d61acc',
        resource_type: null,
      },
      {
        hash: '',
        description: 'This sno-file can be used to run SNOWPACK simulations with the WFJ data set, using version 3.4.0 or higher.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: 'upload',
        id: 'ec0609f1-42fa-4a20-945e-6809bb15a8a0',
        size: 1095,
        mimetype: null,
        cache_url: null,
        doi: '',
        name: 'SNOWPACK sno file',
        created: '2017-03-23T15:19:24.509543',
        url: 'https://www.envidat.ch/dataset/38112bee-f865-4b29-ba19-47a99ba78833/resource/ec0609f1-42fa-4a20-945e-6809bb15a8a0/download/wfj2.sno',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: '',
        state: 'active',
        last_modified: '2017-07-31T10:12:02.687301',
        position: 10,
        revision_id: 'ca3662d4-68c4-485a-a7a6-8d8af308e7fc',
        resource_type: null,
      },
      {
        hash: '',
        description: 'This document describes how the undercatch correction for the Weissfluhjoch measurement site was determined.',
        cache_last_updated: null,
        package_id: '38112bee-f865-4b29-ba19-47a99ba78833',
        mimetype_inner: null,
        url_type: 'upload',
        id: '022a5232-e9a6-4972-a59a-f1aedc2697d3',
        size: 59121,
        mimetype: 'application/pdf',
        cache_url: null,
        doi: '',
        name: 'Undercatch correction',
        created: '2017-04-11T18:29:45.509346',
        url: 'https://www.envidat.ch/dataset/38112bee-f865-4b29-ba19-47a99ba78833/resource/022a5232-e9a6-4972-a59a-f1aedc2697d3/download/undercatch.pdf',
        restricted: '{"allowed_users": "", "level": "public"}',
        format: 'PDF',
        state: 'active',
        last_modified: '2017-04-11T16:29:45.305594',
        position: 11,
        revision_id: '189ba684-ca9f-4f27-bde2-23a7e4d61acc',
        resource_type: null,
      },
    ],
    num_resources: 12,
    tags: [
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
        display_name: 'PRECIPITATION AMOUNT',
        id: '5a5973bc-eb20-4d03-8c5e-b7351da35807',
        name: 'PRECIPITATION AMOUNT',
      },
      {
        vocabulary_id: null,
        state: 'active',
        display_name: 'SHORTWAVE RADIATION',
        id: '2a295030-e71a-4fe6-87b0-5edfb1603c1b',
        name: 'SHORTWAVE RADIATION',
      },
      {
        vocabulary_id: null,
        state: 'active',
        display_name: 'SNOW DEPTH',
        id: '1ef9bd4a-0ba0-419e-90dd-c882a9314029',
        name: 'SNOW DEPTH',
      },
      {
        vocabulary_id: null,
        state: 'active',
        display_name: 'SNOW ICE TEMPERATURE',
        id: 'e1dd376f-8579-4737-b4e7-e928d09cb323',
        name: 'SNOW ICE TEMPERATURE',
      },
      {
        vocabulary_id: null,
        state: 'active',
        display_name: 'WIND DIRECTION',
        id: 'f98af1be-e278-4f8a-a480-68dbe175c350',
        name: 'WIND DIRECTION',
      },
      {
        vocabulary_id: null,
        state: 'active',
        display_name: 'WIND SPEED',
        id: '3c4e47d5-a129-4c0b-a7ed-264926e3a908',
        name: 'WIND SPEED',
      },
    ],
    title: 'WFJ_MOD: Meteorological and snowpack measurements from Weissfluhjoch, Davos, Switzerland',
    spatial_info: '[46.829598 9.809568]',
    groups: [
      {
        display_name: 'Weissfluhjoch Research Site',
        description: "The institute's former main building on the Weissfluhjoch remains at its disposal for research purposes. The test site below the building is the [SLF's](http://www.envidat.ch/organization/slf) oldest and equipped with numerous measuring instruments.\r\n\r\n## Globally unrivalled serial measurements\r\nIn autumn 1936, the Expert Commission for Snow and Avalanche Research (now the SLF) in Switzerland built the first snow laboratory on the Weissfluhjoch. Since these early days, SLF employees have been observing the weather and snow conditions on the adjacent test site daily. The site is located on a flat area of the Dorftälli, approximately 150 m below the Weissfluhjoch towards Davos, at an altitude of 2540 m. In view of the good accessibility and the numerous avalanche-prone slopes in the vicinity, researchers have conducted countless major experiments and studies here in the fields of snow mechanics, snow metamorphism, snow characterisation and measuring methodology. They have also tested the prototypes of various instruments, calibrated remote sensing products, and used the data collected at the test site to compare their snowpack models with those of other scholars.\r\nThe Weissfluhjoch test site is now the only one in the world at this altitude that has a daily record of snow depths and snowfall dating back more than 70 years.\r\n\r\n__More information:__ http://www.slf.ch/ueber/standorte/weissfluhjoch/index_EN",
        image_display_url: 'https://www.envidat.ch/uploads/group/2017-03-03-100909.757321VersuchsfeldWeissfluhjoch.png',
        title: 'Weissfluhjoch Research Site',
        id: 'cd62b669-a153-4caa-bbf3-a167f8f1a83d',
        name: 'weissfluhjoch-research-site',
      },
    ],
    creator_user_id: '334cee1e-6afa-4639-88a2-f980e6ff42c3',
    date: '[{"date": "1996-09-01", "date_type": "accepted"}]',
    resource_type_general: 'dataset',
    relationships_as_subject: [],
    doi: '10.16904/1',
    name: '10-16904-1',
    language: 'en',
    url: 'http://www.envidat.ch/catalogue/10.16904/1',
    notes: 'Dataset of meteorological and snowpack measurements from the automatic weather station at Weissfluhjoch, Davos, Switzerland, suitable for driving snowpack models. The dataset contains standard meteorological measurements, and additionally snowpack runoff data from a snow lysimeter. Where possible, data is quality checked and missing data are replaced from backup sensors from the measurement site itself, or (in only a few cases) from the MeteoSwiss weather station at 470 m distance and 150 m above the measurement site. \r\n\r\n__Publication__\r\nWever, N., Schmid, L., Heilig, A., Eisen, O., Fierz, C., and Lehning, M. Verification of the multi-layer SNOWPACK model with different water transport schemes. 2015. The Cryosphere. Volume 9. 2271-2293. http://dx.doi.org/10.5194/tc-9-2271-2015. 10.5194/tc-9-2271-2015\r\n',
    license_title: 'Open Data Commons Open Database License (ODbL)',
    license_url: 'http://www.opendefinition.org/licenses/odc-odbl',
    organization: {
      description: 'The WSL Institute for Snow and Avalanche Research SLF is an interdisciplinary research and service centre located in Davos Dorf. It forms part of the WSL – the Swiss Federal Institute for Forest, Snow and Landscape Research – and thus belongs to the domain of the ETH (Swiss Federal Institutes of Technology). Its scientists conduct research on snow, the atmosphere, natural hazards, permafrost and mountain ecological systems, and develop innovative products that translate their knowledge into practical applications. The SLF seeks to engage in top-level research while contributing to the resolution of urgent societal issues, for example in the fields of natural hazard warning systems and the analysis of climate and environmental change. \r\n\r\n__Further information__: https://www.slf.ch',
      created: '2016-05-24T16:15:21.861195',
      title: 'SLF',
      name: 'slf',
      is_organization: true,
      state: 'active',
      image_url: '2016-05-24-141521.837240logoslf.png',
      revision_id: '9018b3a8-6928-4cc0-b5ed-64091418ffd2',
      type: 'organization',
      id: 'a17b145f-2191-4c21-aabf-55661d5cb140',
      approval_status: 'approved',
    },
    revision_id: '4d1f22d0-e3f3-4afc-b777-52ffef6ab650',
    resource_type: 'Measurements',
  },
};