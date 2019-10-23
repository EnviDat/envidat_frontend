import actions from '@/store/modules/projects/projectsActions';
import mutations from '@/store/modules/projects/projectsMutations';

const projectsState = {
  projects: [],
  projectsPageBackRoute: null,
  loading: false,
};


export const projects = {
  namespaced: true,
  state: projectsState,
  getters: {
    projects: state => state.projects,
    projectsPageBackRoute: state => state.projectsPageBackRoute,
    loading: state => state.loading,
  },
  mutations,
  actions,
};
