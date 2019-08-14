import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  SET_PROJECTDETAIL_PAGE_BACK_URL
} from '@/store/projectsMutationsConsts';

export default {
  [GET_PROJECTS](state) {
    state.loading = true;
  },
  [GET_PROJECTS_SUCCESS](state, payload) {
    state.projects = payload;
    state.loading = false;
  },
  [GET_PROJECTS_ERROR](state, reason) {
    state.pageError = `There occured an error while loading the projects: ${reason}`;

    if (process.env.NODE_ENV === 'development') {
      state.pageError += ' \nThis is normal when developing locally on localhost:8080';
    }

    state.error = reason;
    state.loading = false;
  },
  [SET_PROJECTDETAIL_PAGE_BACK_URL](state, payload) {
    state.projectsPageBackRoute = payload;
  },
};
