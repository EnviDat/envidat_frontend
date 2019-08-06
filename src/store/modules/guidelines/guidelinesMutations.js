import {
  GET_GUIDELINES,
  GET_GUIDELINES_SUCCESS,
  GET_GUIDELINES_ERROR,
} from '@/store/guidelinesMutationsConsts';

export default {
  [GET_GUIDELINES](state) {
    state.loading = true;
  },
  [GET_GUIDELINES_SUCCESS](state, payload) {
    state.guidelinesMarkdown = payload;
    state.loading = false;
  },
  [GET_GUIDELINES_ERROR](state, reason) {
    state.guidelinesMarkdown = `There occured an error while loading the guidelines: ${reason}`;
    if (process.env.NODE_ENV === 'development') {
      state.guidelinesMarkdown += ' \nThis is normal when developing locally on localhost:8080';
    }
    state.error = reason;
    state.loading = false;
  },
};
