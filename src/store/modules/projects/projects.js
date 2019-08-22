import actions from '@/store/modules/projects/projectsActions';
import mutations from '@/store/modules/projects/projectsMutations';

const projectsState = {
  projects: [],
  pageError: null,
  projectsPageBackRoute: null,
  loading: false,
  error: null,
};


export const projects = {
  namespaced: true,
  state: projectsState,
  getters: {
    projects: state => state.projects,
    pageError: state => state.pageError,
    projectsPageBackRoute: state => state.projectsPageBackRoute,
    loading: state => state.loading,
    error: state => state.error,
  },
  mutations,
  actions,
};
