import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  SET_PROJECTDETAIL_PAGE_BACK_URL
} from '@/store/projectsMutationsConsts';

import { METADATA_NAMESPACE } from '@/store/metadataMutationsConsts';
import { ADD_USER_NOTIFICATION } from '@/store/mutationsConsts';
import projectDataFactory from "@/factories/projectsDataFactory";

export default {
  [GET_PROJECTS](state) {
    state.loading = true;
  },
  [GET_PROJECTS_SUCCESS](state, payload) {

    const enhancedProjects = projectDataFactory.enhanceSubprojectsFromExtras(payload);
    const metadatasContent = this.getters[`${METADATA_NAMESPACE}/metadatasContent`];
    const enhancedWithTags = projectDataFactory.enhanceProjectsDatasets(enhancedProjects, metadatasContent);

    state.projects = enhancedWithTags;
    state.loading = false;
  },
  [GET_PROJECTS_ERROR](state, reason) {
    state.loading = false;

    const details = 'An error occured while loading the projects';
    state.pageError = details + ': ' + reason;

    if (process.env.NODE_ENV === 'development') {
      state.pageError += ' \nThis is normal when developing locally on localhost:8080';
    }

    let errObj = errorMessage(reason, details);

    if (reason.response) {
      const status = reason.response.status + ' ' + reason.response.statusText;
      errObj = errorMessage(status, details, reason.response.stack);
    }

    this.commit(ADD_USER_NOTIFICATION, errObj);
  },
  [SET_PROJECTDETAIL_PAGE_BACK_URL](state, payload) {
    state.projectsPageBackRoute = payload;
  },
};
