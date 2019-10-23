import actions from '@/store/modules/policies/policiesActions';
import mutations from '@/store/modules/policies/policiesMutations';

const policiesState = {
  policiesPageBackRoute: '',
  policiesMarkdown: null,
  loading: false,
};


export const policies = {
  namespaced: true,
  state: policiesState,
  getters: {
    policiesMarkdown: state => state.policiesMarkdown,
    policiesPageBackRoute: state => state.policiesPageBackRoute,
    loading: state => state.loading,
  },
  mutations,
  actions,
};
