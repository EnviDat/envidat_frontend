import axios from 'axios';

import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
} from '@/store/projectsMutationsConsts';

import projectDataFactory from "@/components/projectsDataFactory";

const API_BASE = '/api/action/';
const ENVIDAT_PROXY = process.env.VUE_APP_ENVIDAT_PROXY;
const useTestData = process.env.VUE_APP_USE_TESTDATA;

function urlRewrite(url, baseUrl, proxyUrl) {
  url = url.replace('?', '&');
  url = url.replace("'", '%22');

  proxyUrl = proxyUrl.replace('NULL', '');

  url = `${proxyUrl}${baseUrl}${url}`;

  return url;
}


export default {
  [GET_PROJECTS]({ commit }) {
    commit(GET_PROJECTS);

    const url = urlRewrite(
      'group_list&all_fields=true&include_groups=true&include_extras=true',
      API_BASE,
      ENVIDAT_PROXY,
    );

    if (typeof useTestData === 'string' && useTestData.toLowerCase() === 'true'){
        const projectJSON = require('@/testdata/projects.js');
        const enhancedProjects = projectDataFactory.enhanceSubprojects(projectJSON.default.result);
        commit(GET_PROJECTS_SUCCESS, enhancedProjects);
        return;
    }

    axios.get(url)
      .then((response) => {
        commit(GET_PROJECTS_SUCCESS, response.data);
      })
      .catch((reason) => {
        commit(GET_PROJECTS_ERROR, reason);
      });
  },
};
