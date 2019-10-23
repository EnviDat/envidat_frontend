import actions from '@/store/modules/guidelines/guidelinesActions';
import mutations from '@/store/modules/guidelines/guidelinesMutations';

const guidelinesState = {
  guidelinesPageBackRoute: '',
  guidelinesMarkdown: null,
  loading: false,
};


export const guidelines = {
  namespaced: true,
  state: guidelinesState,
  getters: {
    guidelinesMarkdown: state => state.guidelinesMarkdown,
    guidelinesPageBackRoute: state => state.guidelinesPageBackRoute,
    loading: state => state.loading,
  },
  mutations,
  actions,
};
