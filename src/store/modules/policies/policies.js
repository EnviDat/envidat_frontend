import actions from '@/store/modules/policies/policiesActions';
import mutations from '@/store/modules/policies/policiesMutations';

const policiesState = {
  policiesPageBackRoute: '',
  policiesInfo: null,
  loading: false,
  error: null,
};


export const policies = {
  namespaced: true,
  state: policiesState,
  getters: {
    policiesMarkdown: state => state.policiesMarkdown,
    policiesInfo: state => state.policiesInfo,
    policiesPageBackRoute: state => state.policiesPageBackRoute,
    loading: state => state.loading,
    error: state => state.error,
  },
  mutations,
  actions,
};
